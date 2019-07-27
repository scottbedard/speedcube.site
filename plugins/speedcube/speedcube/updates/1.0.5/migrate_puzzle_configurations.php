<?php

namespace Speedcube\Speedcube\Updates;

use RainLab\User\Models\User;
use Speedcube\Speedcube\Models\Config;
use Speedcube\Speedcube\Models\Solve;
use October\Rain\Database\Updates\Migration;
use Schema;
use Speedcube\Speedcube\Tests\Factory;

class MigratePuzzleConfigurations extends Migration
{
    public function up()
    {
        $this->migrateConfigs();
    }

    public function down()
    {
    }

    private function migrateConfigs()
    {
        // $user = Factory::registerUser();

        // $config = Config::create([
        //     'config' => '{"colors":["#FFEE5D","#EFAA18","#2589E2","#EC6157","#5CBD60","#F0F0F0"],"stickerSpacing":18,"stickerElevation":100,"stickerRadius":9,"innerBrightness":82,"cameraAngle":45,"cameraDistance":2083,"turnDuration":82}',
        //     'puzzle' => '3x3',
        //     'user_id' => $user->id,
        // ]);

        // $solve = Factory::completedSolve($user);
        // $solve->config = $config->config;
        // $solve->save();

        // version >= 1.0.5 will store config values as decimals
        // when appropriate. these values are more useful when
        // calculating sticker positioning and geometries. in
        // addition to this, we've shortened max camera distance.
        $update = function ($config) {
            $original = json_decode($config, true);

            return json_encode([
                'cameraAngle' => $original['cameraAngle'],
                'cameraDistance' => ($original['cameraDistance'] / 8000) * 1000,
                'colors' => $original['colors'],
                'stickerElevation' => $original['stickerElevation'] / 100,
                'stickerRadius' => $original['stickerRadius'] / 100,
                'stickerSpacing' => $original['stickerSpacing'] / 100,
                'turnDuration' => $original['turnDuration'],
            ]);
        };

        // update user configs
        Config::all()->each(function($config) use ($update) {
            $config->config = $update($config->config);
            $config->save();
        });

        // update solves
        Solve::all()->each(function($solve) use ($update) {
            $solve->config = $update($solve->config);
            $solve->save();
        });
    }
}
