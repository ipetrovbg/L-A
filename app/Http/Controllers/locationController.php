<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use DB;

class locationController extends Controller
{
   public function getUserLocations(Request $request){

   		$userLocations = DB::table('locations')
                ->where('user_id', $request->session()->get('ID'))->get();

                return response()->json(['locations' => $userLocations]);        
   }
   
   public function insertLocation(Request $request){

	    $result = DB::table('locations')->insert([
	        'title' => $request['t'], 'latitude' => $request['la'],
	        'longitude' => $request['lo'], 'content' => $request['c'],
	         'user_id' => $request->session()->get('ID')
	    ]);

	    if ($result) {
	    	return response()->json(['isInserted' => $result]);
	    }
		
   }
}
