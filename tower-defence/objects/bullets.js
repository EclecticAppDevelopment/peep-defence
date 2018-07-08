function Bullet(damage, type, color, x, y, r, targetX, targetY, speed, lifespan, srcX, srcY, range){
	this.damage = damage || 0,
	this.type = type || 0,
	this.color = color || '#f00',
	this.x = x || 0,
	this.y = y || 0,
	this.r = r || 5,
	this.targetX = targetX || 1,
	this.targetY = targetY || 1,
	this.speed = speed || 1,
	this.lifespan = lifespan || 250,
	this.prevTime = 0,
	this.srcX = srcX || 0,
	this.srcY = srcY || 0,
	this.flag = false,
	this.range = range || 10
}

Bullet.prototype.update = function(timestamp){

	//elapsed = 5;
	if(!this.prevTime){
		this.prevTime = timestamp;
	}
	var elapsed = Math.min(this.r,calcElapsed(timestamp,this.prevTime));
	this.prevTime = timestamp;
	//console.log('Updating Bullet ',elapsed);

	// Check out of bounds
	if ( (this.x > level.dimensions.width || this.x < 0) && (this.y > level.dimensions.height || this.y < 0) ){
		return false;
	}
	
	if ( (this.lifespan <= 0) || (enemies.length == 0) ){
		// Die, not hit
		//console.log('Bullet clear - lifespan');
		return false;
	}
		
	var srcDist = Math.sqrt( Math.pow(this.srcX - this.x, 2) + Math.pow(this.srcY - this.y, 2) );
	var convertedRange = this.range;//ALREADY CONVERTED! * level.dimensions.cell_width;

	switch (this.type){
		
		case 1:
		
			// Standard bullet
			if (srcDist > convertedRange){
				// Moved out of range
				//console.log('Bullet clear - range');
				return false;
			}else{
				// Move towards target
				var dist = Math.sqrt( Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2) );
				
				this.lifespan -= elapsed;
				var xDir = (this.targetX - this.x) / dist;
				var yDir = (this.targetY - this.y) / dist;
				
					// TESTING HARD LIMIT TO MOVEMENT
					// ALSO scaling down based on cell width/height to balance (slower when smaller)
					//var size_factor = current.cell_width / 10;
					//this.x += Math.min( Math.floor( (xDir * this.speed * elapsed) * size_factor ), options.maxMoveDist * size_factor);
					//this.y += Math.min( Math.floor( (yDir * this.speed * elapsed) * size_factor ), options.maxMoveDist * size_factor);

				this.x += Math.min( Math.floor( (xDir * this.speed * elapsed)  ), level.dimensions.cell_width / defaults.maxMoveDist );
				this.y += Math.min( Math.floor( (yDir * this.speed * elapsed)  ), level.dimensions.cell_width / defaults.maxMoveDist );
			}
			// Check collision with enemies
			for (var enemy in enemies){
				
				var targetX = enemies[enemy].x;
				var targetY = enemies[enemy].y;
				var targetR = enemies[enemy].r + this.r;
				var targetDelay = enemies[enemy].delay;
				
				// Distance from bullet to target
				var dist = Math.sqrt( Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2) );
				
				if ( (dist <= targetR) && ( targetDelay <= 0) ){
					// Hit target
					//console.log('Bullet hit target',enemy,enemies[enemy].currentHP,this.damage);
						if (enemies[enemy].shield <= 0){
							enemies[enemy].currentHP -= this.damage;
						
			    	var base = enemy_type_defaults[enemies[enemy].type].color;
						var final = "#f00";
						var percent = this.damage / enemies[enemy].maxHP;
						var current = enemies[enemy].color;
						enemies[enemy].color = color_merge(base, final, percent, current);
					}else{
						enemies[enemy].shield -= this.damage;
						}
					return false;
				}
			}
			break;
			
		case 2:
			// Blast wave
			// Expands but hits at edge
			this.r += Math.min( Math.floor( (this.speed * elapsed)  ), level.dimensions.cell_width / defaults.maxMoveDist );
			if (this.r > this.range){
				// Expanded to range - destroy
				return false;
			}
			// Check collision with enemies
			for (var enemy in enemies){
				
				var targetX = enemies[enemy].x;
				var targetY = enemies[enemy].y;
				// Using this range
				var thickness = 10;
				
				var targetRlow = this.r - thickness;
				var targetRhigh = this.r + thickness;
				
				var targetDelay = enemies[enemy].delay;
				
				// Distance from bullet to target
				var dist = Math.sqrt( Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2) );
				
				if ( 
					(dist >= targetRlow) &&
					(dist <= targetRhigh) &&					
					(targetDelay <= 0) 
				){
					// Hit target
					//console.log('Blast wave hit target',enemy);
					if (enemies[enemy].shield == 0){
						enemies[enemy].currentHP -= this.damage;
						
						var base = enemy_type_defaults[enemies[enemy].type].color;
						var final = "#f00";
						var percent = this.damage / enemies[enemy].maxHP;
						var current = enemies[enemy].color;
						enemies[enemy].color = color_merge(base, final, percent, current);
						
					}else{
						//console.log('Blast wave could not pierce shielded enemy!');
						
					}
				}
			}
			break;
			
		case 3:
			// Sheet ice
			// Expands up to range
			this.r += Math.min( Math.floor( (this.speed * elapsed)  ), level.dimensions.cell_width / defaults.maxMoveDist );
			if (this.r > this.range){
				// Expanded to range - destroy
				return false;
			}
			// Check collision with enemies
			for (var enemy in enemies){
				
				var targetX = enemies[enemy].x;
				var targetY = enemies[enemy].y;
				// Using this range
				var targetR = this.r;
				var targetDelay = enemies[enemy].delay;
				
				// Distance from bullet to target
				var dist = Math.sqrt( Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2) );
				
				var slowDelay = enemies[enemy].slowed;
				
				if ( 
					(dist <= targetR) && 
					(slowDelay <= 0) && 
					(targetDelay <= 0) 
				){
					// Hit target
					//console.log('Sheet ice hit target',enemy,enemies[enemy].speed,this.damage);
					enemies[enemy].slowed = 300;
					enemies[enemy].slowHits += (this.damage / 10);
				}else{
					//enemies[enemy].speed *= 1.001;
				}
			}
			break;
	}
}

Bullet.prototype.draw = function(ctx){
	
	ctx.save();
	switch (this.type){
			
		case 1:
			//console.log('Draw Gun bullet');
			ctx.fillStyle = '#333';//this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
			ctx.fill();
			ctx.closePath();
			break;
		case 2:
			//console.log('Draw Bomb blast');
			ctx.save();
			
				ctx.globalAlpha = 0.5;
				ctx.fillStyle = this.color;
				ctx.lineWidth = 20;
			
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
				ctx.stroke();
				ctx.closePath();
				
			ctx.restore();
			break;
		case 3:
			//console.log('Draw Ice sheet');
			ctx.save();
			ctx.globalAlpha = 0.5;
				
				ctx.fillStyle = this.color;
				ctx.strokeStyle = '#00f';
				ctx.lineWidth = 5;
			
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
				
			ctx.restore();
			break;
	}
	ctx.restore();
}

function getTargetingPos(ctx, towerX, towerY, enemyX, enemyY){
	var gradient = (enemyY - towerY) / (enemyX - towerX);
		// intercept = y - gradient * x
	var intercept = towerY - (gradient * towerX);
	var position = {};

	if (towerX > enemyX){
		// Aiming left - solve y when x = 0
		position.x = 0;
		position.y = intercept;
	}else{
		// Aiming right - solve y when x = ctx.canvas.width
		position.x = ctx.canvas.width;
		position.y = (gradient * position.x) + intercept;
	}
	return position;
}
