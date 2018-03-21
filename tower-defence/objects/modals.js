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

function showTowerModal(){
	
	var modal_header = document.getElementById('main-modal-header');
	modal_header.innerHTML = 'Upgrade Tower';
	
	var body = getTowerModalBody();
	var modal_content = document.getElementById('main-modal-content');
	modal_content.innerHTML = body;
	
	var modal_footer_left = document.getElementById('main-modal-footer-left');
		modal_footer_left.innerHTML = 'Sell (£' + getTowerSellCost() + ')';
		modal_footer_left.onclick = function(){ sellTower() };
		modal_footer_left.style.visibility = 'visible';
	
	var modal_footer_right = document.getElementById('main-modal-footer-right');
		modal_footer_right.innerHTML = 'Upgrade (£' + getTowerUGCost() + ')';
		modal_footer_right.onclick = function(){ checkUGTower() };
		modal_footer_right.style.visibility = 'visible';
	
	var modalEl = document.getElementById('main-modal');
	modalEl.style.display = 'block';

}

function OLDaddModal(header,content){
	
	var modal_header = document.getElementById('main-modal-header');
	modal_header.innerHTML = header;
	
	var modal_content = document.getElementById('main-modal-content');
	modal_content.innerHTML = content;
	
	var modal = document.getElementById('main-modal');
	modal.style.display = 'block';
	
}