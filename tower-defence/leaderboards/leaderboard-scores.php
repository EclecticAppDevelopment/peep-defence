<?php

	/* NEW - VERSION 1.5 */

	include_once('leaderboard-setup.php');

	/* Test the connection and die on error */
  if ($sql_conn->connect_error){
    die("Connection failed: " . $sql_conn->connect_error);
  }

  /* TABLES:
    @all_players( ID, PlayerName, RegDate )
    @peep_defence( ScoreID, ScoreDate, PlayerID, ScoreValue )
  */

  $sql_query = "SELECT all_players.PlayerName, peep_defence.ScoreDate, peep_defence.ScoreValue FROM peep_defence INNER JOIN all_players ON peep_defence.PlayerID = all_players.ID ORDER BY ScoreValue DESC LIMIT 10";

  $result = $sql_conn->query($sql_query);
  if ($result->num_rows > 0){
      //echo "<h1>Scores Table</h1>
			echo "<table class='w3-center w3-table w3-striped w3-bordered'>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Date</th>
        </tr>";

      while($row = $result->fetch_assoc()){
        echo "
        <tr>
          <td>" . $row["PlayerName"] . "</td>
          <td>" . $row["ScoreValue"] . "</td>
					<td>" .  $row["ScoreDate"] . "</td>
        </tr>
      ";

      }

      echo "</table>";
  }

  $sql_conn->close();

?>
