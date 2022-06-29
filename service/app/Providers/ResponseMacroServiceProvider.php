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
         * 기본 성공 Render Macro.
         */
        Response::macro('success', function ($result = null) {
            $response = [
                'message' => __('response.success'),
            ];

            if(!empty($result)) {
                $response['result'] = $result;
            }

            return Response()->json($response);
        });

        Response::macro('message_success', function ($message = '', $result = null) {
            $response = [
                'message' => $message ?:__('response.success')
            ];

            if(!empty($result)) {
                $response['result'] = $result;
            }

            return Response()->json($response);
        });

        /**
         * 결과 커스텀 하게 사용.
         */
        Response::macro('custom_success', function($statusCode = 200, $message = '', $result = NULL) use ($request) {
            $response = [
                'message' => $message ?:__('response.success')
            ];

            if(!empty($result)) {
                $response['result'] = $result;
            }

            return Response()->json($response, $statusCode);
        });

        /**
         * 생성 메시지만 처리.
         */
        Response::macro('success_only_message', function (Int $statusCode = 201) {
            $response = [
                'message' => __('response.process_success'),
            ];

            return Response()->json($response, $statusCode);
        });

        /**
         * 데이터만 Render Macro.
         */
        Response::macro('success_only_data', function ($response = null) {
            return Response()->json($response);
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
                        'error_message' => $error_message['message'] ?: __('response.error'),
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
                    $responseText = 'error_message: ' . $error_message['message'] ?: __('response.error');
                    $responseText .= '<br />' . 'error: ' . $error_message['error'];
                } else {
                    $responseText = 'error_message: ' . $error_message;
                }
                return Response($responseText, $statusCode);
            }
        });
    }
}
