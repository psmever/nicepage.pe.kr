<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Codes;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CodesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_ENV') != "testing") {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            Codes::truncate();
        }

        $arrayGroupCodesList = $this->initGroupCodesList();
        $arrayCodesList = $this->initCodesList();

        foreach ($arrayGroupCodesList as $element) :
            $group_id = trim($element['group_id']);
            $group_name = trim($element['group_name']);

            DB::table('codes')->insert([
                'group_id' => $group_id,
                'group_name' => $group_name,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            foreach($arrayCodesList[$group_id] as $element_code):

                $code_id = trim($element_code['code_id']);
                $code_name = trim($element_code['code_name']);

                $endCodeid = $group_id.$code_id;

                DB::table('codes')->insert([
                    'group_id' => $group_id,
                    'group_name' => NULL,
                    'code_id' => $endCodeid,
                    'code_name' => $code_name,
                    'active' => 'Y',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);

            endforeach;
        endforeach;

        if (env('APP_ENV') != "testing") {
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
        }
    }

    /**
     * 그룹 코드 리스트
     * @return array
     */
    public function initGroupCodesList(): array
    {
        return [
            [ 'group_id' => 'A01', 'group_name' => '클라이언트 타입' ],
            [ 'group_id' => 'A02', 'group_name' => '사용자 레벨' ],
            [ 'group_id' => 'A03', 'group_name' => '사용자 상태' ],
            [ 'group_id' => 'A04', 'group_name' => '상태' ],
            [ 'group_id' => 'A05', 'group_name' => '섹션 포스트 구분' ],
        ];
    }


    /**
     * 코드 리스트
     * @return array
     */
    public function initCodesList(): array
    {
        return [
            'A01' => [
                [ 'code_id' => '010', 'code_name' => 'Front' ],
                [ 'code_id' => '020', 'code_name' => 'iOS' ],
                [ 'code_id' => '030', 'code_name' => 'Android' ],
            ],
            'A02' => [
                [ 'code_id' => '000', 'code_name' => 'Guest' ],
                [ 'code_id' => '010', 'code_name' => '사용자' ],
                [ 'code_id' => '900', 'code_name' => '관리자' ],
                [ 'code_id' => '999', 'code_name' => '최고 관리자' ],
            ],
            'A03' => [
                [ 'code_id' => '000', 'code_name' => '비활성' ],
                [ 'code_id' => '010', 'code_name' => '활성' ],
            ],
            'A04' => [
                [ 'code_id' => '000', 'code_name' => '비사용' ],
                [ 'code_id' => '010', 'code_name' => '사용' ],
            ],
            'A05' => [
                [ 'code_id' => '010', 'code_name' => '끄적끄적' ],
                [ 'code_id' => '020', 'code_name' => '블러그 소개' ],
                [ 'code_id' => '030', 'code_name' => '주인장은' ],
            ]
        ];
    }
}
