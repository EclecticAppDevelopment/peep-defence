const ENEMY_TYPE_BASIC = 0;
const ENEMY_TYPE_TANK = 1;
const ENEMY_TYPE_SPEEDER = 2;
const ENEMY_TYPE_AIR = 3;
const ENEMY_TYPE_BOSS = 4;

var enemy_type_defaults = [
	
	//ENEMY_TYPE_BASIC: {
	{	
		radius: 7,
		speed: 0.1,
		color: '#fa4',
		maxHP: 25,
		shield: 1,
		name: 'Basic'
	},
	//ENEMY_TYPE_TANK: {
	{
		radius: 12,
		speed: 0.05,
		color: '#47f',
		maxHP: 50,
		shield: 10,
		name: 'Tank'
	},
	//ENEMY_TYPE_SPEEDER: {
	{
		radius: 12,
		speed: 0.25,
		color: '#ff4',
		maxHP: 25,
		shield: 10,
		name: 'Speeder'
	},
	//ENEMY_TYPE_AIR: {
	{
		radius: 15,
		speed: 0.1,
		color: '#4ff',
		maxHP: 25,
		shield: 5,
		name: 'Air'
	},
	//ENEMY_TYPE_BOSS: {
	{
		radius: 15,
		speed: 0.05,
		color: '#84f',
		maxHP: 1000,
		shield: 25,
		name: 'Boss'
	}
	
];
