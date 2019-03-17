<?php

namespace Speedcube\Speedcube\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use NotificationChannels\Twitter\TwitterChannel;
use NotificationChannels\Twitter\TwitterStatusUpdate;
use Speedcube\Speedcube\Classes\Utils;
use Speedcube\Speedcube\Models\PersonalRecord;

class PersonalRecordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $personalRecord;

    /**
     * Constructor.
     *
     * @return void
     */
    public function __construct(PersonalRecord $personalRecord)
    {
        $this->personalRecord = $personalRecord;
    }

    /**
     * Broadcast a notification to Twitter.
     *
     * @return TwitterStatusUpdate
     */
    public function toTwitter($notifiable)
    {
        // only twitter broadcast if it's enabled
        if (env('TWITTER_BROADCASTING', false)) {
            return;
        }

        $user = $this->personalRecord->user;
        $profile = $user->profile;
        $solve = $this->personalRecord->solve;
        $puzzle = $this->personalRecord->solve->scramble->puzzle;
        $url = "https://speedcube.site/replay/{$solve->id}";
        $person = $profile->twitter_handle ? "@{$profile->twitter_handle}" : $user->username;

        $formattedTime = Utils::formatTime($solve->time);

        $content = "{$person} just beat their {$puzzle} personal best with this {$formattedTime} second solve!\n{$url}";

        return new TwitterStatusUpdate($content);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     *
     * @return array
     */
    public function via($notifiable)
    {
        return [TwitterChannel::class];
    }
}
