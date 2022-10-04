<?php

namespace App\Console\Commands\Dev;

use App\Models\BlogPosts;
use App\Models\BlogPostsThumbs;
use App\Models\BlogPostsTags;
use App\Models\MediaFiles;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Parsedown;

class ProdToDev extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dev:get-blog-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'get prod blog data';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $task = DB::connection('prod_mysql')->table("media_files")->get()->toArray();

        MediaFiles::truncate();
        foreach ($task as $element):
            $getImageSize = getimagesize('https://media.nicepage.pe.kr' . $element->dest_path . '/' . $element->file_name);

            MediaFiles::create([
                'dest_path' => $element->dest_path,
                'file_name' => $element->file_name,
                'original_name' => $element->original_name,
                'width' => $getImageSize[0],
                'height' => $getImageSize[1],
                'file_type' => $element->file_type,
                'file_size' => $element->file_size,
                'file_extension' => $element->file_extension,
                'created_at' => $element->created_at,
                'updated_at' => $element->updated_at,
            ]);
        endforeach;

        // post
        BlogPosts::truncate();
        $task = DB::connection('prod_mysql')->table("posts")->get()->toArray();
        foreach ($task as $element):

            $parsedown = new Parsedown();
            $markdownHtmlContents = $parsedown->text($element->contents_text);

            BlogPosts::create([
                'user_id' => $element->user_id,
                'post_uuid' => $element->post_uuid,
                'category' => 'A05010',
                'title' => $element->title,
                'slug_title' => $element->slug_title,
                'contents' => $element->contents_text,
                'contents_html' => $markdownHtmlContents,
                'post_publish' => $element->post_publish,
                'post_active' => $element->post_active,
                'view_count' => $element->view_count,
                'created_at' => $element->created_at,
                'updated_at' => $element->updated_at
            ]);
        endforeach;

        $task = DB::connection('prod_mysql')->table("section_posts")->get()->toArray();
        foreach ($task as $element):
            $gubun = $element->gubun;

            $category = "";

            $parsedown = new Parsedown();
            $markdownHtmlContents = $parsedown->text($element->contents_text);

            if($gubun == 'S07010') {
                $category = "A05020";
            } else if($gubun == 'S07020') {
                $category = "A05030";
            } else if($gubun == 'S07030') {
                $category = "A05040";
            }

            BlogPosts::create([
                'user_id' => $element->user_id,
                'post_uuid' => $element->post_uuid,
                'category' => $category,
                'title' => $element->title,
                'slug_title' => $element->post_uuid,
                'contents' => $element->contents_text,
                'contents_html' => $markdownHtmlContents,
                'post_publish' => $element->display_flag,
                'post_active' => $element->active,
                'view_count' => $element->view_count,
                'created_at' => $element->created_at,
                'updated_at' => $element->updated_at
            ]);

        endforeach;

        BlogPostsTags::truncate();
        $task = DB::connection('prod_mysql')->table("posts_tags")->get()->toArray();
        foreach ($task as $element):

            BlogPostsTags::create([
                'post_id' => $element->post_id,
                'tag' => $element->tag_id,
                'created_at' => $element->created_at,
                'updated_at' => $element->updated_at
            ]);

        endforeach;


        BlogPostsThumbs::truncate();
        $task = DB::connection('prod_mysql')->table("posts_thumbs")->get()->toArray();
        foreach ($task as $element):

            BlogPostsThumbs::create([
                'post_id' => $element->post_id,
                'media_file_id' => $element->media_file_id,
                'created_at' => $element->created_at,
                'updated_at' => $element->updated_at
            ]);

        endforeach;

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        return 0;
    }
}
