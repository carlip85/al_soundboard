function playThis(e){
	i={'keyCode':e}
	playSound(i);
};

window.addEventListener('keydown', function(e) {
	playSound(e);
});

function checkFields(){
	var aFile=document.getElementById("sound_uploads")

	if (aFile.files.length===0){
		alert("No file selected")
	}else{
		return
	}
};

function playSound(e){
	const audio = document.querySelector('audio[data-key="' + e.keyCode + '"]');
	const key = document.querySelector('.key[data-key="' + e.keyCode + '"]');
	if (!audio) return; // stop function if no audio
		audio.currentTime = 0;
		audio.play();
		key.classList.add('playing');
	
		function removeTransition(e) {
			if (e.propertyName !== 'transform') return; // Skip if it's not transform
			this.classList.remove('playing');
		}
		const keys = document.querySelectorAll('.key');
		keys.forEach(key => key.addEventListener('transitionend', removeTransition));
}

function renderButtons(input){
	var buttonList=[]
	var dropList=[]
	var count = Object.keys(input).length;
	for (let i=1; i < count+1;i++){
		if(input[i].file!=''){			
			buttonList+='<div data-key="'+input[i].keyCode+'" class="key" onclick="playThis('+input[i].keyCode+')"><kbd>'+input[i].key+'</kbd><span>'+input[i].phrase+'</span></div><audio data-key="'+input[i].keyCode+'" src="'+input[i].file+'"></audio>'
		}else{
			dropList+='<option value='+input[i].keyCode+'>'+input[i].key+'</option>'
			continue			
		}
	};
	document.getElementById("keyDrop").innerHTML=dropList
	document.getElementById("focus").innerHTML=buttonList
}


document.addEventListener("DOMContentLoaded", function(){
	fetch("./helper/helper2.json")
		.then(response => {
		return response.json();
		})
		.then(jsondata => {
			renderButtons(jsondata.keyMap)
		});
});