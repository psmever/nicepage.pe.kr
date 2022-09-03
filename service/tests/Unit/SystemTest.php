<?php

namespace Tests\Unit;

use App\Exceptions\ClientErrorException;
use Storage;
use Tests\CustomTestCase;

class SystemTest extends CustomTestCase
{

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_마이그레이션_시드_체크()
    {
        $this->assertDatabaseHas('users', [
            'email' => 'admin@site.com',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@test.com',
        ]);
    }

    public function test_클라이언트_정보_체크()
    {
        $this->expectException(ClientErrorException::class);
        $this->expectExceptionMessage(__('default.exception.ClientTypeError'));

        $testHeader = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ];

        $response = $this->withHeaders($testHeader)->json('GET', '/api/system/check-status');
//         $response->dump();
        $response->assertStatus(412);
        $response->assertJsonStructure([
            'error_message'
        ])->assertJsonFragment([
            'error_message' => __('default.exception.ClientTypeError')
        ]);
    }

    public function test_서버상태()
    {
        $response = $this->withHeaders($this->defaultRequestHeaders())->json('GET', '/api/system/check-status');
        $response->assertStatus(204);
    }

    public function test_시스템_공지사항()
    {
        $tmpNoticeMessage = '긴급 공지 사항 테스트입니다.';
        Storage::disk('forlocal')->put('system_notice.txt', $tmpNoticeMessage);
        $response = $this->withHeaders($this->defaultRequestHeaders())->json('GET', '/api/system/check-notice');
        $response->assertOk();
        $response->assertJsonFragment([
            "notice_message" => $tmpNoticeMessage
        ]);
        Storage::disk('forlocal')->delete('system_notice.txt');
    }

    public function test_사이트_기본_데이터() {
        $response = $this->withHeaders($this->defaultRequestHeaders())->json('GET', '/api/system/site-data');
        // $response->dump();
        $response->assertOk();
        $response->assertJsonStructure([
            "codes" => [
                "code_name",
                "code_group"
            ]
        ]);
    }


}
