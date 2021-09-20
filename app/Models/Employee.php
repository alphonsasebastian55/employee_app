<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Designation;


class Employee extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'image_path', 'designation_id'];
    public function designation(){
        return $this->belongsTo(Designation::class);
    }
}
