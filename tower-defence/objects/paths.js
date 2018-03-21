function plotPath(map,startP,endP){
	
	// 5 columns and 7 rows
	//To find a path you need a grid first. Create a 5 by 7 grid:
	//var grid = new PF.Grid(5, 7);
	//In this grid, the green cell at the top left is [0, 0] and the orange cell at the bottom right is [4, 6].
	//var path = finder.findPath(0, 0, 4, 6, grid);

	var grid = new PF.Grid(map);
	
	//var finder = new PF.JumpPointFinder({ allowDiagonal: false });		// NOPE - STRAIGHT DIAGONAL?
	//var finder = new PF.AStarFinder();									// WORKS - JAGGED PATH, LOOSE
	var finder = new PF.BestFirstFinder({ allowDiagonal: false });		// WORKS - TO BOTTOM, THEN RIGHT
	//var finder = new PF.BreadthFirstFinder({ allowDiagonal: false });		// WORKS - TO BOTTOM, THEN RIGHT
	//var finder = new PF.DijkstraFinder({ allowDiagonal: false });			// WORKS - JAGGED PATH, TIGHT
	//var finder = new PF.IDAStarFinder({ allowDiagonal: false });			// WORKS - TO BOTTOM, THEN RIGHT
	//var finder = new PF.OrthogonalJumpPointFinder({ allowDiagonal: false });// NOPE - TO BOTTOM, THEN RIGHT
	
	//To find a path from (1, 2) to (4, 2), (Note: both the start point and end point should be walkable):
	var path = finder.findPath(startP[1], startP[0], endP[1], endP[0], grid);
	//if (debug){console.log('Path: ',path)};
	return path;
}

function convertPathPoint(index){
	var row = current.path[index][0];
	var col = current.path[index][1];
	var width = current.width / current.columns;
	var height = current.height / current.rows;
	xpos = width * row + (width / 2);
	ypos = height * col + (height / 2);
	return this.x = xpos, this.y = ypos;
}

function draw_path(ctx,map,path){
	rows = map[0].length;
	columns = map.length;

	var x = path[0][0];
	var y = path[0][1];

	var xpos = convertColToX(ctx, y, current.columns, true );
	var ypos = convertRowToY(ctx, x, current.rows, true );
	
	ctx.moveTo(xpos,ypos);

	for (var i = 1; i < path.length; i++){
		x = path[i][0];
		y = path[i][1];
		xpos = convertColToX(ctx, y, current.columns, true );
		ypos = convertRowToY(ctx, x, current.rows, true );
		ctx.lineTo(xpos,ypos);
		ctx.moveTo(xpos,ypos);
		ctx.stroke();
	}
}

function draw_styled_path(ctx,map,path,style){
	
	rows = map[0].length;
	columns = map.length;

	var startX = path[0][0];
	var startY = path[0][1];
	
	var startXPos = convertColToX(ctx, startY, current.columns, true );
	var startYPos = convertRowToY(ctx, startX, current.rows, true );
	//var xpos = convertColToX(ctx, y, current.columns, true );
	//var ypos = convertRowToY(ctx, x, current.rows, true );
	
	ctx.beginPath();
	ctx.moveTo(startXPos,startYPos);
	
	switch (style){
		
		case 0:
			// Solid line
			for (var point = 1; point < path.length; point++){
				nextX = path[point][0];
				nextY = path[point][1];
				nextXPos = convertColToX(ctx, nextY, current.columns, true );
				nextYPos = convertRowToY(ctx, nextX, current.rows, true );
				ctx.lineTo(nextXPos,nextYPos);
				ctx.moveTo(nextXPos,nextYPos);
				ctx.stroke();
			}
			break;
			
		case 1:
			// Dashed line
			ctx.setLineDash([5]);
			for (var point = 1; point < path.length; point++){
				nextX = path[point][0];
				nextY = path[point][1];
				nextXPos = convertColToX(ctx, nextY, current.columns, true );
				nextYPos = convertRowToY(ctx, nextX, current.rows, true );
				ctx.lineTo(nextXPos,nextYPos);
				ctx.moveTo(nextXPos,nextYPos);
				ctx.stroke();
				
				
				/*
				// Line from (start point + 1/4) to (end point - 1/4)
				nextX = path[point][0];
				nextY = path[point][1];
				
				if (Math.abs(nextX - startX) == 1){
					// Horizontal dash
					console.log('H DASH');
					nextXPos = convertColToX(ctx, nextY, current.columns, true );
					nextYPos = convertRowToY(ctx, nextX, current.rows, true );
					midXPos = startXPos + ( (nextXPos - startXPos) / 4);
					midYPos = nextYPos;
					
					ctx.moveTo(midXPos,midYPos);
					
					midXPos = startXPos + ( 3 * (nextXPos - startXPos) / 4);
					midYPos = nextYPos;
					
					ctx.lineTo(midXPos,midYPos);
					ctx.moveTo(nextXPos,nextYPos);
					ctx.stroke();

					startXPos = nextXPos;
					startYPos = nextYPos;
					
				}else{
					// Vertical dash
					console.log('V DASH');
					nextXPos = convertColToX(ctx, nextY, current.columns, true );
					nextYPos = convertRowToY(ctx, nextX, current.rows, true );
					midYPos = startYPos + ( (nextYPos - startYPos) / 4);
					midXPos = nextXPos;
					
					ctx.moveTo(midXPos,midYPos);
					
					midYPos = startYPos + ( 3 * (nextYPos - startYPos) / 4);
					midXPos = nextXPos;
					
					ctx.lineTo(midXPos,midYPos);
					ctx.moveTo(nextXPos,nextYPos);
					ctx.stroke();
					
					startXPos = nextYPos;
					startYPos = nextXPos;
				}
				*/
				
			}
			break;
			
	}
	
	ctx.closePath();
	ctx.restore();
}