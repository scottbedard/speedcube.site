<?php

namespace Speedcube\Speedcube\Console;

use Carbon\Carbon;
use Illuminate\Console\Command;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Classes\Cube;
use Speedcube\Speedcube\Models\Scramble;
use Speedcube\Speedcube\Models\Solve;
use Speedcube\Speedcube\Tests\Factory;
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
     *
     * @return void
     */
    public function handle()
    {
        $this->output->writeln("Seeding fake data...\n");

        $this->seedUsers();
        $this->seedSolves();
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['solves', null, InputOption::VALUE_OPTIONAL, 'Generate solves', 0],
            ['users', null, InputOption::VALUE_OPTIONAL, 'Generate users', 0],
        ];
    }

    /**
     * Solves.
     *
     * @return void
     */
    public function seedSolves()
    {
        $quantity = (int) $this->option('solves');

        if ($quantity === 0) {
            return;
        }

        $users = User::all();

        $this->output->writeln('- Solves');
        $progressBar = $this->output->createProgressBar($quantity);

        $puzzles = ['2x2', '3x3', '4x4', '5x5'];

        for ($i = 0; $i < $quantity; $i++) {
            // create a scramble and a solve
            $scramble = Factory::create(new Scramble(), [
                'puzzle' => $puzzles[array_rand($puzzles)],
            ]);

            $solve = Factory::create(new Solve(), [
                'scramble_id' => $scramble->id,
                'user_id'     => $users->random()->id,
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

                    array_push($timestampedTurns, $delay.':'.$turn);
                }

                $endTimestamp = $delay + 200;
                $timestampedSolution = $inspection.' 8000#START '.implode(' ', $timestampedTurns)." {$endTimestamp}#END";

                $solve->complete($timestampedSolution);
            }

            $progressBar->advance();
        }

        $progressBar->finish();

        $this->output->writeln("\n");
    }

    /**
     * Users.
     *
     * @return void
     */
    public function seedUsers()
    {
        $quantity = (int) $this->option('users');

        if ($quantity === 0) {
            return;
        }

        $this->output->writeln('- Users');

        $progressBar = $this->output->createProgressBar($quantity);

        for ($i = 0; $i < $quantity; $i++) {
            Factory::registerUser();

            $progressBar->advance();
        }

        $progressBar->finish();

        $this->output->writeln("\n");
    }
}
