<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp;
        
        //テストユーザーの作成
        $this->user = factory(User::class)->create();
    }
    /**
     * @test
     */
    public function shold_ログイン中のユーザーを返却する()
    {
        $response = $this->actingAs($this->user)->json('GET', route('user'));

        $response 
            ->assertStatus(200)
            ->assertJson([
                'name' => $this->user->name,
            ]);
    }
    /**
     * @test
     */
    public function should_ログインされていない場合はから文字を返却する()
    {
        $response = $this->json('GET', route('user'));

        $response->assertStatus(200);
        $this->assertEquals("", $response->content());
    }
}
