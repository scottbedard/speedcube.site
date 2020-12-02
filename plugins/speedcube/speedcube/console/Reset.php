<?php

namespace Speedcube\Speedcube\Console;

use Backend\Models\User;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class Reset extends Command
{
    /**
     * @var string The console command name.
     */
    protected $name = 'speedcube:reset';

    /**
     * @var string The console command description.
     */
    protected $description = 'Seed a fresh development environment';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if (app()->env === 'production') {
            $this->output->writeLn('<fg=red>Error:</> Reset command cannot be run in production.');
            return;
        }
        
        $this->call('october:down', ['--force' => true]);
        $this->call('october:up');
        $this->resetBackendUser();
        $this->refreshPlugin();
    }

    /**
     * Refresh plugin and dummy data.
     *
     * @return void
     */
    protected function refreshPlugin()
    {
        $this->call('plugin:refresh', ['name' => 'Speedcube.Speedcube']);
    }

    /**
     * Configure backend user.
     *
     * @return void
     */
    protected function resetBackendUser()
    {
        $admin = User::find(1);
        $admin->login = env('DEV_BACKEND_LOGIN', 'admin');
        $admin->password = env('DEV_BACKEND_PASSWORD', 'admin');
        $admin->password_confirmation = env('DEV_BACKEND_PASSWORD', 'admin');
        $admin->save();

        $this->output->writeLn('<fg=green>Backend User Reset</>');
    }
}
