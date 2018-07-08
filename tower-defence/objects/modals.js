function showModal(name,screen){
	
	//current.state = 0;
	var modal = false;
	for (var m in modals){
		if (modals[m].title == name){
			modal = modals[m];
		}
	}
	if (modal === false){return false;}
	//var modal = modals['title'=>name];
	
	var title = modal.title;
	var modal_header = document.getElementById('main-modal-header');
	modal_header.innerHTML = title;
	
	var scr = modal.screens[screen];
	
	var body = scr.body;
	var modal_content = document.getElementById('main-modal-content');
	modal_content.innerHTML = body;
	
	var left = scr.footer.left;
	var modal_footer_left = document.getElementById('main-modal-footer-left');
	if (left){
		modal_footer_left.innerHTML = left.string;
		modal_footer_left.onclick = function(){eval(left.action)};
		modal_footer_left.style.visibility = 'visible';
	}else{
		modal_footer_left.style.visibility = 'hidden';
		//modal_footer_left.innerHTML = '';
	}
	
	var right = scr.footer.right;
	var modal_footer_right = document.getElementById('main-modal-footer-right');
	if (right){
		modal_footer_right.innerHTML = right.string;
		modal_footer_right.onclick = function(){eval(right.action);};
		modal_footer_right.style.visibility = 'visible';
	}else{
		modal_footer_right.style.visibility = 'hidden';
		//modal_footer_right.innerHTML = '';
	}

	var modalEl = document.getElementById('main-modal');
	modalEl.style.display = 'block';
}

function closeModal(){
	//current.state = 1;
	document.getElementById("main-modal").style.display="none";
	if (enemies.length > 0){
		// Kick back into loop once modal closed
		window.requestAnimationFrame(mainLoop);
	}
}

// Tower already existing (type > 0)
function showTowerModal(){
	
	var modal_header = document.getElementById('main-modal-header');
	modal_header.innerHTML = 'Upgrade Tower';
	
	var body = getTowerModalBody();
	var modal_content = document.getElementById('main-modal-content');
	modal_content.innerHTML = body;
	
	var modal_footer_left = document.getElementById('main-modal-footer-left');
		modal_footer_left.innerHTML = '<b>Sell<br>(£' + getTowerSellCost() + ')</b>';
		modal_footer_left.onclick = function(){ sellTower() };
		modal_footer_left.style.visibility = 'visible';
	
	var modal_footer_right = document.getElementById('main-modal-footer-right');
		modal_footer_right.innerHTML = '<b>Upgrade<br>(£' + getTowerUGCost() + ')</b>';
		modal_footer_right.onclick = function(){ checkUGTower() };
		modal_footer_right.style.visibility = 'visible';
	
	var modalEl = document.getElementById('main-modal');
	modalEl.style.display = 'block';

}

// Empty - so add WALL
function showWallModal(column, row){
	
	var modal_header = document.getElementById('main-modal-header');
	modal_header.innerHTML = 'Buy Wall';
	
	var body = 'You can buy a wall for £' + current.wall_cost;
	var modal_content = document.getElementById('main-modal-content');
	modal_content.innerHTML = body;
	
	var modal_footer_left = document.getElementById('main-modal-footer-left');
		modal_footer_left.innerHTML = '';
		modal_footer_left.onclick = false;
		modal_footer_left.style.visibility = 'hidden';
	
	var modal_footer_right = document.getElementById('main-modal-footer-right');
		modal_footer_right.innerHTML = '<b>Buy Wall <br>(£' + current.wall_cost + ')</b>';
		modal_footer_right.onclick = function(){ buyWall(column, row) };
		modal_footer_right.style.visibility = 'visible';
	
	var modalEl = document.getElementById('main-modal');
	modalEl.style.display = 'block';
}

// WALL already existing (type = 0)
function showTowerTypeModal(){
	
	var modal_header = document.getElementById('main-modal-header');
	modal_header.innerHTML = 'Upgrade Wall';
	
	var body = getWallModalBody();
	var modal_content = document.getElementById('main-modal-content');
	modal_content.innerHTML = body;
	
	var modal_footer_left = document.getElementById('main-modal-footer-left');
		modal_footer_left.innerHTML = '<b>Sell<br>(£' + getTowerSellCost() + ')</b>';
		modal_footer_left.onclick = function(){ sellTower() };
		modal_footer_left.style.visibility = 'visible';
	
	var modal_footer_right = document.getElementById('main-modal-footer-right');
		modal_footer_right.innerHTML = '';
		modal_footer_right.onclick = false;
		modal_footer_right.style.visibility = 'hidden';
		
		//modal_footer_right.innerHTML = '<b>Upgrade<br>(£' + getTowerUGCost() + ')</b>';
		//modal_footer_right.onclick = function(){ checkUGTower() };
		//modal_footer_right.style.visibility = 'visible';
	
	var modalEl = document.getElementById('main-modal');
	modalEl.style.display = 'block';
	
}

function getStatsTable(){
	
	var htmlOut = '<table class="w3-center w3-table w3-striped w3-bordered">';
	// Restarts
	htmlOut += '<tr><td>Name</td><td>' + game.name + '</td></tr>';
	
	htmlOut += '<tr><td>Restarts</td><td>' + game.stats.restarts + '</td></tr>';
	// Highest Wave
	htmlOut += '<tr><td>Highest Wave</td><td>' + game.stats.highestWaveBeaten + '</td></tr>';
	// Total enemies beaten
	htmlOut += '<tr><td>Total Enemies Beaten</td><td>' + game.stats.enemiesBeatenTotal + '</td></tr>';
	// By type
	
	for (var i = 0; i < 5; i++){
		if ( (game.stats.enemiesBeaten[i] !== undefined ) && (game.stats.enemiesBeaten[i] !== null) ){
			htmlOut += '<tr><td>' + enemy_type_defaults[i].name + ' Enemies Beaten</td><td>' + game.stats.enemiesBeaten[i] + '</td></tr>';
		}		
	}

	htmlOut += '</table>';
	
	return htmlOut;
	
}
