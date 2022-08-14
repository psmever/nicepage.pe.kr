<?php

namespace App\Http\Services;

use Illuminate\Http\Request;
use Storage;

class SystemServices
{
    /**
     * @var Request
     */
    protected Request $currentRequest;

    /**
     * @param Request $request
     */
    function __construct(Request $request) {
        $this->currentRequest = $request;
    }

    /**
     * 시스템 공지사항.
     * @return String
     */
    public function checkSystemNotice() : String
    {
        $noticeFileName = 'system_notice.txt';
        $noticeExists = Storage::disk('forlocal')->exists($noticeFileName);

        // 시스템 공지 사항 없을때.
        if(!$noticeExists) {
            return "";
        }

        // 시스템 공지 사항 있을때.
        $noticeContents = Storage::disk('forlocal')->get($noticeFileName);
        if (empty($noticeContents)) {
            return "";
        }

        return $noticeContents;
    }
}
