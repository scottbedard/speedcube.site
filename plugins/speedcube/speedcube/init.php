
<?php

// camel case rainlab user api
\Vuetober\RainLabUserApi\Classes\ApiController::extend(function($controller) {
    $controller->middleware('Speedcube\Speedcube\Http\Middleware\CamelCase');
});