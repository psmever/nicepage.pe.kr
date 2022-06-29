<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Passport\Exceptions\OAuthServerException;
use PDOException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;
use Illuminate\Support\Facades\Response;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class Handler extends ExceptionHandler
{
    /**
     * @var string|false
     */
    protected string|bool $loggingId = '';

    /**
     * @var string
     */
    protected string $loggingChannel = '';

    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
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
    public function register(): void
    {
//        $this->reportable(function (Throwable $e) {
//            //
//        });

        $slackLogging = env('APP_ENV') == "production" || env('APP_ENV') == "development";

        /**
         * 정상 이지만 에러 메시지를 보낼 경우.
         *
         * ServiceException
         */
        $this->renderable(function (ServiceErrorException $e) use ($slackLogging) {

            $this->loggingChannel = 'ServiceErrorException';
            $error_message = $e->getMessage() ?: __('exception.error_exception');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('ServiceErrorExceptionLog')->error($loggerMessage['file']);

            if ($slackLogging) {
                Log::channel('slack')->error($loggerMessage['slack']);
            }

            return Response::error(200, $error_message);
        });

        /**
         * NotFoundHttpException
         */
        $this->renderable(function (NotFoundHttpException $e) {

            $this->loggingChannel = 'NotFoundHttpException';
            $error_message = $e->getMessage() ?: __('exception.NotFoundHttpException');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('NotFoundHttpException')->error($loggerMessage['file']);

            return Response::error(404, $error_message);
        });

        /**
         * MethodNotAllowedHttpException
         */
        $this->renderable(function (MethodNotAllowedHttpException $e) {

            if ( !$e ) return false;

            $this->loggingChannel = 'MethodNotAllowedHttpException';
            $error_message = __('exception.MethodNotAllowedHttpException');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('MethodNotAllowedHttpException')->error($loggerMessage['file']);

            return Response::error(405, $error_message);
        });

        /**
         * ClientErrorException
         */
        $this->renderable(function (ClientErrorException $e) use ($slackLogging) {

            $this->loggingChannel = 'ClientErrorException';
            $error_message = $e->getMessage() ?: __('exception.ClientErrorException');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('ClientErrorException')->error($loggerMessage['file']);

            if ($slackLogging) {
                Log::channel('slack')->error($loggerMessage['slack']);
            }

            return Response::error(412, $error_message);
        });

        /**
         * ServerErrorException
         */
        $this->renderable(function (ServerErrorException $e) use ($slackLogging) {

            $this->loggingChannel = 'ServerErrorException';
            $error_message = $e->getMessage() ?: __('exception.ServerErrorException');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('ServerErrorException')->error($loggerMessage['file']);

            if ($slackLogging) {
                Log::channel('slack')->error($loggerMessage['slack']);
            }

            return Response::error(500, $error_message);
        });


        /**
         * ForbiddenErrorException
         */
        $this->renderable(function (ForbiddenErrorException $e) {

            $this->loggingChannel = 'ForbiddenErrorException';
            $error_message = ($e->getMessage()) ?: __('exception.ForbiddenErrorException');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('ForbiddenErrorException')->error($loggerMessage['file']);

            return Response::error(403, $error_message);
        });

        /**
         * AuthenticationException
         */
        $this->renderable(function (AuthenticationException $e) use ($slackLogging) {

            $this->loggingChannel = 'AuthenticationException';
            $error_message = $e->getMessage() == "Unauthenticated." ? __('exception.AuthenticationException'): $e->getMessage();
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('AuthenticationException')->error($loggerMessage['file']);

            if ($slackLogging) {
                Log::channel('slack')->debug($loggerMessage['slack']);
            }

            return Response::error(401, $error_message);
        });


        /**
         * ThrottleRequestsException
         */
        $this->renderable(function (ThrottleRequestsException $e) use ($slackLogging) {

            $this->loggingChannel = 'ThrottleRequestsException';
            $error_message = ($e->getMessage()) ?: __('exception.ThrottleRequestsException');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('ThrottleRequestsException')->error($loggerMessage['file']);

            if ($slackLogging) {
                Log::channel('slack')->debug($loggerMessage['slack']);
            }

            return Response::error(429, $error_message);
        });

        /**
         * PDOException
         */
        $this->renderable(function (PDOException $e) use ($slackLogging) {

            $this->loggingChannel = 'PDOException';
            $error_message = ($e->getMessage()) ?: __('exception.PDOException');
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('PDOException')->error($loggerMessage['file']);

            if ($slackLogging) {
                Log::channel('slack')->debug($loggerMessage['slack']);
            }

            return Response::error(
                500,
                __('exception.PDOException'),
            );
        });

        /**
         * EtcException
         */
        $this->renderable(function (Throwable $e) use ($slackLogging) {

            $this->loggingChannel = 'Throwable';

            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $errorFile = $e->getFile();
            $errorline = $e->getLine();
//            $errorTrace = $e->getTrace();
            $errorTraceAsString = $e->getTraceAsString();

            $error_message = <<<EOF

message: $errorMessage
code: $errorCode
file: $errorFile
line: $errorline
traceAsString: $errorTraceAsString

EOF;
            $loggerMessage = $this->getLoggerMessage($error_message);

            Log::channel('Throwable')->error($loggerMessage['file']);

            if ($slackLogging) {
                Log::channel('slack')->debug($loggerMessage['slack']);
            }

            return Response::error(
                500,
                [
                    'message' => __('exception.error_exception'),
                    'error' => $e->getMessage()
                ]
            );
        });
    }

    /**
     * 예외 renderable
     *
     * @param Request $request
     * @param Throwable $e
     * @return JsonResponse|\Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response
     * @throws Throwable
     */
    public function render($request, Throwable $e)
    {
        /**
         * renderable 에서 ModelNotFoundException 를 캐치 못해서 render 함수에 추가.
         * laravel 이전 버전에서 가지고 옴.
         */
        if ($e instanceof ModelNotFoundException) {
            $error_message = __('exception.ModelNotFoundException');
            if($request->wantsJson()) {
                return Response::error(404, $error_message);
            }
            return Response($error_message, 404);
        }

        return parent::render($request, $e);
    }

    /**
     * 로그할 메시지 생성.
     *
     * @param string $logMessage
     * @return array
     */
    function getLoggerMessage(string $logMessage = ''): array
    {
        $request_ip = request()->ip();

        $logRouteName = Route::currentRouteName();
        $logRouteAction = Route::currentRouteAction();
        $current_url = url()->current();
        $logHeaderInfo = json_encode(request()->header());
        $logBodyInfo = json_encode(request()->all());
        $method = request()->method();
        $environment = env('APP_ENV');

        return array(
            'file' => <<<EOF

ENV: $environment
CHANNEL: $this->loggingChannel
ID: $this->loggingId
RequestIP: $request_ip
Message: $logMessage
Current_url: $current_url
RouteName: $logRouteName
Method: $method
RouteAction: $logRouteAction
Header: $logHeaderInfo
Body: $logBodyInfo

EOF,
            'slack' => <<<EOF

ENV: $environment
CHANNEL: $this->loggingChannel
ID: $this->loggingId
Current_url: $current_url
Message: $logMessage
EOF
        );

    }
}
