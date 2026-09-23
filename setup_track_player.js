import TrackPlayer, { PlayerCommand } from "@rntp/player";

export function setup_audio() {
  TrackPlayer.setupPlayer({
    contentType: "music",
    android: {
      taskRemovedBehavior: "stop",
    },
  });

  TrackPlayer.setCommands({
    capabilities: [
      PlayerCommand.PlayPause,
      PlayerCommand.Next,
      PlayerCommand.Previous,
    ],
  });
}
