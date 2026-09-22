import {
  AudioPro,
  AudioProContentType,
  AudioProEventType,
} from "react-native-audio-pro";
import { outer_store } from "./store/store";

let previous_shuffled = false;
let tracks = [];
let current_index = 0;
let tracks_shuffled = [];

let track_ended = false;
let seek_complete = 0;

export function setTracks(track_of_songs) {
  current_index = 0;
  tracks = track_of_songs;
}

export function load_shuffled(index) {
  if (tracks_shuffled.length > 0) {
    return;
  }

  let temp_array = [...tracks];

  temp_array.splice(index, 1);

  for (let i = temp_array.length - 1; i > 1; i--) {
    let odabrani_index = Math.floor(Math.random() * (i + 1));
    [temp_array[i], temp_array[odabrani_index]] = [
      temp_array[odabrani_index],
      temp_array[i],
    ];
  }

  tracks_shuffled = [tracks[index]].concat(temp_array);
}

export function play_previous() {
  const nextTrackFromRemote_PREV = determineNextTrack(false);
  AudioPro.play(nextTrackFromRemote_PREV);
}

export function play_next() {
  const nextTrackFromRemote = determineNextTrack(true);
  AudioPro.play(nextTrackFromRemote);
}

export function play_by_index(index) {
  {
    current_index = index;
    AudioPro.play(tracks[index]);
  }
}

export function setupAudio() {
  let loaded_zustand_is_connected = outer_store.getState().is_connected;
  console.log(
    `DODAT AUDIO LISTE: ${globalThis.audio_called} - AK: ${loaded_zustand_is_connected}`,
  );
  if (globalThis.audio_called) {
    AudioPro.clear();
    return;
  }
  // Configure audio settings
  AudioPro.configure({
    contentType: AudioProContentType.MUSIC,
    debug: __DEV__,
    debugIncludesProgress: false,
    progressIntervalMs: 1000,
    showNextPrevControls: true, // Show next/previous buttons on lock screen (default)
  });

  // Set up event listeners that persist for the app's lifetime
  AudioPro.addEventListener((event) => {
    console.log(
      `EVENT TYPE AUDIO: ${event.type} | t_ended: ${track_ended} | seek_c: ${seek_complete}`,
    );
    if (track_ended) seek_complete += 1;

    if (track_ended && seek_complete == 2) {
      const nextTrack = determineNextTrack(true);
      // if (nextTrack) {
      //   console.log("SMARAGDDDDDDDDDDDDDDDDDD 1");
      track_ended = false;
      seek_complete = 0;
      AudioPro.play(nextTrack);
    }

    switch (event.type) {
      case AudioProEventType.TRACK_ENDED:
        track_ended = true;
        break;

      case AudioProEventType.REMOTE_NEXT:
        // Handle next button press from lock screen/notification
        console.log("SMARAGDDDDDDDDDDDDDDDDDD 2");
        play_next();
        break;

      case AudioProEventType.REMOTE_PREV:
        play_previous();
        break;
    }
  });
  globalThis.audio_called = true;
}

function determineNextTrack(napred) {
  /* Your logic here */
  // let previous_index = current_index;
  if (napred && current_index < tracks.length - 1) current_index += 1;
  else if (!napred && current_index > 0) current_index -= 1;

  // let shuffled_play = outer_store.getState().shuffled_play;

  // if (shuffled_play) load_shuffled(previous_index);
  // else if (previous_shuffled == true && !shuffled_play) {
  //   for (let i = 0; i < tracks.length; i++) {
  //     if (tracks[i].id == AudioPro.getPlayingTrack().id) {
  //       if (i + 1 < tracks.length && napred) current_index = i + 1;
  //       else if (i > 0 && !napred) current_index = i - 1;
  //       break;
  //     }
  //   }

  //   tracks_shuffled = [];
  // } else tracks_shuffled = [];

  // previous_shuffled = shuffled_play;

  return tracks_shuffled.length > 0
    ? tracks_shuffled[current_index]
    : tracks[current_index];
}
