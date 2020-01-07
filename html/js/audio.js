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

	constructor(items, ae, te) {
		this.items = items;
		this.audio_html_elem = ae;
		this.title_elem = te;
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