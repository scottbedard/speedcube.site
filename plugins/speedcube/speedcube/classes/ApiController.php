<?php

namespace Speedcube\Speedcube\Classes;

use Exception;
use Illuminate\Routing\Controller;
use Log;

class ApiController extends Controller
{
    /**
     * Failed
     * 
     * @param  Exception $err
     * @return Response
     */
    public function failed(Exception $err)
    {
        Log::error($err);

        return response([
            'status' => 'failed',
            'error' => $err->getMessage(),
        ], 500);
    }

    /**
     * Success
     *
     * @return Response
     */
    public function success(array $data = [])
    {
        return response(array_merge([
            'status' => 'success',
        ], $data), 200);
    }

    /**
     * Unauthorized
     * 
     * @return Response
     */
    public function unauthorized(array $data = []) 
    {
        return response(array_merge([
            'status' => 'unauthorized',
        ], $data), 403);
    }
}
