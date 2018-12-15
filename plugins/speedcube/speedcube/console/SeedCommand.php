<?php

namespace Speedcube\Speedcube\Console;

use Carbon\Carbon;
use Faker;
use Illuminate\Console\Command;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Classes\Cube;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class SeedCommand extends Command
{
    /**
     * @var string The console command name.
     */
    protected $name = 'speedcube:seed';

    /**
     * @var string The console command description.
     */
    protected $description = 'Seeds all tables.';

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $this->output->writeln('Seeding all tables');

        $this->seedUsers(20);
        $this->seedSolves(500);
    }

    /**
     * Get the console command arguments.
     * @return array
     */
    protected function getArguments()
    {
        return [];
    }

    /**
     * Get the console command options.
     * @return array
     */
    protected function getOptions()
    {
        return [];
    }

    /**
     * Solves
     * 
     * @return void
     */
    public function seedSolves($end = 10)
    {
        $this->output->writeln('- Solves...');

        $users = User::all();

        for ($i = 0; $i < $end; $i++) {
            // create a scramble and a solve
            $scramble = Factory::create(new Scramble, [
                'cube_size' => rand(2, 5),
            ]);

            $solve = Factory::create(new Solve, [
                'scramble_id' => $scramble->id,
                'user_id' => $users->random()->id,
            ]);

            $solve->created_at = Carbon::now()->subDays(rand(0, 90));

            if (rand(0, 4) === 0) {
                $solve->abort();
            } else {
    
                // make our solution look like a real solve
                $inspection = '1000:X 2000:Y 3000:Z 4000:Z- 5000:Y- 6000:X-';
    
                // create a timestamped solution by reversing the scramble
                $delay = 8000;
                $solution = Cube::reverseScramble($scramble->scramble);
                $timestampedTurns = [];
                
                foreach (explode(' ', $solution) as $turn) {
                    $delay += rand(200, 2000);
    
                    array_push($timestampedTurns, $delay . ':' . $turn);
                }
    
                $endTimestamp = $delay + 200;
                $timestampedSolution = $inspection . ' 8000#START ' . implode(' ', $timestampedTurns) . " {$endTimestamp}#END";
                
                $solve->complete($timestampedSolution);
            }
        }
    }


    /**
     * Users
     * 
     * @return void
     */
    public function seedUsers($end = 10)
    {
        $this->output->writeln('- Users...');

        for ($i = 0; $i < $end; $i++) {
            Factory::registerUser();
        }
    }
}
