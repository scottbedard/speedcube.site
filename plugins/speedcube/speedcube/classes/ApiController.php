<?php

namespace Speedcube\Speedcube\Classes;

use App;
use Exception;
use Illuminate\Routing\Controller;
use Log;
use October\Rain\Exception\ValidationException;

class ApiController extends Controller
{
    /**
     * Failed
     * 
     * @param  Exception $err
     * @return Response
     */
    public function failed($err)
    {
        Log::error($err);

        if ($err instanceof Exception) {
            return response([
                'status' => 'failed',
                'error' => $err->getMessage(),
            ], 500);
        }

        return response([
            'status' => 'failed',
            'error' => $err,
        ], 500);
    }

    /**
     * Invalid
     *
     * @param  ValidationException  $err
     * @return Response
     */
    public function invalid(ValidationException $err)
    {
        return response([
            'status' => 'invalid',
            'errors' => $e->getFields(),
        ], 400);
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
