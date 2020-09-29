<?php

namespace Speedcube\Speedcube\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Speedcube\Speedcube\Classes\Util;

class TransformKeys
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $data = $request->all();

        // snake case payload keys
        if (is_array($data)) {
            $request->replace(Util::snakeCaseKeysRecursive($data));
        }

        $response = $next($request);

        // camel case response keys
        $content = $response->content();

        if (Util::isJson($content)) {
            $response->setContent(json_encode(Util::camelCaseKeysRecursive(json_decode($content, true))));
        }

        return $response;
    }
}