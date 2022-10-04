<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BlogPostTags
 *
 * @property int $id
 * @property int $post_id post id.
 * @property string|null $tag 테그.
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsTags whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BlogPostsTags extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'tag',
    ];
}
