<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddCommentApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void 
    {
        parent::setUp();

        // テストユーザーの作成
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_コメントを追加できる()
    {
        factory(Photo::class)->create();
        $photo = Photo::first();

        $content = 'sample content';

        $response->assertStatus(201)
           //  JSONフォーマットが期待通りであること
           ->assertJsonFragment([
               "author" => [
                   "name" =>$this->user->name,
               ],
               "content" => $content,
           ]);
        
           //DBにコメントが一件登録されていること
           $this->assertEquals(1, $comments->count());
           //内容がAPIでリクエストしたものであること
           $this->assertEquals($content, $comment[0]->content);
    }
}
