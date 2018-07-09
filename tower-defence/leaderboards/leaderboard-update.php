<?php

	/* NEW - VERSION 1.5 */

	/* Get posted data (new score and ID) */
  if ($_GET["playerID"] && $_GET["score"]){
    $playerID = mysqli_real_escape_string($_GET["playerID"]);
    $playerScore = mysqli_real_escape_string($_GET["score"]);
  }else{
    die ("Error receiving new score");
  }

  // Opens $sql_conn
	include_once('leaderboard-setup.php');

  /* Test the connection and die on error */
  if ($sql_conn->connect_error){
    die("Connection failed: " . $sql_conn->connect_error);
  }

  echo "Inserting Player " . $playerID. " -> Score " . $playerScore . "<br>";

  $sql_query = "INSERT INTO peep_defence (PlayerID, ScoreValue) VALUES ('" .  $playerID . "', '" . $playerScore . "')";

  if ($sql_conn->query($sql_query) === TRUE) {
      $thisScoreID = $sql_conn->insert_id;
      echo "New score added successfully<br>";
      echo "Player ID: $playerID<br>";
      echo "Score: $playerScore<br>";
  } else {
      echo "Error: " . $sql_query . "<br>" . $sql_conn->error;
  }

  $sql_conn->close();

?>
