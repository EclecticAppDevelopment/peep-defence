const ENEMY_TYPE_BASIC = 0;
const ENEMY_TYPE_TANK = 1;
const ENEMY_TYPE_SPEEDER = 2;
const ENEMY_TYPE_STAR = 3;
const ENEMY_TYPE_BOSS = 4;

var enemy_type_defaults = [
	
	//ENEMY_TYPE_BASIC: {
	{	
		radius: 5,
		speed: 0.1,
		color: '#f0f',
		maxHP: 20,
		shield: 0
	},
	//ENEMY_TYPE_TANK: {
	{
		radius: 10,
		speed: 0.05,
		color: '#f90',
		maxHP: 50,
		shield: 1
	},
	//ENEMY_TYPE_SPEEDER: {
	{
		radius: 5,
		speed: 0.25,
		color: '#ff9',
		maxHP: 25,
		shield: 0
	},
	//ENEMY_TYPE_STAR: {
	{
		radius: 8,
		speed: 0.1,
		color: '#f9f',
		maxHP: 100,
		shield: 1
	},
	//ENEMY_TYPE_BOSS: {
	{
		radius: 10,
		speed: 0.05,
		color: '#f0f',
		maxHP: 1000,
		shield: 5
	}
	
];