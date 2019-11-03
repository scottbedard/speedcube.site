
<?php

// camel case rainlab user api
\Bedard\RainLabUserApi\Classes\ApiController::extend(function($controller) {
    $controller->middleware('Speedcube\Speedcube\Http\Middleware\CamelCase');
});