/*
	DESCRIPTION
	
	These are the defined modal windows for Peep Defence
	
	IMPORTANT: 
	
	any variables referenced (e.g. options.tower_cost) will be evaluated on init(),
	so by default these cannot provide any CURRENT or "live" values. 
			   
	Such modals should be handled separately, example below:
			  
	USE THE <span id="modal-detail"></span> TRICK, a la 'Game Over' to
	show the modal and update the innerHTML of 'modal-detail' afterwards to achieve a "live" modal
	
*/

var modals = {
	intro: {
		title:'Introduction',
		screens: [
			{
				body: 'Welcome to <br><h2>Peep Defence!</h2><br>Enter your in-game name:<br><input class="w3-center w3-input w3-large" onchange="setPlayerName(this.value)" placeholder="Commander"></input>',
				footer: {
					left: false,
					right: {
						string: 'Next',
						action: 'showModal("Introduction",1); document.getElementById("name-detail").innerHTML = game.name;'
					}
				}
			},
			{
				body: 'OK then, <span id="name-detail"></span>!<br>Your job - should you choose to accept it - is to save the planet!<br>Only you can lead the fight against increasingly tough waves of geometric bastards who have invaded your planet!',							 
				footer: {
					left: {
						string: 'Previous',
						action: 'showModal("Introduction",0)'
					},
					right: {
						string: 'Next',
						action: 'showModal("Introduction",2)'
					}
				}
			},
			{
				body: 'Beat all the waves on this level to move on to the next map.<br>The first level has 10 waves to beat, and there are 5 levels in total.<br>Tap a square on the game grid to place a wall or a tower.<br>Walls divert the path of ground enemies and cost £' + default_towers[0].cost + ' each.',
				footer: {
					left: {
						string: 'Previous',
						action: 'showModal("Introduction",1)'
					},
					right: {
						string: 'Next',
						action: 'showModal("Introduction",3)'
					}
				}
			},
			{
				body: 'You can also pick one of three towers to fight back against enemies:<b><ul style="text-align:center; list-style-type:none;"><li>Gun towers (cheap)</li><li>Bomb towers (blast)</li><li>Ice towers (slows)</li></ul></b>',
				footer: {
					left: {
						string: 'Previous',
						action: 'showModal("Introduction",2)'
					},
					right: {
						string: 'Next',
						action: 'showModal("Introduction",4)'
					}
				}
			},
			{
				body: 'Wave 1 has "Basic" enemies which are small, circular and pretty boring!<br>No trouble in low numbers but might cause problems later on!<br>When you are ready, click the "Start Wave" button to send in enemies!<br>Good luck!',
				footer: {
					left: {
						string: 'Previous',
						action: 'showModal("Introduction",3)'
					},
					right: false
				}
			}
				
		]
		
	},
	outro: {
		title:'Game Over',
		screens: [
			{
				body: 'You died!<br>You reached Level <span id="modal-detail"></span><br>Click the button to restart the game!',
				footer: {
					left: {
						string: 'Try Level Again',
						action: 'levelRestart();'
					},
					right: {
						string: 'Restart Game',
						action: 'gameRestart();'
					}
				}
			}
		]
		
	},
	no_save: {
		title:'No Saved Data',
		screens: [
			{
				body: 'No Saved Data available! Play long enough to save your progress first.',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	theEnd: {
		title:'The End (for now)',
		screens: [
			{
				body: 'You made it to the end!<br>More waves will be added later - why not go back and see if you can do better!<br>Click the button to restart the game!',
				footer: {
					left: false,
					right: {
						string: 'Restart',
						action: 'resetToOptions(); resetGame();'
					}
				}
			}
		]
		
	},
	finishCurrent: {
		title:'Finish Current Wave',
		screens: [
			{
				body: 'Sorry, you must defeat all enemies in this wave before starting the next wave!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	waveComplete: {
		title:'Wave Complete!',
		screens: [
			{
				body: 'Good work in getting through that wave!<br>The next one will not be so easy...<br>Get ready for wave <span id="modal-detail"></span>!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	towerExpense: {
		title:'Tower Too Expensive',
		screens: [
			{
				body: 'Cannot afford this tower!<br>This tower costs £<span id="modal-detail"></span> to buy!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	maxLevel: {
		title:'Max Level Reached!',
		screens: [
			{
				body: 'Sorry, you have upgraded this tower to the maximum possible level!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	upgradeExpense: {
		title: 'Upgrade Too Expensive',
		screens: [
			{
				body: 'Can\'t afford this upgrade!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	enemy_basic: {
		title: 'Basic',
		screens: [
			{
				body: 'Basic enemies are small, circular and pretty boring!<br>No trouble in low numbers but might cause problems later on!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	enemy_tank: {
		title: 'Wave <span id="modal-detail"></span> - Tank',
		screens: [
			{
				body: 'Tanks are square and while slow they have much more health!<br>Take them out early to free up your towers for other enemies!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	enemy_speeder: {
		title: 'Wave <span id="modal-detail"></span> - Speeder',
		screens: [
			{
				body: 'Speeders are fast, triangular and difficult to hit!<br>Ice towers can help slow these sneaky buggers down!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	enemy_air: {
		title: 'Wave <span id="modal-detail"></span> - Air',
		screens: [
			{
				body: 'Air enemies look like bowties and fly over your towers!<br>They will just fly straight to the end point! Nasty!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	enemy_boss: {
		title: 'Wave <span id="modal-detail"></span> - Boss',
		screens: [
			{
				body: 'This wave contains BOSS enemies - which are star shaped and have tons of health! Good luck!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	shields: {
		title: 'Wave <span id="modal-detail"></span> - Shields',
		screens: [
			{
				body: 'Enemies with shields have a blue circle around them!<br>IMPORTANT: bomb towers don\'t affect shielded enemies - only gun and ice towers!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	shieldSpeeder: {
		title: 'Wave <span id="modal-detail"></span> - Shielded Speeder',
		screens: [
			{
				body: 'What sort of devious bastard thought to put a shield on a speeder enemy!<br>That\'s just evil!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	
	levelTwo: {
		title: 'Level 2',
		screens: [
			{
				body: 'You made it through Level 1!<br>Level 2 starts off the same but gets much harder! Good luck!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	
	levelThree: {
		title: 'Level 3',
		screens: [
			{
				body: 'You made it through Level 2!<br>Level 3 is bigger and badder than anything you have faced before! Good luck!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	
	levelFour: {
		title: 'Level 4',
		screens: [
			{
				body: 'You made it through Level 3!<br>You are now moving into the penultimate level!<br>Keep going - you have nearly made it!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	
	levelFive: {
		title: 'Level 5',
		screens: [
			{
				body: 'This is it! The finale!<br>Level 5 will test your abilities to the limit!<br>Hope to see you on the other side!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	
	settingsModal: {
		
		title: 'Settings',
		screens: [
			{
				body: 'This screen will be used to change some settings in future versions!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	
	infoModal: {
		
		title: 'Info',
		screens: [
			{
				body: 'Replay the introductory tutorial and view credits for this game.',
				footer: {
					left: {
						string: 'Replay Intro',
						action: 'showModal("Introduction",0);'
					},
					right: {
						string: 'View Credits',
						action: 'showModal("Credits",0);'
					}

				}
			}
		]
		
	},
	
	dataModal: {
		
		title: 'Data',
		screens: [
			{
				body: 'Load a saved game at the start of the last level you completed (if you are playing on easy or normal difficulty, the game autosaves at the end of each level).<br>You can also restart the game from the beginning.',
				footer: {
					left: {
						string: 'Restart Game',
						action: 'gameRestart();'
					},
					right: {
						string: 'Load Data',
						action: 'loadGameDataFromSessionStorage();'
					}

				}
			}
		]
		
	},
	
	statsLeadModal: {
		
		title: 'Stats & Leaderboards',
		screens: [
			{
				body: 'View your play statistics in detail and compare your scores to the global leaderboard with the buttons below.',
				footer: {
					left: {
						string: 'Statistics',
						action: 'showModal("Game Statistics",0); document.getElementById("modal-detail").innerHTML = getStatsTable();'
					},
					right: {
						string: 'Leaderboards',
						action: 'showModal("Leaderboards",0); getLeaderBoardData();'
					}

				}
			}
		]
		
	},
	
	LeadModal: {
		
		title: 'Leaderboards',
		screens: [
			{
				body: '<span id="modal-detail">Loading...</span>',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	
	statisticsModal: {
		
		title: 'Game Statistics',
		screens: [
			{
				body: '<span id="modal-detail"></span>',
				footer: {
					left: false,
					right: false

				}
			}
		]
		
	},
	
		creditsModal: {
		
		title: 'Credits',
		screens: [
			{
				body: 'Game version 1.5 (April 2018) developed by Matt Tiernan.<br>Credit to <a target="_blank" href="http://github.com/qiao/PathFinding.js/">Qiao for pathfinding.js</a>, used in this version to route enemies from the grid start to end.',
				footer: {
					left: false,
					right: false

				}
			}
		]
		
	}
	

}
