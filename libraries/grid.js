// Now allows variable dimensions (rather than square!)
function draw_grid(ctx, columns, rows){
	var width = ctx.canvas.width / columns;
	var height = ctx.canvas.height / rows;
	for (var col = 1; col < columns; col++){
		for (var row = 1; row < rows; row++){	
			ctx.moveTo(width * col, 0);
			ctx.lineTo(width * col, ctx.canvas.height);
			ctx.moveTo(0, height * row);
			ctx.lineTo(ctx.canvas.width, height * row);
		}
	}
	ctx.stroke();
}

function generateBoxGrid(columns,rows){
	// Box means that row 0 and row (length - 1) are filled with 1s
	// Along with column 0 and column (length - 1)
	// grid format is [col, row]
	var newGrid = [[]];
	for (var col = 0; col < columns; col++){
		newGrid[col] = [];
		for (var row = 0; row < rows; row++){
			if ( 
				(row == 0) || 
				(row == (rows - 1)) || 
				(col == 0) || 
				(col == (columns - 1)) 
			){
				newGrid[col][row] = 1;
			}else{
				newGrid[col][row] = 0;
			}
		}
	}
	return newGrid;
}

function convertRowToY(ctx, row, row_count, centre){
	var cell_width = ctx.canvas.width / row_count;
	var offset = 0;
	if (centre){ offset = (cell_width / 2); }
	var y = Math.floor( (cell_width * row) + offset);
	//console.log('convertrowtoy: ',row,row_count,centre,'=>',cell_width,offset,y);
	return y;
}

function convertColToX(ctx, col, col_count, centre){
	var cell_height = ctx.canvas.height / col_count;
	var offset = 0;
	if (centre){ offset = (cell_height / 2); }
	var x = Math.floor( (cell_height * col) + offset);
	//console.log('convertcoltox: ',col,col_count,centre,'=>',cell_height,offset,x);
	return x;
}

function convertXToCol(ctx, x, col_count){
	var cell_width = ctx.canvas.width / col_count;
	var col = Math.floor( x / cell_width );
	//console.log('convertxtocol:',x,col);
	return col;
}
function convertYToRow(ctx, y, row_count){
	var cell_height = ctx.canvas.height / row_count;
	var row = Math.floor( y / cell_height );
	//console.log('convertytorow:',y,row);
	return row;
}
