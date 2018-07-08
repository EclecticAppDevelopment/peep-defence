function showTowerTooltip(column, row){
	
	var tooltipH = document.getElementById('tooltipH');
	if (tooltipH){
		
		// Sets the tooltip variable to this element
			//console.log('resetting existing tooltip');
		//var tooltipH = oldTooltip;
		tooltipH.style.display = 'block';
		tooltipH.style.visibility = 'visible';
		tooltipH.innerHTML = '';
		var tooltipV = document.getElementById('tooltipV');
		tooltipV.style.display = 'none';
		tooltipV.style.visibility = 'hidden';
		tooltipV.innerHTML = '';
		
	}else{
		
		// Create a tooltip element
			//console.log('new tooltip');
		tooltipH = document.createElement('div');
		var tooltipV = document.createElement('div');

		var canvWrapper = document.getElementById('canvasWrapper');
		canvWrapper.insertBefore(tooltipH, canvWrapper.childNodes[0] );
		// Vertical on top
		canvWrapper.insertBefore(tooltipV, canvWrapper.childNodes[0] );

	}
	
	tooltipH = drawTooltipH(tooltipH);
	
	drawUGBoxes(tooltipH, column, row);
}


	
function showWallTooltip(column, row){

	// Show boxes above / below - left / right of this cell
	
	// Checks for existing tooltip element
	var tooltipH = document.getElementById('tooltipH');
	if (tooltipH){
		
		// Sets the tooltip variable to this element
			//console.log('resetting existing tooltip');
		//var tooltipH = oldTooltip;
		tooltipH.style.display = 'block';
		tooltipH.style.visibility = 'visible';
		tooltipH.innerHTML = '';
		var tooltipV = document.getElementById('tooltipV');
		tooltipV.style.display = 'block';
		tooltipV.style.visibility = 'visible';
		tooltipV.innerHTML = '';
		
	}else{
		
		// Create a tooltip element
			//console.log('new tooltip');
		tooltipH = document.createElement('div');
		var tooltipV = document.createElement('div');

		var canvWrapper = document.getElementById('canvasWrapper');
		canvWrapper.insertBefore(tooltipH, canvWrapper.childNodes[0] );
		// Vertical on top
		canvWrapper.insertBefore(tooltipV, canvWrapper.childNodes[0] );

	}
	
	// Split creating the tooltip elements into separate functions 
		//tooltip = drawTooltip(tooltip);
	tooltipH = drawTooltipH(tooltipH);
	tooltipV = drawTooltipV(tooltipV);
	
	drawBoxes(tooltipH, tooltipV, column, row);
}
	
	
function drawTooltipBox(thisEl, type){
	
	//Clear any existing features
	thisEl.innerHTML = null;
	
	var options = {};
	if ( (type >= 0) && (type <= 3) ){
		
		// Get tooltip details from tower defaults
		options = default_towers[type].tooltip();
		options.name = default_towers[type].name;
		
	}else{
		if (type == 'back'){
			options.color = '#c00';
			options.iconClass = 'far';
			options.iconName = 'fa-times-circle';
			options.fontColor = '#fff';
			options.name = 'Back';
		}
		if (type == 'upgrade'){
			options.color = '#0f5';
			options.iconClass = 'far';
			options.iconName = 'fa-check-square';
			options.fontColor = '#000';
			options.name = 'LVL+';
		}
		if (type == 'sell'){
			options.color = '#f00';
			options.iconClass = 'fas';
			options.iconName = 'fa-exclamation-triangle';
			options.fontColor = 'fff';
			options.name = 'Sell';
		}
	}
	
	thisEl = createTooltipBox(thisEl, options);
	
	thisEl.onclick = function(){tooltipClick(type);};
	
	/*
	thisEl.classList.remove('fadeIn');
		//Trigger reflow with trick https://css-tricks.com/restart-css-animation/#article-header-id-0
		void thisEl.offsetWidth;
	thisEl.classList.add('fadeIn');
	
	icon.classList.remove('fadeIn');
		//Trigger reflow with trick https://css-tricks.com/restart-css-animation/#article-header-id-0
		void icon.offsetWidth;
	icon.classList.add('fadeIn');
	*/
	
}	

function createTooltipBox(thisEl, options){
	
	//thisEl.style.boxSizing = 'content-box';
	
	var thickness_factor = 15;												// The scale factor of space->thickness
	var full_height = level.dimensions.cell_height;							// The total height of the element
	var thickness = Math.floor( (full_height / thickness_factor) / 2);		// The thickness of the border, or padding*2
	var box_height = full_height - (5 * thickness);							// The available space for both cells
	var half_height = box_height / 2;										// The height of each cell
	var font_size = Math.floor(0.75 * half_height) + 'px';					// The font size for icon + span
		
	var icon = document.createElement('i');
	icon.classList.add(options.iconClass);
	icon.classList.add(options.iconName);
	icon.style.color = options.fontColor;
	
	icon.style.margin = 0;
	icon.style.padding = thickness + 'px 0 ' + (thickness / 2) + 'px 0 '; //'5px 0 0 0';
	
	icon.style.height = font_size;
	icon.style.width = '100%';
	icon.style.lineHeight = 0;
	
	icon.style.fontSize = font_size;
	
	thisEl.appendChild(icon);
	
	var span = document.createElement('span');
	span.innerHTML = options.name;
	span.style.margin = 0;
	span.style.textAlign = 'center';
	span.style.color = options.fontColor;
	
	span.style.height = font_size;
	span.style.width = '100%';
	span.style.lineHeight = 0;
	
	if (thickness <= 1){ 
		span.style.verticalAlign = 'super'; 
	}else{ 
		span.style.verticalAlign = 'sub'; 
	}
	
	span.style.padding = (thickness / 2) + 'px 0 ' + thickness + 'px 0 ';
	span.style.fontSize = font_size;

	thisEl.appendChild(span);
	
	thisEl.style.background = options.color;	
	thisEl.style.opacity = '0.9';
	thisEl.style.border = thickness + 'px outset #c00';

	thisEl.title = options.name;
	return thisEl;
	
}

function drawUGBoxes(tooltipH, column, row){
	
	// Now boxes added to DOM, customise some of them 
	
	// Middle (back) box
	var midEl = document.getElementById('tooltipH_c2');
	drawTooltipBox(midEl, 'back');
	
	// Left (sell) box
	var leftEl = document.getElementById('tooltipH_c1');
	drawTooltipBox(leftEl, 'sell');
	
	// Right (upgrade) box
	var rightEl = document.getElementById('tooltipH_c3');
	drawTooltipBox(rightEl, 'upgrade');

	//console.log('Show tooltip for ',column,row, );

	var fgCanv = document.getElementById('canvas');
	var fgCtx = fgCanv.getContext('2d');
	
	tooltipH.style.left = ( convertColToX(fgCtx, column - 1, level.dimensions.columns, false) + fgCanv.offsetLeft) + 'px';
	tooltipH.style.top = convertRowToY(fgCtx, row, level.dimensions.rows, false) + 'px';

}
	
function drawBoxes(tooltipH, tooltipV, column, row){
	
	// Now boxes added to DOM, customise some of them 
	
	// Middle (back) box
	var midEl = document.getElementById('tooltipV_r2');
	drawTooltipBox(midEl, 'back');
	
	// Top (gun) box
	var topEl = document.getElementById('tooltipV_r1');
	drawTooltipBox(topEl, 1);
	
	// Bottom (wall) box
	var btmEl = document.getElementById('tooltipV_r3');
	drawTooltipBox(btmEl, 0);
	
	// Left (ice) box
	var leftEl = document.getElementById('tooltipH_c1');
	drawTooltipBox(leftEl, 3);
	
	// Right (bomb) box
	var rightEl = document.getElementById('tooltipH_c3');
	drawTooltipBox(rightEl, 2);

	//console.log('Show tooltip for ',column,row, );

	var fgCanv = document.getElementById('canvas');
	var fgCtx = fgCanv.getContext('2d');
	
	tooltipV.style.left = ( convertColToX(fgCtx, column, level.dimensions.columns, false) + fgCanv.offsetLeft) + 'px';
	tooltipV.style.top = convertRowToY(fgCtx, row - 1, level.dimensions.rows, false) + 'px';

	tooltipH.style.left = ( convertColToX(fgCtx, column - 1, level.dimensions.columns, false) + fgCanv.offsetLeft) + 'px';
	tooltipH.style.top = convertRowToY(fgCtx, row, level.dimensions.rows, false) + 'px';

}

function tooltipClick(type){
	
	if ( (type >= 0) && (type <= 3) ){
		
		showConfirmBuyTooltip(type);
		
	}else{
		if (type == 'back'){
			
			cancelTooltips();
			
		}
		if (type == 'upgrade'){
			
			showConfirmUGTooltip();
			//upgradeSelectedTower();
			
		}
		if (type == 'sell'){
			
			showConfirmSellTooltip();
			
		}
	}
}

function showConfirmSellTooltip(){

	var thisEl = document.getElementById('tooltipH_c1');
	thisEl.innerHTML = null;
	
	//var half_height = Math.floor(0.5 * level.dimensions.cell_height) - 10;
	var options = {};
	options.color = '#ff0';
	options.iconClass = 'fas';
	options.iconName = 'fa-exclamation-triangle';
	options.fontColor = '#000';
	options.name = 'Sell';
	
	thisEl = createTooltipBox(thisEl, options);
	thisEl.childNodes[1].innerHTML = '&pound;' +  game.selectedTower.getSellCost();//getTowerSellCost();

	//thisEl.onclick = function(){ sellTower(); cancelTooltips();};
	
	thisEl.onclick = function(){ window.requestAnimationFrame(towerSellHelper); cancelTooltips(); };
	thisEl.title = 'Confirm sell';
	
}

function towerSellHelper(){
	
	sellTower();
	
}


function showConfirmUGTooltip(){

	var thisEl = document.getElementById('tooltipH_c3');
	thisEl.innerHTML = null;
	
	if (game.selectedTower.level == (default_towers[game.selectedTower.type].maxLevel + game.level) ){
		
		// Upgrade Not Possible - Level Too High!
		var options = {};
		options.color = '#f00';
		options.iconClass = 'fas';
		options.iconName = 'fa-exclamation-triangle';
		options.fontColor = '#fff';
		options.name = 'Max Level Reached!';
		
		thisEl = createTooltipBox(thisEl, options);
		thisEl.childNodes[1].innerHTML = 'MAX LEVEL';
		thisEl.onclick = function(){ showModal('Max Level Reached!',0); cancelTooltips(); };
		thisEl.title = 'Max Level Reached!';
		
	}else{
		
		var options = {};
		options.color = '#0c0';
		options.iconClass = 'far';
		options.iconName = 'fa-check-square';
		options.fontColor = '#fff';
		options.name = 'Upgrade';
		
		thisEl = createTooltipBox(thisEl, options);
		thisEl.childNodes[1].innerHTML = '&pound;' + game.selectedTower.getUGCost();

		thisEl.onclick = function(){ checkUGTower(); cancelTooltips(); };
		thisEl.title = 'Confirm upgrade';
		
	}
	
}

function showConfirmBuyTooltip(type){
	
	var thisEl;
	switch (type){
		
		case 0:
			// Bottom (wall) box
			thisEl = document.getElementById('tooltipV_r3');
			break;
		case 1:
			// Top (gun) box
			thisEl = document.getElementById('tooltipV_r1');
			break;
		case 2:
			// Right (bomb) box
			thisEl = document.getElementById('tooltipH_c3');
			break;
		case 3:
			// Left (ice) box
			thisEl = document.getElementById('tooltipH_c1');
			break;
	}
	
	thisEl.innerHTML = null;

	var options = {};
	options.color = '#0c0';
	options.iconClass = 'far';
	options.iconName = 'fa-check-square';
	options.fontColor = '#fff';
	options.name = 'Upgrade';
	
	thisEl = createTooltipBox(thisEl, options);
	thisEl.childNodes[1].innerHTML = '&pound;' + default_towers[type].cost;
	
	game.selectedType = type;
	
	thisEl.onclick = function(){ window.requestAnimationFrame(towerAddHelper); cancelTooltips(); };
	thisEl.title = 'Confirm tower';
	
}

function towerAddHelper(){
	
	addNewTower(game.selectedType, game.selectedCell[0], game.selectedCell[1], level.newPathLen); 
	
}

function cancelTooltips(){
	
	//console.log('cancelling tooltips');
	var tooltipH = document.getElementById('tooltipH');
	tooltipH.style.display = 'none';
	tooltipH.style.visibility = 'hidden';
	var tooltipV = document.getElementById('tooltipV');
	tooltipV.style.display = 'none';
	tooltipV.style.visibility = 'hidden';
}

// Vertical tooltip - on top
function drawTooltipV(tooltipV){
	
	tooltipV.id = 'tooltipV';
	tooltipV.style.position = 'absolute';
	tooltipV.style.border = '1px solid green';
	//tooltipV.style.background = '#a0b';
	tooltipV.style.zIndex = 20;
	tooltipV.style.visibility = 'visible';
	var t_width = level.dimensions.cell_width;
	tooltipV.style.width = t_width + 'px';
	var t_height = level.dimensions.cell_height * 3;
	tooltipV.style.height = t_height + 'px';
	tooltipV.style.padding = 0;
	
	for (var r = 1; r <= 3; r++){

		var box = document.createElement('div');
		var id = 'tooltipV_r' + r;
		box.id = id;
		box.style.width = ( (t_width) - 0.75) + 'px';
		box.style.height = ( (t_height / 3) - 0.75) + 'px';
		box.style.margin = 'auto auto';
		box.style.padding = 0;
		box.style.position = 'relative';
		box.style.cssFloat = 'left';
		box.style.border = '1px solid white';
		tooltipV.appendChild(box);
		
	}
	
	return tooltipV;
}

// Horizontal tooltip - underneath
function drawTooltipH(tooltipH){
	
	tooltipH.id = 'tooltipH';
	tooltipH.style.position = 'absolute';
	tooltipH.style.border = '1px solid green';
	tooltipH.style.zIndex = 19;
	tooltipH.style.visibility = 'visible';
	var t_width = level.dimensions.cell_width * 3;
	tooltipH.style.width = t_width + 'px';
	var t_height = level.dimensions.cell_height;
	tooltipH.style.height = t_height + 'px';
	tooltipH.style.padding = 0;
	
	for (var c = 1; c <= 3; c++){
			
		var box = document.createElement('div');
		var id = 'tooltipH_c' + c;
		box.id = id;
		box.style.width = ( (t_width / 3) - 0.75) + 'px';
		box.style.height = ( (t_height ) - 0.75) + 'px';
		box.style.margin = 'auto auto';
		box.style.padding = 0;
		box.style.position = 'relative';
		box.style.cssFloat = 'left';
		box.style.border = '1px solid white';
		tooltipH.appendChild(box);
		
	}
	
	return tooltipH;
}
