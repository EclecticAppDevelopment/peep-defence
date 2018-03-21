/*
	DESCRIPTION
	
	These are the defined modal windows for Peep Defence
	
	IMPORTANT: any variables referenced (e.g. options.tower_cost) will be evaluated on init(),
			   so cannot provide any CURRENT or "live" values. Such modals should be handled separately.
			   
*/

var modals = {
	intro: {
		title:'Introduction',
		screens: [
			{
				body: 'Welcome to Peep Defence!<br>You must defend against waves of enemies to win the game!',
				footer: {
					left: false,
					right: {
						string: 'Next',
						action: 'showModal("Introduction",1)'
					}
				}
			},
			{
				body: 'Tap a square on the game grid to place a tower.<br>Towers cost £' + options.tower_cost + ' each.',
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
				body: 'When you are ready, click the green button to send in enemies!<br>Good luck!',
				footer: {
					left: {
						string: 'Previous',
						action: 'showModal("Introduction",1)'
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
				body: 'You died!<br>Reached Wave <span id="modal-detail"></span><br>Click the button to restart the game!',
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
	towerExpense: {
		title:'Tower Too Expensive',
		screens: [
			{
				body: 'Can\'t afford this tower!<br>Towers cost £' + options.tower_cost + ' to buy!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	},
	upgradeExpense: {
		title:'Upgrade Too Expensive',
		screens: [
			{
				body: 'Can\'t afford this upgrade!',
				footer: {
					left: false,
					right: false
				}
			}
		]
		
	}

}