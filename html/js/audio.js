/////////////////////
// Description: Audio Control Class, contains all player functionality
// Author: Tom Mardis
/////////////////////

class AudioPlayer {
	items = [];
	current_index = 0;
	current_headline = "";
	audio_html_elem = null;
	title_elem = null;
	error_callback = null;

	constructor(items, ae, te, cb) {
		this.items = items;
		this.audio_html_elem = ae;
		this.title_elem = te;
		this.error_callback = cb;

		//Error listening event code from SO: https://stackoverflow.com/questions/13614803/how-to-check-if-html5-audio-has-reached-different-errors/14489392
		this.audio_html_elem.addEventListener('error', function failed(e) {
			// audio playback failed - show a message saying why
			// to get the source of the audio element use $(this).src
			switch (e.target.error.code) {
				case e.target.error.MEDIA_ERR_ABORTED:
				this.error_callback('You aborted the video playback.');
				break;
				case e.target.error.MEDIA_ERR_NETWORK:
				this.error_callback('A network error caused the audio download to fail.');
				break;
				case e.target.error.MEDIA_ERR_DECODE:
				this.error_callback('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
				break;
				case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
				this.error_callback('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
				break;
				default:
				this.error_callback('An unknown error occurred.');
				break;
			}
		}.bind(this), false);
	}

	play(index) {
		this.current_index = index;
		this.title_elem.innerHTML = this.items[index].label;
		this.audio_html_elem.src = this.items[index].url;
		this.audio_html_elem.play();
	}

	next() {
		this.current_index++;
		if(this.current_index > this.items.length-1) {
			this.current_index = 0;
		}
		this.play(this.current_index);
	}

	previous() {
		this.current_index--;
		if(this.current_index < 0) {
			this.current_index = this.items.length-1;
		}
		this.play(this.current_index);
	}

	forward() {
		this.audio_html_elem.currentTime += 5.0;
	}

	rewind() {
		this.audio_html_elem.currentTime -= 5.0;
	}

}