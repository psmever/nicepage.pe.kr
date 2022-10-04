<?php

namespace App\Http\Services;

use App\Exceptions\ClientErrorException;
use App\Exceptions\ServiceErrorException;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Storage;
use Validator;
use Illuminate\Support\Str;
use App\Http\Repositories\MediaFilesRepository;

class MediaServices
{
    /**
     * @var Request
     */
    protected Request $currentRequest;

    /**
     * @var MediaFilesRepository
     */
    protected MediaFilesRepository $mediaFilesRepository;

    /**
     * @param Request $currentRequest
     * @param MediaFilesRepository $mediaFilesRepository
     */
    function __construct(Request $currentRequest, MediaFilesRepository $mediaFilesRepository)
    {
        $this->currentRequest = $currentRequest;
        $this->mediaFilesRepository = $mediaFilesRepository;
    }

    /**
     * 이미지 등록
     * @param $category
     * @return string[]
     * @throws ClientErrorException
     * @throws ServiceErrorException
     */
    public function createImage($category) : array
    {
        $request = $this->currentRequest;

        if (!$request->hasFile('image')) {
            throw new ClientErrorException("이미지 정보가 존재 하지 않습니다. (code: 001)");
        }

        if(!$request->file('image')->isValid()) {
            throw new ClientErrorException("이미지 정보가 존재 하지 않습니다. (code: 002)");
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
        ],
            [
                'image.required' => '이미지 정보가 존재 하지 않습니다. (code: 003)',
                'image.image' => '이미지 정보가 존재 하지 않습니다. (code: 004)',
                'image.mimes' => "업로드 가능한 이미지가 아닙니다.",
                'image.max' => "이미지 용량이 너무 큽니다.",
            ]);

        if( $validator->fails() ) {
            throw new ClientErrorException($validator->errors()->first());
        }

        $imageExtension = $request->image->extension();

        $uploadImage = Image::make($request->file('image'));
        $getImageSize = getimagesize($uploadImage->basePath());

        $uploadFullFileName = Str::uuid() . '.' . $imageExtension;

        $targetDirectory = "blog/" . date("Y/m/d");

        if(!Storage::disk('media-server')->putFileAs($targetDirectory, $request->file('image'), $uploadFullFileName)) {
            throw new ServiceErrorException('처리중 문제가 발생했습니다.');
        }

        // TODO : 이미지 리사이징 처리.
        $this->mediaFilesRepository->create([
            'dest_path' => '/storage/' . $targetDirectory,
            'file_name' => $uploadFullFileName,
            'original_name' => $request->image->getClientOriginalName(),
            'width' => $uploadImage->width(),
            'height' => $uploadImage->height(),
            'file_type' => $getImageSize['mime'],
            'file_size' => $uploadImage->filesize(),
            'file_extension' => $request->image->extension()
        ]);

        return [
            'media_url' => env('MEDIA_SERVER_URL') . '/storage/' . $targetDirectory . '/' . $uploadFullFileName,
            'width' => $uploadImage->width(),
            'height' => $uploadImage->height(),
        ];
    }
}
