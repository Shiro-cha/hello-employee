<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
   protected $table = 'employees';

   protected $primaryKey = 'idEmployee';

   protected $fillable = [
    'fullName', 'dateOfBirth',
   ];

   public $timestamps = false;
}
