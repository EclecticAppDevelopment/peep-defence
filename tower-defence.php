<?php

$this_title = 'Peep Defence | Eclectic App Development';
$this_desc = 'Making random bits and bots since a while ago';

$this_type = "website";
$this_locale = "en_us";
$this_url = "http://" . $_SERVER["HTTP_HOST"] . $_SERVER['REQUEST_URI'];

$partials_folder = '/home/u545245070/public_html/templates/partials/';

include $partials_folder . '_declare.php';
include $partials_folder . '_meta.php';
include $partials_folder . '_social.php';

// NEW - COOKES INFORMATION
include $partials_folder . '_cookiesHead.php';

// Game specific styles
echo "<link rel='stylesheet' href='./tower-defence-v2/style/tower-styles.css'/>";

include $partials_folder . '_styles.php';
include $partials_folder . '_structured.php';


$include_folder_files = [

	// These hold the default values and definitions
	[ "./tower-defence-v2/defaults", "defaults" ],
	[ "./tower-defence-v2/defaults", "enemies" ],
	[ "./tower-defence-v2/defaults", "levels" ],
	[ "./tower-defence-v2/defaults", "waves" ],
	[ "./tower-defence-v2/defaults", "towers" ],
	[ "./tower-defence-v2/defaults", "modals" ],

	// These hold the objects and methods
	[ "./tower-defence-v2/objects", "bullets" ],
	[ "./tower-defence-v2/objects", "explosions"],
	[ "./tower-defence-v2/objects", "enemies" ],
	[ "./tower-defence-v2/objects", "towers" ],
	[ "./tower-defence-v2/objects", "game" ],
	[ "./tower-defence-v2/objects", "gui" ],
	[ "./tower-defence-v2/objects", "modals" ],
	[ "./tower-defence-v2/objects", "canvas" ],
	[ "./tower-defence-v2/objects", "tooltip" ],
	[ "./tower-defence-v2/objects", "paths" ],

	// This is the main JS file (mainLoop, init, reset)
	[ "./tower-defence-v2", "main" ],
	
	// Leaderboards
	[ "./tower-defence-v2/leaderboards", "leaderboards" ],
	
	// Generic libraries required for this game
	[ "/libraries/javascript", "window" ],
	[ "/libraries/javascript", "canvas_events" ],
	[ "/libraries/javascript", "pathfinding-browser" ],
	[ "/libraries/javascript", "grid" ]
	
];

for ($i = 0; $i < count($include_folder_files); $i++){
	$this_folder = $include_folder_files[$i][0];
	$this_file = $include_folder_files[$i][1];
	echo "<script defer src='" . $this_folder . "/" . $this_file . ".js'></script>";
}

include $partials_folder . '_scripts.php';	// NOTE, ALSO CLOSES THE HEAD

echo "<body class='w3-dark-grey' onload='EUcookieCheck(); init();' onresize='resizeCanvas()'>";

include $partials_folder . '_navbar.php';

?>

<main id='main'>
	
	<!-- Top Box -->
	<div class='w3-card-10 w3-container w3-medium w3-center w3-padding-large w3-theme-d3'>
		
		<div class='w3-row'>
		
			<div id='canvasWrapper' class='w3-col s12 m6'>
				<canvas id='canvas' width='100%' height='100%'>
					Sorry, your browser does not support the canvas element (Foreground)
				</canvas>
				<canvas id='bgCanvas' width='100%' height='100%'>
					Sorry, your browser does not support the canvas element (Background)
				</canvas>
			</div>
			
			<div class='w3-col s12 m6 w3-large' style='float: right;'>
				
				<div class='w3-row w3-tiny'>
					&nbsp;
				</div>
				
				<div class='w3-row'>
					<div class='w3-col s6 w3-large w3-center'>
						<b>Peep Defence</b>
					</div>
					<div class='w3-col s6 w3-large'>
						<b><button id='waveBtn' onclick='waveBtnClick()' class='w3-button w3-purple w3-ripple w3-round-large w3-hover-green'></button></b>
					</div>
				</div>
				
				<div class='w3-row w3-tiny'>
					&nbsp;
				</div>
				
				<div class='w3-row'>
					<div class='w3-col s3'>
						Health:
					</div>
					<div class='w3-col s9'>
						<div id='gui_health_container' class='w3-red w3-border w3-card-8'>
							<div id='gui_health_text'></div>
							<div id='gui_health' class='w3-container w3-green' style='width:100%'></div>
						</div>
					</div>
				</div>
				
				<div class='w3-row w3-center w3-padding-top w3-text-orange'>
					<div class='w3-col s2'>
						Score:
					</div>
					<div class='w3-col s3'>
						<span id='gui_score'></span>
					</div>
					<div class='w3-col s2'>
						Cash:
					</div>
					<div class='w3-col s5'>
						£ <span id='gui_cash'></span>
					</div>
				</div>
				
				<div class='w3-row w3-center'>
					
					<div class='w3-col s2'>
						Level:
					</div>
					<div class='w3-col s3'>
						<span id='gui_level'></span>
					</div>
				
					<div class='w3-col s2'>
						Wave:
					</div>
					<div class='w3-col s5'>
						(<span id='gui_enemies'></span>)&nbsp;&nbsp;<span id='gui_wave'></span>
					</div>
					
				</div>
				
				<div class='w3-row w3-center w3-large'>
				
					<div class='w3-col s3'>
						<div class='w3-badge w3-circle w3-red w3-padding' onclick='showModal("Settings",0);'>
							<i class='fas fa-cog'></i>
						</div>
					</div>
					<div class='w3-col s3'>
						<div class='w3-badge w3-circle w3-yellow w3-padding' onclick='showModal("Info",0);'>
							<i class='fas fa-info'></i>
						</div>
					</div>
					<div class='w3-col s3'>
						<div class='w3-badge w3-circle w3-orange w3-padding' onclick='showModal("Data",0);'>
							<i class='fas fa-database'></i>
						</div>
					</div>
					<div class='w3-col s3'>
						<div class='w3-badge w3-circle w3-green w3-padding' onclick='showModal("Stats & Leaderboards",0);'>
							<i class='fas fa-trophy'></i>
						</div>
					</div>
					
				</div>
			
			</div>
			
		</div>
		
		
		
		<!-- MODAL WINDOW FOR TUTORIALS AND STORY -->
		
		<div id='main-modal' class='w3-modal'>
		  <div class='w3-modal-content w3-container w3-card-8 w3-round-large w3-deep-purple'>
			    <header class='w3-container w3-deep-purple'> 
				  <span onclick='closeModal()' style='cursor: pointer;'
					class='w3-button w3-xlarge w3-badge w3-red w3-display-topright w3-margin'>&times;</span>
				  <h2 id='main-modal-header'>Modal Header</h2>
				</header>

				<div class='w3-container w3-white w3-text-deep-purple w3-border w3-round-large'>
					<br>
					<span id='main-modal-content'></span>
					<br><br>
				</div>

				<footer class='w3-container w3-deep-purple w3-center w3-row-padding'>
					<div class='w3-small'>
						&nbsp;
					</div>
					<div class='w3-col s6 w3-center'>
						<b><button id='main-modal-footer-left' class='w3-btn w3-large w3-red w3-ripple w3-round-large w3-padding'></button></b>
						&nbsp;
					</div>
					<div class='w3-col s6 w3-center'>
						<b><button id='main-modal-footer-right' class='w3-btn w3-large w3-green w3-ripple w3-round-large w3-padding'></button></b>
						&nbsp;
					</div>
					<div class='w3-small'>
						&nbsp;
					</div>
				</footer>
			</div>
		</div>
		
	</div>

<?php

include $partials_folder . '_cookiesModal.php';

include $partials_folder . '_footer.php';

?>
