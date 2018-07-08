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
	this.flag = false,
	this.slowed = false,
	this.slowHits = 0
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
		game.score += this.level;
		game.cash += this.level * (this.type + 1) * defaults.cashFactor;
		return false;
	}
	
	if (this.delay > 0){
		
		// Queued to spawn
		this.delay -= elapsed;// * current.elapsedFactor;
		
	}else{
		
		// QUICK CHECK - WINDOW MINIMIZE CAUSES ENEMIES TO JUMP OFF SCREEN 
		if (	
			(this.x > level.dimensions.width) || (this.x < 0) 
				||
			(this.y > level.dimensions.height) || (this.y < 0)
		){
			
			// RESET BACK TO THE START POINT - PLAYERS NOT DISADVANTAGED BY THIS ERROR
			targetR = level.path[0][0];
			targetC = level.path[0][1];
			
			this.x = level.dimensions.cell_width * targetR + (level.dimensions.cell_width / 2);
			this.y = level.dimensions.cell_height * targetC + (level.dimensions.cell_height / 2);
			
			console.log('AGGRESSIVE CHECK - REVERT ENEMY TO START POINT');
			
			// Then carry on processing as normal
			return true;
		}
		
		if (this.type == ENEMY_TYPE_AIR){
			
			// Ignore path
			var targetR = level.path[level.path.length - 1][1];
			var targetC = level.path[level.path.length - 1][0];
			
		}else{
		
			// Move along path
			var targetR = level.path[this.path_index][1];
			var targetC = level.path[this.path_index][0];
			
		}
		
		var targetX = level.dimensions.cell_width * targetR + (level.dimensions.cell_width / 2);
		var targetY = level.dimensions.cell_height * targetC + (level.dimensions.cell_height / 2);
		
		var dist = Math.sqrt( Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2) );

		// If enemy has reached path point
		if (dist < this.r){
			
			// Move to next path point
			this.path_index++;
			
			// Check if final point
			if (this.path_index == level.path.length){
				
				reduceHealth(this.level);
				return false;
				
			}else{
				
				// Re-target to new point
				var targetR = level.path[this.path_index][1];
				var targetC = level.path[this.path_index][0];
				var targetX = level.dimensions.cell_width * targetR + (level.dimensions.cell_width / 2);
				var targetY = level.dimensions.cell_height * targetC + (level.dimensions.cell_height / 2);
				var dist = Math.sqrt( Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2) );
				
			}
		}
		
		// Handle slowed
		if (this.slowed >= 0){
			
			var slowFact = (this.slowHits + 1);
			this.slowed -= elapsed;
			
		}else{
			
			var slowFact = 1;
			if (this.slowHits >= 1){
				this.slowHits -= 1;
			}
			
		}
		
		// Move towards next path point
		var xDir = ( (targetX - this.x) / dist) / slowFact;
		var yDir = ( (targetY - this.y) / dist) / slowFact;
		
		this.x += Math.min(xDir * this.speed * elapsed * defaults.enemySpeedFactor, level.dimensions.cell_width / defaults.maxMoveDist);//Math.floor( (xDir * this.speed * elapsed * options.enemySpeedFactor) );
		this.y += Math.min(yDir * this.speed * elapsed * defaults.enemySpeedFactor, level.dimensions.cell_width / defaults.maxMoveDist);//Math.floor( (yDir * this.speed * elapsed * options.enemySpeedFactor) );
	
	}
	return true;
}

Enemy.prototype.draw = function(ctx){
	
	ctx.save();
	switch (this.type){
		case ENEMY_TYPE_BASIC:
			// Basic - Circle
			//ctx.fillStyle = this.color;
			
			var gradient = ctx.createRadialGradient(this.x, this.y, this.r, this.x + (this.r / 4), this.y - (this.r / 4), 2 );
			gradient.addColorStop(0, this.color);
			gradient.addColorStop(1, '#fff');
			ctx.fillStyle = gradient;
			
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
			ctx.fill();
			ctx.closePath();
			break;
		case ENEMY_TYPE_TANK:
			// Tough - Square
			//ctx.fillStyle = this.color;
			var gradient = ctx.createRadialGradient(this.x, this.y, 2 * this.r, this.x + (this.r / 4), this.y - (this.r / 4), 2 );
			gradient.addColorStop(0, this.color);
			gradient.addColorStop(1, '#fff');
			ctx.fillStyle = gradient;
			
			
			ctx.beginPath();
			ctx.fillRect(this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);
			ctx.fill();
			ctx.closePath();
			break;
		case ENEMY_TYPE_SPEEDER:
			// Fast - triangle
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(this.x-this.r,this.y-this.r);
			ctx.lineTo(this.x+this.r,this.y-this.r);
			ctx.lineTo(this.x,this.y+this.r);
			ctx.lineTo(this.x-this.r,this.y-this.r);
			ctx.fill();
			ctx.closePath();
			break;
		case ENEMY_TYPE_AIR:
			// Ignores path - bowtie
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(this.x + this.r, this.y - (this.r / 2) );
			ctx.lineTo(this.x + this.r, this.y + (this.r / 2) );
			ctx.lineTo(this.x - this.r, this.y - (this.r / 2) );
			ctx.lineTo(this.x - this.r, this.y + (this.r / 2) );
			ctx.lineTo(this.x + this.r, this.y - (this.r / 2) );
			ctx.fill();
			ctx.closePath();
			break;
		case ENEMY_TYPE_BOSS:
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(this.x-this.r,this.y-(this.r/2));
			ctx.lineTo(this.x+this.r,this.y-(this.r/2));
			ctx.lineTo(this.x-this.r,this.y+this.r);
			ctx.lineTo(this.x,this.y-this.r);
			ctx.lineTo(this.x+this.r,this.y+this.r);
			ctx.lineTo(this.x-this.r,this.y-(this.r/2));
			ctx.fill();
			ctx.closePath();
			break;
	}
	
	if (this.shield > 0){
		// Draw shield
		var shieldR = this.r * 1.5;
		var shieldCol = '#0ff';
		var thick_fact = 10;
		var thickness = Math.max(1,Math.floor(this.shield / thick_fact) ) + 'px';
		
		ctx.strokeStyle = shieldCol;
		ctx.lineWidth = thickness;
		ctx.beginPath();
		ctx.arc(this.x, this.y, shieldR, 0, 2*Math.PI, false);
		ctx.stroke();
		ctx.closePath();
	}
	ctx.restore();
	
}

// Takes a current colour and returns a new, merged colour
// Merge depends on the base and final colours, and the percentage change
// The current colour is not changed, instead a new colour is returned
function color_merge(base, end, percent, current){
	
	var base_dec = parseInt( base.replace("#",""), 16);
	var end_dec = parseInt( end.replace("#",""), 16);
	var current_dec = parseInt( current.replace("#",""), 16);
		//console.log('Col Mrg: ',base_dec,end_dec,current_dec);
	
	var col_diff = base_dec - end_dec;
	var col_sub = Math.floor(col_diff * percent);
	
	var new_dec = current_dec - col_sub;
		//console.log(col_diff,col_sub,new_dec);

	var new_col = "#" + new_dec.toString(16);
		//console.log('Col Merge: ',percent,'%',current,'->',new_col);
	
	return new_col;
	}

/*
// Now changing enemy draw color from default -> red
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
}*/

// Generates a single enemy based on defaults type values
function generateOneEnemy(type,level){
	
	// Enemy Object defined at top
	var enemy = new Enemy();
	
	// Type and level are the only paramaters needed
	enemy.type = type;
	enemy.level = level;
	
	// Pickup from defaults/enemies.js
	enemy.r = enemy_type_defaults[type].radius;
	enemy.color = enemy_type_defaults[type].color;
	
	// Speed NOT linked to level, as this causes distance calculations difficult
	enemy.speed = enemy_type_defaults[type].speed; //* level;	
	
	// However, HP and Shields (not currently implemented) ARE multiplied by level
	enemy.maxHP = defaults.enemyHealthFactor * level * enemy_type_defaults[type].maxHP;
	enemy.currentHP = enemy.maxHP;
	//enemy.shield = level * enemy_type_defaults[type].shield;

	return enemy;
}

// Generates a wave of enemies based on the default/waves
function generateWave(wave,spawn_x,spawn_y){
	
	// Get the overall wave info
	waveInfo = waveMaps[wave];
	waveDelay = waveInfo.wave_delay;	//Added to all enemies in subwave 1-n
	waveCount = waveInfo.enemies.length;
	
	for (var i = 0; i < waveCount; i++){
		
		subwaveInfo = waveInfo.enemies[i];
		subwaveCount = subwaveInfo.count;
		subwaveDelay = subwaveInfo.subwave_delay;
		
		subwaveType = subwaveInfo.type;
		subwaveLevel = subwaveInfo.level;
		subwaveShield = subwaveInfo.shield;
		
		for (var j = 0; j < subwaveCount; j++){
			
			var newEnemy = generateOneEnemy(subwaveType,subwaveLevel);
			newEnemy.x = spawn_x;
			newEnemy.y = spawn_y;	
			newEnemy.shield = defaults.enemyShieldFactor * subwaveShield * enemy_type_defaults[subwaveType].shield;
			newEnemy.delay = (j * subwaveDelay) + (i * waveDelay);
			
			enemies.push(newEnemy);
			
		}
		
	}
	//console.log(enemies);
	level.enemyCount = enemies.length;
	window.requestAnimationFrame(mainLoop);

}


