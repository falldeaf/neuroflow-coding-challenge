/////////////////////
// Description:Controls the list view for audio files
// Author: Tom Mardis
/////////////////////

window.onload = () => {

	window.vue = new Vue({
		el: '#app',
		data() {
			return {
				docs: {
					component: 'bTable'
				},
				items: [{name:"test"}],
				current_item: {},
				currentPage: 1,
				perPage: 25,
				filter: null,
				fields: [  {key: 'id', sortable: true},
							'play',
							'label',
							'speaker',
							{key: 'category', sortable: true}
						]
			}
		},
		mounted() {
			this.getResults();
		},
		methods: {
			getResults() {
				fetch('api/audio').then((resp) => resp.json()).then(function(json) {
					vue.items = json;
					console.log(vue.items)
					initPlayer();
				});
			},
			showItem: function(record, index){
				console.log("show an item (row clicked)")
				console.log(record)
				vue.current_item = record;
				this.$refs['detail-modal'].show();
			},
			playItem: function(item) {
				console.log("play an item (play button clicked)")
				console.log(item)
				window.audio_player.play(item.id);
			}
		}
	})

}

function initPlayer() {
	window.audio_player = new AudioPlayer(vue.items, document.getElementById('aplayer'), document.getElementById('atitle'));
	document.getElementById("aprev"   ).addEventListener("click", function() { window.audio_player.previous() });
	document.getElementById("arewind" ).addEventListener("click", function() { window.audio_player.rewind()   });
	document.getElementById("aforward").addEventListener("click", function() { window.audio_player.forward()   });
	document.getElementById("anext"   ).addEventListener("click", function() { window.audio_player.next()     });
}