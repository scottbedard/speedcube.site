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
     * Register method, called when the plugin is first registered.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Boot method, called right before the request route.
     *
     * @return array
     */
    public function boot()
    {

    }

    /**
     * Registers any back-end permissions used by this plugin.
     *
     * @return array
     */
    public function registerPermissions()
    {
        return [
            // 'speedcube.speedcube.some_permission' => [
            //     'tab' => 'Speedcube',
            //     'label' => 'Some permission'
            // ],
        ];
    }

    /**
     * Registers back-end navigation items for this plugin.
     *
     * @return array
     */
    public function registerNavigation()
    {
        return [
            // 'speedcube' => [
            //     'label'       => 'Speedcube',
            //     'url'         => Backend::url('speedcube/speedcube/mycontroller'),
            //     'icon'        => 'icon-leaf',
            //     'permissions' => ['speedcube.speedcube.*'],
            //     'order'       => 500,
            // ],
        ];
    }
}
