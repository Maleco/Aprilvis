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
      <link rel="shortcut icon" href="img/logo_clear.png">


      <!-- Custom Fonts -->
      <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
      <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">

      <!-- Custom CSS -->
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
      <script src="js/jquery.csv-0.71.min.js"></script>
      <!-- Google Maps API -->
      <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
      <script src="js/maps.js"></script>

      <!-- Bootstrap -->
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <script type="text/javascript" src="js/bootstrap.min.js"></script>

      <!-- D3 -->
      <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.4/d3.min.js"></script>
      <!-- D3pie -->
      <script src="js/d3pie.min.js"></script>

      <!-- Load c3 -->
      <link href="css/c3.min.css" rel="stylesheet" type="text/css">
      <script src="js/c3.min.js"></script>
   </head>

   <body>
      <div id="container">
         <div id="header">
            <div id="logo_area">
               <a href="index.html"><img alt="Brand" src="img/logo_results.png"></a>

               <!-- Navigation -->
               <a id="menu-toggle" href="#" class="btn btn-dark btn-lg toggle"><i class="fa fa-bars"></i></a>
               <nav id="sidebar-wrapper">
               <ul class="sidebar-nav">
                  <li class="sidebar-brand">
                  <a href="/#mainPage"  onclick = $("#menu-close").click(); >Main</a>
                  </li>
                  <li>
                  <a href="/#aprilvisPage" onclick = $("#menu-close").click(); >Aprilvis</a>
                  </li>
                  <li>
                  <a href="/#applicationPage" onclick = $("#menu-close").click(); >Application</a>
                  </li>
                  <li>
                  <a href="/#aboutPage" onclick = $("#menu-close").click(); >About</a>
                  </li>
                  <li>
                  <a href="/#contactPage" onclick = $("#menu-close").click(); >Contact</a>
                  </li>
                  <li>
                  <a href="#" onclick = $("#menu-close").click(); >Results</a>
                  </li>
               </ul>
               </nav>
            </div>
         </div>

         <!-- Node id via URl -->
         <div style="display:none" id="nodeValue"><?php echo htmlspecialchars($_GET["node"])?></div>

         <!-- Main -->
         <div id="main" class="content" style="margin-top:60px">
            <!-- Top Row -->
            <div class="row" style="padding-top:20px;">
               <!-- Node Name + Info + Google Map -->
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
               <!-- Node Name + Info + Google Map -->

               <!-- Node Appraisal Plot -->
               <div class="col-md-4">
                  <div class="panel panel-default">
                     <div id="nodeName" class="panel-heading">
                        <!-- Select between human and system appraisal -->
                        <div class="btn-group" data-toggle="buttons">
                           <label id="allMachineAppraisal" class="btn btn-info">
                              <input type="radio" name="options" id="option1"> Machine Appraisal
                           </label>
                           <label id="morningMachineAppraisal" class="btn btn-info">
                              <input type="radio" name="options" id="option2"> Morning Appraisal
                           </label>
                           <label id="middayMachineAppraisal" class="btn btn-info">
                              <input type="radio" name="options" id="option3"> Midday Appraisal
                           </label>
                        </div>
                     </div>
                     <div id="nodeAppraisalPlot" class="panel-body"></div>
                  </div>
               </div> 
               <!-- Node Appraisal Plot -->

               <!-- Pie Chart -->
               <div class="col-md-4">
                  <div class="panel panel-default" style="height:auto;">
                     <div class="panel-heading">
                        <button type="button" class="btn btn-info btn-block">
                           Pie Chart
                        </button>
                     </div>
                     <div class="panel-body">
                        <div id="pieChart"></div>
                     </div>
                  </div>
               </div>
               <!-- Pie Chart -->
            </div> 
            <!-- Top Row -->

            <!-- Second Row -->
            <div class="row" style="padding-top:20px;">
               <div class="col-md-12">
                  <div class="panel panel-default">
                     <div class="panel-heading">
                        <button type="button" class="btn btn-info btn-block">
                           Line Graph (Features)</div>
                     </button>
                     <div class="panel-body">
                        <div id="chart"></div>
                     </label>
                  </div>
               </div>
            </div> 
            <!-- Second Row -->
         </div>
         <!-- Main -->
      </div>
   </div>

   <script src="js/results.js"></script>
   <script>
      $(document).ready(function() {
            // Set up the Appraisal toggle buttons
            $('#allMachineAppraisal').on('click', function (e) {
                  document.getElementById("nodeAppraisalPlot").innerHTML = 
                  '<img alt="Human Appraisal Plot" src="img/appraisals/ESN_FullAudio_Density_node' 
                  + zeroPad(node,3) + '.png">';
            });
            $('#morningMachineAppraisal').on('click', function (e) {
                  document.getElementById("nodeAppraisalPlot").innerHTML = 
                  '<img alt="Human Appraisal Plot" src="img/appraisals/ESN_FullAudio_Density_node' 
                  zeroPad(node,3) + '_Morning.png">';
            });
            $('#middayMachineAppraisal').on('click', function (e) {
                  document.getElementById("nodeAppraisalPlot").innerHTML = 
                  '<img alt="Human Appraisal Plot" src="img/appraisals/ESN_FullAudio_Density_node' 
                  zeroPad(node,3) + '_Afternoon.png">';
            });


      });
   </script>
   <!-- Navigation bar script -->
   <script>
      // Closes the sidebar menu
      $("#menu-close").click(function(e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
      });
      // Opens the sidebar menu
      $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
      });
      // Scrolls to the selected menu item on the page
      $(function() {
            $('a[href*=#]:not([href=#])').click(function() {
                  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                              $('html,body').animate({
                                    scrollTop: target.offset().top
                              }, 1000);
                              return false;
                        }
                  }
            });
      });

   </script>
</body>
</html>
