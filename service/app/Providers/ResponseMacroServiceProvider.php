<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use stdClass;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(Request $request)
    {
        /**
         * 결과 커스텀 하게 사용.
         */
        Response::macro('success', function($result = NULL, $message = '', $statusCode = 200) use ($request) {

            $response = [];

            if(!empty($message)) {
                $response['message'] = $message;
            }

            if(!empty($result)) {
                $response = $result;
            }

            if(empty($response)) {
                $response = [
                    'message' => __('default.response.success')
                ];
            }

            return Response()->json($response, $statusCode);
        });

        /**
         * 성공 No Contents Render Macro
         */
        Response::macro('success_no_content', function () {
            $response = new stdClass();
            return Response()->json($response, 204);
        });

        /**
         * 기본 Error Render Macro.
         */
        Response::macro('error', function($statusCode = 401, $error_message = NULL) use ($request) {
            if($request->wantsJson()) {
                if(is_array($error_message)) {
                    $response = [
                        'error_message' => $error_message['message'] ?: __('default.response.error'),
                        'error' => $error_message['error']
                    ];
                } else {
                    $response = [
                        'error_message' => $error_message,
                    ];

                }
                return Response()->json($response, $statusCode);
            } else {
                if(is_array($error_message)) {
                    $responseText = 'error_message: ' . $error_message['message'] ?: __('default.response.error');
                    $responseText .= '<br />' . 'error: ' . $error_message['error'];
                } else {
                    $responseText = 'error_message: ' . $error_message;
                }
                return Response($responseText, $statusCode);
            }
        });
    }
}
