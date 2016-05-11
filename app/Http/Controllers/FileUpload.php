<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\User;
use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use DB;

class FileUpload extends Controller
{
    public function upload(Request $request){
    	$realfiles = Input::file('file');
    	$ext = $realfiles->getClientOriginalExtension();

    	$resp = Storage::disk('local')->put(time() . '-user-' . $request->session()->get('ID') . '.' .$ext, File::get($realfiles));

    	if($resp){    	

    		$dbResp = DB::table('users')
            ->where('id', $user = $request->session()->get('ID'))
            ->update(['img_path' => time() . '-user-' . $request->session()->get('ID') . '.' .$ext]);
            if($dbResp){
            	return response()->json(array('upload'=> $resp), 200);
            }

    	 	
    	}
    }
}
