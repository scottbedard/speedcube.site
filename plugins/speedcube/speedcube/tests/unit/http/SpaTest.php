<?php

namespace Speedcube\Speedcube\Tests\Unit\Http;

use PHPHtmlParser\Dom;
use Speedcube\Speedcube\Models\Config;
use Speedcube\Speedcube\Tests\Factory;
use Speedcube\Speedcube\Tests\PluginTestCase;

class SpaTest extends PluginTestCase
{
    /**
     * Get context returned for SPA.
     *
     * @return array
     */
    public function getContext($path = '/')
    {
        $response = $this->get($path);

        $dom = new Dom;

        $dom->loadStr($response->getContent());

        return json_decode(
            htmlspecialchars_decode(
                $dom->find('#app')[0]->getAttribute('data-context')
            ),
            true,
        );
    }

    public function test_puzzle_configs_are_part_of_context()
    {
        $user = Factory::authenticatedUser();
        
        $config = Factory::create(new Config, [
            'user_id' => $user->id,
        ]);

        $context = $this->getContext();

        $this->assertEquals(1, count($context['user']['activeConfigs']));
        $this->assertEquals($config->id, $context['user']['activeConfigs'][0]['id']);
    }
}