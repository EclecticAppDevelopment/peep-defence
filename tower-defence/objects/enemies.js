function Enemy(level, type, color, x, y, r, speed, delay, maxHP, shield){
	this.level = level || 0,
	this.type = type || 0,
	this.color = color || '#f00',
	this.x = x || 0,
	this.y = y || 0,
	this.r = r || 5,
	this.speed = speed || 0.1,
	this.delay = delay || 0,
	this.prevTime = 0,
	this.maxHP = maxHP || 1,
	this.currentHP = this.maxHP,
	this.shield = shield || 0,
	this.path_index = 1,
	this.flag = false
}

Enemy.prototype.update = function(timestamp){
	
	//elapsed = 5;
	if(!this.prevTime){
		this.prevTime = timestamp;
	}
	var elapsed = calcElapsed(timestamp,this.prevTime);
	this.prevTime = timestamp;
	//console.log('Updating Enemy',elapsed);
	
	if (this.currentHP <= 0){
		//console.log('Enemy died!');
		current.score += this.level;
		current.cash += this.level * options.cashFactor;
		return false;
	}
	
	if (this.delay > 0){
		
		// Queued to spawn
		this.delay -= elapsed;// * current.elapsedFactor;
		
	}else{
		
		// Move along path
		var targetR = current.path[this.path_index][1];
		var targetC = current.path[this.path_index][0];
		var targetX = current.cell_width * targetR + (current.cell_width / 2);
		var targetY = current.cell_height * targetC + (current.cell_height / 2);
		
		var dist = Math.sqrt( Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2) );

		// If enemy has reached path point
		if (dist < this.r){
			
			// Move to next path point
			this.path_index++;
			
			// Check if final point
			if (this.path_index == current.path.length){
				
				reduceHealth(this.level);
				return false;
				
			}else{
				
				// Re-target to new point
				var targetR = current.path[this.path_index][1];
				var targetC = current.path[this.path_index][0];
				var targetX = current.cell_width * targetR + (current.cell_width / 2);
				var targetY = current.cell_height * targetC + (current.cell_height / 2);
				var dist = Math.sqrt( Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2) );
				
			}
		}
		
		// Move towards next path point
		var xDir = (targetX - this.x) / dist;
		var yDir = (targetY - this.y) / dist;
		//elapsed = 1;
		//this.x += Math.floor( xDir * this.speed * elapsed * options.enemySpeedFactor);
		this.x += xDir * this.speed * elapsed * options.enemySpeedFactor;
		//this.y += Math.floor( yDir * this.speed * elapsed * options.enemySpeedFactor);
		this.y += yDir * this.speed * elapsed * options.enemySpeedFactor;
	}
	return true;
}

Enemy.prototype.draw = function(ctx){
	switch (this.type){
		case 0:
			// Basic - Circle
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
			ctx.fill();
			ctx.closePath();
			break;
		case 1:
			// Tough - Square
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.fillRect(this.x - (this.r / 2), this.y - (this.r / 2), this.r, this.r);
			ctx.fill();
			ctx.closePath();
			break;
		case 2:
			// Fast - triangle
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
			ctx.fill();
			ctx.closePath();
			break;
	}
	// Draw health bar
	//drawHealthBar(ctx, this.x, this.y, this.r, this.currentHP, this.maxHP);
	
}

function drawHealthBar(ctx, x, y, r, val, max){
	console.log('drawHealthBar',x, y, r, val, max);
	var percent = (val / max);
	var health_wid = Math.floor(percent * r);
	var health_hgt = 5;
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.fillRect(this.x - (this.r / 2), this.y, this.r, health_hgt);
	ctx.fill();
	ctx.fillStyle = 'green';
	ctx.fillRect(this.x - (this.r / 2), this.y, health_wid, health_hgt);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

function generateOneEnemy(type,level){
	var enemy = new Enemy();
	enemy.type = type;
	enemy.level = level;
	
	// Pickup from defaults/enemies.js
	enemy.r = enemy_type_defaults[type].radius;
	enemy.color = enemy_type_defaults[type].color;
	
	enemy.speed = level * enemy_type_defaults[type].speed;	
	enemy.maxHP = options.enemyHealthFactor * level * enemy_type_defaults[type].maxHP;
	enemy.currentHP = enemy.maxHP;
	enemy.shield = level * enemy_type_defaults[type].shield;

	return enemy;
}

function generateWave(wave,spawn_x,spawn_y){
	
	waveInfo = waveMaps[wave];
	waveDelay = waveInfo.wave_delay;	//Added to all enemies in subwave 1-n
	waveCount = waveInfo.enemies.length;
	
	for (var i = 0; i < waveCount; i++){
		
		subwaveInfo = waveInfo.enemies[i];
		subwaveCount = subwaveInfo.count;
		subwaveDelay = subwaveInfo.subwave_delay;
		
		subwaveType = subwaveInfo.type;
		subwaveLevel = subwaveInfo.level;
		
		for (var j = 0; j < subwaveCount; j++){
			
			var newEnemy = generateOneEnemy(subwaveType,subwaveLevel);
			newEnemy.x = spawn_x;
			newEnemy.y = spawn_y;			
			newEnemy.delay = (j * subwaveDelay) + (i * waveDelay);
			
			enemies.push(newEnemy);
			
		}
		
	}
	//console.log(enemies);
	current.enemyCount = enemies.length;
	window.requestAnimationFrame(mainLoop);

}

function OLDgenerateEnemies(wave,spawn_x,spawn_y){
	
	waveInfo = waveMaps[wave];
	//console.log(wave,waveInfo);
	waveEnemies = waveInfo.enemies;
	waveDelay = waveInfo.wave_delay;	//Added to all enemies in subwave 1-n
	waveCount = waveInfo.enemies.length;
	
	for (var i = 0; i < waveCount; i++){
		
		subwaveInfo = waveInfo.enemies[i];
		subwaveCount = subwaveInfo.count;
		subwaveDelay = subwaveInfo.subwave_delay;
		
		for (var j = 0; j < subwaveCount; j++){
			
			// Trick is each enemy's delay
			// part one is j * subwave_delay - from 0 to maxDelay
			// and also i * wave_delay - from 0 to largerDelay
			var thisEnemyDelay = (j * subwaveDelay) + (i * waveDelay);
			enemies.push( new Enemy(
				subwaveInfo.level, 
				subwaveInfo.type, 
				subwaveInfo.color,
				spawn_x, 
				spawn_y, 
				subwaveInfo.radius, 
				subwaveInfo.speed, 
				thisEnemyDelay,
				subwaveInfo.maxHP, 
				subwaveInfo.shield
			));
		}
		
	}
	
	window.requestAnimationFrame(mainLoop);

}
