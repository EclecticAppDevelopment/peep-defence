var leaderboardData;

function leaderboardUpdate(){

	//var name = game.name;
	var id = game.playerID;
	var score = game.score;
	console.log('Updating score ' + id + ', ' + score);
	var httpRqst = new XMLHttpRequest();
	httpRqst.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//defaults = JSON.parse(this.responseText);
			//leaderboardData = this.responseText;
			console.log('Leaderboard Updated... getting data');
			getLeaderBoardData();
		}
	};
	httpRqst.open('GET', 'tower-defence-v2/leaderboards/leaderboard-update.php?playerID=' + id + '&score=' + score , true);
	httpRqst.send();
}

function getLeaderBoardData(){

	var httpRqst = new XMLHttpRequest();
	httpRqst.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//defaults = JSON.parse(this.responseText);
			leaderboardData = this.responseText;
			showLeaderBoard();
		}
	};
	httpRqst.open('GET', 'tower-defence-v2/leaderboards/leaderboard-scores.php', true);
	httpRqst.send();

}

function showLeaderBoard(){

	var detailSpan = document.getElementById('modal-detail');
	detailSpan.innerHTML = leaderboardData;

}

/*
	The first time the player starts the game, this function will fire.
	Calls to the leaderboard table and assigns a new playerID which gets saved in the game data.
*/

function getNewPlayerID(){

	console.log('Getting new playerID');
	var httpRqst = new XMLHttpRequest();
	httpRqst.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var playerID = this.responseText;
			console.log('New ID generated = ',playerID);
		}
	};
	httpRqst.open('GET', 'tower-defence-v2/leaderboards/leaderboard-ID.php', true);
	httpRqst.send();

}
