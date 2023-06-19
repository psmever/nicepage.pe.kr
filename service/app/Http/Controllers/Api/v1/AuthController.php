<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Services\AuthServices;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    /**
     * @var AuthServices
     */
    protected AuthServices $authServices;

    /**
     * @param AuthServices $authServices
     */
    function __construct(AuthServices $authServices)
    {
        $this->authServices = $authServices;
    }

    /**
     * 로그인 시도.
     * @return mixed
     * @throws \App\Exceptions\ClientErrorException
     * @throws \App\Exceptions\ServerErrorException
     */
    public function login(): mixed
    {
        return Response::success($this->authServices->attemptLogin());
    }

    /**
     * 로그아웃
     * @return mixed
     */
    public function logout(): mixed
    {
        $this->authServices->attemptLogout();
        return Response::success_no_content();
    }

    /**
     * 로그인 사용자 정보.
     * @return mixed
     */
    public function loginInfo(): mixed
    {
        return Response::success($this->authServices->loginInfo());
    }

    /**
     * 토큰 새로 고침.
     * @return mixed
     * @throws \App\Exceptions\ClientErrorException
     * @throws \App\Exceptions\ServerErrorException
     */
    public function tokenRefresh(): mixed
    {
        return Response::success($this->authServices->attemptTokenRefresh());
    }

    public function tokenInfo(): mixed
    {
        return Response::success($this->authServices->attemptTokenInfo());
    }
}
