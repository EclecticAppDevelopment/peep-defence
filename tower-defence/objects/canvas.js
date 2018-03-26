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
		var cnv_pad = options.canvas_padding;
		var hgt_fact = 0.75;
		var wid_fact = 0.45;
		c.width = c.height = Math.min( (scr_wid * wid_fact) - (2 * cnv_pad), (hgt_fact * scr_hgt) - (10 * cnv_pad));
		//c.style.width = c.width + 'px';
	}else{
		// Portrait
		//cnv_pad = Math.max(options.canvas_padding, scr_wid / 10);
		var cnv_pad = scr_wid / 10; //options.canvas_padding;
		c.width = c.height = scr_wid - (2 * cnv_pad);
		//c.style.width = c.width + 'px';
	}
	current.width = c.width;
	current.height = c.height;
	current.cell_width = current.width / current.columns;
	current.cell_height = current.height / current.rows;
	
	// Work out the scale factor to update enemy positions
	var scaleFactor = current.width / prevSize;
	
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
	spawn_point = {};
	
	// IF there is currently a path (if just loaded, don't bother)
	if (current.path.length !== 0){	
		
		// Recalculate spawn point
		spawn_point.x = convertRowToY(ctx, current.path[0][1], current.rows, true);		// current.cell_width * current.path[0][1] + (current.cell_width / 2);
		spawn_point.y = convertColToX(ctx, current.path[0][0], current.columns, true);	// current.cell_height * current.path[0][0] + (current.cell_height / 2);
		
		// Update the spawn points for enemies
		for (var enemy in enemies){
			
			// If delay >= 0, enemy not yet spawned (so set x,y to spawn point)
			if (enemies[enemy].delay >= 0){
				
				enemies[enemy].x = spawn_point.x;
				enemies[enemy].y = spawn_point.y;
			
			// Else enemy spawned, so update x,y based on scaleFactor (difference from previous canvas size)	
			}else{
				
				enemies[enemy].x = Math.floor(enemies[enemy].x * scaleFactor);
				enemies[enemy].y = Math.floor(enemies[enemy].y * scaleFactor);
			}
		}
		
	}
	
	
	/* IF THE GRID HAS BEEN LOADED, REDRAW IT */
	if (current.grid.length !== 0){
		
		clearCanvas(ctx);	// CLEAR - so transparent
		
		var bgCtx = bgCanvas.getContext('2d');
		fillCanvas(bgCtx);	// FILLED - so white BG
		draw_map(bgCtx);
		draw_styled_path(bgCtx, current.grid, current.path, 1);
	}
	
	// TO ADD - RECALCULATE ENEMY AND BULLET POSITIONS ON RESIZE (INSTANT)
}

function handleClick(ctx, x, y){
	
	// Convert to cell
	hoverCol = convertXToCol(ctx, x, current.columns);
	hoverRow = convertYToRow(ctx, y, current.rows);
	
	/*
		Process for handling clicks in Peep Defence
		
		1) Check if cell is EMPTY or FILLED
			
		2) IF EMPTY (0)
				Check tower add (as per below) and reroute path
				
		3) IF FILLED (1)
				Check if TOWER in this grid location and show upgrade modal

	*/
	
	prevCell = current.grid[hoverCol][hoverRow];
	
	// If grid cell FILLED
	if (prevCell == 1){
		
		// check for existing tower and show Modal
		for (tower in towers){
			
			if ( (towers[tower].row == hoverCol) && (towers[tower].column == hoverRow) ){

				current.tower = towers[tower];
				
				if (current.tower.type == 0){
					
					showTowerTypeModal();	// Buy Tower Type Modal (or sell wall)
					
				}else{
					
					showTowerModal();		// Sell / Upgrade current tower (existing)
				
				}
			}
			
		}
	
	// ELSE grid cell is not filled
	}else{
		
		var grid = current.grid;
		// checkPlaceTower = FALSE if path error, otherwise new path length
		
		var newPathTest = checkPlaceTower(grid, hoverCol, hoverRow);
		
		if (newPathTest !== false){
				
				current.newPathLen = newPathTest;
				//addNewTower(1, hoverCol, hoverRow, newPathTest);
				showWallModal(hoverCol,hoverRow);		// Buy a wall here
				
		}else{
			current.grid[hoverCol][hoverRow] = 0;
		}// checkPathTest

	}

}

function checkPlaceTower(testGrid, col, row){
	if ( 
		(col == current.start[0] && row == current.start[1] ) 
		||
		(col == current.end[0] && row == current.end[1] )
	){
		console.log('Trying to place on start/end point!');
		return false;
	}
	
	testGrid[col][row] = 1;
	var prevLen = current.path.length;
	var testPath = plotPath(testGrid, current.start, current.end);
	if (testPath.length == 0){
		return false;
	}else{
		return testPath.length;
	}
}

function calcElapsed(stamp,prev){
	var elapsed = Math.max(1,(stamp - prev) / options.elapsedFactor);
	//console.log('calcElapsed',stamp,prev,current.elapsedFactor);
	return elapsed;
}
