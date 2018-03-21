/* GLOBAL VARIABLES */
var scr_wid = 0;
var scr_hgt = 0;
var debug = false;
var pathGuide = true;
var hoverRow = -1; 
var hoverCol = -1;
var prevCell = 0;
var enemies = bullets = towers = [];

var options = {
	segments: 10,
	rows: 10,
	columns: 10,
	health: 10,
	score: 0,
	cash: 50,
	maxHP: 100,
	default_index: 0,
	canvas_padding: 5,
	tower_cost: 25,
	context_strokeStyle: '#000',
	context_lineWidth: 1,
	elapsedFactor: 10,
	cashFactor: 5,
	damageFactor:10,
	enemyHealthFactor: 1,
	enemySpeedFactor: 2,
	fireRateFactor: 100
};

var current = {
	state: 1,
	index: 0,	// Picks options.default_index
	rows: 10,
	columns: 10,
	width: 100,
	height: 100,
	HP: 100,
	maxHP: 100,
	cell_width: 10,
	cell_height: 10,
	score: 0,
	cash: 250,
	path: [],
	grid: [],
	start: [1,1],
	end: [9,9],
	tower: false,
	enemyCount: 0
};