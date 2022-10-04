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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(false)->comment('사용자 id');
            $table->string('post_uuid')->nullable(false)->unique();
            $table->string('category', 6)->default('A05010')->comment('포스트 thumb 이미지.');
            $table->string('slug_title')->nullable(false)->unique();
            $table->string('title')->nullable(false);
            $table->longText('contents')->nullable(false);
            $table->longText('contents_html')->nullable(false);
            $table->enum('post_publish', ['Y', 'N'])->default('N')->comment('게시 유무.');
            $table->enum('post_active', ['Y', 'N'])->default('Y')->comment('글 공개 여부.');
            $table->unsignedBigInteger('view_count')->default(0)->comment('뷰 카운트.');


            $table->timestamps();
            $table->softDeletes();

            $table->index(['slug_title', 'user_id']);
            $table->foreign('category')->references('code_id')->on('codes')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_posts');
    }
};
