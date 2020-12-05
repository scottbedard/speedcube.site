<?php

namespace Speedcube\Speedcube;

use Backend;
use Event;
use RainLab\User\Models\Settings as UserSettings;
use RainLab\User\Models\User as UserModel;
use System\Classes\PluginBase;

/**
 * Speedcube Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * @var array Plugin dependencies
     */
    public $require = [
        'RainLab.User',
    ];

    /**
     * Boot method, called right before the request route.
     *
     * @return array
     */
    public function boot()
    {
        $this->extendRainLabUser();
    }

    /**
     * Extend the RainLab.User plugin
     *
     * @return void
     */
    public function extendRainLabUser()
    {
        // configure rainlab.user api
        \Bedard\RainLabUserApi\Classes\ApiController::extend(function($controller) {
            $controller->middleware('Speedcube\Speedcube\Http\Middleware\TransformKeys');
        });

        // extend user model
        UserModel::extend(function ($model) {
            $model->hasMany['activeConfigs'] = [
                'SpeedCube\SpeedCube\Models\Config',
                'scope' => 'isActive',
            ];

            $model->hasMany['configs'] = 'SpeedCube\SpeedCube\Models\Config';
        });

        // disable ui for settings defined in config file
        // these settings are defined in config/rainlab/user/config.php
        Event::listen('backend.form.extendFields', function ($widget) {
            if ($widget->model instanceof UserSettings) {
                $widget->getField('activate_mode')->disabled = true;
                $widget->getField('login_attribute')->disabled = true;
                $widget->getField('require_activation')->disabled = true;
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
        return [
            'speedcube' => [
                'icon' => 'icon-cube',
                'label' => 'Speedcube',
                'order' => 300,
                'permissions' => ['speedcube.speedcube.*'],
                'sideMenu'    => [
                    'solves' => [
                        'icon'        => 'icon-clock-o',
                        'label'       => 'Solves',
                        'permissions' => ['speedcube.speedcube.access_solves'],
                        'url'         => Backend::url('speedcube/speedcube/solves'),
                    ],
                    'configs' => [
                        'icon'        => 'icon-paint-brush',
                        'label'       => 'Configs',
                        'permissions' => ['speedcube.speedcube.access_configs'],
                        'url'         => Backend::url('speedcube/speedcube/configs'),
                    ],
                ],
                'url' => Backend::url('speedcube/speedcube/solves'),
            ],
        ];
    }
}
