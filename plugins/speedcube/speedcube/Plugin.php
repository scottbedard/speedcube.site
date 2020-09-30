<?php

namespace Speedcube\Speedcube;

use Backend;
use Event;
use RainLab\User\Models\Settings as UserSettings;
use System\Classes\PluginBase;

/**
 * Speedcube Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Boot method, called right before the request route.
     *
     * @return array
     */
    public function boot()
    {
        // configure rainlab.user api
        \Bedard\RainLabUserApi\Classes\ApiController::extend(function($controller) {
            $controller->middleware('Speedcube\Speedcube\Http\Middleware\TransformKeys');
        });

        // configure rainlab.user settings
        UserSettings::extend(function($model) {
            $model->bindEvent('model.getAttribute', function($attribute, $value) {
                if ($attribute == 'login_attribute') {
                    return UserSettings::LOGIN_USERNAME;
                }
            });
        });

        Event::listen('backend.form.extendFields', function ($widget) {
            if ($widget->model instanceof UserSettings) {
                $widget->getField('login_attribute')->disabled = true;
            }
        });
    }

    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'icon' => 'icon-cube',
            'name' => 'Speedcube',
        ];
    }

    /**
     * Register method, called when the plugin is first registered.
     *
     * @return void
     */
    public function register()
    {
        $this->registerConsoleCommand('speedcube.reset', 'Speedcube\Speedcube\Console\Reset');
    }

    /**
     * Registers back-end navigation items for this plugin.
     *
     * @return array
     */
    public function registerNavigation()
    {
        return []; // Remove this line to activate

        return [
            'speedcube' => [
                'icon' => 'icon-leaf',
                'label' => 'Speedcube',
                'order' => 500,
                'permissions' => ['speedcube.speedcube.*'],
                'url' => Backend::url('speedcube/speedcube/mycontroller'),
            ],
        ];
    }
}
