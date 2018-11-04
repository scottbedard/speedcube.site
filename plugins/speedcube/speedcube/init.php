<?php

// camel case endpoints from other plugins
\GivingTeam\Auth\Classes\ApiController::extend(function($controller) {
    $controller->middleware('Speedcube\Speedcube\Http\Middleware\CamelCase');
});