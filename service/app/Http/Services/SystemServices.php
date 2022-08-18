<?php

namespace App\Http\Services;

use App\Http\Repositories\CodeRepository;
use App\Http\Repositories\Interfaces\CodesRepositoryInterface;
use Illuminate\Http\Request;
use Storage;

class SystemServices
{
    /**
     * @var Request
     */
    protected Request $currentRequest;
    protected CodeRepository $codeRepository;

    /**
     * @param Request $request
     * @param CodesRepositoryInterface $codeRepository
     */
    function __construct(Request $request, CodesRepositoryInterface $codeRepository) {
        $this->currentRequest = $request;
        $this->codeRepository = $codeRepository;
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

    /**
     * 공통 데이터.
     * @return array
     */
    public function getSiteData() : array
    {
        return [];
    }
}
