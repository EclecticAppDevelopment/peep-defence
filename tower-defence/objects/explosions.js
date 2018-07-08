function Explosion(color, x, y, r, range, speed, lifespan){
	this.color = color || '#f00',
	this.x = x || 0,
	this.y = y || 0,
	this.r = r || 5,
	this.range = range || 10,
	this.speed = speed || 1,
	this.lifespan = lifespan || 250,
	this.flag = false,
	this.prevTime = 0
}

Explosion.prototype.update = function(timestamp){

	if(!this.prevTime){
		this.prevTime = timestamp;
	}
	var elapsed = Math.min(this.r,calcElapsed(timestamp,this.prevTime));
	this.prevTime = timestamp;
	console.log('Updating Explosion ',elapsed);
	
	if ( (this.lifespan <= 0) || (enemies.length == 0) ){
		//console.log('Explosion clear - lifespan');
		return false;
	}
		
	this.r += Math.min( Math.floor( (this.speed * elapsed)  ), level.dimensions.cell_width / defaults.maxMoveDist );
	if (this.r > this.range){
		// Expanded to range - destroy
		return false;
	}
}

Explosion.prototype.draw = function(ctx){
	
	//ctx.save();
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
	//ctx.restore();
	
}
