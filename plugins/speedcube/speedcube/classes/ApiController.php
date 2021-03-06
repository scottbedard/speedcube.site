<?php

namespace Speedcube\Speedcube\Classes;

use Exception;
use Illuminate\Routing\Controller;
use Log;
use October\Rain\Exception\ValidationException;

class ApiController extends Controller
{
    /**
     * Failed.
     *
     * @param Exception $err
     *
     * @return Response
     */
    public function failed($err = null, $message = 'unknown')
    {
        if ($err instanceof Exception) {
            Log::error($err);
        }

        return response([
            'status' => 'failed',
            'error'  => $message,
        ], 500);
    }

    /**
     * Invalid.
     *
     * @param ValidationException $err
     *
     * @return Response
     */
    public function invalid(ValidationException $err)
    {
        return response([
            'status' => 'invalid',
            'errors' => $err->getFields(),
        ], 400);
    }

    /**
     * Success.
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
     * Unauthorized.
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
