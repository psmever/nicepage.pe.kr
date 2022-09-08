<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Services\MediaServices;
use Response;

class MediaController extends Controller
{
    protected MediaServices $mediaServices;

    function __construct(MediaServices $mediaServices)
    {
        $this->mediaServices = $mediaServices;
    }

    public function createImage($category) {

        return Response::success($this->mediaServices->createImage($category));
    }
}
