<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;

class AuthenticationException extends Exception
{
    /**
     * Customize the exception's render method to return a 401 response.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function render(Request $request)
    {
        // Check if the request expects JSON (for API requests)
        if ($request->expectsJson()) {
            // Return a 401 Unauthorized response with a custom error message
            return response()->json([
                'error' => 'Unauthenticated'
            ], 401);
        }

        // Default behavior if the request is not an API request (redirect to login page)
        return response()->json([
            'error' => 'Unauthenticated'
        ], 401); // For non-API requests, you can also send a 401 response
    }
}
