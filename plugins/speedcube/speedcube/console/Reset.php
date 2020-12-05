<?php

namespace Speedcube\Speedcube\Console;

use Backend\Models\User as BackendUser;
use Illuminate\Console\Command;
use RainLab\User\Models\User;
use Speedcube\Speedcube\Tests\Factory;
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

        $this->refreshPlugin();

        $this->createBackendUsers();

        $this->createFrontendUsers();
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
     * Create backend users.
     *
     * @return void
     */
    protected function createBackendUsers()
    {
        $admin = BackendUser::find(1);

        $admin->login = 'admin';
        $admin->password = 'admin';
        $admin->password_confirmation = 'admin';
        $admin->save();

        $this->output->writeLn('<fg=green>Backend User Created</>');
    }

    /**
     * Create frontend users.
     *
     * @return void
     */
    protected function createFrontendUsers()
    {
        Factory::create(new User, [
            'email' => 'homer@speedcube.site',
            'name' => 'Homer Simpson',
            'password' => '12345678',
            'username' => 'homer',
        ]);

        $this->output->writeLn('<fg=green>Frontend Users Created</>');
    }
}
