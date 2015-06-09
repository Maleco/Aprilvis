<!DOCTYPE html>
<?php 
	 $node = $_GET["node"];
?>
<html lang="en">

	 <head>

			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="description" content="">
			<meta name="author" content="">

			<title>Aprilvis</title>
			<link rel="shortcut icon" href="img/favicon.ico">


			<!-- Custom Fonts -->
			<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
			<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">

			<!-- Custom CSS -->
			<link rel="stylesheet" type="text/css" href="css/jquery.fullPage.css" />
			<link href="css/stylish-portfolio.css" rel="stylesheet" />
			<link href="css/style.css" rel="stylesheet" />


			<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
			<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
			<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
			<![endif]-->

			<!-- JQuery -->
			<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
			<!-- Google Maps API -->
			<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
			<script src="js/maps.js"></script>
			<!-- FullPage -->
			<script type="text/javascript" src="js/jquery.fullPage.min.js"></script>
			<script type="text/javascript" src="js/jquery.slimscroll.min.js"></script>

			<!-- Bootstrap -->
			<link rel="stylesheet" href="css/bootstrap.min.css" />
			<script type="text/javascript" src="js/bootstrap.min.js"></script>

	 </head>

	 <body>
			<div id="header">
				 <div id="logo_area">
						<a href="index.html"><img alt="Brand" src="img/logo_clear.png"></a>
				 </div>
			</div>

			<div id="fullpage">
				 <!-- Main -->
				 <div id="main" class="section">
						<div class="content">
							 <div style="display:none" id="nodeValue"><?php echo htmlspecialchars($_GET["node"])?></div>
							 <!-- Top Row -->
							 <div class="row" style="padding-top:20px;">
									<!-- Node Name + Info -->
									<div class="col-md-4">
										 <div class="panel panel-default">
												<div id="nodeName" class="panel-heading">
													 <!-- Single button -->
													 <div id="nodeDropDown" class="dropdown">
													 </div>
												</div>
												<div id="nodeDescription" class="panel-body">
												</div>
										 </div>
									</div>
									<!-- Node Appraisal Plot -->
									<div class="col-md-4">
										 <div class="panel panel-default">
												<div id="nodeName" class="panel-heading">Human Appraisal Plot</div>
												<div id="nodeHumanPlot" class="panel-body"></div>
										 </div>

									</div> 
									<!-- Node Google Map -->
									<div class="col-md-4">
										 <div class="panel panel-default">
												<div class="panel-heading">Google Maps location</div>
												<div class="panel-body">
													 <div id="smallmap-canvas"></div>
												</div>
										 </div>
									</div>
							 </div>
							 <div class="row">
									Hele Lange Stukje
							 </div>
						</div>
				 </div>
			</div>

			<script>
				 $(document).ready(function() {
							 $('#fullpage').fullpage({
										 paddingTop: 120,
							 });

							 initializeOne(node);
				 });
			</script>
			<script src="js/results.js"></script>
	 </body>
</html>
