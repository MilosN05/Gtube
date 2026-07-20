import { AudioPro, AudioProContentType, AudioProEventType } from 'react-native-audio-pro';


let tracks = []
let current_index = 0

let tracks_shuffled = []


export function setTracks(track_of_songs) {
	current_index =0
	tracks = track_of_songs

}

export function load_shuffled(sign_shuffle) {
	if (!sign_shuffle) {
		tracks_shuffled=[]
		return
	}
	if (tracks.length)
		return


	tracks_shuffled.push(tracks[current_index])

	let i=1;
	while (tracks_shuffled.length!=tracks.length) {
		let song = tracks[Math.floor(Math.random()*tracks.length)]

		if (!tracks_shuffled.includes(song))
			tracks_shuffled[i++]=tracks[song]
	}
}




export function play_previous() {
	const nextTrackFromRemote_PREV = determineNextTrack(false);
	AudioPro.play(nextTrackFromRemote_PREV);
}

export function play_next() {
	const nextTrackFromRemote = determineNextTrack(true);
	AudioPro.play(nextTrackFromRemote);
}

export function play_by_index(index) {{
	current_index=index;
	AudioPro.play(tracks[index]);
}}

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
	return tracks_shuffled.length>0 ?  tracks_shuffled[current_index]:tracks[current_index]
}