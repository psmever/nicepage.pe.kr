<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Services\BlogPostServices;
use Illuminate\Http\Request;
use Response;

class BlogPostController extends Controller
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

    public function index(Int $pageCount, Int $page)
    {
        return Response::success($this->blogPostServices->postList($pageCount, $page));
    }
}
