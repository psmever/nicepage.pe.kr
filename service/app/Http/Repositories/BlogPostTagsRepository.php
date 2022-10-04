<?php

namespace App\Http\Repositories;

use App\Models\BlogPostsTags;
use Illuminate\Database\Eloquent\Model;

class BlogPostTagsRepository extends BaseRepository
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param BlogPostsTags $model
     */
    function __construct(BlogPostsTags $model)
    {
        parent::__construct($model);

        $this->model = $model;
    }

    /**
     * 삭제 처리.
     * @param Int $postId
     * @return Model|null
     * @throws \Throwable
     */
    public function deleteByPostId(Int $postId) : ?Model
    {
        return $this->model->where('post_id', $postId)->deleteOrFail();
    }
}
