<?php

namespace App\Http\Repositories;

use App\Models\MediaFiles;
use Illuminate\Database\Eloquent\Model;

class MediaFilesRepository extends BaseRepository
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param MediaFiles $model
     */
    function __construct(MediaFiles $model)
    {
        parent::__construct($model);

        $this->model = $model;
    }

    /**
     * 파일명으로 id 값
     * @param string $fileName
     * @return Model|null
     */
    public function getIndexbyFileName(string $fileName): ?Model
    {
        return $this->model::select('id')->where('file_name', $fileName)->firstOrFail();
    }
}
