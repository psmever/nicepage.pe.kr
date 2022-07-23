<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use PDOException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    protected string $messages = '';
    /**
     * @var string|bool
     */
    protected string|bool $loggingId = '';

    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        \App\Exceptions\ClientErrorException::class,
        \App\Exceptions\ForbiddenErrorException::class,
        \App\Exceptions\ServerErrorException::class,
        \App\Exceptions\ServiceErrorException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Handler constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        parent::__construct($container);

        $this->loggingId  = date('Ymdhis');
    }

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        /**
         * NotFoundHttpException
         */
        $this->renderable(function (NotFoundHttpException $e) {
            $error_message = $e->getMessage() ?: __('default.exception.NotFoundHttpException');
            return Response::error(404, $error_message);
        });

        /**
         * MethodNotAllowedHttpException
         */
        $this->renderable(function (MethodNotAllowedHttpException $e) {
            $this->messages = __('default.exception.MethodNotAllowedHttpException');
            return Response::error(405, __('default.exception.MethodNotAllowedHttpException'));
        });

        /**
         * ForbiddenErrorException
         */
        $this->renderable(function (ForbiddenErrorException $e) {
            $error_message = ($e->getMessage()) ?: __('default.exception.ForbiddenErrorException');
            $this->messages = $error_message;
            return Response::error(403, $error_message);
        });

        /**
         * AuthenticationException
         */
        $this->renderable(function (AuthenticationException $e) {
            $error_message = $e->getMessage() == "Unauthenticated." ? __('default.exception.AuthenticationException') : $e->getMessage();
            $this->messages = $error_message;
            return Response::error(401, $error_message);
        });

        /**
         * ThrottleRequestsException
         */
        $this->renderable(function (ThrottleRequestsException $e) {
            $error_message = ($e->getMessage()) ?: __('default.exception.ThrottleRequestsException');
            $this->messages = $error_message;
            return Response::error(429, $error_message);
        });

        /**
         * PDOException
         */
        $this->renderable(function (PDOException $e) {
            $this->messages = __('exception.PDOException');
            return Response::error(500, __('exception.PDOException'));
        });

        /**
         * Throwable
         */
        $this->renderable(function (Throwable $e) {
            $this->messages = $e->getMessage();
            return Response::error(500, ['message' => __('default.exception.error_exception'), 'error' => $e->getMessage()]);
        });

    }

    public function report(Throwable $exception)
    {
        parent::report($exception);

        $request_ip = request()->ip();

        $logRouteName = Route::currentRouteName();
        $logRouteAction = Route::currentRouteAction();
        $current_url = url()->current();
        $logHeaderInfo = json_encode(request()->header());
        $logBodyInfo = json_encode(request()->all());
        $method = request()->method();
        $environment = env('APP_ENV');
        $exceptionName = get_class($exception);
        $exceptionFile = $exception->getFile().' '.$exception->getLine();

        $logMessages = <<<EOF

ENV: $environment
ID: $this->loggingId
RequestIP: $request_ip
Message: $exceptionName
Current_url: $current_url
RouteName: $logRouteName
Method: $method
RouteAction: $logRouteAction
Header: $logHeaderInfo
Body: $logBodyInfo
File: $exceptionFile

EOF;
        // 레포트 제외 체크.
        if($this->shouldReport($exception)) {
            Log::channel('serverlog')->error($logMessages);
        }

    }

    /**
     * @param $request
     * @param Throwable $e
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response
     * @throws Throwable
     */
    public function render($request, Throwable $e)
    {
        /**
         * renderable 에서 ModelNotFoundException 를 캐치 못해서 render 함수에 추가.
         * laravel 이전 버전에서 가지고 옴.
         */
        if ($e instanceof ModelNotFoundException) {
            $error_message = __('default.exception.ModelNotFoundException');
            if($request->wantsJson()) {
                return Response::error(404, $error_message);
            }
            return Response($error_message, 404);
        }

        return parent::render($request, $e);
    }
}
