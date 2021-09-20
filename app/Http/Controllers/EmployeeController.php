<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;

class EmployeeController extends Controller
{
    public function index(Request $request){
        $draw = $request->get('draw');
        $start = $request->get("start");
        $rowperpage = $request->get("length"); 
        $search_arr = $request->get('search');
        $searchValue = $search_arr['value'];
        $totalRecords = Employee::select('count(*) as allcount')->count();
        $totalRecordswithFilter = Employee::select('count(*) as allcount')->where('name', 'like', '%' . $searchValue . '%')->count();

        $columnIndex_arr = $request->get('order');
        $columnName_arr = $request->get('columns');
        $order_arr = $request->get('order');
        $search_arr = $request->get('search');
        $columnIndex = $columnIndex_arr[0]['column']; // Column index
        $columnName = $columnName_arr[$columnIndex]['data']; // Column name
        $columnSortOrder = $order_arr[0]['dir']; // asc or desc


        $result =Employee::with('designation')
        ->orderBy($columnName, $columnSortOrder)
        ->where('name', 'like', '%' . $searchValue . '%')
            ->orWhere('email', 'like', '%' . $searchValue . '%')
            ->orWhereHas('designation', function($q) use($searchValue){
                $q->where('name', 'like', '%' . $searchValue . '%');
            })
            ->skip($start)
            ->take($rowperpage)
            ->get();
            // ->orWhere('designation', 'like', '%' . $searchValue . '%')->get();

            //Employee::with('designation')->get()
            
        $response = array(
            "draw" => intval($draw),
            "iTotalRecords" => $totalRecords,
            "iTotalDisplayRecords" => $totalRecordswithFilter,
            "aaData" =>  $result
        );
        return response()
        ->json($response);
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' =>'required',
            'email' => 'required|unique:employees',
            'file' => 'mimes:jpg,jpeg,png|max:2048',
            'designation_id' =>'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $data = $request->all();
        $fileName = time().'.'.$request->file->extension();  
        $request->file->move(storage_path('files/uploads'), $fileName);
        $data['image_path']=$fileName;
        Employee::create($data);
    }
    
    public function update(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'name' =>'required',
            'designation_id' =>'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $validated = $validator->validated();
        Employee::where('id',$id)->update($validated);
    }

    public function destroy($id){
        Employee::where('id',$id)->delete();
    }
}
