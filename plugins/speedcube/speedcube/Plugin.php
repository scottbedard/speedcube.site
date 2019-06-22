<?php

namespace Speedcube\Speedcube;

use App;
use Backend;
use Event;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Notifications\NotificationServiceProvider;
use Illuminate\Support\Facades\Notification;
use NotificationChannels\Twitter\TwitterServiceProvider;
use RainLab\User\Controllers\Users as UsersController;
use RainLab\User\Models\User as UserModel;
use Speedcube\Speedcube\Models\Profile;
use Speedcube\Speedcube\Models\Solve;
use System\Classes\PluginBase;

/**
 * Speedcube Plugin Information File.
 */
class Plugin extends PluginBase
{
    /**
     * @var array Plugin dependencies
     */
    public $require = [
        'October.Drivers',
        'RainLab.Blog',
        'RainLab.GoogleAnalytics',
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
            'icon'        => 'icon-cube',
        ];
    }

    /**
     * Boot method, called right before the request route.
     *
     * @return array
     */
    public function boot()
    {
        $this->bootPackages();
        $this->extendRainLabUser();
    }

    /**
     * Register service providers and aliases.
     *
     * @return void
     */
    protected function bootPackages()
    {
        App::register(NotificationServiceProvider::class);
        App::register(TwitterServiceProvider::class);

        $alias = AliasLoader::getInstance();
        $alias->alias('Notification', Notification::class);
    }

    /**
     * Extend RainLab.User.
     *
     * @return void
     */
    protected function extendRainLabUser()
    {
        // eager load necessary relationships. this lets us
        // attach the relationships to the user requests
        // on startup, when the user signs in, etc...
        Event::listen('vuetober.rainlabuserapi.afterGetUser', function ($user) {
            $user->load([
                'avatar',
                'configs',
                'keyboardConfigs',
                'profile',
            ]);
        });

        // extend the user model
        UserModel::extend(function ($model) {
            // relationships
            $model->hasMany['configs'] = 'SpeedCube\SpeedCube\Models\Config';
            $model->hasMany['keyboardConfigs'] = 'Speedcube\Speedcube\Models\KeyboardConfig';
            $model->hasMany['recordAverages'] = 'Speedcube\Speedcube\Models\PersonalRecordAverage';
            $model->hasMany['records'] = 'Speedcube\Speedcube\Models\PersonalRecord';
            $model->hasMany['solves'] = 'Speedcube\Speedcube\Models\Solve';
            $model->hasOne['profile'] = 'Speedcube\Speedcube\Models\Profile';
            $model->morphMany['comments'] = [
                'Speedcube\Speedcube\Models\Comment',
                'name' => 'commentable',
            ];

            // create a profile when a user registers
            $model->bindEvent('model.afterCreate', function () use ($model) {
                Profile::create(['user_id' => $model->id]);
            });

            // delete profile when the user is deleted
            $model->bindEvent('model.afterDelete', function () use ($model) {
                $model->profile()->delete();
            });

            // prevent weird characters from being part of usernames
            $model->bindEvent('model.beforeValidate', function () use ($model) {
                $model->rules['username'] = $model->rules['username'].'|alpha_num';
            });
        });

        // extend the users controller with the relation controller behavior and config
        UsersController::extend(function ($controller) {
            if (!$controller->isClassExtendedWith('Backend.Behaviors.RelationController')) {
                $controller->implement[] = 'Backend.Behaviors.RelationController';
            }

            if (!isset($controller->relationConfig)) {
                $controller->addDynamicProperty('relationConfig');
                $controller->relationConfig = $controller->mergeConfig(
                    $controller->relationConfig,
                    '$/speedcube/speedcube/controllers/users/config_relation.yaml'
                );
            }
        });

        // extend the user form with our relation controllers
        Event::listen('backend.form.extendFields', function ($widget) {
            if (
                $widget->model instanceof UserModel &&
                $widget->getController() instanceof UsersController
            ) {
                $widget->addTabFields([
                    'configs' => [
                        'path' => '$/speedcube/speedcube/models/config/_field_configs.htm',
                        'tab'  => 'Puzzle Configs',
                        'type' => 'partial',
                    ],
                    'keyboard_configs' => [
                        'path' => '$/speedcube/speedcube/models/keyboardconfig/_field_keyboard_configs.htm',
                        'tab'  => 'Keyboard Configs',
                        'type' => 'partial',
                    ],
                ]);
            }
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
                'icon'        => 'icon-cube',
                'label'       => 'Speedcube',
                'order'       => 500,
                'permissions' => ['speedcube.speedcube.*'],
                'sideMenu'    => [
                    'solves' => [
                        'icon'        => 'icon-clock-o',
                        'label'       => 'Solves',
                        'permissions' => ['speedcube.speedcube.access_solves'],
                        'url'         => Backend::url('speedcube/speedcube/solves'),
                    ],
                    'comments' => [
                        'icon' => 'icon-comment-o',
                        'label' => 'Comments',
                        'permissions' => ['speedcube.speedcube.access_comments'],
                        'url' => Backend::url('speedcube/speedcube/comments'),
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
                'tab'   => 'Speedcube',
                'label' => 'Manage solves',
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
            ->call(function () {
                Solve::closeAbandoned();
            })
            ->daily()
            ->thenPing(env('HB_CLOSE_ABANDONED_SOLVES'));
    }
}
