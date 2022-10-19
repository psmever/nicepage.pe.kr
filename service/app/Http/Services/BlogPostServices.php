<?php

namespace App\Http\Services;

use App\Exceptions\ServiceErrorException;
use App\Http\Repositories\BlogPostsRepository;
use App\Http\Repositories\BlogPostTagsRepository;
use App\Http\Repositories\MediaFilesRepository;
use App\Http\Repositories\BlogPostsThumbsRepository;
use App\Exceptions\ClientErrorException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Auth;
use Parsedown;
use Str;
use Validator;
use ShareClass;

class BlogPostServices
{
    /**
     * @var Request
     */
    protected Request $currentRequest;

    /**
     * @var BlogPostsRepository
     */
    protected BlogPostsRepository $blogPostsRepository;

    /**
     * @var BlogPostTagsRepository
     */
    protected BlogPostTagsRepository $blogPostTagsRepository;

    /**
     * @var MediaFilesRepository
     */
    protected MediaFilesRepository $mediaFilesRepository;

    /**
     * @var BlogPostsThumbsRepository
     */
    protected BlogPostsThumbsRepository $blogPostsThumbsRepository;

    /**
     * @param Request $currentRequest
     * @param BlogPostsRepository $blogPostsRepository
     * @param BlogPostTagsRepository $blogPostTagsRepository
     * @param MediaFilesRepository $mediaFilesRepository
     * @param BlogPostsThumbsRepository $blogPostsThumbsRepository
     */
    function __construct(Request $currentRequest, BlogPostsRepository $blogPostsRepository, BlogPostTagsRepository $blogPostTagsRepository, MediaFilesRepository $mediaFilesRepository, BlogPostsThumbsRepository $blogPostsThumbsRepository)
    {
        $this->currentRequest = $currentRequest;
        $this->blogPostsRepository = $blogPostsRepository;
        $this->blogPostTagsRepository = $blogPostTagsRepository;
        $this->mediaFilesRepository = $mediaFilesRepository;
        $this->blogPostsThumbsRepository = $blogPostsThumbsRepository;
    }

    /**
     * @param $category
     * @return array
     * @throws ClientErrorException|ServiceErrorException
     */
    public function create($category) : array
    {
        $request = $this->currentRequest;
        $user_id = Auth::user()->id;

        // 벨리데이션.
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'tags' => 'required|array|min:1',
            'tags.*' => 'required',
            'contents' => 'required|string|min:1',
        ],
            [
                'title.required'=> __('제목을 입력해 주세요.'),
                'tags.required'=> __('테그를 입력해 주세요.'),
                'tags.*'=> __('테그를 입력해 주세요.'),
                'contents.required'=> __('내용을 입력해 주세요.'),
            ]);

        //$validator->passes()
        if( $validator->fails() ) {
            throw new ClientErrorException($validator->errors()->first());
        }

        // 마크다운 -> html 변경
        $parsedown = new Parsedown();
        $markdownHtmlContents = $parsedown->text($request->input('contents'));

        // 썸네일 확인
        $thumbnailFileName = ShareClass::getThumbnailInContents($markdownHtmlContents);
        if($thumbnailFileName) {
            $taskMediaIndex = $this->mediaFilesRepository->getIndexbyFileName($thumbnailFileName);
            if(!$taskMediaIndex) {
                throw new ServiceErrorException('썸네일 이미지가 존재 하지 않습니다.');
            }
        }

        // 포스트 등록
        $postTask = $this->blogPostsRepository->create([
            'user_id' => $user_id,
            'post_uuid' => Str::uuid(),
            'category' => $category,
            'title' => $request->input('title'),
            'slug_title' => $this->blogPostsRepository->getSlugTitle($request->input('title')),
            'contents' => $request->input('contents'),
            'contents_html' => $markdownHtmlContents
        ]);

        // 테그 등록
        foreach($request->input('tags') as $element) :
            $this->blogPostTagsRepository->create([
                'post_id' => $postTask->id,
                'tag' => $element,
            ]);
        endforeach;

        // 썸네일 등록
        if($thumbnailFileName && $taskMediaIndex) {
            $this->blogPostsThumbsRepository->create([
                'post_id' => $postTask->id,
                'media_file_id' => $taskMediaIndex->id
            ]);
        }

        // 등록 정보.
        $postsData = $this->blogPostsRepository->getInfoByUUID($postTask->post_uuid);

        return [
            'post_uuid' => $postsData->post_uuid
        ];
    }

    /**
     * 포스트 내용 수정
     * @param string $uuid
     * @return array
     * @throws ClientErrorException
     * @throws \Throwable
     */
    public function update(string $uuid) : array
    {
        $request = $this->currentRequest;

        $postData = $this->blogPostsRepository->findOnlyByUUID('post_uuid', $uuid);


        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'tags' => 'required|array|min:1',
            'tags.*' => 'required',
            'contents' => 'required|string|min:1',
        ],
            [
                'title.required'=> __('제목을 입력해 주세요.'),
                'tags.required'=> __('테그를 입력해 주세요.'),
                'tags.*'=> __('테그를 입력해 주세요.'),
                'contents.required'=> __('내용을 입력해 주세요.'),
            ]);

        //$validator->passes()
        if( $validator->fails() ) {
            throw new ClientErrorException($validator->errors()->first());
        }

        $parsedown = new Parsedown();
        $markdownHtmlContents = $parsedown->text($request->input('contents'));

        // 썸네일 확인
        $thumbnailFileName = ShareClass::getThumbnailInContents($markdownHtmlContents);
        if($thumbnailFileName) {
            $taskMediaIndex = $this->mediaFilesRepository->getIndexbyFileName($thumbnailFileName);
            if(!$taskMediaIndex) {
                throw new ServiceErrorException('썸네일 이미지가 존재 하지 않습니다.');
            }
        }

        // 슬러그 타이틀 업데이트.
        $slug_title = strcmp($request->input('title'), $postData->title) !== 0 ? $this->blogPostsRepository->getSlugTitle($request->input('title')) : $postData->slug_title;

        $this->blogPostsRepository->update($postData->id, [
            'title' => $request->input('title'),
            'slug_title' => $slug_title,
            'contents_text' => $request->input('contents'),
            'contents_html' => $markdownHtmlContents,
        ]);

        // 테그 추가.
        $this->blogPostTagsRepository->deleteByPostId($postData->id); // 기존 테그 삭제.
        foreach($request->input('tags') as $element) :
            $this->blogPostTagsRepository->create([
                'post_id' => $postData->id,
                'tag' => $element,
            ]);
        endforeach;

        // 썸네일 등록
        if($thumbnailFileName && $taskMediaIndex) {
            $this->blogPostsThumbsRepository->deleteByPostId($postData->id); // 기존 썸네일 삭제.
            $this->blogPostsThumbsRepository->create([
                'post_id' => $postData->id,
                'media_file_id' => $taskMediaIndex->id
            ]);
        }

        $postTask = $this->blogPostsRepository->editbyUUID($uuid);
        return [
            'title' => $postTask->title,
            'category' => $postTask->category,
            'tags' => array_map(function($e){
                return $e['tag'];
            }, $postTask->tags->toarray()),
            'contents' => $postTask->contents,
        ];
    }

    /**
     * 포스트 에디트.
     * @param String $uuid
     * @return array
     */
    public function edit(String $uuid) : array
    {
        $postTask = $this->blogPostsRepository->editbyUUID($uuid);
        return [
            'title' => $postTask->title,
            'category' => $postTask->category,
            'tags' => array_map(function($e){
                return $e['tag'];
            }, $postTask->tags->toarray()),
            'contents' => $postTask->contents,
        ];
    }
}
