<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\BlogPosts
 *
 * @property int $id
 * @property int $user_id 사용자 id
 * @property string $post_uuid
 * @property string $category 포스트 thumb 이미지.
 * @property string $slug_title
 * @property string $title
 * @property string $contents
 * @property string $post_publish 게시 유무.
 * @property string $post_active 글 공개 여부.
 * @property int $view_count 뷰 카운트.
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts newQuery()
 * @method static \Illuminate\Database\Query\Builder|BlogPosts onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereContents($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts wherePostActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts wherePostPublish($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts wherePostUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereSlugTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPosts whereViewCount($value)
 * @method static \Illuminate\Database\Query\Builder|BlogPosts withTrashed()
 * @method static \Illuminate\Database\Query\Builder|BlogPosts withoutTrashed()
 * @mixin \Eloquent
 */
class BlogPosts extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',
        'user_id',
        'post_uuid',
        'category',
        'title',
        'slug_title',
        'contents',
        'post_publish',
        'post_active',
        'view_count'
    ];
}
