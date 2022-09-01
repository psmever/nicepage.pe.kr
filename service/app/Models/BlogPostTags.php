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
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostTags whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BlogPostTags extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'tag',
    ];
}
