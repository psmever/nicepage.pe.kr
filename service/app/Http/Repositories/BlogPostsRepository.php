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
        return $this->model::with(['tagMany'])->where('post_uuid', $uuid)->firstOrFail();
    }

    public function postsListbyCategory(string $category = 'A05010', Int $PAGEING_COUNT = 0, Int $page)
    {
        return $this->model::where('category', $category)
            ->where([['post_active', 'Y'], ['post_publish', 'Y']])
            ->with(['userOne.typeOne', 'userOne.levelOne', 'thumbOne.fileOne', 'tagMany'])
            ->orderBy('updated_at', 'Desc')
            ->orderBy('id', 'Desc')
            ->simplePaginate($PAGEING_COUNT, ['*'], 'page', $page);
    }
}
