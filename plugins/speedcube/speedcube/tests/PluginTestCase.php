<?php

namespace Speedcube\Speedcube\Tests;

use PluginTestCase as BasePluginTestCase;
use System\Classes\PluginManager;

abstract class PluginTestCase extends BasePluginTestCase
{
    /**
     * @var array Plugins to refresh between tests.
     */
    protected $refreshPlugins = [
        'RainLab.User',
        'Speedcube.Speedcube',
    ];

    /**
     * Perform test case set up.
     *
     * @return void
     */
    public function setUp() : void
    {
        parent::setUp();

        $pluginManager = PluginManager::instance();
        $pluginManager->registerAll(true);
        $pluginManager->bootAll(true);
    }

    /**
     * Perform tear down.
     *
     * @return void
     */
    public function tearDown() : void
    {
        parent::tearDown();

        $pluginManager = PluginManager::instance();
        $pluginManager->unregisterAll();
    }
}