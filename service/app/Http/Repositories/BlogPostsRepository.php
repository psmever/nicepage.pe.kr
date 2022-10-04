<?php

namespace App\Http\Repositories;

use App\Models\BlogPosts;
use Illuminate\Database\Eloquent\Model;
use App\Http\Repositories\Interfaces\BlogPostRepositoryInterface;

class BlogPostsRepository extends BaseRepository implements BlogPostRepositoryInterface
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param BlogPosts $model
     */
    function __construct(BlogPosts $model)
    {
        parent::__construct($model);

        $this->model = $model;
    }

    /**
     * 슬러그 타이틀
     * @param String $title
     * @return string
     */
    public function getSlugTitle(String $title) : string
    {
        return $this->model->slugify($title);
    }

    /**
     * 포스트 정보
     * @param String $uuid
     * @return Model|null
     */
    public function getInfoByUUID(String $uuid) : ?Model
    {
        return $this->model::where('post_uuid', $uuid)->firstOrFail();
    }

    /**
     * 포스트 에이트 정보
     * @param String $uuid
     * @return Model|null
     */
    public function editbyUUID(String $uuid) : ?Model
    {
        return $this->model::with(['tags'])->where('post_uuid', $uuid)->firstOrFail();
    }
}
