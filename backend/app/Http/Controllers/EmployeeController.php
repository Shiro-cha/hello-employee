<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all employees from the database
        $employees = Employee::all();
        
        // Return them as JSON response
        return response()->json($employees);
    }

    /**
     * Show the form for creating a new resource.
     * (This is usually used for showing a form in the frontend, but we won't use it in the API)
     */
    public function create()
    {
        // Not needed for an API, this is for displaying a form on the frontend
        return response()->json(["message" => "Not used in API"]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'fullName' => 'required|string|unique:employees,fullName|max:255',
            'dateOfBirth' => 'required|date',
        ]);

        $employee = Employee::create($validatedData);
        return response()->json($employee, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return response()->json($employee);
    }

    /**
     * Show the form for editing the specified resource.
     * (This is usually used for showing a form in the frontend, but we won't use it in the API)
     */
    public function edit(Employee $employee)
    {
        // Not used for API
        return response()->json(["message" => "Not used in API"]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
{
    // Validate incoming request data
    $validatedData = $request->validate([
        'fullName' => 'required|string|unique:employees,fullName|max:255',
        'dateOfBirth' => 'required|date',
    ]);

    // Debugging: Dump validated data
    #dd($validatedData,$employee);

    // Update the employee with the validated data
    $employee->update($validatedData);

    // Return the updated employee as JSON response
    return response()->json($employee);
}

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        // Delete the employee
        $employee->delete();

        // Return a success message
        return response()->json(["message" => "Employee deleted successfully"]);
    }
}
