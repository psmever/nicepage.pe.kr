<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BlogPostsThumbs
 *
 * @property int $id
 * @property int $post_id post id.
 * @property int|null $media_file_id media file table id.
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs whereMediaFileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPostsThumbs whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BlogPostsThumbs extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'media_file_id'
    ];
}
