/* GLOBAL VARIABLES */
var scr_wid = 0;
var scr_hgt = 0;
var debug = false;
var pathGuide = true;
var hoverRow = -1; 
var hoverCol = -1;
var prevCell = 0;
var enemies = bullets = towers = [];

var defaults = {};

function getDefaults(){
	
	defaults = newHTTPGet('./tower-defence-v2/defaults/default_values.json');
	//var defaults = JSON.parse('./default_values.json');

}

function newHTTPGet(yourUrl){
		
	var httpRqst = new XMLHttpRequest();
	httpRqst.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			defaults = JSON.parse(this.responseText);
			initialiseGame();
		}
	};
	httpRqst.open('GET', yourUrl, true);
	httpRqst.send();			
}
