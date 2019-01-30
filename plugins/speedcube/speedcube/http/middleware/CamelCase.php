<?php

namespace Speedcube\Speedcube\Http\Middleware;

use Closure;
use Speedcube\Speedcube\Classes\Utils;

class CamelCase
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $content = $response->content();

        if (Utils::isJson($content)) {
            $response->setContent(json_encode(Utils::camelCaseKeys(json_decode($content, true))));
        }

        return $response;
    }
}
