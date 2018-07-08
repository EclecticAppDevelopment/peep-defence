var game,level;
var fgCanv, bgCanv;
var towers, bullets, enemies, explosions;
var mainLoopRequest;

function init(){

	getDefaults();
	
}

// Called on game load ONLY - use game.restart();
function initialiseGame(){
	
	/* ------------------
		RESET GAME OBJECT
	--------------------*/
	game = new Game();
	
	/* ------------------
		CONTEXT SETTINGS
	--------------------*/
	var fgCanv = document.getElementById('canvas');
	var fgCtx = fgCanv.getContext('2d');
	fgCtx.translate(0.5, 0.5);
	clearCanvas(fgCtx);
	
	var bgCanv = document.getElementById('bgCanvas');
	var bgCtx = bgCanv.getContext('2d');
	bgCtx.translate(0.5, 0.5);
	clearCanvas(bgCtx);
	
	//WHY HERE? game.restart();
	//towers = enemies = bullets = [];
	
	levelSetup();
	
	/* ------------------
		SCREEN VARIABLES
	--------------------*/
	
	//var level_data = levelMaps[game.level];
	//level = new Level(fgCtx, level_data.rows, level_data.columns, level_data.grid, level_data.start, level_data.end);
	
	//level.path = plotPath(level.grid, level.start, level.end);
	//if (level.path.length == 0){
	//	console.log('Path error');
		//resetGame();
	//}
	//console.log(level);

	//resizeCanvas();
	
	showModal("Introduction",0);
	
	/* ------------------
		EVENT LISTENERS
	--------------------*/
	fgCanv.addEventListener('touchstart', function(event){touchCanvas(event);});//,false );
	fgCanv.addEventListener('click', function(event){mouseCanvas(event);});//,false); //stopHover();},false );
	 
	 // Trying to work out what the fuck happens when the window is minimized - enemies seem to vanish off the canvas! :-/
	//focus = 1;
	//window.addEventListener('visibilitychange', function(){ focus *= -1; if (focus){ console.log(enemies); } });
	
	mainLoopRequest = window.requestAnimationFrame(mainLoop);

}

// Always called using window.requestAnimationFrame which has a timestamp
function mainLoop(timestamp){
	
	// Create main reference to canvas contexts used in main loop
	var fgCtx = document.getElementById('canvas').getContext('2d');
	var bgCtx = document.getElementById('bgCanvas').getContext('2d');
	
	// Clear the FOREGROUND canvas
	clearCanvas(fgCtx);
	
	// Draw the BACKGROUND (level walls plus the start/end)
	if (level.gridUpdated === true){
		fillCanvas(bgCtx);
		draw_map(bgCtx);
		draw_styled_path(bgCtx,level.grid,level.path,1);
		level.gridUpdated = false;
		draw_towers(bgCtx);	// TEST
	}
	
	// LOOP THROUGH ENEMIES
	for (var enemy in enemies){
		
		// IF NOT FLAGGED (i.e. not already processed this loop)
		if (enemies[enemy].flag === false){

			// UPDATE WILL RETURN FALSE IF ENEMY HEALTH <= 0
			if (enemies[enemy].update(timestamp) === false){
				
				// UPDATE STATS
				var statCheck = game.stats.enemiesBeaten[enemies[enemy].type];
				if (statCheck === undefined){
					//console.log('Resetting game stats');
					game.stats.enemiesBeaten[enemies[enemy].type] = 0;
				}
				game.stats.enemiesBeaten[enemies[enemy].type] += 1;
				game.stats.enemiesBeatenTotal += 1;
				
				
				// MAKE AN EXPLOSIONS
				/*if (enemies.length !== 0){
					//function Explosion(color, x, y, r, range, speed, lifespan){
					var explosion = new Explosion(
						'#c00', 				// color
						enemies[enemy].x, 		// x
						enemies[enemy].y, 		// y
						enemies[enemy].r, 		// r
						enemies[enemy].r * 2, 	// range
						enemies[enemy].speed, 	// speed
						250						// lifespan
					);
					console.log('Pushing explosion');
					explosions.push(explosion);
				}*/
				
				// REMOVE THIS ENEMY
				enemies.splice(enemy,1);
				
				//alert('enemy dead ' + enemy);
				
				// Check if all enemies defeated
				if (enemies.length === 0){
										
					// If at the final wave
					if (level.wave === level.waveLimit){
						
						game.nextLevel();
						
					}else{
						
						level.nextWave();
						
					}
					
				}
				
			}else{
				
				// IF ENEMY IS NOT DELAYED (held in a queue before entering level)
				if (enemies[enemy].delay <= 0){
					
					// DRAW THIS ENEMY (FOREGROUND CANVAS)
					enemies[enemy].draw(fgCtx);
					
				}
				
				// MARK THAT THIS ENEMY HAS BEEN PROCESSED THIS LOOP
				enemies[enemy].flag = true;
			}
			
		}else{
			
			// ONLY OCCURS WHEN MAIN LOOP INTERRUPTED
			// console.log('Skipping flagged enemy');
		}
		
	}
	
	// LOOP THROUGH BULLETS
	for (var bullet in bullets){
		
		// IF NOT FLAGGED (i.e. not already processed this loop)
		if (bullets[bullet].flag === false){
			
			// UPDATE WILL RETURN FALSE IF BULLET OFF SCREEN / LIFESPAN OVER
			if (bullets[bullet].update(timestamp) === false){
				
				// REMOVE THIS BULLET
				bullets.splice(bullet,1);
				
			}else{
				
				// DRAW THIS BULLET (FOREGROUND CANVAS)
				bullets[bullet].draw(fgCtx);
				
				// MARK THAT THIS BULLET HAS BEEN PROCESSED THIS LOOP
				bullets[bullet].flag = true;
			
			}

			
		}else{
			
			// ONLY OCCURS WHEN MAIN LOOP INTERRUPTED
			//console.log('Skipping flagged bullet');
			
		}
		
	}

	// LOOP THROUGH TOWERS
	for (var tower in towers){
		
		// IF NOT FLAGGED (i.e. not already processed this loop)
		if (towers[tower].flag === false){
			
			// UPDATE THIS TOWER (NEVER RETURNS FALSE)
			towers[tower].update(timestamp);
			
			//if (current.gridUpdated === true){
				//towers[tower].draw(bgCtx);
				//draw_towers(bgCtx);
			//}
			
			// MARK THAT THIS TOWER HAS BEEN PROCESSED THIS LOOP
			towers[tower].flag = true;
			
		}else{
			
			//console.log('Skipping flagged tower');
			
		}
	}
	
	/*if (explosions.length !== 0){

		// LOOP THROUGH EXPLOSIONS
		for (var explosion in explosions){
			
			// IF NOT FLAGGED (i.e. not already processed this loop)
			if (explosions[explosion].flag === false){
				
				// UPDATE THIS TOWER (NEVER RETURNS FALSE)
				if (explosions[explosion].update(timestamp) === false){
					
					// REMOVE THIS BULLET
					explosions.splice(explosion,1);
					
				}else{
					
					// DRAW THIS BULLET (FOREGROUND CANVAS)
					explosions[explosion].draw(fgCtx);
					
					// MARK THAT THIS BULLET HAS BEEN PROCESSED THIS LOOP
					explosions[explosion].flag = true;
				
				}
				
				// MARK THAT THIS TOWER HAS BEEN PROCESSED THIS LOOP
				explosions[explosion].flag = true;
				
			}
			
		}
		
	}*/
	
	// Update the non-canvas screen (GUI) elements
	updateGUI();
	
	// End of loop - mark ALL enemies/bullets/towers as unflagged for next loop
	resetFlags();
	
	// State holds whether game is paused (0), so won't re-trigger mainLoop unless unpaused (1)
	if (game.state === 1){
		
		mainLoopRequest = window.requestAnimationFrame(mainLoop);
		
	}
}

/* Shown when the highest wave have been reached */
function nextLevel(){
	
	game.level += 1;

	var level_data = levelMaps[game.level];
	level = new Level(fgCtx, level_data.rows, level_data.columns, level_data.grid, level_data.start, level_data.end);
	level.restart();
	
	level.path = plotPath(level.grid, level.start, level.end);
	if (level.path.length == 0){
		console.log('Path error');
	}

	resizeCanvas();
	game.cash = defaults.cash;
	//alert('Level ' + (game.level + 1) );
	
	// if (game.difficulty == 0){
		game.HP = defaults.maxHP;
	// }else if (game.difficulty == 1){
		// game.currentHP = Math.min(100, game.currentHP + 50);
	//}
	
	var waveBtn = document.getElementById('waveBtn');
	waveBtn.innerHTML = 'Start Wave ' + (level.wave + 1);
	waveBtn.disabled = false;
	waveBtn.classList.remove('w3-red');
	waveBtn.classList.remove('w3-hover-black');
	waveBtn.classList.add('w3-purple');
	waveBtn.classList.add('w3-hover-green');
	waveBtn.onclick = function(){ this.disabled=true; this.innerHTML='In Wave ' + level.wave; waveBtnClick(); };
	
	showModal('Level ' + (game.level + 1) ,0);
}

/* Shown when enemies = 0 */
function nextWave(){
	
	// Apply a cash bonus for completing the wave 
	game.cash += level.wave * defaults.waveCompleteBonusFactor;
	// Pause the game
	game.state = 0;
	
	// Show the next wave modal - either tutorial or generic
	level_alert = waveMaps[level.wave].alert_modal;
	if (level_alert !== undefined){
		showModal('Wave <span id="modal-detail"></span> - '+level_alert,0);
	}else{
		showModal('Wave Complete!',0);
	}
	
	/* Show wave level in whichever modal is shown */
	var detailSpan = document.getElementById('modal-detail');
	detailSpan.innerHTML = level.wave + 1;
	
	/* Enable Next Wave button */
	var waveBtn = document.getElementById('waveBtn');
	if (level.wave == levelMaps[game.level].waveLimit - 1){
		
		waveBtn.innerHTML = 'Final Wave!';
		waveBtn.disabled = true;
		waveBtn.classList.remove('w3-purple');
		waveBtn.classList.remove('w3-hover-green');
		waveBtn.classList.add('w3-red');
		waveBtn.classList.add('w3-hover-black');
		
	}else{
		
		waveBtn.innerHTML = 'Start Wave ' + (level.wave + 1);
		waveBtn.disabled = false;
		waveBtn.classList.remove('w3-red');
		waveBtn.classList.remove('w3-hover-black');
		waveBtn.classList.add('w3-purple');
		waveBtn.classList.add('w3-hover-green');
		waveBtn.onclick = function(){ this.disabled=true; this.innerHTML='In Wave ' + level.wave; waveBtnClick(); };
		
	}
	// Start of next wave handled by waveBtnClick eve

}

/*function waveBtnClick(){
	
	// AMENDED - SHOULD BE DISABLED NOW
	//if (enemies.length == 0){
		
		generateWave(level.wave,level.spawnX,level.spawnY); 
		
		var waveBtn = document.getElementById('waveBtn');
		waveBtn.disabled = true; 
		waveBtn.classList.remove('w3-purple');
		waveBtn.classList.remove('w3-hover-green');
		waveBtn.classList.add('w3-red');
		waveBtn.classList.add('w3-hover-black');

		level.wave += 1;
		waveBtn.innerHTML = 'In Wave ' + level.wave;

		if (level.wave > waveMaps.length){
			showModal('The End (for now)',0);
		}
		game.state = 1;
	
	//}else{
		
		//showModal('Finish Current Wave',0);
	
	//}
}*/

function resetFlags(){
	
	for (var enemy in enemies){ enemies[enemy].flag = false; }	
	for (var bullet in bullets){ bullets[bullet].flag = false; }
	for (var tower in towers){ towers[tower].flag = false;	}

}

function generateInitialTowers(){
	
	towers = [];
	// None for now - drop in for testing!
	
}

function draw_map(ctx){
	
	var map = level.grid;
	var start = level.start;
	var end = level.end;
	
	// PRESUME NON-SQUARE GRID
	ctx.strokeStyle = '#a00';
	
	for (var c = 0; c < level.dimensions.columns; c++){
		
		for (var r = 0; r < level.dimensions.rows; r++){
			
			var xpos = convertColToX(ctx, c, level.dimensions.columns, false);
			var ypos = convertRowToY(ctx, r, level.dimensions.rows, false);
			
			if ( (c == start[0]) && (r == start[1]) ){
				
				/* DRAW START FILLED BOX */
				ctx.beginPath();
				ctx.fillStyle = '#dd0';
				ctx.fillRect(xpos+1,ypos+1,level.dimensions.cell_width-2,level.dimensions.cell_height-2);
				
				/* DRAW START CIRCLE */
				ctx.fillStyle = '#ff0';
				ctx.arc(xpos + (level.dimensions.cell_width / 2), ypos + (level.dimensions.cell_height / 2), (0.4 * level.dimensions.cell_width), 0, 2*Math.PI, false);
				ctx.fill();
				ctx.stroke();

				/* DRAW START TEXT */
				ctx.fillStyle = 'black';
				ctx.font = Math.floor(level.dimensions.cell_width) + "px Arial";
				ctx.fillText("S",xpos + (level.dimensions.cell_width / 5.5), ypos + (0.85 * level.dimensions.cell_height));
				ctx.closePath();
				
				
			}else if ( (c == end[0]) && (r == end[1]) ){
				
				/* DRAW END FILLED BOX */
				ctx.beginPath();
				ctx.fillStyle = '#b00';
				ctx.fillRect(xpos+1,ypos+1,level.dimensions.cell_width-2,level.dimensions.cell_height-2);
				
				/* DRAW END CIRCLE */
				ctx.fillStyle = '#f00';
				ctx.arc(xpos + (level.dimensions.cell_width / 2), ypos + (level.dimensions.cell_height / 2), (0.4 * level.dimensions.cell_width), 0, 2*Math.PI, false);
				ctx.fill();
				ctx.stroke();

				/* DRAW END TEXT */
				ctx.fillStyle = 'white';
				ctx.font = Math.floor(level.dimensions.cell_width) + "px Arial";
				ctx.fillText("E",xpos + (level.dimensions.cell_width / 5.5), ypos + (0.85 * level.dimensions.cell_height));
				ctx.closePath();

			}else{
			
				var cell = map[c][r];
				switch (cell){
					case 0:
						
						// Empty
						var grd=ctx.createLinearGradient(xpos+1,ypos+1,level.dimensions.cell_width-2,level.dimensions.cell_height-2);
						grd.addColorStop(0,"#ddd");
						grd.addColorStop(1,"#eee");
						ctx.fillStyle = grd;
						ctx.fillRect(xpos+1,ypos+1,level.dimensions.cell_width-2,level.dimensions.cell_height-2);
						//ctx.fill();
						//ctx.restore();
						break;
					case 1:
						
						// Draw a wall
							ctx.beginPath();
							ctx.rect(xpos, ypos, level.dimensions.cell_width, level.dimensions.cell_height);
							ctx.stroke();
							
							ctx.fillStyle = '#333';	// Dark grey
							ctx.moveTo(xpos, ypos);
							ctx.lineTo(xpos + level.dimensions.cell_width, ypos + level.dimensions.cell_height);
							ctx.lineTo(xpos, ypos + level.dimensions.cell_height);
							ctx.lineTo(xpos, ypos);
							ctx.fill();
							
							ctx.fillStyle = '#666';
							ctx.moveTo(xpos, ypos);
							ctx.lineTo(xpos + level.dimensions.cell_width, ypos + level.dimensions.cell_height);
							ctx.lineTo(xpos + level.dimensions.cell_width, ypos);
							ctx.lineTo(xpos, ypos);
							ctx.fill();
							
							ctx.moveTo(xpos, ypos);
							ctx.lineTo(xpos + level.dimensions.cell_width, ypos + level.dimensions.cell_height);
							ctx.moveTo(xpos, ypos + level.dimensions.cell_height);
							ctx.lineTo(xpos + level.dimensions.cell_width, ypos);
							
							ctx.fillStyle = '#999';
							ctx.fillRect(xpos + (0.25 * level.dimensions.cell_width), ypos + (0.25 * level.dimensions.cell_height), (0.5 * level.dimensions.cell_width), (0.5 * level.dimensions.cell_height));
							
						break;
					default:
						break;
				}
				
			}
			
		}
	}
}

function reduceHealth(damage){
	//game.HP -= damage;
	// Testing flat damage rate
	game.HP -= 1;
	if (game.HP <= 0){
		//Death
		//gameOver();
		game.over();
		//console.log('Death');
	}else{
		//console.log('Ouch! Damage:',damage,current.health);
	}
}
