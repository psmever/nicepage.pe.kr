<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Message
    |--------------------------------------------------------------------------
    */
    'exception' => [
        'NotFoundHttpException' => '존재 하지 않은 요청 입니다.',
        'MethodNotAllowedHttpException' => '지원되지 않는 메서드입니다.',
        'ClientErrorException' => '잘못된 요청 입니다.',
        'ClientTypeError' => '클라이언트 정보가 존재 하지 않습니다.',
        'ServerErrorException' => '처리중 문제가 발생했습니다.',
        'loginFail' => '로그인에 실패 했습니다.',
        'PassportClient' => 'Passport 오류가 발생했습니다.',
        'error_exception' => '알수없는 내부 오류가 발생했습니다.',
        'ThrottleRequestsException' => '너무 많은 시도 입니다. 잠시후에 다시 시도해 주세요.',
        'PDOException' => '데이터 처리중 문제가 발생했습니다.',
        'ModelNotFoundException' => '데이터가 존재 하지 않습니다.',
        'ForbiddenErrorException' => '권한이 부족합니다.',
        'AuthenticationException' => '로그인이 필요한 서비스 입니다.',
    ],

    'response' => [
        'status' => '서버 점검 중입니다.',
        'success' => '정상 전송 하였습니다.',
        'result_success' => '정상 처리 하였습니다.',
        'error' => '오류가 발생 했습니다.',
        'down' => '서버 점검 중입니다.',
    ]
];
