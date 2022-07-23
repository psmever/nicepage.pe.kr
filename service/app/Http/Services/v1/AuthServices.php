<?php

namespace App\Http\Services\v1;

use App\Exceptions\ClientErrorException;
use App\Exceptions\ServerErrorException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AuthServices
{
    protected Request $currentRequest;

    function __construct(Request $request) {
        $this->currentRequest = $request;
    }

    /**
     * 토큰 생성.
     * @param String $login_id
     * @param String $login_password
     * @return object
     * @throws ServerErrorException
     */
    public function newToken(String $login_id, String $login_password) : object
    {
        $client = DB::table('oauth_clients')->where('id', 2)->first();

        $payloadObject = [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $login_id,
            'password' => $login_password,
            'scope' => '',
        ];

        $tokenRequest = Request::create('/oauth/token', 'POST', $payloadObject);
        $tokenRequestResult = json_decode(app()->handle($tokenRequest)->getContent());

        if(isset($tokenRequestResult->message) && $tokenRequestResult->message) {
            throw new ServerErrorException($tokenRequestResult->message);
        }

        return $tokenRequestResult;
    }

    /**
     * 로그인 시도
     * @return array
     * @throws ClientErrorException
     * @throws ServerErrorException
     */
    public function attemptLogin() : array
    {

        $validator = Validator::make($this->currentRequest->all(), [
            'email' => 'required|exists:users,email',
            'password' => 'required',
        ],
            [
                'email.required' => __('로그인 이메일을 입력해 주세요.'),
                'email.exists' => __('존재 하지 않는 이메일 입니다.'),
                'password.required' => __('패스워드를 입력해 주세요'),
            ]);

        # 로그인 실패.
        if ($validator->fails()) {
            throw new ClientErrorException($validator->errors()->first());
        }

        # 비밀번호 실패.
        if (!Auth::attempt(['email' => $this->currentRequest->input('email'), 'password' => $this->currentRequest->input('password')])) {

            throw new ClientErrorException(__('비밀 번호를 확인해 주세요.'));
        }

        # 토큰 처리.
        $taskToken = $this->newToken($this->currentRequest->input('email'), $this->currentRequest->input('password'));

        return [
            'access_token' => $taskToken->access_token,
            'refresh_token' => $taskToken->refresh_token
        ];
    }

    /**
     * 로그 아웃 처리.
     * @return void
     */
    public function attemptLogout(): void
    {
        Auth::user()->token()->revoke();
    }

    /**
     * 토큰 사용자 정보.
     * @return \App\Models\User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function loginInfo(): \App\Models\User|\Illuminate\Contracts\Auth\Authenticatable|null
    {
        return Auth::user();
    }

    /**
     * 토큰 새로 고침.
     * @param String $refresh_token
     * @return object
     * @throws ServerErrorException
     */
    public function tokenRefesh(String $refresh_token) : object
    {
        $client = DB::table('oauth_clients')->where('id', 2)->first();

        $payloadObject = [
            'grant_type' => 'refresh_token',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'refresh_token' => $refresh_token,
            'scope' => '',
        ];

        $tokenRequest = Request::create('/oauth/token', 'POST', $payloadObject);
        $tokenRequestResult = json_decode(app()->handle($tokenRequest)->getContent());

        if(isset($tokenRequestResult->message) && $tokenRequestResult->message) {
            throw new ServerErrorException(__('token.required_refresh_token_fail'));
        }

        return $tokenRequestResult;
    }

    /**
     * 토큰 새로 고침 처리.
     * @return array
     * @throws ClientErrorException
     * @throws ServerErrorException
     */
    public function attemptTokenRefresh()
    {
        $validator = Validator::make($this->currentRequest->all(), [
            'refresh_token' => 'required',
        ],
            [
                'refresh_token.required' => __('토큰 정보가 존재 하지 않습니다.'),
            ]);

        if ($validator->fails()) {
            throw new ClientErrorException($validator->errors()->first());
        }

        $taskToken = $this->tokenRefesh($this->currentRequest->input('refresh_token'));

        return [
            'access_token' => $taskToken->access_token,
            'refresh_token' => $taskToken->refresh_token
        ];
    }
}
