<?php

namespace Speedcube\Speedcube;

use Backend;
use RainLab\User\Models\User;
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
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'Speedcube',
            'description' => 'A place for speed cubing',
            'author'      => 'Speedcube',
            'icon'        => 'icon-cube'
        ];
    }

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
     * Extend RainLab.User
     * 
     * @return void
     */
    protected function extendRainLabUser()
    {
        // extend the user model
        User::extend(function($model) {
            $model->hasMany['configs'] = 'SpeedCube\SpeedCube\Models\Config';
        });
    }

    /**
     * Register method, called when the plugin is first registered.
     *
     * @return void
     */
    public function register()
    {
        $this->registerConsoleCommand('speedcube.seed', 'Speedcube\Speedcube\Console\SeedCommand');
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
                'order' => 500,
                'permissions' => ['speedcube.speedcube.*'],
                'sideMenu' => [
                    'solves' => [
                        'icon' => 'icon-clock-o',
                        'label' => 'Solves',
                        'permissions' => ['speedcube.speedcube.access_solves'],
                        'url' => Backend::url('speedcube/speedcube/solves'),
                    ],
                ],
                'url' => Backend::url('speedcube/speedcube/solves'),
            ],
        ];
    }

    /**
     * Registers any back-end permissions used by this plugin.
     *
     * @return array
     */
    public function registerPermissions()
    {
        return [
            'speedcube.speedcube.access_solves' => [
                'tab' => 'Speedcube',
                'label' => 'Manage solves'
            ],
        ];
    }

    /**
     * Register scheduled tasks.
     *
     * @return void
     */
    public function registerSchedule($schedule)
    {
        // close abandoned solves once per day
        $schedule
            ->call(function() { Solve::closeAbandoned(); })
            ->daily()
            ->thenPing(env('HB_CLOSE_ABANDONED_SOLVES'));
    }
}
