<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPostTags extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'tag',
    ];
}
