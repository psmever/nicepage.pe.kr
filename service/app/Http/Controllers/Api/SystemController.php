<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\SystemServices;
use App\Http\Controllers\Controller;
use Response;

class SystemController extends Controller
{
    /**
     * @var SystemServices
     */
    protected SystemServices $systemServices;

    /**
     * @param SystemServices $systemServices
     */
    function __construct(SystemServices $systemServices)
    {
        $this->systemServices = $systemServices;
    }

    /**
     * 서버 상태 체크.
     * @return mixed
     */
    public function checkSystemStatus(): mixed
    {
        return Response::success_no_content();
    }

    /**
     * 시스템 공지사항.
     * @return mixed
     */
    public function checkSystemNotice(): mixed
    {
        $task = $this->systemServices->checkSystemNotice();

        if($task) {
            return Response::success(['notice_message' => $task]);
        }

        return Response::success_no_content();
    }
}
