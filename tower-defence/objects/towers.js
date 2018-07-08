function Tower(level, type, color, row, column, r, rot_speed, bullet_speed, fire_rate, range, cost, upgradeFact){
	this.level = level || 1,
	this.type = type || 0,
	this.color = color || '#f00',
	this.row = row || 0,
	this.column = column || 0,
	this.r = r || 5,
	this.rot_speed = rot_speed || 0.1,
	this.bullet_speed = bullet_speed || 2,
	this.fire_rate = fire_rate || 0.1,
	this.delay = this.fire_rate * 10,
	this.range = range || 10,
	this.prevTime = 0,
	this.target_index = 0,
	this.cost = cost || default_towers[this.type].cost,
	this.upgradeFact = upgradeFact || 1.5,
	this.flag = false,
	this.name = default_towers[this.type].name,
	this.tooltip = default_towers[this.type].tooltip,
	this.upgrades = default_towers[this.type].upgrades()
}

Tower.prototype.getSellCost = function(){
	//console.log('Sell calc:',this.cost, Math.floor(this.cost / 2));
	return Math.floor(this.cost / 2);
}

Tower.prototype.getUGCost = function(){
	//console.log('UG calc:',this.level, Math.floor(default_towers[this.type].cost * Math.pow(this.upgradeFact,this.level + 1)));
	return Math.floor(default_towers[this.type].cost * Math.pow(this.upgradeFact, this.level + 1));
}


Tower.prototype.update = function(timestamp){
	
	if (this.type == 0){ return false; }		// WALL - skip
	
	if(!this.prevTime){
		this.prevTime = timestamp;
	}
	var elapsed = calcElapsed(timestamp, this.prevTime);
	this.prevTime = timestamp;

	if (this.delay >= 0){
		
		// Reloading
		this.delay -= elapsed;// * current.elapsedFactor;

	}else{

		var fgCtx = document.getElementById('canvas').getContext('2d');
		var convertedRange = (this.range * level.dimensions.cell_width);

		// Check for enemies in range
		for (var enemy in enemies){
			
			var targetX = enemies[enemy].x;
			var targetY = enemies[enemy].y;
			var centreX = convertColToX(fgCtx, this.row, level.dimensions.columns, true);
			var centreY = convertRowToY(fgCtx, this.column, level.dimensions.rows, true);

			var dist = Math.sqrt( Math.pow(targetX - centreX, 2) + Math.pow(targetY - centreY, 2) );
			
			if ( (dist <= convertedRange) && (this.delay <= 0) && (enemies[enemy].delay <= 0) ){
				
				// NEW BULLET TARGETING SYSTEM
				var bulletTargetPos = getTargetingPos(fgCtx, centreX, centreY, targetX, targetY);
					//console.log(bulletTargetPos);
				
				var bullet = new Bullet(
					defaults.damageFactor * Math.pow(this.level,2), // damage
					this.type, 										// type
					this.color, 									// col
					centreX, 										// x
					centreY, 										// y
					2, 												// r
					bulletTargetPos.x, 								// targetX
					bulletTargetPos.y, 								// targetY
					this.bullet_speed, 								// speed
					this.level * 15, 								// lifespan
					centreX, 										// srcX
					centreY, 										// srcY
					convertedRange									// range
				);
				
				bullets.push(bullet);
				this.delay = this.fire_rate / defaults.fireRateFactor;
			}
		}
		
	}
}

Tower.prototype.draw = function(ctx){
	
	ctx.save();
	/* GET ROW, COLUMN AND CALCULATE X, Y */
	var targetR = this.row;
	var targetC = this.column;
	var drawX = level.dimensions.cell_width * targetR;
	var drawY = level.dimensions.cell_height * targetC;
	
	switch(this.type){
		
		case 0:
		
			/* DRAW FOUNDATIONS BORDER BOX */	
			ctx.beginPath();
			ctx.rect(drawX, drawY, level.dimensions.cell_width, level.dimensions.cell_height);
			ctx.stroke();
			
			/* DRAW FOUNDATIONS BOTTOM LEFT TRIANGLE */	
			ctx.fillStyle = '#111';	// Dark grey
			ctx.moveTo(drawX, drawY);
			ctx.lineTo(drawX + level.dimensions.cell_width, drawY + level.dimensions.cell_height);
			ctx.lineTo(drawX, drawY + level.dimensions.cell_height);
			ctx.lineTo(drawX, drawY);
			ctx.fill();
			
			/* DRAW FOUNDATIONS TOP RIGHT BOX */	
			ctx.fillStyle = '#333';
			ctx.moveTo(drawX, drawY);
			ctx.lineTo(drawX + level.dimensions.cell_width, drawY + level.dimensions.cell_height);
			ctx.lineTo(drawX + level.dimensions.cell_width, drawY);
			ctx.lineTo(drawX, drawY);
			ctx.fill();
			
			/* DRAW FOUNDATIONS CROSS THROUGH */	
			ctx.moveTo(drawX, drawY);
			ctx.lineTo(drawX + level.dimensions.cell_width, drawY + level.dimensions.cell_height);
			ctx.moveTo(drawX, drawY + level.dimensions.cell_height);
			ctx.lineTo(drawX + level.dimensions.cell_width, drawY);
			
			/* DRAW FOUNDATIONS CENTER BOX */	
			ctx.fillStyle = '#eee';
			ctx.fillRect(drawX + (0.25 * level.dimensions.cell_width), drawY + (0.25 * level.dimensions.cell_height), (0.5 * level.dimensions.cell_width), (0.5 * level.dimensions.cell_height));
			
			break;
			
		case 1:
		
		// GUN TOWER
			/* DRAW TOWER FILLED BOX */	
			ctx.save();
			ctx.beginPath();
			var grd=ctx.createLinearGradient(drawX, drawY, drawX + level.dimensions.cell_width, drawY + level.dimensions.cell_height);
			grd.addColorStop(0,this.color);
			grd.addColorStop(1,"#000");
			ctx.fillStyle = grd;
			ctx.fillRect(drawX, drawY, level.dimensions.cell_width, level.dimensions.cell_height);
			//ctx.fill();
			
			/* DRAW BORDER */
			ctx.strokeStyle = '#000';
			ctx.rect(drawX, drawY, level.dimensions.cell_width, level.dimensions.cell_height);
			
			var padding = 0.05;
			var box_w = 1 - (2 * padding);
			ctx.fillStyle = '#eb0';
			ctx.fillRect(drawX + (padding * level.dimensions.cell_width), drawY + (padding * level.dimensions.cell_height), box_w * level.dimensions.cell_width, box_w * level.dimensions.cell_height);
			
			padding = 0.1;
			box_w = 1 - (2 * padding);
			ctx.fillStyle = '#dc0';
			ctx.fillRect(drawX + (padding * level.dimensions.cell_width), drawY + (padding * level.dimensions.cell_height), box_w * level.dimensions.cell_width, box_w * level.dimensions.cell_height);
			
			padding = 0.15;
			box_w = 1 - (2 * padding);
			ctx.fillStyle = '#eee';
			ctx.fillRect(drawX + (padding * level.dimensions.cell_width), drawY + (padding * level.dimensions.cell_height), box_w * level.dimensions.cell_width, box_w * level.dimensions.cell_height);
			//ctx.stroke();
			
			/* DRAW TOWER LEVEL */
			ctx.fillStyle = 'black';
			ctx.font = Math.floor(level.dimensions.cell_width) + "px Arial";
			ctx.fillText(this.level,drawX + (level.dimensions.cell_width / 5), drawY + (0.85 * level.dimensions.cell_height));
			ctx.closePath();
			//ctx.restore();
			
			/* DRAW TOWER RANGE */
			if (debug){
				var convertedRange = (this.range * level.dimensions.cell_width);
				ctx.strokeStyle = '#0f0';
				ctx.beginPath();
				ctx.arc(drawX + (level.dimensions.cell_width/2), drawY + (level.dimensions.cell_height / 2), convertedRange, 0, 2*Math.PI, false);
				ctx.stroke();
				ctx.closePath();
				
			}
			ctx.restore();
			break;
			
		case 2:
		
			// BLAST TOWER
			/* DRAW TOWER FILLED BOX */	
			ctx.save();
			ctx.beginPath();
			var grd=ctx.createLinearGradient(drawX, drawY, drawX + level.dimensions.cell_width, drawY + level.dimensions.cell_height);
			grd.addColorStop(0,this.color);
			grd.addColorStop(1,"#000");
			ctx.fillStyle = grd;
			ctx.fillRect(drawX, drawY, level.dimensions.cell_width, level.dimensions.cell_height);
			//ctx.fill();
			
			/* DRAW BORDER */
			ctx.strokeStyle = '#000';
			ctx.rect(drawX, drawY, level.dimensions.cell_width, level.dimensions.cell_height);
			ctx.stroke();
			ctx.closePath();

			/* BLAST CIRCLES */
			//ctx.strokeStyle = '#000';
			//ctx.lineWidth = 1;
			
			ctx.beginPath();
			ctx.moveTo(drawX + (level.dimensions.cell_width), drawY + (level.dimensions.cell_height / 2));
			ctx.fillStyle = '#111';
			ctx.arc(drawX + (level.dimensions.cell_width / 2), drawY + (level.dimensions.cell_height / 2), (0.5 * level.dimensions.cell_width), 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.fillStyle = '#333';
			ctx.arc(drawX + (level.dimensions.cell_width / 2), drawY + (level.dimensions.cell_height / 2), (0.45 * level.dimensions.cell_width), 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.fillStyle = '#eee';
			ctx.arc(drawX + (level.dimensions.cell_width / 2), drawY + (level.dimensions.cell_height / 2), (0.4 * level.dimensions.cell_width), 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
			
			ctx.beginPath();
			/* DRAW TOWER LEVEL */
			ctx.fillStyle = 'black';
			ctx.font = Math.floor(level.dimensions.cell_width) + "px Arial";
			ctx.fillText(this.level,drawX + (level.dimensions.cell_width / 5), drawY + (0.85 * level.dimensions.cell_height));
			ctx.closePath();
			
			
			/* DRAW TOWER RANGE */
			if (debug){
				var convertedRange = (this.range * level.dimensions.cell_width);
				ctx.strokeStyle = '#0f0';
				ctx.beginPath();
				ctx.arc(drawX + (level.dimensions.cell_width/2), drawY + (level.dimensions.cell_height / 2), convertedRange, 0, 2*Math.PI, false);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
			}
			ctx.restore();
			break;
			
			
		case 3:
		
			// ICE TOWER
			/* DRAW TOWER FILLED BOX */	
			ctx.save();
			ctx.beginPath();
			//ctx.restore();
			var grd=ctx.createLinearGradient(drawX, drawY, drawX + level.dimensions.cell_width, drawY + level.dimensions.cell_height);
			grd.addColorStop(0,this.color);
			grd.addColorStop(1,"#000");
			ctx.fillStyle = grd;
			ctx.fillRect(drawX, drawY, level.dimensions.cell_width, level.dimensions.cell_height);
			//ctx.fill();
			
			/* DRAW BORDER */
			ctx.strokeStyle = '#000';
			ctx.rect(drawX, drawY, level.dimensions.cell_width, level.dimensions.cell_height);
			ctx.stroke();
			ctx.closePath();
			
			/* ICE DIAMOND BOX */
			ctx.beginPath();
			ctx.strokeStyle = '#00f';
			ctx.fillStyle = '#eee';
			//ctx.lineWidth = 5;
			ctx.moveTo(drawX , drawY + (level.dimensions.cell_height / 2));
			ctx.lineTo(drawX + (level.dimensions.cell_width / 2), drawY);
			ctx.lineTo(drawX + (level.dimensions.cell_width), drawY + (level.dimensions.cell_height / 2));
			ctx.lineTo(drawX + (level.dimensions.cell_width / 2), drawY + (level.dimensions.cell_height));
			ctx.lineTo(drawX , drawY + (level.dimensions.cell_height / 2));
			ctx.stroke();
			ctx.fill();
			ctx.closePath();
			
			/* DRAW TOWER LEVEL */
			ctx.fillStyle = 'black';
			ctx.font = Math.floor(level.dimensions.cell_width) + "px Arial";
			ctx.fillText(this.level,drawX + (level.dimensions.cell_width / 5), drawY + (0.85 * level.dimensions.cell_height));
			ctx.closePath();
			//ctx.restore();
			
			/* DRAW TOWER RANGE */
			if (debug){
				var convertedRange = (this.range * level.dimensions.cell_width);
				ctx.strokeStyle = '#0f0';
				ctx.beginPath();
				ctx.arc(drawX + (level.dimensions.cell_width/2), drawY + (level.dimensions.cell_height / 2), convertedRange, 0, 2*Math.PI, false);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
			}
			ctx.restore();
			break;
	}
	ctx.restore();
}
 
function buyWall(column, row){
	addNewTower(0, column, row, level.newPathLen, default_towers[0].cost);
}

function buyTowerType(type){
	addNewTower(type, game.selectedTower.column, game.selectedTower.tower.row, level.newPathLen, default_towers[type].cost);
}


function sellTower(){
	
	for (var t in towers){
		if (towers[t] == game.selectedTower){
			towerId = t;
		}
	}
	var thisCol = towers[towerId].row;
	var thisRow = towers[towerId].column;
	
	level.grid[thisCol][thisRow] = 0;
	level.path = plotPath(level.grid, level.start, level.end);
	
	game.cash += towers[towerId].getSellCost();//getTowerSellCost();
	
	towers.splice(towerId, 1);

	// Need to clear this canvas after tower sell!	
	var bgCtx = document.getElementById('bgCanvas').getContext('2d');
	fillCanvas(bgCtx);
	draw_map(bgCtx);
	draw_styled_path(bgCtx, level.grid, level.path, 1);
	
	draw_towers(bgCtx);	// New - shows tower levels after update and not in mainLoop
	//current.gridUpdated = true;
	
	updateGUI();

	game.selectedTower = false;
	cancelTooltips();
}

function checkUGTower(){

	//if (game.cash >= getTowerUGCost() ){
	if (game.cash >= game.selectedTower.getUGCost() ){
		towerUpgrade(game.selectedTower);
	}else{
		showModal('Upgrade Too Expensive',0);
	}
	
}

function draw_towers(ctx){
	
	for (var tower in towers){
		
		towers[tower].draw(ctx);

	}
	
}

function towerUpgrade(thisTower){
	
	//closeModal();
	
	
	for (var t in towers){
		if (towers[t] == thisTower){
			towerId = t;
		}
	}
	
	game.cash -= towers[towerId].getUGCost();
	towers[towerId].cost += towers[towerId].getUGCost();
	
	towers[towerId].level += 1;
	//towers[towerId].rot_speed *= towers[towerId].upgrades.speedFact;
	//towers[towerId].bullet_speed = Math.floor(towers[towerId].bullet_speed *= towers[towerId].upgrades.speedFact);
	//towers[towerId].fire_rate = Math.floor(towers[towerId].fire_rate /= towers[towerId].upgrades.rateFact);
	//towers[towerId].delay = Math.floor(towers[towerId].delay = towers[towerId].fire_rate * 10);
	//towers[towerId].range = Math.floor(towers[towerId].range *= towers[towerId].upgrades.rangeFact);
	towers[towerId].bullet_speed *= towers[towerId].upgrades.speedFact;
	towers[towerId].fire_rate /= towers[towerId].upgrades.rateFact;
	towers[towerId].delay = towers[towerId].fire_rate * 10;
	towers[towerId].range *= towers[towerId].upgrades.rangeFact;
	
	game.selectedTower = towers[towerId];

	var bgCtx = document.getElementById('bgCanvas').getContext('2d');
	fillCanvas(bgCtx);
	draw_map(bgCtx);
	draw_styled_path(bgCtx, level.grid, level.path, 1);
	
	draw_towers(bgCtx);
	
	updateGUI();

	//showTowerModal();
}

function addNewTower(type, column, row, newPathLen){
	
	
	var newTower = new Tower( 
		1, 								// level
		type, 							// type
		default_towers[type].color,		// color
		column, 						// column
		row, 							// row
		level.dimensions.cell_width, 	// r
		default_towers[type].rot_speed,	// rot_speed
		default_towers[type].bullet_speed,// bullet_speed
		default_towers[type].fire_rate,	// fire_rate
		default_towers[type].range, 	// range
		default_towers[type].cost,		// cost
		default_towers[type].upgradeFact);	// the exponent for upgrade costs
		
	var tower_cost = newTower.cost;

	if (game.cash >= tower_cost){
		
		// ADD A TOWER
		
		// Update the grid and enemy path
		level.grid[column][row] = 1;
		var prevPathLen = level.path.length;
		level.path = plotPath(level.grid, level.start, level.end);
		
		//level.gridUpdated = true;
		
		//console.log('Styled path');
		//draw_styled_path(bgCtx, current.grid, current.path, 1);
		
		// Update enemy paths
		var pathDiff = newPathLen - prevPathLen;
		if (pathDiff !== 0){
			
			// TESTING - quickly prevent mainLoop firing on path change!
			window.cancelAnimationFrame(mainLoopRequest);
			
			for (var enemy in enemies){
				var prevPathIndex = enemies[enemy].path_index;
				var progress = (prevPathIndex + 1) / prevPathLen;
				var newPathIndex = Math.min(Math.floor(newPathLen * progress),level.path.length - 1);;
				//console.log('Path len changed O,N,%,LEN: ',prevPathIndex,newPathIndex,progress,level.path.length)
				enemies[enemy].path_index = newPathIndex;
				
			}
			
			// Once processed, kick the mainLoop back into action
			mainLoopRequest = window.requestAnimationFrame(mainLoop);
		
		}

		game.cash -= tower_cost;
		
		towers.push(newTower);
		
		// TESTING DOUBLE TOWER COST
		//game.tower_cost *= 2;
		
			// Need to clear this canvas after tower sell?	
		var bgCtx = document.getElementById('bgCanvas').getContext('2d');
		fillCanvas(bgCtx);
		draw_map(bgCtx);
		draw_styled_path(bgCtx, level.grid, level.path, 1);
		
		draw_towers(bgCtx);	// New - shows tower levels after update and not in mainLoop

		updateGUI();
		
		
		
		//current.gridUpdated = true;
	
	}else{
				
		level.grid[column][row] = 0;
		showModal('Tower Too Expensive',0);
		var detailSpan = document.getElementById('modal-detail');
		detailSpan.innerHTML = tower_cost;
				
	}
	
}




/*function getTowerUGCost(){
	var tower = game.selectedTower;
	var t_ug_cost = 10 * Math.pow(tower.level, 2);
	return t_ug_cost;
}

function getTowerSellCost(){
	var tower = game.selectedTower;
	var t_sell_cost = Math.floor(tower.cost / 2);
	return t_sell_cost;
}*/


/* ----------------------------------- 
// Some helper functions for the Tower Upgrade Modals

function getTowerModalBody(){
	var tower = game.selectedTower;
	if (game.selectedTower == false){ return false };
	var t_level = tower.level;
	//var t_type = tower.type; 
	var modal_text = 'Current Level: ' + t_level + '<br>';
		//modal_text += 'Type: ' + t_type + '<br>';
		modal_text += 'Tower Type: ' + tower.name + '<br>';
		modal_text += 'Position: ' + tower.column + ', ' + tower.row;
	return modal_text;
}

function getWallModalBody(){
	var tower = current.tower;
	if (current.tower == false){ return false };

	var modal_text = 'Upgrade this wall to a tower!<br>';

		modal_text += 'Position: ' + tower.column + ', ' + tower.row;
		
		modal_text += '<div class="w3-row">' +
			
			'<div class="w3-col s4">' +
				'<button class="w3-button w3-grey" onclick="buyTowerType(1)">Buy Gun Tower</button>' +	
			'</div>' +
			
			'<div class="w3-col s4">' +
				'<button class="w3-button w3-blue" onclick="buyTowerType(2)">Buy Ice Tower</button>' +	
			'</div>' +
			
			'<div class="w3-col s4">' +
				'<button class="w3-button" onclick="buyTowerType(3)">Buy Blast Tower</button>' +	
			'</div>' +
			
		'</div>';
	
	return modal_text;
}
*/
