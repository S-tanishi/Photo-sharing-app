<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegisterController extends Controller
{
    protected function registered(Request $request, $user)
    {
        return $user;
    }
}
