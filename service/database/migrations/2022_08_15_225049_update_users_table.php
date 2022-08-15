<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('uuid', 50)->after('id')->unique()->default('')->comment('사용자 uuid');
            $table->string('type', 6)->after('uuid')->default('A01010')->comment('사용자 타입');
            $table->string('level', 6)->after('type')->default('A02000')->comment('사용자 레벨');
            $table->enum('active', ['Y', 'N'])->after('remember_token')->default('Y')->comment('사용자 상태');
            $table->string('nickname', 50)->after('name')->default('')->comment('사용자 닉네임');

            $table->foreign('type')->references('code_id')->on('codes')->onDelete('cascade');
            $table->foreign('level')->references('code_id')->on('codes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_type_foreign');
            $table->dropForeign('users_level_foreign');

            $table->dropColumn(['uuid', 'type', 'level', 'nickname', 'active']);
        });
    }
};
