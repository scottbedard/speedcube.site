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
        // version >= 1.0.5 stores many config values as
        // decimals, and default camera distance is shortened
        $this->migrateConfigs();
    }

    public function down()
    {
    }

    private function migrateConfigs()
    {
        $update = function ($config) {
            $data = [];
            $original = json_decode($config, true);

            // camera angle
            if (array_key_exists('cameraAngle', $original)) {
                $data['cameraAngle'] = $original['cameraAngle'];
            }

            // camera distance
            if (array_key_exists('cameraDistance', $original)) {
                $data['cameraDistance'] = ($original['cameraDistance'] / 8000) * 800;
            }

            // colors
            if (array_key_exists('colors', $original)) {
                $data['colors'] = $original['colors'];
            }

            // sticker elevation
            if (array_key_exists('stickerElevation', $original)) {
                $data['stickerElevation'] = $original['stickerElevation'] / 100;
            }

            // sticker radius
            if (array_key_exists('stickerRadius', $original)) {
                $data['stickerRadius'] = $original['stickerRadius'] / 100;
            }

            // sticker spacing
            if (array_key_exists('stickerSpacing', $original)) {
                $data['stickerSpacing'] = $original['stickerSpacing'] / 100;
            }

            // turn duration
            if (array_key_exists('turnDuration', $original)) {
                $data['turnDuration'] = $original['turnDuration'];
            }

            return json_encode((object) $data);
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
