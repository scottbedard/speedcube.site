<?php

namespace Speedcube\Speedcube\Console;

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

        $this->seedUsers(10);
        $this->seedSolves(25);
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
            $scramble = Factory::create(new Scramble, [
                'cube_size' => 3,
            ]);

            $solution = Cube::reverseScramble($scramble->scramble);

            // make our solution look like a real solve
            $inspection = '1000:X 2000:Y 3000:Z 4000:Z- 5000:Y- 6000:X-';

            $delay = 10000;
            $timestampedTurns = [];
            
            foreach (explode(' ', $solution) as $turn) {
                $delay += rand(200, 675);
                array_push($timestampedTurns, $delay . ':' . $turn);
            }

            $timestampedSolution = $inspection . ' 10000#START ' . implode(' ', $timestampedTurns);
            
            // create a solve for our scramble
            $solve = Factory::create(new Solve, [
                'scramble_id' => $scramble->id,
                'solution' => $timestampedSolution,
                'user_id' => $users->random()->id,
            ]);
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
