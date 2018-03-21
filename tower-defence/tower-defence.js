function init(){
	
	
	resetToOptions();
	
	/* ------------------
		SCREEN VARIABLES
	--------------------*/
	resizeCanvas();
	
	var c = document.getElementById('canvas');

	/* ------------------
		EVENT LISTENERS
	--------------------*/
	c.addEventListener('onmousedown', function(event){mouseCanvas(event);}, false );
	c.addEventListener('onmousemove', function(event){mouseMove(event);}, false );
	c.addEventListener('touchstart', function(event){touchCanvas(event);},false );
	c.addEventListener('click', function(event){mouseCanvas(event);stopHover();},false );
	 
	c.addEventListener('onmouseout', function(){stopHover();},false );
	c.addEventListener('onmouseup', function(){stopHover();},false );
	c.addEventListener('touchend', function(){stopHover();},false );

	resetGame();
	
	window.requestAnimationFrame(mainLoop);

}

function resetToOptions(){
	/* ------------------
		GAME INFO
	--------------------*/
	current.wave = 0;
	current.HP = options.maxHP;
	current.cash = options.cash;
	current.score = options.score;
	
	// SET SIZE FOR BOX GRID 
	current.columns = options.rows;
	current.rows = options.columns;
	
	var c = document.getElementById('canvas');
	ctx = c.getContext('2d');
	ctx.strokeStyle = options.context_strokeStyle;
	ctx.lineWidth = options.context_lineWidth;
	ctx.save();
	clearCanvas(ctx);
	
}

function resetGame(){

	/* ------------------
		CONTEXT SETTINGS
	--------------------*/
	var c = document.getElementById('canvas');
	ctx = c.getContext('2d');
	ctx.restore();
	// Testing anti-aliasing fix
	ctx.translate(0.5, 0.5);
	
	/* ------------------
		LEVEL MAP
	--------------------*/
		// RANDOM START AND END
		//current.start = [ 1, 1 + Math.floor( (Math.random() * (current.rows - 2 ) ) )];
		//current.end = [ current.columns - 2, 1 + Math.floor( (Math.random() * (current.rows - 2 ) ) ) ];

	// FIXED START AND END
	current.start = [1, 1];
	current.end = [ (current.columns - 2), (current.rows - 2) ];
	
	// ALL GRID REFERENCES ARE IN [column, row]
	current.grid = generateBoxGrid(current.columns, current.rows);
	
	/* ------------------
		TOWERS AND BULLETS
	--------------------*/
	generateInitialTowers();
	bullets = [];
	
	/* ------------------
		LEVEL PATH
	--------------------*/
	current.path = plotPath(current.grid, current.start, current.end);
	if (current.path.length == 0){
		console.log('Path error');
		resetGame();
	}
	
	/* ------------------
		ENEMY SPAWN
	--------------------*/
	spawn_point = {};	
	spawn_point.x = Math.floor(current.cell_width * current.path[0][1] + (current.cell_width / 2));
	spawn_point.y = Math.floor(current.cell_height * current.path[0][0] + (current.cell_height / 2));
	//console.log(spawn_point.x,spawn_point.y);
	if (debug){
		// DEBUG - Draw found path
		ctx.strokeStyle = '#f00';
		draw_path(ctx,current.grid,current.path);
		//ctx.restore();
	}
	
	var waveBtn = document.getElementById('waveBtn');
	waveBtn.innerHTML = 'Start Wave ' + (current.wave + 1);
	waveBtn.onclick = function(){ waveBtnClick(); };
	
	/* ------------------
		ENEMY INFO
	--------------------*/
	enemies = [];
	
	
	draw_map(ctx);
	
	showModal("Introduction",0);
	
}


// Always called using window.requestAnimationFrame which has a timestamp
function mainLoop(timestamp){
	
	// Create main reference to canvas context used throughout
	var ctx = document.getElementById('canvas').getContext('2d');
	
	// Clear the canvas
	clearCanvas(ctx);
	
	// Draw the map (level walls plus the start/end)
	draw_map(ctx);
	
	// If debug or pathGuide (true) then draw the enemy path
	if (debug || pathGuide){
		ctx.strokeStyle = '#a00';
		//draw_path(ctx,current.grid,current.path);
		draw_styled_path(ctx,current.grid,current.path,1);
	}
		
	//while (current.state === 1){
		
		
		
		for (var enemy in enemies){
			
			if (enemies[enemy].flag === false){

				if (enemies[enemy].update(timestamp) === false){
					enemies.splice(enemy,1);
				}else{
					enemies[enemy].draw(ctx);
					enemies[enemy].flag = true;
				}
				
			}else{
				console.log('Skipping flagged enemy');
			}
			
		}
		
		for (var bullet in bullets){
			
			if (bullets[bullet].flag === false){
				
				if (bullets[bullet].update(timestamp) === false){
					bullets.splice(bullet,1);
				}else{
					bullets[bullet].draw(ctx);
					bullets[bullet].flag = true;
				}
				
			}else{
				console.log('Skipping flagged bullet');
			}
		}
		
		for (var tower in towers){
			if (towers[tower].flag === false){
				towers[tower].update(timestamp);
				towers[tower].draw(ctx);
				towers[tower].flag = true;
			}else{
				console.log('Skipping flagged tower');
			}
		}
		
		updateGUI();
		resetFlags();
		
	if (current.state === 1){
		
		window.requestAnimationFrame(mainLoop);
	//}
	}
}

function resetFlags(){
	
	for (var enemy in enemies){ enemies[enemy].flag = false; }	
	for (var bullet in bullets){ bullets[bullet].flag = false; }
	for (var tower in towers){ towers[tower].flag = false;	}

}

function generateInitialTowers(){
	
	towers = [];
	// None for now - drop in for testing!
	
}

function clearCanvas(ctx){
	
	ctx.fillStyle = '#fff';
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.fill();
}

function draw_map(ctx){
	
	var map = current.grid;
	var start = current.start;
	var end = current.end;
	
	// PRESUME NON-SQUARE GRID
	rows = map[0].length;
	columns = map.length;
	var cell_width = ctx.canvas.width / columns;
	var cell_height = ctx.canvas.height / rows;
	//console.log('Drawing map',rows,columns);
	
	for (var c = 0; c < columns; c++){
		for (var r = 0; r < rows; r++){
			
			var xpos = convertColToX(ctx, c, columns, false);
			var ypos = convertRowToY(ctx, r, rows, false);
			
			if ( (c == start[0]) && (r == start[1]) ){
				// DRAW START
				ctx.fillStyle = '#dd0';
				ctx.fillRect(xpos+1,ypos+1,cell_width-2,cell_height-2);
				ctx.moveTo(xpos+1,ypos+1);
				ctx.lineTo(xpos+(cell_width-1),ypos+(cell_height-1));
				ctx.moveTo(xpos+(cell_width-1),ypos+1);
				ctx.lineTo(xpos+1,ypos+(cell_height-1));
				ctx.stroke();
			}else if ( (c == end[0]) && (r == end[1]) ){
				// DRAW END
				ctx.fillStyle = '#b00';
				ctx.fillRect(xpos+1,ypos+1,cell_width-2,cell_height-2);
				ctx.moveTo(xpos+1,ypos+1);
				ctx.lineTo(xpos+(cell_width-1),ypos+(cell_height-1));
				ctx.moveTo(xpos+(cell_width-1),ypos+1);
				ctx.lineTo(xpos+1,ypos+(cell_height-1));
				ctx.stroke();
			}
			
			var cell = map[c][r];
			switch (cell){
				case 0:
					// Empty
					break;
				case 1:
					// Wall
					ctx.fillStyle = '#333';
					ctx.fillRect(xpos+1,ypos+1,cell_width-2,cell_height-2);
					break;
				default:
					break;
			}
		}
	}
}

function reduceHealth(damage){
	current.HP -= damage;
	if (current.HP <= 0){
		//Death
		gameOver();
		//console.log('Death');
	}else{
		//console.log('Ouch! Damage:',damage,current.health);
	}
}

function gameOver(){
	
	var waveBtn = document.getElementById('waveBtn');
	waveBtn.innerHTML = 'Reset Game!';
	waveBtn.onclick = function(){init();};
	//current.state = 0;
	enemies = [];
	showModal("Game Over",0);
	var detailSpan = document.getElementById('modal-detail');
	detailSpan.innerHTML = current.wave;
	resetToOptions();

}

function waveBtnClick(){
	
	if (enemies.length == 0){
		generateWave(current.wave,spawn_point.x,spawn_point.y); 
		current.wave += 1;
	}else{
		showModal('Finish Current Wave',0);
	}
}

function updateGUI(){
	
	// new version
	updatePlayerHealth();
	
	var gui_wave = document.getElementById('gui_wave');
	gui_wave.innerHTML = current.wave;

	var gui_enemies = document.getElementById('gui_enemies');
	gui_enemies.innerHTML = enemies.length + ' / ' + current.enemyCount;
	var gui_cash = document.getElementById('gui_cash');
	gui_cash.innerHTML = current.cash;
	var gui_score = document.getElementById('gui_score');
	gui_score.innerHTML = current.score;
	var waveBtn = document.getElementById('waveBtn');
	waveBtn.innerHTML = 'Start Wave ' + (current.wave + 1);
}

function updatePlayerHealth(){
	
	var percent = Math.floor( (current.HP / current.maxHP) * 100) + '%';
	var gui_health = document.getElementById('gui_health');
	gui_health.style.width = percent;
	
	var gui_health_text = document.getElementById('gui_health_text');
	gui_health_text.innerHTML = '' + current.HP + ' / ' + current.maxHP;
	
}