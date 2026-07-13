import { AudioPro, AudioProContentType, AudioProEventType } from 'react-native-audio-pro';


let tracks = []
let current_index = 0
let shuffle_index =0

export function setTracks(track_of_songs) {
	current_index =0
	tracks = track_of_songs

}


export function play_previous() {
	const nextTrackFromRemote_PREV = determineNextTrack(false);
	AudioPro.play(nextTrackFromRemote_PREV);
}

export function play_next() {
	const nextTrackFromRemote = determineNextTrack(true);
	AudioPro.play(nextTrackFromRemote);
}

export function setupAudio() {
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
		switch (event.type) {
			case AudioProEventType.TRACK_ENDED:
				// Auto-play next track when current track ends
				const nextTrack = determineNextTrack(true);
				if (nextTrack) {
					AudioPro.play(nextTrack);
				}
				break;

			case AudioProEventType.REMOTE_NEXT:
				// Handle next button press from lock screen/notification
				play_next()
				break;

			case AudioProEventType.REMOTE_PREV:
				play_previous()
				break;
		}
	});
}

function determineNextTrack(napred) {
	/* Your logic here */
	// console.log(3)
	// console.log(tracks)
	if (napred && current_index<tracks.length-1)
		current_index+=1
	else if (!napred && current_index>0)
		current_index-=1
	
	// console.log(current_index)
	return tracks[current_index]
}