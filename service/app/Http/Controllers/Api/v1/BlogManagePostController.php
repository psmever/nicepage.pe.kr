<?php

namespace App\Http\Controllers\Api\v1;

use App\Exceptions\ClientErrorException;
use App\Http\Controllers\Controller;
use App\Http\Services\BlogPostServices;
use Response;

class BlogManagePostController extends Controller
{
    /**
     * @var BlogPostServices
     */
    protected BlogPostServices $blogPostServices;

    /**
     * @param BlogPostServices $blogPostServices
     */
    function __construct(BlogPostServices $blogPostServices)
    {
        $this->blogPostServices = $blogPostServices;
    }

    /**
     * @param string $category
     * @return mixed
     * @throws ClientErrorException|\App\Exceptions\ServiceErrorException
     */
    public function create(String $category): mixed
    {
        return Response::success($this->blogPostServices->create($category));
    }

    /**
     * @param string $uuid
     * @return mixed
     * @throws ClientErrorException|\Throwable
     */
    public function update(String $uuid): mixed
    {
        return Response::success($this->blogPostServices->update($uuid));
    }

    /**
     * @param String $uuid
     * @return mixed
     */
    public function edit(String $uuid): mixed
    {
        return Response::success($this->blogPostServices->edit($uuid));
    }
}
