<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;


class CustomTestCase extends TestCase
{
    use WithFaker;

    /**
     * 전체 테이블 리스트.
     *
     * @return array
     */
    public static function getTestTotalTablesList() : array
    {
        return DB::select("SELECT name FROM sqlite_master WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%' UNION ALL SELECT name FROM sqlite_temp_master WHERE type IN ('table', 'view') ORDER BY 1");
    }

    /**
     * 전체 테이블 리스트.
     */
    public static function printTotalTableList() : void
    {
        echo PHP_EOL.PHP_EOL;
        $tables = DB::select("SELECT name FROM sqlite_master WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%' UNION ALL SELECT name FROM sqlite_temp_master WHERE type IN ('table', 'view') ORDER BY 1");

        foreach($tables as $table)
        {
            echo "table-name: ".$table->name.PHP_EOL;
            echo "(".PHP_EOL;
            foreach(DB::getSchemaBuilder()->getColumnListing($table->name) as $columnName) {
                echo "\t".$columnName.PHP_EOL;
            }
            echo ")".PHP_EOL.PHP_EOL;
        }
        echo PHP_EOL;
    }

    /**
     * 해당 테이블 컬럼 리스트.
     * @param string $tableName
     * @return array
     */
    public static function getTableColumnList(string $tableName = "") : array
    {
        return DB::getSchemaBuilder()->getColumnListing($tableName);
    }

    /**
     * Request Header.
     * @return string[]
     */
    public static function defaultRequestHeaders() : array
    {
        return [
            'Request-Client-Type' => '0100010',
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ];
    }

    protected function accessTokenRequestHeader() : array
    {
        $user = User::where('level', config('extract.default.normal_user_level'))->orderBy('id', 'ASC')->first()->toArray();
        $response = $this->withHeaders($this->defaultRequestHeaders())->postjson('/api/v1/auth/login', [
            "email" => $user['email'],
            "password" => 'password'
        ]);

        return [
            'Request-Client-Type' => config('extract.default.front_code'),
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.$response['access_token']
        ];
    }

}
