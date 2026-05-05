import { AudioPro, AudioProContentType, AudioProEventType } from 'react-native-audio-pro';

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
				const nextTrack = determineNextTrack();
				if (nextTrack) {
					AudioPro.play(nextTrack);
				}
				break;

			case AudioProEventType.REMOTE_NEXT:
				// Handle next button press from lock screen/notification
				const nextTrackFromRemote = determineNextTrack();
				AudioPro.play(nextTrackFromRemote);
				break;
		}
	});
}

function determineNextTrack() {
	/* Your logic here */
}