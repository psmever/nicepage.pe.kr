<?php

namespace App\Http\Services;

use App\Exceptions\ClientErrorException;
use App\Exceptions\ServiceErrorException;
use Illuminate\Http\Request;
use Storage;
use Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class MediaServices
{
    protected Request $currentRequest;
    /**
     *
     */
    function __construct(Request $currentRequest)
    {
        $this->currentRequest = $currentRequest;
    }

    public function createImage()
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

        $uploadFullFileName = Str::uuid() . '.' . $imageExtension;

        Storage::putFileAs('blog/tmp_images/', $request->file('image'), $uploadFullFileName);

        $photo = fopen(storage_path('app/blog/tmp_images' . '/' . $uploadFullFileName), 'r');

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Client-Token' => env('MEDIA_IMAGE_UPLOAD_TOKEN')
        ])
            ->attach('media_file', $photo)
            ->post(env('MEDIA_UPLOAD_API_URL'), [
                'media_category' => 'blog',
            ]);

        Storage::delete('blog/tmp_images/' . $uploadFullFileName);

        if(!$response->successful()) {
            $result = $response->json();
            throw new ServiceErrorException($result['message']);
        }

        $result = json_decode($response->body())->data;





        return [];
    }

}
