<?php

namespace App\Http\Controllers\Api\v1;

use App\Exceptions\ClientErrorException;
use App\Exceptions\ServiceErrorException;
use App\Http\Controllers\Controller;
use App\Http\Services\MediaServices;
use Response;

class MediaController extends Controller
{
    /**
     * @var MediaServices
     */
    protected MediaServices $mediaServices;

    /**
     * @param MediaServices $mediaServices
     */
    function __construct(MediaServices $mediaServices)
    {
        $this->mediaServices = $mediaServices;
    }

    /**
     * 이미지 등록
     * @param $category
     * @return mixed
     * @throws ClientErrorException
     * @throws ServiceErrorException
     */
    public function createImage($category): mixed
    {

        return Response::success($this->mediaServices->createImage($category));
    }
}
