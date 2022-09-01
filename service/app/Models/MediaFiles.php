<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MediaFiles extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',
        'dest_path',
        'file_name',
        'original_name',
        'file_type',
        'file_size',
        'file_extension'
    ];
}
