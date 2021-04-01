<?php

namespace App\Http\Middleware;

use App\Classes\Utils;
use Closure;
use Illuminate\Http\Request;

class TransformKeys
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $data = $request->all();

        // snake case payload keys
        if (is_array($data)) {
            $request->replace(Utils::snakeKeysRecursive($data));
        }

        $response = $next($request);

        // camel case response keys
        $content = $response->content();

        if (Utils::isJson($content)) {
            $response->setContent(json_encode(Utils::camelKeysRecursive(json_decode($content, true))));
        }

        return $response;
    }
}