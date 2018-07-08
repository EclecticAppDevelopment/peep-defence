var default_towers = [
	
	{
		name: 'Wall',
		cost: 10,
		color: '#666',
		upgradeFact: 0,
		maxLevel: 1,
		tooltip: function(){
			var options = {};
			options.color = '#666';
			options.iconClass = 'fas';
			options.iconName = 'fa-square';
			options.fontColor = '#fff';
			return options;
		},
		upgrades: function(){
			return false;
		}
	},
	
	/*
	1.0, 				// rot_speed
	3.0, 				// bullet_speed
	1.0,				// fire_rate
	2.0, 				// range
	*/
	{
		name: 'Gun',
		cost: 50,
		color: '#c60',
		rot_speed: 0.1,
		bullet_speed: 4.5,
		fire_rate: 9,
		delay: this.fire_rate * 10,
		range: 3,
		upgradeFact: 1.1,
		maxLevel: 5,
		upgrades: function(){
			var options = {};
			options.speedFact = 1.1;
			options.rateFact = 1.1;
			options.rangeFact = 1.05;
			options.cost = this.cost * 3;
			return options;
		},
		tooltip: function(){
			var options = {};
			options.color = '#c60';
			options.iconClass = 'fas';
			options.iconName = 'fa-crosshairs';
			options.fontColor = '#fff';
			return options;
		}
	},
	{
		name: 'Bomb',
		cost: 250,
		color: '#ff0',
		rot_speed: 0.5,
		bullet_speed: 1,
		fire_rate: 25,
		delay: this.fire_rate * 10,
		range: 1.5,
		upgradeFact: 1.65,
		maxLevel: 9,
		upgrades: function(){
			var options = {};
			options.speedFact = 1.25;
			options.rateFact = 1.25;
			options.rangeFact = 1.01;
			options.cost = this.cost * 3;
			return options;
		},
		tooltip: function(){
			var options = {};
			options.color = '#ff0';
			options.iconClass = 'fas';
			options.iconName = 'fa-bomb';
			options.fontColor = '#000';
			return options;
		}
	},
	{
		name: 'Ice',
		cost: 500,
		color: '#cff',
		rot_speed: 0.5,
		bullet_speed: 2,
		fire_rate: 50,
		delay: this.fire_rate * 10,
		range: 1.5,
		upgradeFact: 1.75,
		maxLevel: 9,
		upgrades: function(){
			var options = {};
			options.speedFact = 1.1;
			options.rateFact = 1.1;
			options.rangeFact = 1.25;
			options.cost = this.cost * 3;
			return options;
		},
		tooltip: function(){
			var options = {};
			options.color = '#cff';
			options.iconClass = 'fas';
			options.iconName = 'fa-snowflake';
			options.fontColor = '#000';
			return options;
		}
	}
	
];
