<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Photo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facade\Storage;
use Illuminate\Support\Facades\Schema;


class PhotoSubmitApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }
    /**
     * @test
     */
    public function should_ファイルをアップロードできる()
    {
        // S3ではなくテスト用のストレージを使用
        // → storage/framework/testing
        Storage::fake('s3');

        $response = $this->actingAs($this->user)
           ->json('POST', route('photo.create'), [
               // ダミーファイルを作成して送信している
               'photo' => UploadedFile::fake()->image('photo.jpg'),
           ]);
        
        // レスポンスが201(CREATED)であること
        $response->assertStatus(201);

        $photo = Photo::first();

        // 写真のIDが12桁のランダムな文字列であること
        $this->assertRegExp('/^[0-9a-zA-Z-_]{12}$/', $photo->id);

        // DBに挿入されたファイル名のファイルがストレージに保存されていること
        Storage::cloud()->assertExists($photo->filename);
    }
    /** 
     * @test
     */
    public function should_データベースエラーの場合はファイルを保存しない()
    {
        // 乱暴だがこれでDBエラーを起こす
        Schema::drop('photos');

        Storage::fake('s3');

        $response = $this->actingAs($this->user)
           ->json('POST', route('photo.create'), [
               'photo' => UploadedFile::fake()->image('photo.jpg'),
           ]);

        // レスポンスが500(INTERNAL SERVER ERRORであること
        $response->assertStatus(500);

        // ストレージにファイルが保存されていないこと
        $this->assertEquals(0, count(Storage::cloud()->files()));
    }
}
