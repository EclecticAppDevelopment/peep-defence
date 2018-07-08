/* 

Notes 16-04-18, handling objects better

1. Game -> SAVE DATA
	
	Stats
	Name
	Score
	Cash
	Health
	Difficulty
	
2. Level -> NOT SAVED
	Towers

3. Wave -> NOT SAVED
	Enemies
	Bullets

*/


/* -----------------
	DIFFICULTIES
------------------*/
const DIFFICULTY_EASY = 0;
const DIFFICULTY_MEDIUM = 1;
const DIFFICULTY_HARD = 2;
	
var difficulty_effects = [

	{
		// EASY
		name: 'Easy',
		description: 'On easy mode you regain all health at the end of each level, and you can save between levels too',
		healthRegain: 100,
		waveBonusFactor: 3,
		scoreBonusFactor: 1,
		savingAllowed: true
	},
	{
		// NORMAL
		name: 'Normal',
		description: 'On normal mode you regain half of your health at the end of each level, but you can still can save between levels too',
		healthRegain: 50,
		waveBonusFactor: 2.5,
		scoreBonusFactor: 2,
		savingAllowed: true
	},
	{
		// HARD
		name: 'Hard',
		description: 'On hard mode you regain NO health at the end of each level, and you can NOT save between levels too',
		healthRegain: 0,
		waveBonusFactor: 2,
		scoreBonusFactor: 3,
		savingAllowed: false
	}
	
];

/* -----------------
	GAME OBJECT
------------------*/
function Game(){
	
	// Paused (0) or Playing (1)
	this.state = defaults.state,
	
	// Health - always set to max on game create
	this.HP = defaults.maxHP || 100,
	this.maxHP = defaults.maxHP || 100,

	// The level (map) to load
	this.level = defaults.game_level,
	// Score always 0, cash set to default
	this.score = 0,
	this.cash = defaults.cash || 250,
	
	this.name = 'Commander',
	
	// NOTE!!! Stats not yet implemented
	this.stats = {
		
		// The number of restarts called 
		restarts: 0,
		// The highest wave reached
		highestWaveBeaten: 0,
		// The number of enemies beaten (by type)
		enemiesBeaten: [],
		// The total enemies beaten
		enemiesBeatenTotal: 0,
		
		// The scores reached on each wave
		waveScores: []
		
	},
	
	// The selected cell/tower on the grid (tooltips)
	this.selectedCell = false,				
	this.selectedTower = {},
	this.selectedType = 0,
	
	// In game.nextLevel(), store game stats (score/cash/health for level.restart)
	this.storedData = false,
	// The difficulty level (defaults to normal - see top of file)
	this.difficulty = defaults.difficulty || 0
	
}

function gameRestart(){
	
	console.log('Game restarted');
	game = new Game();

	//var fgCtx = document.getElementById('canvas').getContext('2d');
	levelRestart();
	
}

/* Resets back to LEVEL 1 and sets up game
Game.prototype.restart = function(){
	
	this.level = defaults.game_level;
	this.HP = defaults.maxHP;
	this.cash = defaults.cash;
	this.score = 0;
	
	// Clear map, towers, enemies, bullets
	
	showModal("Introduction",0);

} */

/* Moves to the next level (map) in the game */
Game.prototype.nextLevel = function(){
	
	console.log('Next game level', this.level);
	this.level += 1;

	levelSetup();
	
	// Add new level score
	this.score += this.cash * difficulty_effects[game.difficulty].scoreBonusFactor;
	
	// Set new level cash
	this.cash = defaults.cash;
	
	// Set new level health
	this.HP = Math.min(this.HP + difficulty_effects[this.difficulty].healthRegain, defaults.maxHP);
	
	// If saving, add level start info
	if (difficulty_effects[this.difficulty].savingAllowed == true){
		
		saveGameDataToSessionStorage();
	
	}
	
	//saveGameDataToSessionStorage();
	
	enableWaveBtn();
	
	//showModal('Level ' + (game.level + 1) ,0);
	
}

function saveGameDataToSessionStorage(){
	
	var encodedData = JSON.stringify(game);
	localStorage.setItem("peepDefenceProgress", encodedData);
	console.log('Game saved');
}

function loadGameDataFromSessionStorage(){

	var encodedData = localStorage.getItem("peepDefenceProgress");
	if (encodedData === null){
		
		showModal("No Saved Data",0);
	
	}else{
		
		game = JSON.parse(encodedData);
		levelRestart();
	}
}

function setPlayerName(thisName){
	game.name = thisName;
};

/* You lose! Show final score and allow restarts */
Game.prototype.over = function(){
	
	window.cancelAnimationFrame(mainLoopRequest);
	console.log('Game over');
	var waveBtn = document.getElementById('waveBtn');
	waveBtn.innerHTML = 'Reset Game!';
	waveBtn.onclick = function(){level.restart();};
	
	enemies = [];
	showModal("Game Over",0);
	var detailSpan = document.getElementById('modal-detail');
	detailSpan.innerHTML = this.level + ' - Wave ';
	detailSpan.innerHTML += level.wave + ' with a score of ';
	detailSpan.innerHTML += this.score;
	
	var ldb_tout = setTimeout(leaderboardUpdate , 3000);
	
	//resetToOptions();
	//level.restart();
	//window.cancelAnimationFrame();
	
}

/* -----------------
	LEVEL OBJECT
------------------*/

/* Used to generate the specific level (map) being played */
function Level(ctx, set_rows, set_columns, set_grid, startCell, endCell){
	
	this.dimensions = {
		rows: set_rows,
		columns: set_columns,
		width: ctx.canvas.width,
		height: ctx.canvas.height,
		cell_width: function(){
			var w = ctx.canvas.width / this.rows;
			return w;
		},
		cell_height: function(){
			var h = ctx.canvas.height / this.columns;
			return h;
		}
	},
	
	this.path = [],
	this.grid = set_grid || [],
	this.gridUpdated = true,
	this.newPathLen = false,
	
	this.start = startCell || [1,1],
	this.spawnX = 0,
	this.spawnY = 0,
	
	this.end = endCell || [9,9],

	this.enemyCount = 0,
	this.wave = 0,
	this.waveLimit = levelMaps[game.level].waveLimit

}

function levelRestart(){
	
	console.log('Level restarted');
	game.stats.restarts += 1;
	
	levelSetup();

}

function levelSetup(){
	
	console.log('Level setup');
	var ctx = document.getElementById('canvas').getContext('2d');
	
	var level_data = levelMaps[game.level];
	level = new Level(ctx, level_data.rows, level_data.columns, level_data.grid, level_data.start, level_data.end);
	
	level.path = plotPath(level.grid, level.start, level.end);
	if (level.path.length == 0){
		console.log('Path error');
	}
	
	resizeCanvas();
	
	if (game.level == 0){
		showModal('Introduction',0);
	}else{
		showModal('Level ' + (game.level + 1), 0);
	}
	
	towers = [];
	bullets = [];
	enemies = [];
	explosions = [];
	
	enableWaveBtn();
	
}

/* Applies all GUI and object changes for next wave */
Level.prototype.nextWave = function(){
	
	//this.wave += 1;
	
	console.log('Next wave', this.wave);
	// Apply a cash bonus for completing the wave 
	game.cash += Math.floor( this.wave * difficulty_effects[game.difficulty].waveBonusFactor);
	
	game.score += Math.floor( this.wave * difficulty_effects[game.difficulty].scoreBonusFactor);
	
	// Pause the game
	game.state = 0;
	
	//Update stats - first time called, wave = 1
	
	// For wave scores, use (level.wave - 1) so index = 0
	var waveHighScore = game.stats.waveScores[this.wave - 1] || 0;
	if (game.score > waveHighScore){
		game.stats.waveScores[this.wave - 1] = game.score;
	}
	
	// For highestWaveBeaten, use (level.wave) = 1
	var highestWave = game.stats.highestWaveBeaten;
	if (this.wave > highestWave){
		// Level + 1 beaten (index 0)
		game.stats.highestWaveBeaten = this.wave; 
	}
	
	// Show the next wave modal - either tutorial or generic
	level_alert = waveMaps[this.wave].alert_modal;
	if (level_alert !== undefined){
		showModal('Wave <span id="modal-detail"></span> - ' + level_alert, 0);
	}else{
		showModal('Wave Complete!', 0);
	}
	
	/* Show wave level in whichever modal is shown */
	var detailSpan = document.getElementById('modal-detail');
	detailSpan.innerHTML = this.wave + 1;
	
	/* Enable Next Wave button */
	var waveBtn = document.getElementById('waveBtn');
	if (this.wave == this.waveLimit - 1){	
	
		enableWaveBtn();
		waveBtn.innerHTML = 'Final Wave!';
		
	}else{
		
		enableWaveBtn();
		
	}
	// Start of next wave handled by waveBtnClick eve
	
	if (difficulty_effects[game.difficulty].savingAllowed == true){
		
		saveGameDataToSessionStorage();
	
	}

	
}
