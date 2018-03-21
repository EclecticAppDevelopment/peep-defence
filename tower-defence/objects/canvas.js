function handleClick(x,y){
	
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
				showTowerModal();

			}
		}
	}else{
		
		var grid = current.grid;
		// checkPlaceTower = FALSE if path error, otherwise new path length
		var newPathTest = checkPlaceTower(grid, hoverCol, hoverRow);
		
		if (newPathTest !== false){
		
			//				 Tower(level, type, col, row, 	column, 	r, 			rot_speed, bullet_speed, fire_rate, range, cost){
			var newTower = new Tower(1, 0, '#0f0', hoverCol, hoverRow, current.cell_width, 1, 5, 1, 3);
			var tower_cost = newTower.cost;
			
			if (current.cash >= tower_cost){
				
				// ADD A TOWER
				
				// Update the grid and enemy path
				current.grid[hoverCol][hoverRow] = 1;
				var prevPathLen = current.path.length;
				current.path = plotPath(current.grid, current.start, current.end);
				ctx.strokeStyle = '#a00';
				draw_path(ctx,current.grid,current.path);
				
				// Update enemy paths
				var pathDiff = newPathTest - prevPathLen;
				if (pathDiff !== 0){
					for (var enemy in enemies){
						var prevPathIndex = enemies[enemy].path_index;
						var progress = (prevPathIndex + 1) / prevPathLen;
						var newPathIndex = Math.floor(newPathTest * progress);
						enemies[enemy].path_index = newPathIndex;
						//console.log('Path update - prev:',prevPathIndex,' new:',newPathIndex,'progress:',progress);
					}
				}
			
				current.cash -= tower_cost;
				
				towers.push(newTower);
				
			}else{
				
				current.grid[hoverCol][hoverRow] = 0;
				showModal('Tower Too Expensive',0);
				
			}
			
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
	var elapsed = (stamp - prev) / options.elapsedFactor;
	//console.log('calcElapsed',stamp,prev,current.elapsedFactor);
	return elapsed;
}