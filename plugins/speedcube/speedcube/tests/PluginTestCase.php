<?php

namespace Speedcube\Speedcube\Tests;

use App;
use Auth;
use Illuminate\Foundation\AliasLoader;
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

        // register the Auth facade in our test environment
        // @todo: figure out why RainLab.User isn't doing this for us
        $alias = AliasLoader::getInstance();
        $alias->alias('Auth', 'RainLab\User\Facades\Auth');

        App::singleton('user.auth', function() {
            return \RainLab\User\Classes\AuthManager::instance();
        });

        // always start from a logged out state
        Auth::logout();
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