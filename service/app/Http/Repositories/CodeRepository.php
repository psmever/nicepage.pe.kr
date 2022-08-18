<?php

namespace App\Http\Repositories;

use App\Models\Codes;
use Illuminate\Database\Eloquent\Model;
use App\Http\Repositories\Interfaces\CodesRepositoryInterface;

class CodeRepository extends BaseRepository implements CodesRepositoryInterface
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param Codes $model
     */
    function __construct(Codes $model)
    {
        parent::__construct($model);

        $this->model = $model;
    }
}
