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
        $returnObject = function($codes) {
            /**
             * 공통 코드 그룹 별로 구분.
             */
            $code_group = array();
            array_map(function($element) use (&$code_group) {

                // FIXME : 아래 경고?
                $code_group[$element['group_id']][] = [
                    'code_id' => $element['code_id'],
                    'code_name' => $element['code_name'],
                ];

            }, array_filter($codes, function($e) {
                return $e['code_id'];
            }));

            /**
             * 코드 명으로 분리.
             */
            $code_name = array();
            array_map(function($element) use (&$code_name) {
                $code_name[$element['code_id']] = $element['code_name'];
            }, array_filter($codes, function($e) {
                return $e['code_id'];
            }));

            return [
                'code_name' => $code_name,
                'code_group' => $code_group
            ];
        };

        return [
            'codes' => $returnObject($this->codeRepository->all()->toArray())
        ];
    }
}
