<?php

namespace Speedcube\Speedcube\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class AddReplayCountColumn extends Migration
{
    public function up()
    {
        // 1.0.1
        if (!Schema::hasColumn('speedcube_speedcube_solves', 'replay_count')) {
            Schema::table('speedcube_speedcube_solves', function ($table) {
                $table->integer('replay_count')->after('status')->default(0)->unsigned();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('speedcube_speedcube_solves', 'replay_count')) {
            Schema::table('speedcube_speedcube_solves', function ($table) {
                $table->dropColumn('replay_count');
            });
        }
    }
}
