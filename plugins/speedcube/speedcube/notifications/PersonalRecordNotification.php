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
        $user = $this->personalRecord->user;
        $solve = $this->personalRecord->solve;
        $puzzle = $this->personalRecord->solve->scramble->puzzle;
        $url = "https://speedcube.site/replay/{$solve->id}";

        $formattedTime = Utils::formatTime($solve->time);

        $content = "Congrats to {$user->username} on their best ever {$puzzle} solve at {$formattedTime}!\nWatch the replay at {$url}";

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
