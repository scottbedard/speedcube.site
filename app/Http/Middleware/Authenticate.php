<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class Authenticate
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) {
            abort(401, 'Unauthorized');
        }

        return $next($request);
    }
}
