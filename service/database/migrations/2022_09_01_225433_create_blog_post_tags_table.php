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
        Schema::create('blog_posts_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('post_id')->nullable(false)->index()->comment('post id.');
            $table->string('tag', 255)->nullable()->comment('테그.');
            $table->timestamps();

            $table->index(['post_id', 'tag']);

            $table->foreign('post_id')->references('id')->on('blog_posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_posts_tags');
    }
};
