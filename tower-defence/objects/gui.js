function enableWaveBtn(){
	
	var waveBtn = document.getElementById('waveBtn');

	waveBtn.disabled = false;
	waveBtn.innerHTML = 'Start Wave ' + (level.wave + 1);

	waveBtn.classList.remove('w3-red');
	waveBtn.classList.remove('w3-hover-black');

	waveBtn.classList.add('w3-purple');
	waveBtn.classList.add('w3-hover-green');

	//waveBtn.onclick = function(){ waveBtnClick(); };

}

function disableWaveBtn(){
	
	var waveBtn = document.getElementById('waveBtn');
	
	waveBtn.disabled = true; 
	waveBtn.innerHTML = 'In Wave ' + level.wave;
	
	waveBtn.classList.remove('w3-purple');
	waveBtn.classList.remove('w3-hover-green');
	
	waveBtn.classList.add('w3-red');
	waveBtn.classList.add('w3-hover-black');
	
}

function waveBtnClick(){
	
	generateWave(level.wave,level.spawnX,level.spawnY); 
	
	level.wave += 1;
	
	disableWaveBtn();
	
	if (level.wave > waveMaps.length){
		showModal('The End (for now)',0);
	}
	game.state = 1;
	
}


function updateGUI(){
	
	// new version
	updatePlayerHealth();
	
	var gui_level = document.getElementById('gui_level');
	gui_level.innerHTML = game.level + 1 + ' / ' + levelMaps.length;
	
	var gui_wave = document.getElementById('gui_wave');
	gui_wave.innerHTML = level.wave + ' / ' + level.waveLimit;

	var gui_enemies = document.getElementById('gui_enemies');
	if (level.enemyCount == 0){
		gui_enemies.innerHTML = "0%";
	}else{
		gui_enemies.innerHTML = Math.floor( ( (level.enemyCount - enemies.length) / level.enemyCount) * 100 ) + '%';
		//console.log(level.enemyCount, enemies.length);
	}
	//gui_enemies.innerHTML = enemies.length + ' / ' + level.enemyCount;

	var gui_cash = document.getElementById('gui_cash');
	gui_cash.innerHTML = game.cash;
	var gui_score = document.getElementById('gui_score');
	gui_score.innerHTML = game.score;
	var waveBtn = document.getElementById('waveBtn');
	waveBtn.innerHTML = 'Start Wave ' + (level.wave + 1);
}

function updatePlayerHealth(){
	
	var percent = Math.floor( (game.HP / game.maxHP) * 100) + '%';
	var gui_health = document.getElementById('gui_health');
	gui_health.style.width = percent;
	
	var gui_health_text = document.getElementById('gui_health_text');
	gui_health_text.innerHTML = '' + game.HP + ' / ' + game.maxHP;
	
}
