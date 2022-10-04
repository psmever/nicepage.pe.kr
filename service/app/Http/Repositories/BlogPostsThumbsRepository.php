<?php

namespace App\Http\Repositories;

use App\Models\BlogPostsThumbs;
use Illuminate\Database\Eloquent\Model;

class BlogPostsThumbsRepository extends BaseRepository
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param BlogPostsThumbs $model
     */
    function __construct(BlogPostsThumbs $model)
    {
        parent::__construct($model);

        $this->model = $model;
    }

    /**
     * 삭제 처리.
     * @param Int $postId
     * @return bool
     */
    public function deleteByPostId(Int $postId) : bool
    {
        return $this->model->where('post_id', $postId)->delete();
    }
}
