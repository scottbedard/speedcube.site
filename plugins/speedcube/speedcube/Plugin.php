<?php

namespace Speedcube\Speedcube;

use Backend;
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
