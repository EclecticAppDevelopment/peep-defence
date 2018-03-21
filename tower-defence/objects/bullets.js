function Bullet(damage, type, col, x, y, r, targetX, targetY, speed, lifespan, srcX, srcY, range){
	this.damage = damage || 0,
	this.type = type || 0,
	this.col = col || '#f00',
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
	if ( (this.x > current.width || this.x < 0) && (this.y > current.height || this.y < 0) ){
		return false;
	}
	
	if ( (this.lifespan <= 0) || (enemies.length == 0) ){
		// Die, not hit
		console.log('Bullet clear - lifespan');
		return false;
	}else{
		
		var srcDist = Math.sqrt( Math.pow(this.srcX - this.x, 2) + Math.pow(this.srcY - this.y, 2) );
		if (srcDist > this.range){
			// Moved out of range
			console.log('Bullet clear - range');
			return false;
		}else{
			// Move towards target
			var dist = Math.sqrt( Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2) );
			this.lifespan -= elapsed;
			var xDir = (this.targetX - this.x) / dist;
			var yDir = (this.targetY - this.y) / dist;
			this.x += xDir * this.speed * elapsed;
			this.y += yDir * this.speed * elapsed;
		}
		
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
			enemies[enemy].currentHP -= this.damage;
			return false;
		}
	}
}

Bullet.prototype.draw = function(ctx){
	ctx.fillStyle = this.col;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
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