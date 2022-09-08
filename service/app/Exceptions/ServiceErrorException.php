<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Response;

/**
 * 정상 이지만 에러 메시지를 보낼 경우.
 */
class ServiceErrorException extends Exception
{
    /**
     * @var string
     */
    protected string $errorMessage;

    /**
     * @var Int
     */
    protected Int $errorCode;

    /**
     * @param string $errorMessage
     * @param Int $errorCode
     */
    public function __construct(string $errorMessage, Int $errorCode = 500)
    {
        parent::__construct($errorMessage, $errorCode);

        $this->errorMessage = $errorMessage;
        $this->errorCode = $errorCode;
    }

    /**
     * @param $request
     * @return mixed
     */
    public function render($request): mixed
    {
        return Response::error($this->errorCode, $this->errorMessage);
    }
}
