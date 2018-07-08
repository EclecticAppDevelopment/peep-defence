function clearCanvas(ctx){
	
	ctx.clearRect(-1,-1,ctx.canvas.width + 1,ctx.canvas.height + 1);

}

function fillCanvas(ctx, color){
	
	ctx.fillStyle = color || '#fff';
	ctx.fillRect(-1,-1,ctx.canvas.width + 1,ctx.canvas.height + 1);	// Drawing 1 pixel over size to prevent 0.5 pixel visible at edge
	ctx.fill();
	
}

function resizeCanvas(){
	
	/* GET THE MAIN CANVAS ELEMENT */
	var c = document.getElementById('canvas');
	var prevSize = c.width;
	
	scr_wid = viewport().width;
	scr_hgt = viewport().height;
	if (scr_wid >= scr_hgt || scr_wid >= 600){
		// Landscape
		var cnv_pad = defaults.canvas_padding;
		var hgt_fact = 0.75;
		var wid_fact = 0.475;
		c.width = c.height = Math.min( (scr_wid * wid_fact) - (2 * cnv_pad), (hgt_fact * scr_hgt) - (10 * cnv_pad));
		//c.style.width = c.width + 'px';
	}else{
		// Portrait
		//cnv_pad = Math.max(options.canvas_padding, scr_wid / 10);
		var cnv_pad = scr_wid / 10; //options.canvas_padding;
		c.width = c.height = scr_wid - (2 * cnv_pad);
		//c.style.width = c.width + 'px';
	}
	level.dimensions.width = c.width;
	level.dimensions.height = c.height;
	level.dimensions.cell_width = level.dimensions.width / level.dimensions.columns;
	level.dimensions.cell_height = level.dimensions.height / level.dimensions.rows;
	
	// Work out the scale factor to update enemy positions
	var scaleFactor = level.dimensions.width / prevSize;
	
	/* SET FRONT CANVAS PROPERTIES */
	c.style.zIndex = 2;

	/* Line up bgCanvas with the foreground canvas */
	var bgCanvas = document.getElementById('bgCanvas');

	bgCanvas.width = c.width;
	bgCanvas.height = c.height;

	/* THIS IS THE MAGIC TRICK:
		SET THE BACKGROUND CANVAS STYLE LEFT (in px)
		TO EQUAL THE CURRENT OFFSET LEFT OF THE FOREGROUND CANVAS!
	*/
	bgCanvas.style.left = c.offsetLeft + 'px';
	
	var ctx = c.getContext('2d');

	/* UPDATE THE ENEMY SPAWN POINT */
	//spawn_point = {};
	
	// IF there is currently a path (if just loaded, don't bother)
	if (level.path.length !== 0){	
		
		// Recalculate spawn point
		level.spawnX = convertRowToY(ctx, level.path[0][1], level.dimensions.rows, true);		// current.cell_width * current.path[0][1] + (current.cell_width / 2);
		level.spawnY = convertColToX(ctx, level.path[0][0], level.dimensions.columns, true);	// current.cell_height * current.path[0][0] + (current.cell_height / 2);
		
		// Update the spawn points for enemies
		for (var enemy in enemies){
			
			// If delay >= 0, enemy not yet spawned (so set x,y to spawn point)
			if (enemies[enemy].delay >= 0){
				
				enemies[enemy].x = level.spawnX;
				enemies[enemy].y = level.spawnY;
			
			// Else enemy spawned, so update x,y based on scaleFactor (difference from previous canvas size)	
			}else{
				
				enemies[enemy].x = Math.floor(enemies[enemy].x * scaleFactor);
				enemies[enemy].y = Math.floor(enemies[enemy].y * scaleFactor);
			}
		}
		
	}
	
	
	/* IF THE GRID HAS BEEN LOADED, REDRAW IT */
	if (level.grid.length !== 0){
		
		clearCanvas(ctx);	// CLEAR - so transparent
		
		var bgCtx = bgCanvas.getContext('2d');
		fillCanvas(bgCtx);	// FILLED - so white BG
		draw_map(bgCtx);
		draw_towers(bgCtx);
		draw_styled_path(bgCtx, level.grid, level.path, 1);
	}
	
	// TO ADD - RECALCULATE ENEMY AND BULLET POSITIONS ON RESIZE (INSTANT)
}

function handleClick(ctx, x, y){
	
	// Convert to cell
	hoverCol = convertXToCol(ctx, x, level.dimensions.columns);
	hoverRow = convertYToRow(ctx, y, level.dimensions.rows);
	game.selectedCell = [hoverCol, hoverRow];
	
	prevCell = level.grid[hoverCol][hoverRow];
	
	// If grid cell FILLED
	if (prevCell == 1){
		
		// check for existing tower and show Modal
		for (tower in towers){
			
			if ( (towers[tower].row == hoverCol) && (towers[tower].column == hoverRow) ){

				game.selectedTower = towers[tower];
				
				//if (game.selectedTower.type !== 0){ 
					showTowerTooltip(hoverCol, hoverRow) 
				//};

			}
			
		}
	
	// ELSE grid cell is not filled
	}else{
		
		var grid = level.grid;
		
		// checkPlaceTower = FALSE if path error, otherwise new path length
		var newPathTest = checkPlaceTower(grid, hoverCol, hoverRow);
		
		if (newPathTest !== false){
				
				level.newPathLen = newPathTest;
				
				if ( 
					(
						(hoverCol < level.dimensions.columns) && 
						(hoverRow < level.dimensions.rows) 
					) ||
					(
						(hoverCol > 0) && (hoverRow > 0) 
					)
				){
					
					showWallTooltip(hoverCol, hoverRow);
					
				}else{
					
						//console.log('Clicking on an edge wall');
					cancelTooltips();
				}
				
		}else{
			
			//level.grid[hoverCol][hoverRow] = 0;
			//console.log('tooltip not possible - path');
			cancelTooltips();
			
		}// checkPathTest
		
		// Reset to 0 after path testing - will be filled in wallTooltip
		level.grid[hoverCol][hoverRow] = 0;
	}
	
	//console.log('Grid is now ', level.grid);

}


function checkPlaceTower(testGrid, column, row){
	if ( 
		(column == level.start[0] && row == level.start[1] ) 
		||
		(column == level.end[0] && row == level.end[1] )
	){
		//console.log('Trying to place on start/end point!');
		return false;
	}
	
	testGrid[column][row] = 1;
	var prevLen = level.path.length;
	var testPath = plotPath(testGrid, level.start, level.end);
	if (testPath.length == 0){
		return false;
	}else{
		return testPath.length;
	}
}

function calcElapsed(stamp,prev){
	var elapsed = Math.max(1,(stamp - prev) / defaults.elapsedFactor);
	//console.log('calcElapsed',stamp,prev,current.elapsedFactor);
	return elapsed;
}
