<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use DB;

class userController extends Controller {

    public function getEmail(Request $request) {


        $userEmail = DB::table('users')
                ->where('email', $request['email'])
                ->count();

        if ($userEmail == 0) {
            return response()->json(['hasUser' => $userEmail]);
        } else {
            return response()->json(['hasUser' => 1]);
        }
    }

    public function register(Request $request) {
        // $request
        $result = DB::table('users')->insertGetId([
            'email' => $request['email'], 'password' => $request['password'],
            'name' => $request['name'], 'created_at' => date('Y-m-d H:m:s'), 'updated_at' => date('Y-m-d H:m:s')
        ]);

        if ($result) {
            $request->session()->put('name', $request['name']);
            $request->session()->put('email', $request['email']);
            $request->session()->put('ID', $result);

            return response()->json(['register' => true, 'ID' => $result]);
        } else {
            return response()->json(['register' => false]);
        }

        /* 		return inserted id
          $id = DB::table('users')->insertGetId(
          ['email' => 'john@example.com', 'votes' => 0]
          );
         */
          
    }

    public function login(Request $request) {
        $user = DB::table('users')
                        ->where('email', '=', $request['email'])
                        ->where('password', '=', $request['password'])->first();

        $request->session()->put('name', $user->name);
        $request->session()->put('email', $user->email);
        $request->session()->put('ID', $user->id);
        $request->session()->put('img', $user->img_path);

        return response()->json(['user' => $user]);
    }

    public function isAuth(Request $request) {

        $user = $request->session()->get('email');
        if (!empty($user)) {
            return response()->json(['auth' => true]);
        }else{
            return response()->json(['auth' => false]);
        }
    }
    public function logout(Request $request) {
        $request->session()->forget('name');
        $request->session()->forget('email');
        $request->session()->forget('ID');
        return response()->json(['logout' => true]);
    }

}
