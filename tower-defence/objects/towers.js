function Tower(level, type, col, row, column, r, rot_speed, bullet_speed, fire_rate, range, cost){
	this.level = level || 1,
	this.type = type || 0,
	this.col = col || '#f00',
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
	this.cost = cost || options.tower_cost,
	this.flag = false
}

Tower.prototype.update = function(timestamp){
	
	if(!this.prevTime){
		this.prevTime = timestamp;
	}
	var elapsed = calcElapsed(timestamp, this.prevTime);
	this.prevTime = timestamp;

	if (this.delay >= 0){
		
		// Reloading
		this.delay -= elapsed;// * current.elapsedFactor;

	}else{

		// Check for enemies in range
		for (var enemy in enemies){
			var targetX = enemies[enemy].x;
			var targetY = enemies[enemy].y;
			var centreX = convertColToX(ctx, this.row, current.columns, true);
			var centreY = convertRowToY(ctx, this.column, current.rows, true);

			var dist = Math.sqrt( Math.pow(targetX - centreX, 2) + Math.pow(targetY - centreY, 2) );

			var convertedRange = (this.range * current.cell_width);
			
			if ( ( dist <= convertedRange) && (this.delay <= 0) ){
				
				// NEW BULLET TARGETING SYSTEM
				var bulletTargetPos = getTargetingPos(ctx, centreX, centreY, targetX, targetY);
					//console.log(bulletTargetPos);
				var bullet = new Bullet(options.damageFactor * Math.pow(this.level,2), this.type, '#00f', centreX, centreY, this.level, bulletTargetPos.x, bulletTargetPos.y, this.bullet_speed, this.level * 20, centreX, centreY, convertedRange);
				
				//				 Bullet(damage, 					type, 		col, 	x, 		y, 		r,  targetX, targetY, speed, 			 lifespan, srcX, srcY){
				//var bullet = new Bullet(options.damageFactor * Math.pow(this.level,2), this.type, '#00f', centreX, centreY, 2, targetX, targetY, this.bullet_speed, 25, 	centreX, centreY);
				bullets.push(bullet);
				this.delay = this.fire_rate * options.fireRateFactor;
			}
		}
		
	}
}

Tower.prototype.draw = function(ctx){
	var targetR = this.row;
	var targetC = this.column;
	var drawX = current.cell_width * targetR;
	var drawY = current.cell_height * targetC;
	ctx.beginPath();
	ctx.fillStyle = this.col;
	ctx.fillRect(drawX, drawY, current.cell_width, current.cell_height);
	ctx.fill();
	ctx.fillStyle = 'black';
	ctx.font = Math.floor(current.cell_width) + "px Arial";
	ctx.fillText(this.level,drawX + (current.cell_width / 4), drawY + (0.9 * current.cell_height));
	ctx.closePath();
	ctx.restore();
	if (debug){
		var convertedRange = (this.range * current.cell_width);
		ctx.strokeStyle = '#0f0';
		ctx.beginPath();
		ctx.arc(drawX + (current.cell_width/2), drawY + (current.cell_height / 2), convertedRange, 0, 2*Math.PI, false);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}
 
/* ----------------------------------- */
// Some helper functions for the Tower Upgrade Modals

function getTowerModalBody(){
	var tower = current.tower;
	if (current.tower == false){ return false };
	var t_level = tower.level;
	//var t_type = tower.type;
	var modal_text = 'Current Level: ' + t_level + '<br>';
		//modal_text += 'Type: ' + t_type + '<br>';
		modal_text += 'Position: ' + tower.column + ', ' + tower.row;
	return modal_text;
}

function getTowerUGCost(){
	var tower = current.tower;
	var t_ug_cost = 10 * Math.pow(tower.level, 2);
	return t_ug_cost;
}

function getTowerSellCost(){
	var tower = current.tower;
	var t_sell_cost = Math.floor(tower.cost / 2);
	return t_sell_cost;
}

function sellTower(){
	
	for (var t in towers){
		if (towers[t] == current.tower){
			towerId = t;
		}
	}
	var thisCol = towers[towerId].row;
	var thisRow = towers[towerId].column;
	
	current.grid[thisCol][thisRow] = 0;
	current.path = plotPath(current.grid, current.start, current.end);

	towers.splice(towerId, 1);
	
	clearCanvas(ctx);
	draw_map(ctx);
	draw_path(ctx,current.grid,current.path);
	
	current.cash += getTowerSellCost();
	
	current.tower = false;
	closeModal();
}

function checkUGTower(){

	if (current.cash >= getTowerUGCost() ){
		towerUpgrade(current.tower);
	}else{
		showModal('Upgrade Too Expensive',0);
	}
	
}

function towerUpgrade(thisTower){
	
	closeModal();
	current.cash -= getTowerUGCost();
	
	for (var t in towers){
		if (towers[t] == thisTower){
			towerId = t;
		}
	}
	
	towers[towerId].level += 1;
	towers[towerId].rot_speed *= 1.2;
	towers[towerId].bullet_speed *= 1.5;
	towers[towerId].fire_rate *= 1.5;
	towers[towerId].delay = towers[towerId].fire_rate * 10;
	towers[towerId].range *= 1.2;
	
	var t_ug_cost = 10 * Math.pow(towers[towerId].level, 2);
	towers[towerId].cost = t_ug_cost;
	
	current.tower = towers[towerId];
	showTowerModal();
}
