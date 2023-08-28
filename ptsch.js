// console.log(kg);

  var kgIsFull = "";
  var smallGraph = "";
  var kgClinic = "";
  var ptColorKG = "";
  var extraColors = 0;
  var hoverName = "";

  // Below is used for the patient count graph
  // Each tN represents every 15 minutes of an hour
  // t5 is 5:00AM 5:15AM 5:30AM and 5:45AM in minutes from midnight
  var kgTimes = {
    "t0": [0, 15, 30, 45],
    "t1": [60, 75, 90, 105],
    "t2": [120, 135, 150, 165],
    "t3": [180, 195, 210, 225],
    "t4": [240, 255, 270, 285],
    "t5": [300, 315, 330, 345],
    "t6": [360, 375, 390, 405],
    "t7": [420, 435, 450, 465],
    "t8": [480, 495, 510, 525],
    "t9": [540, 555, 570, 585],
    "t10": [600, 615, 630, 645],
    "t11": [660, 675, 690, 705],
    "t12": [720, 735, 750, 765],
    "t13": [780, 795, 810, 825],
    "t14": [840, 855, 870, 885],
    "t15": [900, 915, 930, 945],
    "t16": [960, 975, 990, 1005],
    "t17": [1020, 1035, 1050, 1065],
    "t18": [1080, 1095, 1110, 1125],
    "t19": [1140, 1155, 1170, 1185],
    "t20": [1200, 1215, 1230, 1245],
    "t21": [1260, 1275, 1290, 1305],
    "t22": [1320, 1335, 1350, 1365],
    "t23": [1380, 1395, 1410, 1425],
    "t24": [1440, 1455, 1470, 1485],
    "t25": [1500, 1515, 1530, 1545],
    "t26": [1560, 1575, 1590, 1605],
    "t27": [1620, 1635, 1650, 1665],
    "t28": [1680, 1695, 1710, 1725],
    "t29": [1740, 1755, 1770, 1785],
    "t30": [1800, 1815, 1830, 1845]
  };



// Below sets up the date/time formatting
  var KGnow = new Date();
  var KGtoday = new Date(KGnow.getFullYear(), KGnow.getMonth(), KGnow.getDate());
  var KGlastSunday = new Date(KGtoday.setDate(KGtoday.getDate() - KGtoday.getDay()));
  var KGnextSat = new Date();
  KGnextSat.setDate(KGlastSunday.getDate() + 6);
  KGlastSunday = getFormattedDate(KGlastSunday);
  KGnextSat = getFormattedDate(KGnextSat);

// localStorage.kgToolsOn is variable saved in chrome to turn the tools on/off when the page loads
//document ready is a way to start my code once the page is finished loading.  Otherwise my code runs simultaniously and I get missing information because the page hasn't fully loaded
  $(document).ready(function() {
    if ((localStorage.kgToolsOn == 1)) {
      startKgTools();
    }
  });

//A function to remove the color coding
  function clearColors() {
    $('div.pcard-top-row').css('background-color', '');
    $('div.pcard-top-row').removeClass('colorCoded');
    $('div.timebox').css('background-color', '');
    $('div.timebox').removeClass('colorCoded');
  }

// Whining Control - not enough colors :[
  function moreColors() {
    if (extraColors == 0) {
      $('.extraColors1').show();
      $('.extraColors').text('Less Colors');
      extraColors++;
    } else if (extraColors == 1) {
      $('.extraColors1').hide();
      $('.extraColors').text('More Colors');
      extraColors = 0;
    }
  }

//To search for a clinic in the Quick Contact Box
  function clinicSearch() {
    $('#kgClinicInput').keyup(function() {
      var newkgClinic = $('#kgClinicInput').val();
      //Below if 4 digits are typed in the quick contact search box
      if ($('#kgClinicInput').val().length == 4) {
        if (swFdbKg[newkgClinic]) {
          clinicNameKG = swFdbKg[newkgClinic]['DL Name'];
          cityKG = swFdbKg[newkgClinic]['City'];
          stateKG = swFdbKg[newkgClinic]['State'];
          zipKG = (swFdbKg[newkgClinic]['Zip']).pad(5);
          phoneKG = swFdbKg[newkgClinic]['Phone'];
          stationsKG = swFdbKg[newkgClinic]['Station Count'];
          cmKG = swFdbKg[newkgClinic]['FMS Clinical Manager'];
          areaKG = swFdbKg[newkgClinic]['Area Name'];
          areaManagerKG = swFdbKg[newkgClinic]['FMS Area Manager'];
          doAmMcoKG = swFdbKg[newkgClinic]['Director of Operations'];
          regionKG = swFdbKg[newkgClinic]['Region Name'];
          rvpKG = swFdbKg[newkgClinic]['FMS Regional Vice President'];
          divisionKG = swFdbKg[newkgClinic]['Division Name'];
          ogNameKG = swFdbKg[newkgClinic]['OG Name'];
          gvpoKG = swFdbKg[newkgClinic]['GVPO'];
          coachKG = swFdbKg[newkgClinic]['Coach'];

          $('#dlname').text(clinicNameKG);
          $('#city').text(cityKG + ", " + stateKG + " " + zipKG);
          $('#phone').text(phoneKG);
          $('#cmKG').text(cmKG);
          $('#area').text(areaKG);
          $('#areaManager').text(areaManagerKG);
          $('#doammcoKG').text(doAmMcoKG);
          $('#region').text(regionKG);
          $('#rvp').text(rvpKG);
          $('#groupKG').text(ogNameKG);
          $('#division').text(divisionKG);
          $('#gvpo').text(gvpoKG);
          $('#coachKG').text(coachKG);
        }
      }
      //below if 6 digits are typed in the search box
      if ($('#kgClinicInput').val().length == 6) {
        if (swFdbKg[newkgClinic]) {
          clinicNameKG = swFdbKg[newkgClinic]['DL Name'];
          cityKG = swFdbKg[newkgClinic]['City'];
          stateKG = swFdbKg[newkgClinic]['State'];
          zipKG = (swFdbKg[newkgClinic]['Zip']).pad(5);
          phoneKG = swFdbKg[newkgClinic]['Phone'];
          stationsKG = swFdbKg[newkgClinic]['Station Count'];
          cmKG = swFdbKg[newkgClinic]['FMS Clinical Manager'];
          areaKG = swFdbKg[newkgClinic]['Area Name'];
          areaManagerKG = swFdbKg[newkgClinic]['FMS Area Manager'];
          doAmMcoKG = swFdbKg[newkgClinic]['Director of Operations'];
          regionKG = swFdbKg[newkgClinic]['Region Name'];
          rvpKG = swFdbKg[newkgClinic]['FMS Regional Vice President'];
          divisionKG = swFdbKg[newkgClinic]['Division Name'];
          ogNameKG = swFdbKg[newkgClinic]['OG Name'];
          gvpoKG = swFdbKg[newkgClinic]['GVPO'];
          coachKG = swFdbKg[newkgClinic]['Coach'];

          $('#dlname').text(clinicNameKG);
          $('#city').text(cityKG + ", " + stateKG + " " + zipKG);
          $('#phone').text(phoneKG);
          $('#cmKG').text(cmKG);
          $('#area').text(areaKG);
          $('#areaManager').text(areaManagerKG);
          $('#doammcoKG').text(doAmMcoKG);
          $('#region').text(regionKG);
          $('#rvp').text(rvpKG);
          $('#groupKG').text(ogNameKG);
          $('#division').text(divisionKG);
          $('#gvpo').text(gvpoKG);
          $('#coachKG').text(coachKG);
        }
      }
      //return to current clinc quick contact if quick contact search box is empty
      if ($('#kgClinicInput').val().length == 0) {
        if (swFdbKg[kgClinic]) {
          clinicNameKG = swFdbKg[kgClinic]['DL Name'];
          cityKG = swFdbKg[kgClinic]['City'];
          stateKG = swFdbKg[kgClinic]['State'];
          zipKG = (swFdbKg[kgClinic]['Zip']).pad(5);
          phoneKG = swFdbKg[kgClinic]['Phone'];
          stationsKG = swFdbKg[kgClinic]['Station Count'];
          cmKG = swFdbKg[kgClinic]['FMS Clinical Manager'];
          areaKG = swFdbKg[kgClinic]['Area Name'];
          areaManagerKG = swFdbKg[kgClinic]['FMS Area Manager'];
          doAmMcoKG = swFdbKg[kgClinic]['Director of Operations'];
          regionKG = swFdbKg[kgClinic]['Region Name'];
          rvpKG = swFdbKg[kgClinic]['FMS Regional Vice President'];
          divisionKG = swFdbKg[kgClinic]['Division Name'];
          ogNameKG = swFdbKg[kgClinic]['OG Name'];
          gvpoKG = swFdbKg[newkgClinic]['GVPO'];
          coachKG = swFdbKg[kgClinic]['Coach'];

          $('#dlname').text(clinicNameKG);
          $('#city').text(cityKG + ", " + stateKG + " " + zipKG);
          $('#phone').text(phoneKG);
          $('#cmKG').text(cmKG);
          $('#area').text(areaKG);
          $('#areaManager').text(areaManagerKG);
          $('#doammcoKG').text(doAmMcoKG);
          $('#region').text(regionKG);
          $('#rvp').text(rvpKG);
          $('#groupKG').text(ogNameKG);
          $('#division').text(divisionKG);
          $('#gvpo').text(gvpoKG);
          $('#coachKG').text(coachKG);
        }
      }
    });
  }

//Start the tools
  function loadKgTools() {
    var sharedChairsKG = $('.tab-active').length;
    var currentScDayKG = $('.tab-active').first().text();
    var groupDaySelectionKG = $('.dropdown-toggle').first().text().trim();
    var clinicNameKG = "";
    var cityKG = "";
    var stateKG = "";
    var zipKG = "";
    var phoneKG = "";
    var stationsKG = "";
    var cmKG = "";
    var areaKG = "";
    var areaManagerKG = "";
    var doAmMcoKG = "";
    var regionKG = "";
    var rvpKG = "";
    var divisionKG = "";
    var ogNameKG = "";
    var gvpoKG = "";
    var coachKG = "";

        //Color blank unavailable chairs
    $('.pcard-blocked-bottom-row').each(function() {
      if ($(this).text().trim() == "") {
        //console.log("found one");
        $(this).css("background-color", "yellow")
      }
    });

    // refresh actual times if day selector is clicked
    $('.fsw-day-selector ul li').click(function() {
      $('.actualsKg').remove()
      $('.timebox').css("background-color", "")
      $('.pcard-accomodations').show()
    })

    //transfer staff times to the patient view
    transferStaffTimes();
    angular.element(document.querySelectorAll('li[heading~=Patient] a')).on('click', function() {
      transferStaffTimes();
    });

    //Change color of buttons in sandbox mode so they don't look funny
    if ($('.sandbox-dark').is(':visible')) {
      //$('.page-view-container-inner').css('background', 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(253, 244, 198, .5) 10px, rgba(253, 244, 198, .5) 20px)');
      setTimeout(function() {
        $('.btn,.kgtools').addClass('btn-sandbox');
      }, 250);
    }

    //Adds color coding tools to concierge drop down dock
    $('<div id="helperContainer" class="kgTools kgToolsBorderSquare" style="width: 100%; height: 40px; background-color: #f6f6f6; padding: 10px;display: none;">' +
        '<div style="">' +
          '<div class="theseColors">' +
            '<div style="float: left; margin-right: 10px; font-size: .85em;">Color Code Patient Schedule: </div>' +
            '<div class="color-code-pts" style="background-color: skyblue;" colorCode="skyblue"></div>' +
            '<div class="color-code-pts" style="background-color: blueviolet;" colorCode="blueviolet"></div>' +
            '<div class="color-code-pts" style="background-color: orange;" colorCode="orange"></div>' +
            '<div class="color-code-pts" style="background-color: pink;" colorCode="pink"></div>' +
            '<div class="color-code-pts" style="background-color: springgreen;" colorCode="springgreen"></div>' +
            '<div class="color-code-pts" style="background-color: gold;" colorCode="gold"></div>' +
          '</div>' +
          '<button class="btn btn-default extraColors" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top" onclick="moreColors()">More Colors</button>' +
          '<button class="btn btn-default" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top" onclick="clearColors()">Reset Colors</button>' +
          '<button class="btn btn-default" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top" onclick="requestData();return false" title="Login to reports and analytics first">Check On-Times</button>' +
          '<button class="btn btn-default" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top" onclick="checkTurnovers()">Check Turnovers</button>' +
          //'<input id="newStartMinsInput" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top; width: 35px"></input>' +
          //'<button class="btn btn-default" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top" onclick="changeStart(30)">New Start Calc</button>' +
          '<input type="Date" id="letterDate" title="For letters" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top; width: 85px">' +
          '<button class="btn btn-default" style="margin-left: 10px; height: 25px; font-size: .75em; vertical-align: top" onclick="createLetters()">Letters</button>' +
        '</div>' +
      '</div>').insertBefore($('.page-view-container-inner'));

    //$('<div id="highLightToggle" style="float: left;"><label class="switch"><input type="checkbox"><span class="slider round"></span></label></div>').appendTo($('.helperContainer'));

    //Adds extra colors to concierge drop down dock
    var $extraColors = $('<div class="extraColors1" style="display:none">' +
      '<div class="color-code-pts" style="background-color: mediumorchid;" colorCode="mediumorchid"></div>' +
      '<div class="color-code-pts" style="background-color: dodgerblue;" colorCode="dodgerblue"></div>' +
      '<div class="color-code-pts" style="background-color: cyan;" colorCode="cyan"></div>' +
      '<div class="color-code-pts" style="background-color: palegreen;" colorCode="palegreen"></div>' +
      '<div class="color-code-pts" style="background-color: red;" colorCode="red"></div>' +
      '<div class="color-code-pts" style="background-color: darkgrey;" colorCode="darkgrey"></div>' +
      '</div>');
    $extraColors.insertAfter($('.theseColors'));

    //Check box for selected color in concierge dock
    $('.color-code-pts').on('click', function() {
      if ($(this).hasClass('checked')) {
        $('.color-code-pts').removeClass('checked');
        $('.color-code-pts').text('');
        ptColorKG = "";
      } else {
        ptColorKG = $(this).attr('colorCode');
        $('.color-code-pts').not(this).text("");
        $('.color-code-pts').not(this).removeClass('checked');
        $(this).addClass('checked');
        $(this).text("✔");
      }
    });

    //add popup to export button to show current linked patient template
    if (kgClinic != $('.cs-clinic-name').text().match(/\d+/)[0]) {
      $('#linkedFileKG').remove();
      $.post("https://www.fmcschedule.com/centerFileManager.cfm", "idReport=1&ReportName=Patient+Schedule&mode=reports", function(data, status) {
        var linkedFile = $(data).find('#linkedFile').text().trim();
        $('.fsw-icon-excel').parent().attr('Title',linkedFile)
      });
    }

     //Find clinic number from upper right menu and load quick contact details
    kgClinic = $('.cs-clinic-name').text().match(/\d+/)[0];
    if (swFdbKg[kgClinic]) {
      clinicNameKG = swFdbKg[kgClinic]['DL Name'];
      cityKG = swFdbKg[kgClinic]['City'];
      stateKG = swFdbKg[kgClinic]['State'];
      if (swFdbKg[kgClinic]['Zip']) {
        zipKG = (swFdbKg[kgClinic]['Zip']).pad(5);  //.pad(5) to include leading zeros in zip codes
      }
      phoneKG = swFdbKg[kgClinic]['Phone'];
      stationsKG = swFdbKg[kgClinic]['Station Count'];
      cmKG = swFdbKg[kgClinic]['FMS Clinical Manager'];
      areaKG = swFdbKg[kgClinic]['Area Name'];
      areaManagerKG = swFdbKg[kgClinic]['FMS Area Manager'];
      doAmMcoKG = swFdbKg[kgClinic]['Director of Operations'];
      regionKG = swFdbKg[kgClinic]['Region Name'];
      rvpKG = swFdbKg[kgClinic]['FMS Regional Vice President'];
      divisionKG = swFdbKg[kgClinic]['Division Name'];
      ogNameKG = swFdbKg[kgClinic]['OG Name'];
      gvpoKG = swFdbKg[kgClinic]['GVPO'];
      coachKG = swFdbKg[kgClinic]['Coach'];
    }

    function pad(str, max) {
      str = str.toString();
      return str.length < max ? pad("0" + str, max) : str;
    }

    if (!$('.kgTools').is(':visible')) {

      var targetNode = document.querySelector('div.fsw-primary-container');
      if ((localStorage.kgToolsOn == 1)) {
        observer.observe(targetNode, observerConfig);
      }

      var $patientBtn = $('<button class="kg-btn kg-btn-toggle kgTools" onclick="allPatient()" id="patientBtnKG">Patient</button>');
      $patientBtn.appendTo(angular.element(document.querySelector('div.pn-inner-left')));
      var $staffBtn = $('<button class="kg-btn kg-btn-toggle kgTools" onclick="allStaff()" id="staffBtnKG">Staff</button>');
      $staffBtn.appendTo(angular.element(document.querySelector('div.pn-inner-left')));
      var $conciergeBtn = $('<button class="kg-btn kg-btn-toggle kgTools" onclick="toggleConcierge()" id="colorBtnKG">Concierge</button>');
      $conciergeBtn.appendTo(angular.element(document.querySelector('div.pn-inner-left')));

      //Quick Contact
      var $quickContact = $('<div class="col-xs-4 kgTools kgContainer" id="quickContactKG">' +
        '<div class="kgMainContainer">' +
        '<div class="kgInnerContainer" style="display: inline;width: 100%;height:100%;margin: 10px 10px 10px 2px;padding: 10px 10px 10px 10px;align-items: left;">' +
        '<h4 id="kgProdTitle">Quick Contact <input id="kgClinicInput" style="width: 75px; margin-left: 20px" placeholder="Clinic #"></input></h4> ' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Clinic Name: </span>' +
        '<span id="dlname" class="row2" style="float: left;font-size:.85em;width: 265px;">' + clinicNameKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Location: </span>' +
        '<span id="city" class="row2" style="float: left;font-size:.85em;width: 265px;">' + cityKG + ', ' + stateKG + ' ' + zipKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Phone: </span>' +
        '<span id="phone" class="row2" style="float: left;font-size:.85em;width: 265px;">' + phoneKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">CM: </span>' +
        '<span id="cmKG" class="row2" style="float: left;font-size:.85em;width: 265px;">' + cmKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Area: </span>' +
        '<span id="area" class="row2" style="float: left;font-size:.85em;width: 265px;">' + areaKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Area Manager: </span>' +
        '<span id="areaManager" class="row2" style="float: left;font-size:.85em;width: 265px;">' + areaManagerKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">DO/MCO: </span>' +
        '<span id="doammcoKG" class="row2" style="float: left;font-size:.85em;width: 265px;">' + doAmMcoKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Region: </span>' +
        '<span id="region" class="row2" style="float: left;font-size:.85em;width: 265px;">' + regionKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">RVP: </span>' +
        '<span id="rvp" class="row2" style="float: left;font-size:.85em;width: 265px;">' + rvpKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Group: </span>' +
        '<span id="groupKG" class="row2" style="float: left;font-size:.85em;width: 265px;">' + ogNameKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Division: </span>' +
        '<span id="division" class="row2" style="float: left;font-size:.85em;width: 265px;">' + divisionKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">GVPO: </span>' +
        '<span id="gvpo" class="row2" style="float: left;font-size:.85em;width: 265px;">' + gvpoKG + '</span><br>' +
        '<span style="float: left;width: 110px;text-align: right;font-size:.85em;padding-right: 15px;">Coach: </span>' +
        '<span id="coachKG" class="row2" style="float: left;font-size:.85em;width: 265px;">' + coachKG + '</span><br>' +
        '</div></div></div>');
      $quickContact.insertAfter($('div#treatment_chart'));

      var $div2 = $('<div class="col-xs-8 kgTools newChart" id="ProdPanelKG2">' +
          '<div>' +
            '<div class="kgToolsBorder" onclick="kgProdMath();" id="PtRunning">' +
            '</div>' +
          '</div>' +
        '</div>');
      $div2.insertAfter($('div#quickContactKG'));

      var $svg1 = $('<svg width="800" height="350" class="pt-running-chart-list" id="ptRunningSvg" onclick="kgProdMath();"></svg>');
      $('div#PtRunning').append($svg1);

      var $div1 = $('<div class="col-xs-12 kgTools kgContainer" id="ProdPanelKG">' +
        '<div class="kgMainContainer" onclick="kgProdMath();">' +
        '<div class="kgInnerContainer kgToolsBorder" style="height: auto; display: block; padding: 20px"' +
        '<div class="container">' +
        '<div class="row">' +
        '<div class="col-xs-4" style="text-align:center;"><h4>Schedule Info</h4>' +
        '<div class="row grid-space">' +
        '<div class="col-xs-4 grid-right grid-blue grid-padding">Selection</div>' +
        '<div id="daySelectionKg" class="col-xs-8 grid-border grid-blue-light grid-padding" style=""></div>' +
        '</div>' +
        '<div class="row grid-space">' +
        '<div class="col-xs-4 grid-right grid-blue grid-padding">Scheduled Tx</div>' +
        '<div id="schedTxKG1" class="col-xs-8 grid-border grid-blue-light grid-padding"></div>' +
        '</div>' +
        // '<div class="row grid-space">' +
        // '<div class="col-xs-4 grid-right grid-blue grid-padding">Expected Tx</div>' +
        // '<div id="expTxKG1" class="col-xs-8 grid-border grid-blue-light grid-padding"><input type="text" id="expTx" name="expTx" style="float: left;height: 21px; width: 40px; color: black;"></div>' +
        // '</div>' +
        '<div class="row grid-space">' +
        '<div class="col-xs-4 grid-right grid-blue grid-padding">Open Chairs</div>' +
        '<div id="openChairKG1" class="col-xs-8 grid-border grid-blue-light grid-padding"></div>' +
        '</div>' +
        '<div class="row grid-space">' +
        '<div class="col-xs-4 grid-right grid-blue grid-padding">Avg Duration</div>' +
        '<div id="avgDurKG1" class="col-xs-8 grid-border grid-blue-light grid-padding"></div>' +
        '</div>' +
        '<div class="row grid-space">' +
        '<div class="col-xs-4 grid-right grid-blue grid-padding">First Tx Start</div>' +
        '<div id="firstTxKG1" class="col-xs-8 grid-border grid-blue-light grid-padding"></div>' +
        '</div>' +
        '<div class="row grid-space">' +
        '<div class="col-xs-4 grid-right grid-blue grid-padding">Last Tx End</div>' +
        '<div id="lastTxKG1" class="col-xs-8 grid-border grid-blue-light grid-padding"></div>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-4" style="text-align:center;">' +
        '<h4>Labor</h4>' +
        '<div class="row grid-space grid-orange" style="">' +
        '<div class="col-xs-6" style="">&nbsp;</div>' +
        '<div class="col-xs-2 grid-border grid-padding">DPC</div>' +
        '<div class="col-xs-2 grid-padding">RN</div>' +
        '<div class="col-xs-2 grid-padding">Total</div>' +
        '</div>' +
        '<div class="row grid-space grid-orange" style="">' +
        '<div class="col-xs-6 grid-right grid-padding">Hours</div>' +
        '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="dpcHRKG1"></div>' +
        '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="rnHRKG1"></div>' +
        '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalHRKG1"></div>' +
        '</div>' +
        // '<div class="row grid-space grid-orange" style="">' +
        // '<div class="col-xs-6 grid-right grid-padding">Hours/Tx</div>' +
        // '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="pctHRTXKG1"></div>' +
        // '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="rnHRTXKG1"></div>' +
        // '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalHRTXKG1"></div>' +
        // '</div>' +
        '<div class="row grid-space grid-orange-light" style="">' +
        '<div class="col-xs-6 grid-padding" style="background-color:white;">&nbsp;</div>' +
        '<div class="col-xs-2 grid-border grid-padding">&nbsp;</div>' +
        '<div class="col-xs-2 grid-padding">&nbsp;</div>' +
        '<div class="col-xs-2 grid-padding">&nbsp;</div>' +
        '</div>' +
        '<div class="row grid-space grid-orange" style="">' +
        '<div class="col-xs-6 grid-right grid-padding">Open Hrs</div>' +
        '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="pctOpenHrsKG1"></div>' +
        '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="rnOpenHrsKG1"></div>' +
        '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalOpenHrsKG1"></div>' +
        '</div>' +
        '<div class="row grid-space grid-orange" style="">' +
        '<div class="col-xs-6 grid-right grid-padding">Close Hrs</div>' +
        '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="pctCloseHrsKG1"></div>' +
        '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="rnCloseHrsKG1"></div>' +
        '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalCloseHrsKG1"></div>' +
        '</div>' +
            '<div class="row grid-space grid-orange" style="">' +
                '<div class="col-xs-6 grid-right grid-padding">Total Open/Close Hrs</div>' +
                '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalOpClHrsDPC" style=""></div>' +
                '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalOpClHrsRN" style=""></div>' +
                '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalOpClHrs" style=""></div>' +
            '</div>' +
        '</div>' +
            '<div class="col-xs-4 float-eligibility" style="text-align:center;">' +
                '<h4>Float Eligibility</h4>' +
                '<div class="row grid-space" style="background-color:lightblue;width: 160px;border-radius: 10px; display: inline-block;">' +
                    '<div class="col-xs-12" style="text-align:center;"><div onclick="usingFloat()" style="cursor: pointer;">Check Float Status</div></div>' +
                '</div>' +
            '</div>' +
            '<div class="col-xs-4" style="text-align:center;">' +
              '<h4>Patient Notations</h4>' +
              '<div class="row grid-space" style="text-align:center;">' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-avfistula"></i></span>' +
              '<span id="avfistulaKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-avgraft"></i></span>' +
              '<span id="avgraftKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-anchor"></i></span>' +
              '<span id="anchorKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-assist"></i></span>' +
              '<span id="assistKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-catheter"></i></span>' +
              '<span id="cathKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-positive"></i></span>' +
              '<span id="hepKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span><br>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-hoyerlift"></i></span>' +
              '<span id="hoyerKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-integratedcare"></i></span>' +
              '<span id="icKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-newpatient"></i></span>' +
              '<span id="newPTKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-transient"></i></span>' +
              '<span id="transientKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span>' +
              '<span style="float: left;text-align: right;padding-right: 10px;width: 25px;"><i class="icon-wheelchair"></i></span>' +
              '<span id="wheelchairKG" style="float: left;text-align: left;padding-right: 10px;width: 25px;">0</span><br>' +
              '</div>' +
            '</div>' +
            '<div class="col-xs-4" id="lobbyBox" style="text-align:center;">' +
            '<h4>Lobby Notes</h4>' +
            '<div class="row grid-space" style="background-color:lightblue;width: 160px;border-radius: 10px; display: inline-block;">' +
                '<div class="col-xs-12" style="text-align:center;"><div onclick="getLobbyNotes()" style="cursor: pointer;">Check Lobby Notes</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');


      $div1.insertAfter($('div#ProdPanelKG2'));

      var $div3 = $('<div class="col-xs-12 kgTools kgContainer" id="ScoreCardKG">' +
            '<div class="kgMainContainer" onclick="kgProdMath();">' +
                '<div class="kgInnerContainer kgToolsBorder" style="height: auto; display: block; padding: 20px"' +
                    '<div class="container">' +
                        '<div class="row">' +
                            '<div class="col-xs-4" style="text-align:center;"><h4>Date Selector</h4>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-2 grid-right grid-padding"></div>' +
                                        '<div id="daySelectionKg" class="col-xs-10 grid-border grid-padding" style="">' +
                                            '<button style="display:inline" class="btn btn-default btn-sandbox btn-optimizer" onclick="minusDate();return false"><</button>' +
                                            '<input name="datePicker" class="form-control" style="display: inline; width: 125px" autocomplete="off">' +
                                            '<button style="display:inline" class="btn btn-default btn-sandbox btn-optimizer" onclick="plusDate();return false">></button>' +
                                            '<button style="display:inline; margin-left: 10px" class="btn btn-default btn-sandbox btn-optimizer" onclick="requestData();return false">Run</button>' +
                                        '</div>' +
                                  '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row col-xs-12" id="scoreCardRow0">' +
                            '<div class="col-xs-12" id="hoursDetaildBox" style="text-align:center;"><h4>Hours Detail</h4>' +
                                '<div class="row grid-space">' +
                                    '<div class="col-xs-2 grid-grey grid-padding">Week</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">&nbsp;</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">Goal</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">Sched</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">Actual</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center; margin-left: 20px">S.Train</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">A.Train</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">S.OT</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">A.OT</div>' +
                                '</div>' +
                                '<div class="row grid-space week1hours" style="">' +
                                  '<div class="col-xs-2 grid-grey-light grid-padding" id="wk1date" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-light grid-padding" id="" style="text-align: center">RN</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn1goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn1sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn1actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn1strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn1atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn1sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn1aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week1hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-light grid-padding" id="wk1tx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-light grid-padding" id="" style="text-align: center">PCT</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct1goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct1sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct1actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct1strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct1atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct1sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct1aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week1hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-light grid-padding" id="wk1mtx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-light grid-padding" id="" style="text-align: center">Total</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total1goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total1sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total1actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total1strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total1atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total1sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total1aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week2hours" style="">' +
                                  '<div class="col-xs-2 grid-grey-med grid-padding" id="wk2date" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-med grid-padding" id="" style="text-align: center">RN</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn2goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn2sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn2actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn2strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn2atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn2sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn2aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week2hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-med grid-padding" id="wk2tx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-med grid-padding" id="" style="text-align: center">PCT</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct2goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct2sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct2actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct2strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct2atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct2sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct2aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week2hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-med grid-padding" id="wk2mtx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-med grid-padding" id="" style="text-align: center">Total</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total2goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total2sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total2actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total2strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total2atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total2sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total2aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week3hours" style="">' +
                                  '<div class="col-xs-2 grid-grey-light grid-padding" id="wk3date" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-light grid-padding" id="" style="text-align: center">RN</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn3goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn3sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn3actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn3strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn3atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn3sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="rn3aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week3hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-light grid-padding" id="wk3tx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-light grid-padding" id="" style="text-align: center">PCT</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct3goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct3sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct3actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct3strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct3atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct3sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="pct3aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week3hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-light grid-padding" id="wk3mtx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-light grid-padding" id="" style="text-align: center">Total</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total3goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total3sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total3actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total3strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total3atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total3sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="total3aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week4hours" style="">' +
                                  '<div class="col-xs-2 grid-grey-med grid-padding" id="wk4date" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-med grid-padding" id="" style="text-align: center">RN</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn4goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn4sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn4actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn4strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn4atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn4sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="rn4aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week4hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-med grid-padding" id="wk4tx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-med grid-padding" id="" style="text-align: center">PCT</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct4goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct4sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct4actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct4strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct4atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct4sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="pct4aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week4hours" style="">' +
                                  '<div class="ezDash col-xs-2 grid-grey-med grid-padding" id="wk4mtx" style="text-align: center">&nbsp;</div>' +
                                  '<div class="col-xs-1 grid-border grid-grey-med grid-padding" id="" style="text-align: center">Total</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total4goal" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total4sched" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total4actual" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total4strn" style="text-align: center; margin-left: 20px">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total4atrn" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total4sot" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-med grid-padding" id="total4aot" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space week4hours" style="">' +
                                  '<div class="ezDash col-xs-3 grid-grey-med grid-padding" id="avgMissedTx" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                            '</div>' +
                          '</div>' +
                        '<div class="row" id="scoreCardRow">' +
                            '<div class="col-xs-4" style="text-align:center;"><h4>Patient Experience</h4>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-padding" id="ptBlank">&nbsp;</div>' +
                                      '<div id="ptDate" class="col-xs-8 grid-border grid-grey grid-padding">&nbsp</div>' +
                                  '</div>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-padding">&nbsp;</div>' +
                                      '<div id="percentage" class="col-xs-4 grid-border grid-grey grid-padding">% of Tx</div>' +
                                      '<div id="" class="col-xs-4 grid-border grid-grey grid-padding"># of Tx</div>' +
                                  '</div>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-grey grid-padding">On Time</div>' +
                                      '<div id="onTime" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                      '<div id="onTimeTx" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-grey grid-padding">Early</div>' +
                                      '<div id="early" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                      '<div id="earlyTx" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-grey grid-padding">Late</div>' +
                                      '<div id="late" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                      '<div id="lateTx" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-grey grid-padding">+/- 60 Mins</div>' +
                                      '<div id="minutes" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                      '<div id="minutesTx" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-grey grid-padding" title="Treatments Performed not Scheduled">TPNS</div>' +
                                      '<div id="tpns" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                      '<div id="tpnsTx" class="ezDash col-xs-4 grid-border grid-grey-light grid-padding">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space">' +
                                      '<div class="col-xs-4 grid-right grid-grey grid-padding">Total Tx</div>' +
                                      '<div id="total" class="ezDash col-xs-4 grid-border grid-grey-med grid-padding">&nbsp;</div>' +
                                      '<div id="totalTx" class="ezDash col-xs-4 grid-border grid-grey-med grid-padding">&nbsp;</div>' +
                                  '</div>' +
                              '</div>' +
                              '<div class="col-xs-4" style="text-align:center;"><h4>Open Close</h4>' +
                                  '<div class="row grid-space" style="">' +
                                    '<div class="col-xs-3" style="" id="openCloseBlank">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-padding grid-grey" id="dow1">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-padding grid-grey" id="dow2">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-padding grid-grey" id="dow3">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space" style="">' +
                                    '<div class="col-xs-3" style="">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-padding grid-grey" id="date1">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-padding grid-grey" id="date2">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-padding grid-grey" id="date3">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space grid-grey" style="">' +
                                    '<div class="col-xs-3 grid-right grid-padding">Open Hrs</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-light grid-padding" id="openHrs0">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-light grid-padding" id="openHrs1">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-light grid-padding" id="openHrs2">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space grid-grey" style="">' +
                                    '<div class="col-xs-3 grid-right grid-padding">Close Hrs</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-light grid-padding" id="closeHrs1">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-light grid-padding" id="closeHrs2">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-light grid-padding" id="closeHrs3">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space grid-grey" style="">' +
                                    '<div class="col-xs-3 grid-right grid-padding">Total</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-med grid-padding" id="totalHrs1" style="">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-med grid-padding" id="totalHrs2" style="">&nbsp;</div>' +
                                    '<div class="ezDash col-xs-3 grid-border grid-grey-med grid-padding" id="totalHrs3" style="">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space grid-grey" style="">' +
                                    '<div class="col-xs-4 grid-right grid-padding">Block Goal</div>' +
                                    '<div class="ezDash col-xs-8 grid-border grid-grey-light grid-padding" id="blockGoal">&nbsp;</div>' +
                                  '</div>' +
                                  '<div class="row grid-space grid-grey" style="">' +
                                    '<div class="col-xs-4 grid-right grid-padding">Balanced Goal</div>' +
                                    '<div class="ezDash col-xs-8 grid-border grid-grey-light grid-padding" id="balanceGoal">&nbsp;</div>' +
                                  '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row col-xs-12" id="scoreCardRow2">' +
                            '<div class="col-xs-8" id="scorecardBox" style="text-align:center;"><h4>Score Card</h4>' +
                                '<div class="row grid-space">' +
                                    '<div class="col-xs-2 grid-right grid-padding" id="scBlank">&nbsp;</div>' +
                                    '<div id="scPPE2" class="ezDash col-xs-2 grid-border grid-grey grid-padding" style="text-align: center">&nbsp;</div>' +
                                    '<div id="scPPE1" class="ezDash col-xs-2 grid-border grid-grey grid-padding" style="text-align: center">&nbsp;</div>' +
                                    '<div id="scPPE" class="ezDash col-xs-2 grid-border grid-grey grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space">' +
                                    '<div class="col-xs-2 grid-right grid-padding"></div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">MWF</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">TTS</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">MWF</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">TTS</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">MWF</div>' +
                                    '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">TTS</div>' +
                                    '<div id="" class="col-xs-2 grid-border grid-grey grid-padding" style="text-align: center">Goal</div>' +
                                    '<div id="" class="col-xs-2 grid-border grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space" style="">' +
                                  '<div class="col-xs-2 grid-grey grid-right grid-padding">< 30 Min %</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc30minMWF2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc30minTTS2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc30minMWF1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc30minTTS1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc30minMWF" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc30minTTS" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="sc30minGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
                                  '<div id="" class="col-xs-2 grid-border grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space" style="">' +
                                  '<div class="col-xs-2 grid-grey grid-right grid-padding">Patient Exp</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scPtExp2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scPtExp1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scPtExp" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scPtGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
                                  '<div id="" class="col-xs-2 grid-border grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space" style="">' +
                                  '<div class="col-xs-2 grid-grey grid-right grid-padding">Staff Exp</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scStaffExp2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scStaffExp1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scStaffExp" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scStaffGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
                                  '<div id="" class="col-xs-2 grid-border grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space" style="">' +
                                  '<div class="col-xs-2 grid-grey grid-right grid-padding">Open Chairs</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="scOpenChairMWF2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="scOpenChairTTS2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="scOpenChairMWF1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="scOpenChairTTS1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="scOpenChairMWF" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="scOpenChairTTS" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scOpenChairGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
                                  '<div id="" class="col-xs-2 grid-border grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space" style="">' +
                                  '<div class="col-xs-2 grid-grey grid-right grid-padding">Open Hrs</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scOpenHrs2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scOpenHrs1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scOpenHrs" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scOpenHrsGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
                                  '<div id="" class="col-xs-2 grid-border grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                                '<div class="row grid-space" style="">' +
                                  '<div class="col-xs-2 grid-grey grid-right grid-padding">> 75 Min %</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc75minMWF2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc75minTTS2" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc75minMWF1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc75minTTS1" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc75minMWF" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-1 grid-border grid-grey-light grid-padding" id="sc75minTTS" style="text-align: center">&nbsp;</div>' +
                                  '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="sc75minGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
                                  '<div id="" class="col-xs-2 grid-border grid-padding" style="text-align: center">&nbsp;</div>' +
                                '</div>' +
                            '</div>' +
                          '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');

        // '<h4>Productivity</h4>' +
        // '<div class="row grid-space grid-orange" style="">' +
        //   '<div class="col-xs-6" style="">&nbsp;</div>' +
        //   '<div class="col-xs-2 grid-border grid-padding">DPC</div>' +
        //   '<div class="col-xs-2 grid-padding">RN</div>' +
        //   '<div class="col-xs-2 grid-padding">Total</div>' +
        // '</div>' +
        // '<div class="row grid-space grid-orange" style="">' +
        //   '<div class="col-xs-6 grid-right grid-padding">Test</div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="blockGoal"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="balanceGoal"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalHRKG1"></div>' +
        // '</div>' +
        // '<div class="row grid-space grid-orange" style="">' +
        //   '<div class="col-xs-6 grid-right grid-padding">Hours/Tx</div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="date1"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="date2"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="date3"></div>' +
        // '</div>' +
        // '<div class="row grid-space grid-orange-light" style="">' +
        //   '<div class="col-xs-6 grid-padding" style="background-color:white;">&nbsp;</div>' +
        //   '<div class="col-xs-2 grid-border grid-padding">&nbsp;</div>' +
        //   '<div class="col-xs-2 grid-padding">&nbsp;</div>' +
        //   '<div class="col-xs-2 grid-padding">&nbsp;</div>' +
        // '</div>' +
        // '<div class="row grid-space grid-orange" style="">' +
        //   '<div class="col-xs-6 grid-right grid-padding">Open Hrs</div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="openHrs1"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="openHrs2"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="openHrs3"></div>' +
        // '</div>' +
        // '<div class="row grid-space grid-orange" style="">' +
        //   '<div class="col-xs-6 grid-right grid-padding">Close Hrs</div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="pctCloseHrsKG1"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-light grid-padding" id="rnCloseHrsKG1"></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalCloseHrsKG1"></div>' +
        // '</div>' +
        // '<div class="row grid-space grid-orange" style="">' +
        //   '<div class="col-xs-6 grid-right grid-padding">Total Open/Close Hrs</div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalOpClHrsDPC" style=""></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalOpClHrsRN" style=""></div>' +
        //   '<div class="col-xs-2 grid-border grid-orange-med grid-padding" id="totalOpClHrs" style=""></div>' +
        // '</div>' +

      $div3.insertAfter($('div#ProdPanelKG'));
      addTrends()

      // var $div4 = $('<div class="row" id="scoreCardRow">' +
      //     '<div class="col-xs-4" style="text-align:center;" id="ptTrendBox"><h4>Patient Experience</h4>' +
      //           '<canvas id="ptExpChart" width="250" height="250"></canvas>' +
      //       '</div>' +
      //       '<div class="col-xs-4" style="text-align:center;" id="openTrendBox"><h4>Open Close</h4>' +
      //         '<canvas id="openChart" width="250" height="250"></canvas>' +
      //     '</div>' +
      //     '<div class="col-xs-4" style="text-align:center;" id="scTrendBox"><h4>Score Card</h4>' +
      //         '<canvas id="scoreChart" width="250" height="250"></canvas>' +
      //     '</div>' +
      //     '</div>')
      // $div4.insertAfter($('div#scoreCardRow'));

      var yesterdayKg = new Date();
      yesterdayKg.setDate(yesterdayKg.getDate() - 1);
      if (yesterdayKg.getWeekDay() == "Sun") {
        yesterdayKg.setDate(yesterdayKg.getDate() - 1);
      }
      $('input[name="datePicker"]').val(getSlashDate(yesterdayKg))


      // Reset Checkboxes
        $('.scoreCardBoxPt').click(function(e) {
          $('.scoreCardBoxPt').each(function() {
            if ($(this).attr('id') != e.target.id) {
              $(this).prop("checked",false)
            }
          })
        })

        // Reset Checkboxes
          $('.scoreCardBoxOpen').click(function(e) {
            $('.scoreCardBoxOpen').each(function() {
              if ($(this).attr('id') != e.target.id) {
                $(this).prop("checked",false)
              }
            })
          })

      for (var i = 0; i < 124; i++) {
        var $kgRunningBar = $('<div class="pt-running-chart-bars" id=t' + i + '></div>');
        $kgRunningBar.appendTo($('.pt-running-chart'));
      }
      var $kgRunningBar = $('<div class="pt-running-chart-bars" id="end" style="height:0px;"></div>');
      $kgRunningBar.appendTo($('.pt-running-chart'));

      kgProdMath();
      instance = new dtsel.DTS('input[name="datePicker"]',  {
        direction: 'BOTTOM',
        dateFormat: 'mm/dd/yyyy'
      });

    } else {
      localStorage['kgToolsOn'] = 0;
      observer.disconnect();
      removeTools();
      //$('.kgTools').remove();
    }
    $('#expTx').focusout(function() {
      kgProdMath();
    })
    clinicSearch();
    addBlockedChairNotes()
  }

  function kgProdMath() {
    $('.axisLabels').remove();
    var expTreatsKG = $('#expTx').val();
    var barWidth = 10;
    var barWidthMultiplier = 20;
    var kgProdNumbers = [];
    var numActualOpens = angular.element(document.querySelectorAll('div.pcard-top-row div.pcard-name-container  h5[uib-tooltip="Open  Chair"]')).length;

    const patientCards = $('fsw-patient-accomodations');

    const iconCounts = {
      'AV_Fistula': 0,
      'AV_Graft': 0,
      'Anchor': 0,
      'Assist': 0,
      'Catheter': 0,
      'Positive': 0,
      'HoyerLift': 0,
      'Integrated_Care': 0,
      'New_Patient': 0,
      'Transient': 0,
      'Wheelchair': 0
    };
    patientCards.each(function() {
      const accommodationsController = $(this).data().$fswPatientAccomodationsController;
      if (accommodationsController) {
        const icons = accommodationsController.accomodations;
        if (Array.isArray(icons)) {
          icons.forEach(icon => {
            if (icon in iconCounts) {
              iconCounts[icon]++;
            }
          });
        }
      }
    });

    var avfistulaKG = iconCounts.AV_Graft
    var avgraftKG = iconCounts.AV_Fistula
    var anchorKG = iconCounts.Anchor
    var assistKG = iconCounts.Assist
    var cathKG = iconCounts.Catheter
    var hepKG = iconCounts.Positive
    var hoyerKG = iconCounts.HoyerLift
    var icKG = iconCounts.Integrated_Care
    var newPTKG = iconCounts.New_Patient
    var transientKG = iconCounts.Transient
    var wheelchairKG = iconCounts.Wheelchair

    var allTreatsKG = $('div.pcard-outer-container.ng-not-empty').length;
    var schedOpensKG = $('div.pcard-outer-container.open-chair').length;
    var schedTreatsKG = (allTreatsKG - schedOpensKG);
    var sharedChairsKG = $('.tab-active').length;
    var currentScDayKG = $('.tab-active').first().text();
    var groupDaySelectionKG = $('.dropdown-toggle').first().text().trim();
    var placedPtsKG = (schedOpensKG - numActualOpens);

    transferStaffTimes();
    runningGraph()

    if (placedPtsKG > 0) {
      var anyPlacedKG = "*";
      var anyPlacedNotesKG = "*" + placedPtsKG + " reserved for new admission"
    } else {
      var anyPlacedKG = "";
    }
    // Add RN Shifts to Arrays
    var shiftRNKG = []
    var startRNKG = []
    var endRNKG = []
    $('div.dpcs .shift-details .time-detail .display').each(function() {
      shiftRNKG.push(timeStringToFloat($(this).text()));
    });
    $('div.dpcs .shift-details .time-detail fsw-time-entry[name="STARTTIME"] .time-entry input').each(function() {
      startRNKG.push($(this).val());
    });
    $('div.dpcs .shift-details .time-detail fsw-time-entry[name="ENDTIME"] .time-entry input').each(function() {
      endRNKG.push($(this).val());
    });

    // Add DPC shifts to Arrays
    var shiftDPCKG = []
    var startDPCKG = []
    var endDPCKG = []
    $('div.dpc .shift-details .time-detail .display').each(function() {
      shiftDPCKG.push(timeStringToFloat($(this).text()));
    });
    $('div.dpc .shift-details .time-detail fsw-time-entry[name="STARTTIME"] .time-entry input').each(function() {
      startDPCKG.push($(this).val());
    });
    $('div.dpc .shift-details .time-detail fsw-time-entry[name="ENDTIME"] .time-entry input').each(function() {
      endDPCKG.push($(this).val());
    });

    var rnHoursKG = 0;
    for (i = 0; i < shiftRNKG.length; ++i) {
      rnHoursKG = ((shiftRNKG[i] - .5) + (rnHoursKG * 1)).toFixed(2);
    }
    var dpcHoursKG = 0;
    for (i = 0; i < shiftDPCKG.length; ++i) {
      dpcHoursKG = ((shiftDPCKG[i] - .5) + (dpcHoursKG * 1)).toFixed(2);
    }
    var totalHoursKG = 0;
    totalHoursKG = ((dpcHoursKG) * 1 + (rnHoursKG) * 1).toFixed(2);

    if (expTreatsKG == "") {
      var pctHrsTxKG = (dpcHoursKG / schedTreatsKG).toFixed(2);
      var rnHrsTxKG = (rnHoursKG / schedTreatsKG).toFixed(2);
      var totalHrsTxKG = (totalHoursKG / schedTreatsKG).toFixed(2);
      $('#hrsTxNote').show();
    } else {
      var pctHrsTxKG = (dpcHoursKG / expTreatsKG).toFixed(2);
      var rnHrsTxKG = (rnHoursKG / expTreatsKG).toFixed(2);
      var totalHrsTxKG = (totalHoursKG / expTreatsKG).toFixed(2);
      $('#hrsTxNote').hide();
    }
    // Custom forEach function
    var forEach = function(array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };


    var durs = [];
    var myNodeList = angular.element(document.querySelectorAll('div.pcard-outer-container:not(.open-chair) div.pcard-duration'));
    forEach(myNodeList, function(index, value) {
      durs.push(timeStringToFloat($(value).text().trim())); // passes index + value back!
    });

    var startTimesKG = [];
    var endTimesKG = [];
    var kgCountGraph = [];

    var myNodeList = angular.element(document.querySelectorAll('div.pcard-outer-container:not(.open-chair) [name~="STARTTIME"] div.time-entry form input[name~="timeEntryInput"]'));
    forEach(myNodeList, function(index, value) {
      var sTime = new Date();
      var thisStartKG = $(value).val();
      thisStartKG = thisStartKG.split(":");
      sTime.setHours(sTime.getHours());
      sTime.setHours(thisStartKG[0], thisStartKG[1], 0);
      startTimesKG.push(sTime);
    });
    var myNodeList = angular.element(document.querySelectorAll('div.pcard-outer-container:not(.open-chair) span.pcard-time-off:not(.actualsKg)'));
    forEach(myNodeList, function(index, value) {
      var eTime = new Date();
      var thisEndKG = $(value).text();
      thisEndKG = thisEndKG.split(":");
      eTime.setHours(eTime.getHours());
      eTime.setHours(thisEndKG[0], thisEndKG[1], 0);
      endTimesKG.push(eTime);
    });
    var startMinimum = 1440;
    var endMax = "0";
    var a = "";
    var l = 0;
    var yHeight = "";
    var xWidth = 1;

    // console.log(startTimesKG)
    // console.log(endTimesKG)

    //max and min loop
    for (var i = 0; i < startTimesKG.length; i++) {
      var startMinutes1 = (startTimesKG[i].getHours() * 60) + startTimesKG[i].getMinutes();
      var endMinutes1 = (endTimesKG[i].getHours() * 60) + endTimesKG[i].getMinutes();
      if (endMinutes1 < startMinutes1) {
        endMinutes1 += 1440;
      }
      if (startMinutes1 < startMinimum) {
        startMinimum = startMinutes1;
      }
      if (endMinutes1 > endMax) {
        endMax = endMinutes1;
      }
    }

    //check if patient running graph will be too wide for display and assign smaller width values
    if (endMax > 1560) {
      barWidth = 7;
      barWidthMultiplier = 22.5;
      smallGraph = 1;
    } else {
      barWidth = 10;
      barWidthMultiplier = 20;
      smallGraph = "";
    }
    //Check each start & end time and graph number of patients running
    for (j in kgTimes) {
      for (k in kgTimes[j]) {
        a = 0;
        for (var i = 0; i < startTimesKG.length; i++) {
          var startMinutes = (startTimesKG[i].getHours() * 60) + startTimesKG[i].getMinutes();
          var endMinutes = (endTimesKG[i].getHours() * 60) + endTimesKG[i].getMinutes();
          if (endMinutes < startMinutes) {
            endMinutes += 1440;
          }

          if ((startMinutes <= kgTimes[j][k]) && (endMinutes > kgTimes[j][k])) {
            a++;
          }
        }
        var m = Math.floor(l / 4);
        var m2 = Math.floor(l / 4);
        var n = (l % 4) * 15;
        var o = (n * 1 + 15);
        if (n == 0) {
          n = "00"
        };
        if (o == 60) {
          o = "00";
          m2 = (m2 * 1 + 1)
        };
        var barTitle = m + ":" + n + " - " + m2 + ":" + o;
        $('.pt-running-chart-bars#t' + l).attr("title", barTitle);
        if ((a == 0 && kgTimes[j][k] < startMinimum) || (a == 0 && kgTimes[j][k] > endMax)) {
          $('.pt-running-chart-bars#t' + l).hide();
        }
        if (!a == 0 || (a == 0 && kgTimes[j][k] > startMinimum && kgTimes[j][k] < (endMax + 60))) {
          $('.pt-running-chart-bars#t' + l).show();
          $('.pt-running-chart-bars#t' + l).height((a * 10));
          xWidth += 1;
          if (a > yHeight) {
            yHeight = a;
          }
          if ((kgTimes[j][k] / 60) % 1 == 0) {
            var xTimeLabel = (kgTimes[j][k] / 60);
            if (xTimeLabel > 23) {
              xTimeLabel -= 24;
            }
            var $kgXaxis = $('<div class="pt-running-chart-labels axisLabels xAxisKG" id="x' + l + '" style="margin-left:' + ((xWidth * barWidth) + barWidthMultiplier) + 'px;"><p>' + xTimeLabel + '</p></div>'); //changed this to 8 from 10, text size to .6 from .75
            $kgXaxis.appendTo($('.pt-running-chart'));
          }
        }
        l++;
      };
    }
    $('.pt-running-chart-labels#y-axis').height((yHeight * 10));
    $('.pt-running-chart-labels#x-axis').width((xWidth * barWidth)); ////for clinics open later than 2AM changed barWidth to 8 from 10
    for (var i = 0; i <= yHeight; i++) {
      var $kgYaxis = $('<div class="pt-running-chart-labels yTicksKG axisLabels" id="y' + i + '" style="margin: 0px 0px ' + ((i * 10) + 35) + 'px 25px;"></div>');
      $kgYaxis.appendTo($('.pt-running-chart'));
    }
    for (var i = 0; i <= xWidth; i++) {
      var $kgYaxis = $('<div class="pt-running-chart-labels xTicksKG axisLabels" id="x' + i + '" style="margin: 0px 0px 25px ' + ((i * barWidth) + 35) + 'px;"></div>'); //for clinics open later than 2AM changed barWidth to 8 from 10
      $kgYaxis.appendTo($('.pt-running-chart'));
    }
    for (var i = 0; i <= yHeight; i += 2) {
      var $kgYaxis = $('<div class="pt-running-chart-labels axisLabels yAxisKG" id="y' + i + '" style="margin: 0px 0px ' + ((i * 10) + 33) + 'px 10px;"><p>' + i + '</p></div>');
      $kgYaxis.appendTo($('.pt-running-chart'));
    }

    if (smallGraph) {
      $('.yAxisKG').addClass('smallGraphFont');
      $('.xAxisKG').addClass('smallGraphFont');
      $('.pt-running-chart-bars').addClass('smallGraphWidth');
    } else {
      $('.yAxisKG').removeClass('smallGraphFont');
      $('.xAxisKG').removeClass('smallGraphFont');
      $('.pt-running-chart-bars').removeClass('smallGraphWidth');
    }
    var avgDurationKG = ""
    for (var i = 0; i < durs.length; i++) {
      avgDurationKG = ((avgDurationKG * 1) + (durs[i] * 1));
    }
    avgDurationKG = (avgDurationKG / durs.length).toFixed(2);

    if (endMax >= 1440) {
      endMax = endMax - 1440;
    }
    //First Tx start and Last Tx End - Not Including Open Chairs
    var firstStartKG = convertMinsToHrsMins(startMinimum);
    var lastEndKG = convertMinsToHrsMins(endMax);

    //Open and Close Hour calculations   startRNKG    endRNKG    startDPCKG    endDPCKG
    var rnOpenHrs = 0;
    var dpcOpenHrs = 0;
    var rnCloseHrs = 0;
    var dpcCloseHrs = 0;
    // var rnOpenMins = 0;
    // var dpcOpenMins = 0;
    // var rnCloseMins = 0;
    // var dpcCloseMins = 0;

    for (var i = 0; i < startRNKG.length; i++) {
      var splitTimeS = startRNKG[i].split(":");
      var rnOpenMins = ((splitTimeS[0] * 60) + splitTimeS[1] * 1);
      var splitTimeE = endRNKG[i].split(":");
      var rnCloseMins = ((splitTimeE[0] * 60) + splitTimeE[1] * 1);
      if (rnCloseMins < rnOpenMins) {
        rnCloseMins += 1440;
      }
      if (rnOpenMins < startMinimum) {
        rnOpenHrs = (startMinimum - rnOpenMins) + rnOpenHrs;

      }
      if (rnCloseMins > endMax) {
        rnCloseHrs = (rnCloseMins - endMax) + rnCloseHrs;
      }
    }

    for (var i = 0; i < startDPCKG.length; i++) {
      var splitTimeS = startDPCKG[i].split(":");
      var dpcOpenMins = ((splitTimeS[0] * 60) + splitTimeS[1] * 1);
      var splitTimeE = endDPCKG[i].split(":");
      var dpcCloseMins = ((splitTimeE[0] * 60) + splitTimeE[1] * 1);
      if (dpcCloseMins < dpcOpenMins) {
        dpcCloseMins += 1440;
      }
      if (dpcOpenMins < startMinimum) {
        dpcOpenHrs = (startMinimum - dpcOpenMins) + dpcOpenHrs;

      }
      if (dpcCloseMins > endMax) {
        dpcCloseHrs = (dpcCloseMins - endMax) + dpcCloseHrs;
      }
    }
    totalOpenHrs = ((dpcOpenHrs + rnOpenHrs) / 60).toFixed(2);
    totalCloseHrs = ((dpcCloseHrs + rnCloseHrs) / 60).toFixed(2);
    totalOpClHrsDPC = ((dpcOpenHrs + dpcCloseHrs) / 60).toFixed(2);
    totalOpClHrsRN = ((rnOpenHrs + rnCloseHrs) / 60).toFixed(2);
    totalOpClHrs = (totalOpClHrsDPC * 1 + totalOpClHrsRN * 1).toFixed(2);
    dpcOpenHrs = (dpcOpenHrs / 60).toFixed(2);
    dpcCloseHrs = (dpcCloseHrs / 60).toFixed(2);
    rnOpenHrs = (rnOpenHrs / 60).toFixed(2);
    rnCloseHrs = (rnCloseHrs / 60).toFixed(2);

    if (!kgIsFull) {
      //Full Productivity Panel is Closed
      setProdKG(
        1, //i
        schedTreatsKG, //j
        schedOpensKG, //k
        avgDurationKG, //l
        dpcHoursKG, //m
        rnHoursKG, //n
        totalHoursKG, //o
        pctHrsTxKG, //p
        rnHrsTxKG, //q
        totalHrsTxKG, //r
        anyPlacedKG, //s
        anyPlacedNotesKG, //t
        firstStartKG, //u
        lastEndKG, //v
        avfistulaKG, //ii
        avgraftKG, //jj
        anchorKG, //kk
        assistKG, //ll
        cathKG, //mm
        hepKG, //nn
        hoyerKG, //oo
        icKG, //pp
        newPTKG, //qq
        transientKG, //rr
        wheelchairKG, //ss
        totalOpenHrs, //tt
        totalCloseHrs, //uu
        dpcOpenHrs, //vv
        dpcCloseHrs, //ww
        rnOpenHrs, //xx
        rnCloseHrs, //yy
        totalOpClHrsDPC, //zz
        totalOpClHrsRN, //za
        totalOpClHrs //zb
      );
      if (!sharedChairsKG) {
        //check if there are NO shared chairs
        if (groupDaySelectionKG == "Mon / Wed / Fri") {
          //we're on MWF
          $('#daySelectionKg').text('Mon \/ Wed \/ Fri');
        } else if (groupDaySelectionKG == "Tue / Thu / Sat") {
          //we're on TTS
          $('#daySelectionKg').text('Tue \/ Thu \/ Sat');
        }
      } else {
        //There are shared chairs
        if (currentScDayKG == "M") {
          daySelectText = "<b>Mon</b> \/ Wed \/ Fri"
        } else if (currentScDayKG == "T") {
          daySelectText = "<b>Tue</b> \/ Thu \/ Sat"
        } else if (currentScDayKG == "W") {
          daySelectText = "Mon \/ <b>Wed</b> \/ Fri"
        } else if (currentScDayKG == "Th") {
          daySelectText = "Tue \/ <b>Thu</b> \/ Sat"
        } else if (currentScDayKG == "F") {
          daySelectText = "Mon \/ Wed \/ <b>Fri</b>"
        } else if (currentScDayKG == "S") {
          daySelectText = "Tue \/ Thu \/ <b>Sat</b>"
        } else {

        }
        $('#daySelectionKg').html(daySelectText);
      }
    } else {
      //Full Productivity Panel is Open
    }

    //Add listener to create crosshair on running bar graph
    $(".pt-running-chart-bars")
      .mouseover(function() {
        yLabel = ($(this).height()) / 10;
        $('.yTicksKG#y' + yLabel).addClass('crosshair');
      })
      .mouseout(function() {
        $('.crosshair').removeClass('crosshair');
      });
    addBlockedChairNotes()
    //Convert Earliest Start Time and Latest End Time to Hours : Mins

    kgProdNumbers.push(schedTreatsKG); //0
    kgProdNumbers.push(schedOpensKG); //1
    kgProdNumbers.push(avgDurationKG); //2
    kgProdNumbers.push(dpcHoursKG); //3
    kgProdNumbers.push(rnHoursKG); //4
    kgProdNumbers.push(totalHoursKG); //5
    kgProdNumbers.push(pctHrsTxKG); //6
    kgProdNumbers.push(rnHrsTxKG); //7
    kgProdNumbers.push(totalHrsTxKG); //8
    kgProdNumbers.push(anyPlacedKG); //9
    kgProdNumbers.push(anyPlacedNotesKG); //10
    kgProdNumbers.push(firstStartKG); //11
    kgProdNumbers.push(lastEndKG); //12
    kgProdNumbers.push(avfistulaKG); //13
    kgProdNumbers.push(avgraftKG); //14
    kgProdNumbers.push(anchorKG); //15
    kgProdNumbers.push(assistKG); //16
    kgProdNumbers.push(cathKG); //17
    kgProdNumbers.push(hepKG); //18
    kgProdNumbers.push(hoyerKG); //19
    kgProdNumbers.push(icKG); //20
    kgProdNumbers.push(newPTKG); //21
    kgProdNumbers.push(transientKG); //22
    kgProdNumbers.push(wheelchairKG); //23
    kgProdNumbers.push(totalOpenHrs); //24
    kgProdNumbers.push(totalCloseHrs); //25
    kgProdNumbers.push(dpcOpenHrs); //26
    kgProdNumbers.push(dpcCloseHrs); //27
    kgProdNumbers.push(rnOpenHrs); //28
    kgProdNumbers.push(rnCloseHrs); //29
    kgProdNumbers.push(totalOpClHrsDPC); //30
    kgProdNumbers.push(totalOpClHrsRN); //31
    kgProdNumbers.push(totalOpClHrs); //32
    return kgProdNumbers;
  }

  Number.prototype.pad = function(size) { //Add leading zeros to number -> we use it for the zip codes that start with 0
    var s = String(this);
    while (s.length < (size || 2)) {
      s = "0" + s;
    }
    return s;
  }

  function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
  }

  function convertTimeToMins(time) {
    var splitTime = time.split(":");
    var mins = ((splitTime[0] * 60) + splitTime[1] * 1);
    return mins
  }

  function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }


  // below changes all pods to patient view or staff view in 1 click
  function allStaff() {
    angular.element(document.querySelectorAll('li[heading~=Staff] a')).click();
  }

  function allPatient() {
    angular.element(document.querySelectorAll('li[heading~=Patient] a')).click();
  }


  function adjustStartTime() {
    $('.time-entry form input').each(function() {
        var thisStartKG = $(this).val();
        var sTime = new Date();
        thisStartKG = thisStartKG.split(":");
        sTime.setHours(sTime.getHours());
        sTime.setHours(thisStartKG[0], thisStartKG[1], 0);
        var startMinutes = (sTime.getHours() * 60) + sTime.getMinutes();
        startMinutes = startMinutes - 35;
        startMinutes = convertMinsToHrsMins(startMinutes)
        $(this).parents().eq(4).append('<div>'+startMinutes+'</div>');
      });
  }

  //color coding on screen schedule temporarily
  function toggleConcierge() {
    $('#helperContainer').toggle();
    $('div.pcard-top-row').on('click', function() {
      if (!ptColorKG == "") {
        if ($(this).hasClass('colorCoded')) {
          $(this).removeClass('colorCoded');
          $(this).css('background-color', '');
        } else {
          $(this).addClass('colorCoded');
          $(this).css('background-color', ptColorKG);
        }
      } else {
        $(this).removeClass('colorCoded');
        $(this).css('background-color', '');
      }
    });
    $('div.timebox').on('click', function() {
      if (!ptColorKG == "") {
        if ($(this).hasClass('colorCoded')) {
          $(this).removeClass('colorCoded');
          $(this).css('background-color', '');
        } else {
          $(this).addClass('colorCoded');
          $(this).css('background-color', ptColorKG);
        }
      } else {
        $(this).removeClass('colorCoded');
        $(this).css('background-color', '');
      }
    });
  }

  function kgFullProd() {
    if (!kgIsFull) {
      clearProdKG();
      kgIsFull = 1;
      var daySelectText = "";
      var sharedChairsKG = $('.tab-active').length;
        var currentScDayKG = $('.tab-active').first().text();
      var groupDaySelectionKG = $('.dropdown-toggle').first().text().trim();
      var kgProdNumbers = [];
      $('.kgContainer').width('50%');
      $('.kgFullProductivity').show();
      $('#kgMon').text('M');
      $('#kgTues').text('T');
      $('#kgWed').text('W');
      $('#kgThurs').text('Th');
      $('#kgFri').text('F');
      $('#kgSat').text('S');
      $('#kgMWF').text('MWF');
      $('#kgTTS').text('TTS');
      $('#kgALL').text('ALL');
      if (sharedChairsKG) {
      }
    } else {
      $('.kgContainer').width('');
      $('.kgFullProductivity').hide();
      kgIsFull = "";
    }
  }

  //I didn't end up using this function probably can be removed
  function kgRefreshDay(k) { //k=1-3
    var groupDaySelectionKG = $('.dropdown-toggle').first().text().trim();
    var i = "";
    var l = "";
    if (groupDaySelectionKG == "") {
      //in progress
    }
    if (k = 1) {
      //Monday
      i = 0;
      l = 1;
    } else if (k = 2) {
      //Tuesday
      i = 0;
      l = 2;
    } else if (k = 3) {
      //Wednesday
      i = 0;
      l = 1;
    } else if (k = 4) {
      //Thursday
      i = 0;
      l = 1;
    } else if (k = 5) {
      //Friday
      i = 0;
      l = 1;
    } else {
      //Saturday
      i = 0;
      l = 1;
    }

    //assigning productivity numbers to my prod panel
    var kgProdNumbers = [];
    var j = "a:eq(" + i + ")";
    $('.shared-chair-tab').first().find(j).click();
    kgProdNumbers = kgProdMath();
    setProdKG(
      k,
      kgProdNumbers[0],
      kgProdNumbers[1],
      kgProdNumbers[2],
      kgProdNumbers[3],
      kgProdNumbers[4],
      kgProdNumbers[5],
      kgProdNumbers[6],
      kgProdNumbers[7],
      kgProdNumbers[8],
      kgProdNumbers[9],
      kgProdNumbers[10],
    );
  }

  //working with dates and times
  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '%2F' + day + '%2F' + year;
  }

  function getHoursDetailFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '-' + month + '-' + day;
  }

  function getSlashDate(date,separator) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  //passing and assigning variables... there's probably a better way to do this
  function setProdKG(i, j, k, l, m, n, o, p, q, r, s, t, u, v, ii, jj, kk, ll, mm, nn, oo, pp, qq, rr, ss, tt, uu, vv, ww, xx, yy, zz, za, zb) {
    $('#schedTxKG' + i).html(j);
    $('#openChairKG' + i).html(k + s);
    $('#avgDurKG' + i).html(l);
    $('#dpcHRKG' + i).html(m);
    $('#rnHRKG' + i).html(n);
    $('#totalHRKG' + i).html(o);
    $('#pctHRTXKG' + i).html(p);
    $('#rnHRTXKG' + i).html(q);
    $('#totalHRTXKG' + i).html(r);
    $('#kgNotes').html(t);
    $('#firstTxKG' + i).html(u);
    $('#lastTxKG' + i).html(v);
    $('#avfistulaKG').html(ii);
    $('#avgraftKG').html(jj);
    $('#anchorKG').html(kk);
    $('#assistKG').html(ll);
    $('#cathKG').html(mm);
    $('#hepKG').html(nn);
    $('#hoyerKG').html(oo);
    $('#icKG').html(pp);
    $('#newPTKG').html(qq);
    $('#transientKG').html(rr);
    $('#wheelchairKG').html(ss);
    $('#totalOpenHrsKG1').html(tt);
    $('#totalCloseHrsKG1').html(uu);
    $('#pctOpenHrsKG1').html(vv);
    $('#pctCloseHrsKG1').html(ww);
    $('#rnOpenHrsKG1').html(xx);
    $('#rnCloseHrsKG1').html(yy);
    $('#totalOpClHrsDPC').html(zz);
    $('#totalOpClHrsRN').html(za);
    $('#totalOpClHrs').html(zb);
  }

  //Add blocked chair Notes
  function addBlockedChairNotes() {
    $('.blockedNotes').remove()
    $('blocked-shift-card').each(function(){
    var blocked_notes = $(this).data().$blockedShiftCardController.shift.ADDITIONALINFO
    if(blocked_notes == ""){
      blocked_notes = "None"
    }
    $(this).find('.pcard-blocked-bottom-row').append('<div class="blockedNotes" style="font-size: 0.8em">Note: '+blocked_notes+'</div>')
    })
  }

  function getHoursDetail() {
    var obj
    var selectedClinicId
    selectedClinicID = $('fsw-pod-schedule').data().$fswPodScheduleController.settings.selectedClinicId
    var hoursDetailNow = new Date();
    var hoursDetailToday = new Date(hoursDetailNow.getFullYear(), hoursDetailNow.getMonth(), hoursDetailNow.getDate());
    var hoursDetailSunday = new Date(hoursDetailToday.setDate(hoursDetailToday.getDate() - hoursDetailToday.getDay()-7));
    hoursDetailSunday = getHoursDetailFormattedDate(hoursDetailSunday);

    $('#wk1date').text("Loading...")
    $('#wk2date').text("Loading...")
    $('#wk3date').text("Loading...")
    $('#wk4date').text("Loading...")

    fetch('https://www.fmcschedule.com/services/tap/dashboard/'+selectedClinicID+'?selectedDate='+hoursDetailSunday+'&numberOfWeeks=10&actualsWeek='+hoursDetailSunday,{method: 'GET'})
      .then(response => response.json())
      .then(data => setHoursDetail(data))

      function setHoursDetail(obj) {
      var wk1date = obj.data.weeks[1].weekRange
      var wk2date = obj.data.weeks[2].weekRange
      var wk3date = obj.data.weeks[3].weekRange
      var wk4date = obj.data.weeks[4].weekRange

      var wk1txs = obj.data.weeks[1].treatments.scheduledTreatments
      var wk1txe = obj.data.weeks[1].treatments.expectedTreatments
      var wk1txa = obj.data.weeks[1].treatments.actualNoTreatments
      var wk2txs = obj.data.weeks[2].treatments.scheduledTreatments
      var wk2txe = obj.data.weeks[2].treatments.expectedTreatments
      var wk2txa = obj.data.weeks[2].treatments.actualNoTreatments
      var wk3txs = obj.data.weeks[3].treatments.scheduledTreatments
      var wk3txe = obj.data.weeks[3].treatments.expectedTreatments
      var wk3txa = obj.data.weeks[3].treatments.actualNoTreatments
      var wk4txs = obj.data.weeks[4].treatments.scheduledTreatments
      var wk4txe = obj.data.weeks[4].treatments.expectedTreatments
      var wk4txa = obj.data.weeks[4].treatments.actualNoTreatments

      var rn1goal = obj.data.weeks[1].staffingDetails[0].goal
      var rn1sched = obj.data.weeks[1].staffingDetails[0].sched
      var rn1actual = obj.data.weeks[1].staffingDetails[0].actual
      var rn1strn = obj.data.weeks[1].staffingDetails[0].sTrig
      var rn1atrn = obj.data.weeks[1].staffingDetails[0].aTrig
      var rn1sot = obj.data.weeks[1].staffingDetails[0].sOT
      var rn1aot = obj.data.weeks[1].staffingDetails[0].aOT
      var pct1goal = obj.data.weeks[1].staffingDetails[1].goal
      var pct1sched = obj.data.weeks[1].staffingDetails[1].sched
      var pct1actual = obj.data.weeks[1].staffingDetails[1].actual
      var pct1strn = obj.data.weeks[1].staffingDetails[1].sTrig
      var pct1atrn = obj.data.weeks[1].staffingDetails[1].aTrig
      var pct1sot = obj.data.weeks[1].staffingDetails[1].sOT
      var pct1aot = obj.data.weeks[1].staffingDetails[1].aOT
      var rn2goal = obj.data.weeks[2].staffingDetails[0].goal
      var rn2sched = obj.data.weeks[2].staffingDetails[0].sched
      var rn2actual = obj.data.weeks[2].staffingDetails[0].actual
      var rn2strn = obj.data.weeks[2].staffingDetails[0].sTrig
      var rn2atrn = obj.data.weeks[2].staffingDetails[0].aTrig
      var rn2sot = obj.data.weeks[2].staffingDetails[0].sOT
      var rn2aot = obj.data.weeks[2].staffingDetails[0].aOT
      var pct2goal = obj.data.weeks[2].staffingDetails[1].goal
      var pct2sched = obj.data.weeks[2].staffingDetails[1].sched
      var pct2actual = obj.data.weeks[2].staffingDetails[1].actual
      var pct2strn = obj.data.weeks[2].staffingDetails[1].sTrig
      var pct2atrn = obj.data.weeks[2].staffingDetails[1].aTrig
      var pct2sot = obj.data.weeks[2].staffingDetails[1].sOT
      var pct2aot = obj.data.weeks[2].staffingDetails[1].aOT
      var rn3goal = obj.data.weeks[3].staffingDetails[0].goal
      var rn3sched = obj.data.weeks[3].staffingDetails[0].sched
      var rn3actual = obj.data.weeks[3].staffingDetails[0].actual
      var rn3strn = obj.data.weeks[3].staffingDetails[0].sTrig
      var rn3atrn = obj.data.weeks[3].staffingDetails[0].aTrig
      var rn3sot = obj.data.weeks[3].staffingDetails[0].sOT
      var rn3aot = obj.data.weeks[3].staffingDetails[0].aOT
      var pct3goal = obj.data.weeks[3].staffingDetails[1].goal
      var pct3sched = obj.data.weeks[3].staffingDetails[1].sched
      var pct3actual = obj.data.weeks[3].staffingDetails[1].actual
      var pct3strn = obj.data.weeks[3].staffingDetails[1].sTrig
      var pct3atrn = obj.data.weeks[3].staffingDetails[1].aTrig
      var pct3sot = obj.data.weeks[3].staffingDetails[1].sOT
      var pct3aot = obj.data.weeks[3].staffingDetails[1].aOT
      var rn4goal = obj.data.weeks[4].staffingDetails[0].goal
      var rn4sched = obj.data.weeks[4].staffingDetails[0].sched
      var rn4actual = obj.data.weeks[4].staffingDetails[0].actual
      var rn4strn = obj.data.weeks[4].staffingDetails[0].sTrig
      var rn4atrn = obj.data.weeks[4].staffingDetails[0].aTrig
      var rn4sot = obj.data.weeks[4].staffingDetails[0].sOT
      var rn4aot = obj.data.weeks[4].staffingDetails[0].aOT
      var pct4goal = obj.data.weeks[4].staffingDetails[1].goal
      var pct4sched = obj.data.weeks[4].staffingDetails[1].sched
      var pct4actual = obj.data.weeks[4].staffingDetails[1].actual
      var pct4strn = obj.data.weeks[4].staffingDetails[1].sTrig
      var pct4atrn = obj.data.weeks[4].staffingDetails[1].aTrig
      var pct4sot = obj.data.weeks[4].staffingDetails[1].sOT
      var pct4aot = obj.data.weeks[4].staffingDetails[1].aOT

      var total1goal = (1*(rn1goal) + 1*(pct1goal)).toFixed(2)
      var total1sched = (1*(rn1sched) + 1*(pct1sched)).toFixed(2)
      var total1act = (1*(rn1actual) + 1*(pct1actual)).toFixed(2)
      var total1strn = (1*(rn1strn) + 1*(pct1strn)).toFixed(2)
      var total1atrn = (1*(rn1atrn) + 1*(pct1atrn)).toFixed(2)
      var total1sot = (1*(rn1sot) + 1*(pct1sot)).toFixed(2)
      var total1aot = (1*(rn1aot) + 1*(pct1aot)).toFixed(2)

      var total2goal = (1*(rn2goal) + 1*(pct2goal)).toFixed(2)
      var total2sched = (1*(rn2sched) + 1*(pct2sched)).toFixed(2)
      var total2act = (1*(rn2actual) + 1*(pct2actual)).toFixed(2)
      var total2strn = (1*(rn2strn) + 1*(pct2strn)).toFixed(2)
      var total2atrn = (1*(rn2atrn) + 1*(pct2atrn)).toFixed(2)
      var total2sot = (1*(rn2sot) + 1*(pct2sot)).toFixed(2)
      var total2aot = (1*(rn2aot) + 1*(pct2aot)).toFixed(2)

      var total3goal = (1*(rn3goal) + 1*(pct3goal)).toFixed(2)
      var total3sched = (1*(rn3sched) + 1*(pct3sched)).toFixed(2)
      var total3act = (1*(rn3actual) + 1*(pct3actual)).toFixed(2)
      var total3strn = (1*(rn3strn) + 1*(pct3strn)).toFixed(2)
      var total3atrn = (1*(rn3atrn) + 1*(pct3atrn)).toFixed(2)
      var total3sot = (1*(rn3sot) + 1*(pct3sot)).toFixed(2)
      var total3aot = (1*(rn3aot) + 1*(pct3aot)).toFixed(2)

      var total4goal = (1*(rn4goal) + 1*(pct4goal)).toFixed(2)
      var total4sched = (1*(rn4sched) + 1*(pct4sched)).toFixed(2)
      var total4act = (1*(rn4actual) + 1*(pct4actual)).toFixed(2)
      var total4strn = (1*(rn4strn) + 1*(pct4strn)).toFixed(2)
      var total4atrn = (1*(rn4atrn) + 1*(pct4atrn)).toFixed(2)
      var total4sot = (1*(rn4sot) + 1*(pct4sot)).toFixed(2)
      var total4aot = (1*(rn4aot) + 1*(pct4aot)).toFixed(2)

      $('#wk1date').text(wk1date)
      $('#wk2date').text(wk2date)
      $('#wk3date').text(wk3date)
      $('#wk4date').text(wk4date)

      var wk1missed = wk1txs - wk1txa
      var wk2missed = wk2txs - wk2txa
      var wk3missed = wk3txs - wk3txa
      var wk4missed = wk4txs - wk4txa
      var avgSch = (wk1txs + wk2txs + wk3txs + wk4txs)/4
      var avgMissed = (wk1missed + wk2missed + wk3missed + wk4missed)/4
      var avgMissedPer = ((avgMissed / avgSch)*100).toFixed(2)

      $('#wk1tx').text('Sch-'+wk1txs+' Exp-'+wk1txe+' Act-'+wk1txa)
      $('#wk2tx').text('Sch-'+wk2txs+' Exp-'+wk2txe+' Act-'+wk2txa)
      $('#wk3tx').text('Sch-'+wk3txs+' Exp-'+wk3txe+' Act-'+wk3txa)
      $('#wk4tx').text('Sch-'+wk4txs+' Exp-'+wk4txe+' Act-'+wk4txa)
      $('#wk1mtx').text('Missed Tx-'+wk1missed)
      $('#wk2mtx').text('Missed Tx-'+wk2missed)
      $('#wk3mtx').text('Missed Tx-'+wk3missed)
      $('#wk4mtx').text('Missed Tx-'+wk4missed)
      $('#avgMissedTx').text('Missed Tx/wk: '+avgMissed+' ('+avgMissedPer+'%)')

      $('#rn1goal').text(rn1goal.toFixed(2))
      $('#rn1sched').text(rn1sched.toFixed(2))
      $('#rn1actual').text(rn1actual.toFixed(2))
      $('#rn1strn').text(rn1strn.toFixed(2))
      $('#rn1atrn').text(rn1atrn.toFixed(2))
      $('#rn1sot').text(rn1sot.toFixed(2))
      $('#rn1aot').text(rn1aot.toFixed(2))

      $('#pct1goal').text(pct1goal.toFixed(2))
      $('#pct1sched').text(pct1sched.toFixed(2))
      $('#pct1actual').text(pct1actual.toFixed(2))
      $('#pct1strn').text(pct1strn.toFixed(2))
      $('#pct1atrn').text(pct1atrn.toFixed(2))
      $('#pct1sot').text(pct1sot.toFixed(2))
      $('#pct1aot').text(pct1aot.toFixed(2))

      $('#total1goal').text(total1goal)
      $('#total1sched').text(total1sched)
      $('#total1actual').text(total1act)
      $('#total1strn').text(total1strn)
      $('#total1atrn').text(total1atrn)
      $('#total1sot').text(total1sot)
      $('#total1aot').text(total1aot)

      $('#rn2goal').text(rn2goal.toFixed(2))
      $('#rn2sched').text(rn2sched.toFixed(2))
      $('#rn2actual').text(rn2actual.toFixed(2))
      $('#rn2strn').text(rn2strn.toFixed(2))
      $('#rn2atrn').text(rn2atrn.toFixed(2))
      $('#rn2sot').text(rn2sot.toFixed(2))
      $('#rn2aot').text(rn2aot.toFixed(2))

      $('#pct2goal').text(pct2goal.toFixed(2))
      $('#pct2sched').text(pct2sched.toFixed(2))
      $('#pct2actual').text(pct2actual.toFixed(2))
      $('#pct2strn').text(pct2strn.toFixed(2))
      $('#pct2atrn').text(pct2atrn.toFixed(2))
      $('#pct2sot').text(pct2sot.toFixed(2))
      $('#pct2aot').text(pct2aot.toFixed(2))

      $('#total2goal').text(total2goal)
      $('#total2sched').text(total2sched)
      $('#total2actual').text(total2act)
      $('#total2strn').text(total2strn)
      $('#total2atrn').text(total2atrn)
      $('#total2sot').text(total2sot)
      $('#total2aot').text(total2aot)

      $('#rn3goal').text(rn3goal.toFixed(2))
      $('#rn3sched').text(rn3sched.toFixed(2))
      $('#rn3actual').text(rn3actual.toFixed(2))
      $('#rn3strn').text(rn3strn.toFixed(2))
      $('#rn3atrn').text(rn3atrn.toFixed(2))
      $('#rn3sot').text(rn3sot.toFixed(2))
      $('#rn3aot').text(rn3aot.toFixed(2))

      $('#pct3goal').text(pct3goal.toFixed(2))
      $('#pct3sched').text(pct3sched.toFixed(2))
      $('#pct3actual').text(pct3actual.toFixed(2))
      $('#pct3strn').text(pct3strn.toFixed(2))
      $('#pct3atrn').text(pct3atrn.toFixed(2))
      $('#pct3sot').text(pct3sot.toFixed(2))
      $('#pct3aot').text(pct3aot.toFixed(2))

      $('#total3goal').text(total3goal)
      $('#total3sched').text(total3sched)
      $('#total3actual').text(total3act)
      $('#total3strn').text(total3strn)
      $('#total3atrn').text(total3atrn)
      $('#total3sot').text(total3sot)
      $('#total3aot').text(pct3aot)

      $('#rn4goal').text(rn4goal.toFixed(2))
      $('#rn4sched').text(rn4sched.toFixed(2))
      $('#rn4actual').text(rn4actual.toFixed(2))
      $('#rn4strn').text(rn4strn.toFixed(2))
      $('#rn4atrn').text(rn4atrn.toFixed(2))
      $('#rn4sot').text(rn4sot.toFixed(2))
      $('#rn4aot').text(rn4aot.toFixed(2))

      $('#pct4goal').text(pct4goal.toFixed(2))
      $('#pct4sched').text(pct4sched.toFixed(2))
      $('#pct4actual').text(pct4actual.toFixed(2))
      $('#pct4strn').text(pct4strn.toFixed(2))
      $('#pct4atrn').text(pct4atrn.toFixed(2))
      $('#pct4sot').text(pct4sot.toFixed(2))
      $('#pct4aot').text(pct4aot.toFixed(2))

      $('#total4goal').text(total4goal)
      $('#total4sched').text(total4sched)
      $('#total4actual').text(total4act)
      $('#total4strn').text(total4strn)
      $('#total4atrn').text(total4atrn)
      $('#total4sot').text(total4sot)
      $('#total4aot').text(total4aot)

      // $('.week1hours').prop('title','Totals: Goal-'+week1totalgoal+', Sch-'+week1totalsched+', Act-'+week1totalact)
      // $('.week2hours').prop('title','Totals: Goal-'+week2totalgoal+', Sch-'+week2totalsched+', Act-'+week2totalact)
      // $('.week3hours').prop('title','Totals: Goal-'+week3totalgoal+', Sch-'+week3totalsched+', Act-'+week3totalact)
      // $('.week4hours').prop('title','Totals: Goal-'+week4totalgoal+', Sch-'+week4totalsched+', Act-'+week4totalact)
    }
  }

  function getLobbyNotes() {
    var obj
    var lobbyBox
    var selectedClinicId
    selectedClinicID = $('fsw-pod-schedule').data().$fswPodScheduleController.settings.selectedClinicId
    var body = 'CENTERID='+selectedClinicID+'&METHOD=POST&PARTNERKEY=%252A%253C%252BNAF%253EV%253E%252EU%253B%2522%255F0%2520%2520%250A&function=ClinicsGet&idCenter='+selectedClinicID
    $('.lobbyInfo').remove()
    lobbyBox = '<div class="row grid-space lobbyInfo" style="text-align:center;">' +
    '<span style="float: left;text-align: right;padding-right: 10px;font-weight: bold;">Clinic:</span>' +
    '<span id="lobbyNotesClinic" style="float: left;text-align: left;padding-right: 10px"></span><br>' +
    '<span style="float: left;text-align: right;padding-right: 10px;font-weight: bold;">Notes:</span><br>' +
    '<span id="lobbyNotes" style="float: left;text-align: left;padding-right: 10px;overflow-y: scroll; height: 200px;"></span><br>' +
    '<span style="float: left;text-align: right;padding-right: 10px;font-weight: bold;">Last Modified:</span><br>' +
    '<span id="lobbyNotesDate" style="float: left;text-align: left;padding-right: 10px"></span><br>' +
    '</div>'
    $('#lobbyBox').append(lobbyBox)
    fetch('https://www.fmcschedule.com/api/rest/swac.cfm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
         'Accept': 'application/json, text/plain, */*',
      },
      body: body
    })
    .then(response => response.json())
    .then(data => setLobbyNotesDetail(data))
    .catch(error => {
      console.error('Error:', error);
    });

      function setLobbyNotesDetail(obj) {
      var lobbyClinicID = obj.CLINICS[0].CLINICID
      var lobbyClinicName = obj.CLINICS[0].CLINICNAME
      var lobbyClinicDate = obj.CLINICS[0].DATEMODIFIED
      var lobbyClinicUser = obj.CLINICS[0].NAME
      var lobbyClinicNotes = obj.CLINICS[0].NOTES

      lobbyClinicNotes = lobbyClinicNotes.replace(/\n/g, "<br>")
      lobbyClinicNotes = lobbyClinicNotes.replace(/<br><br>/g, "<br>")

      $('#lobbyNotesClinic').text(lobbyClinicID+' - '+lobbyClinicName)
      $('#lobbyNotes').html(lobbyClinicNotes)
      $('#lobbyNotesDate').text(lobbyClinicDate+' by '+lobbyClinicUser)
    }
  }

  // check if a clinic is using float pool -> i.e. has staff marked eligible to float
  function usingFloat() {
    var notSelected = 0;
    var eligible = 0;
    var notEligible = 0;
    $('.checkFloat').remove();
    $('<div class="row grid-space checkFloat grid-padding" style="background-color:lightblue;">' +
      '<div class="col-xs-4 grid-right">Eligible</div>' +
      '<div class="col-xs-2" id="eligible">0</div>' +
      '</div>' +
      '<div class="row grid-space checkFloat grid-padding" style="background-color:lightblue;">' +
      '<div class="col-xs-4 grid-right">Not Eligible</div>' +
      '<div class="col-xs-2" id="notEligible">0</div>' +
      '</div>' +
      '<div class="row grid-space checkFloat grid-padding" style="background-color:lightblue;">' +
      '<div class="col-xs-4 grid-right">Not Selected</div>' +
      '<div class="col-xs-2" id="notSelected">0</div>' +
      '</div>').appendTo('.float-eligibility');
    $.post("https://www.fmcschedule.com/staff/results.cfm?requestformat=ajax", "", function(data, status) {
      var searchTable = $(data).children('tbody').children('tr');
      $(searchTable).each(function() {
        var staffID = ($(this).find('td').eq(0).find('a').attr('title'));
        $.post("https://www.fmcschedule.com/staff/info.cfm?requestformat=ajax", "ProviderID=" + staffID, function(data2, status2) {
          var eligibility = $(data2).children('tbody').children('tr').find('select[name="IDFLOATELIGIBILITYTYPE"]').val();
          if (eligibility == "") {
            notSelected++;
            $('#notSelected').html(notSelected);
          } else if (eligibility == 1) {
            eligible++;
            $('#eligible').html(eligible);
          } else if (eligibility == 2) {
            notEligible++;
            $('#notEligible').html(notEligible);
          }
        });
      });
    });
  }


  function clearProdKG() {
    for (var i = 1; i < 10; i++) {
      $('#schedTxKG' + i).html("&nbsp;");
      $('#openChairKG' + i).html("&nbsp;");
      $('#avgDurKG' + i).html("&nbsp;");
      $('#dpcHRKG' + i).html("&nbsp;");
      $('#rnHRKG' + i).html("&nbsp;");
      $('#totalHRKG' + i).html("&nbsp;");
      $('#pctHRTXKG' + i).html("&nbsp;");
      $('#rnHRTXKG' + i).html("&nbsp;");
      $('#totalHRTXKG' + i).html("&nbsp;");
      $('#kgNotes').html("&nbsp;");
      $('#firstTxKG' + i).html("&nbsp;");
      $('#lastTxKG' + i).html("&nbsp;");
    };
  }

  //hide my tools if they shouldn't be shown -> training a clinic
  function removeTools() {
    $('.kgTools').remove();
    $('.page-view-container-inner').css('background', 'white');
    $('.staffTimesKG').remove();
  }

  //move staff times from staff view to patient view on patient schedule
  function transferStaffTimes() {
    if ((localStorage.kgToolsOn == 1)) {
      $('.staffTimesKG').remove();
      var staffStartTimeKG = "";
      var staffEndTimeKG = "";
      var staffDuration = "";
      var podIDKG = "";
      var staffShiftNum = 0;


      //custom for loop
      var forEach = function(array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
          callback.call(scope, i, array[i]); // passes back stuff we need
        }
      };

      //Scraping patient data from patient schedule via angular
      var myNodeList = angular.element(document.querySelectorAll('fsw-dpc-shift'));
      forEach(myNodeList, function(index, value) {
        var test = $(value).data();
        if (test) {
          if (test.$fswDpcShiftController.shift) {
            staffStartTimeKG = test.$fswDpcShiftController.shift.STARTTIME;
            staffEndTimeKG = test.$fswDpcShiftController.shift.ENDTIME;
            staffDuration = test.$fswDpcShiftController.shift.DURATIONINMINUTES;
            podIDKG = test.$fswDpcShiftController.shift.PODID;
            staffDuration = convertMinsToHrsMins(staffDuration);
            $('<h4 class="staffTimesKG" style="font-size: .90em;color: grey;margin-bottom: 0px;margin-top: 15px;">&nbsp;[' + staffDuration + ' hrs' + ']&nbsp;</h4>').insertAfter('#pod_container_' + podIDKG + ' h4:last');
          }
        }
      });
    }
  }

  //creating a custom keyboard shortcut (alt+S+W) to show/hide tools
  var map = {
    18: false,
    83: false,
    87: false
  };
  $(document).keydown(function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = true;
      if (map[18] && map[83] && map[87]) {
        loadKgTools();
      }
    }
  }).keyup(function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = false;
    }
  });


  //this checks for certain changes on page to refresh productivity data and patient running graph
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (!$('.kgTools').is(':visible')) {
        loadKgTools();
      } else {
        kgProdMath();
      }
    });
  });

  var observerConfig = {
    attributes: true,
    childList: true,
    characterData: true
  };

  function startKgTools() {
    if ($('.pod-chair').is(':visible')) {
      loadKgTools();
    } else {
      setTimeout(function() {
        startKgTools();
      }, 500);
    }
  }

  function changePatients(params) {
    new MutationObserver(function(mutations) {
      var el = document.getElementsByClassName(params.id);
      if (el) {
        //this.disconnect();
        params.done(el);
      }
    }).observe(params.parent || document, {
      subtree: !!params.recursive,
      childList: true,
    });
  }

  changePatients({
    id: 'pcard-patient-name',
    parent: document.querySelector('body'),
    recursive: false,
    done: function(el) {
      kgProdMath();
    }
  });

  document.addEventListener('scorecard', function (e) {
    var data = e.detail;
    //console.log('received', data)
    disperseData(data)
  });

var dow = ""
  function requestData() {
    clearDashPanel()
    getHoursDetail()
    $('#ptBlank').html('Loading...')
    $('#openCloseBlank').html('Loading...')
    $('#scBlank').html('Loading...')
    var msgDate = $('input[name="datePicker"]').val()
    var currentSelectDay = $('.dropdown-toggle').first().text().trim();
    var msgPtDate = ""
    inDate = new Date(msgDate)
    // console.log(inDate.getWeekDay())
    if (inDate.getWeekDay() == "Mon" || inDate.getWeekDay() == "Wed" || inDate.getWeekDay() == "Fri") {
      dow = "MWF"
    }
    else if (inDate.getWeekDay() == "Tue" || inDate.getWeekDay() == "Thu" || inDate.getWeekDay() == "Sat") {
      dow = "TTS"
    }

    if (currentSelectDay == "Mon / Wed / Fri") {
      if (dow != "MWF") {
        msgPtDate = minusPtDate()
      }
      else {
        msgPtDate = msgDate
      }
    }
    else {
      if (dow != "TTS") {
        msgPtDate = minusPtDate()
      }
      else {
        msgPtDate = msgDate
      }
    }


    // var freqPt = ""
    // var freqOpen = ""
    //
    // // Set checkbox value
    // $('.scoreCardBoxPt').each(function() {
    //   if (($(this).prop("checked"))) {
    //     freqPt = $(this).val()
    //   }
    // })
    // $('.scoreCardBoxOpen').each(function() {
    //   if (($(this).prop("checked"))) {
    //     freqOpen = $(this).val()
    //   }
    // })

    document.dispatchEvent(new CustomEvent('requestDash', {detail: {
      name: "dashboard",
      type: "openHrs",
      clinic: kgClinic,
      date: msgDate,
      dow: dow
    }
     }));
     document.dispatchEvent(new CustomEvent('requestDash', {detail: {
       name: "dashboard",
       type: "ptExp",
       clinic: kgClinic,
       date: msgDate
     }
      }));

      for (var i = 0; i < 3; i++) {

        document.dispatchEvent(new CustomEvent('requestDash', {detail: {
          name: "dashboard",
          type: "scoreCard",
          clinic: kgClinic,
          date: msgDate,
          count: i
        }
       }));
     }
       document.dispatchEvent(new CustomEvent('requestDash', {detail: {
         name: "dashboard",
         type: "ptExpTrend",
         clinic: kgClinic,
         date: msgDate
       }
        }));
        document.dispatchEvent(new CustomEvent('requestDash', {detail: {
          name: "dashboard",
          type: "openHrsTrend",
          clinic: kgClinic,
          date: msgDate,
          dow: dow
        }
         }));
         document.dispatchEvent(new CustomEvent('requestDash', {detail: {
           name: "dashboard",
           type: "ptOntime",
           clinic: kgClinic,
           date: msgPtDate,
           dow: dow
         }
          }));
  }

  var storeOpenValues = []
  var storeOpenDates = []
  var storeOpenHrsGoal = null

  function disperseData(data) {
    var type = data.msgtype
    var trendType = ""
    if (type != "scoreCard") {
        var info = JSON.parse(data.msgdata)
    }
    var onGoal = " <i class=\"glyphicon glyphicon-ok-circle\" style=\"color:green\"></i>"
    var offGoal = " <i class=\"glyphicon glyphicon-remove-circle\" style=\"color:red\"></i>"
    var belowGoal = " <i class=\"glyphicon glyphicon-circle-arrow-down\" style=\"color:yellow\"></i>"
    var aboveGoal = " <i class=\"glyphicon glyphicon-circle-arrow-up\" style=\"color:red\"></i>"

    if (type == "ptExp") {

      var ptDate = $('input[name="datePicker"]').val()
      var dateDow = new Date(ptDate).getWeekDay()
      $('#ptDate').html(dateDow + " " + ptDate)
      $('#ptBlank').html("&nbsp")

      var onTime = info[0].metrics[0].entityPercent
      var onTimeTx = info[0].metrics[0].entityNumerator
      var early = info[0].metrics[1].entityPercent
      var earlyTx = info[0].metrics[1].entityNumerator
      var late = info[0].metrics[2].entityPercent
      var lateTx = info[0].metrics[2].entityNumerator
      var minutes = info[0].metrics[3].entityPercent
      var minutesTx = info[0].metrics[3].entityNumerator
      var tpns = info[0].metrics[4].entityPercent
      var tpnsTx = info[0].metrics[4].entityNumerator
      var totalTx = info[0].metrics[0].entityDenominator

      var goalTx = Math.ceil(totalTx * .75)

      $('#onTime').html(onTime+"%")
      $('#early').html(early+"%")
      $('#late').html(late+"%")
      $('#minutes').html(minutes+"%")
      $('#tpns').html(tpns+"%")
      $('#onTimeTx').html(onTimeTx)
      $('#earlyTx').html(earlyTx)
      $('#lateTx').html(lateTx)
      $('#minutesTx').html(minutesTx)
      $('#tpnsTx').html(tpnsTx)
      $('#totalTx').html(totalTx)
      $('#onTimeTx').prop('title', 'On Time Tx Needed: ' + goalTx)

      if (onTime >= 75) {
        $('#onTime'+[i]).append(onGoal)
      }
      else {
        $('#onTime'+[i]).append(offGoal)
      }

    }
    else if (type == "openHrs") {
      $('#openCloseBlank').html('&nbsp;')
      var blockGoal = info[0].metrics[0].targetmaxvalue
      var balanceGoal = info[0].metrics[0].targetminvalue
      var openHrs1 = info[0].metrics[0].metricValue
      var openHrs2 = info[0].metrics[1].metricValue
      var openHrs3 = info[0].metrics[2].metricValue
      var date1 = info[0].metrics[0].metricDt
      var date2 = info[0].metrics[1].metricDt
      var date3 = info[0].metrics[2].metricDt
      var closeHrs1 = info[1].metrics[0].metricValue
      var closeHrs2 = info[1].metrics[1].metricValue
      var closeHrs3 = info[1].metrics[2].metricValue
      var totalHrs1 = info[2].metrics[0].metricValue
      var totalHrs2 = info[2].metrics[1].metricValue
      var totalHrs3 = info[2].metrics[2].metricValue
      openHrs = [openHrs1, openHrs2, openHrs3]
      var dow1 = new Date(date1).getWeekDay()
      var dow2 = new Date(date2).getWeekDay()
      var dow3 = new Date(date3).getWeekDay()

      storeOpenHrsGoal = blockGoal

      $('#blockGoal').html(blockGoal)
      $('#balanceGoal').html(balanceGoal)
      $('#openHrs0').html(openHrs1)
      $('#date1').html(date1)
      $('#openHrs1').html(openHrs2)
      $('#date2').html(date2)
      $('#openHrs2').html(openHrs3)
      $('#date3').html(date3)
      $('#dow1').html(dow1)
      $('#dow2').html(dow2)
      $('#dow3').html(dow3)
      $('#closeHrs1').html(closeHrs1)
      $('#closeHrs2').html(closeHrs2)
      $('#closeHrs3').html(closeHrs3)
      $('#totalHrs1').html(totalHrs1)
      $('#totalHrs2').html(totalHrs2)
      $('#totalHrs3').html(totalHrs3)
      for (var i = 0; i < openHrs.length; i++) {
        if ((openHrs[i]*1) >= (balanceGoal*1) && (openHrs[i]*1) <= (blockGoal*1)) {
          $('#openHrs'+[i]).append(onGoal)
        }
        else if ((openHrs[i]*1) > (blockGoal*1)) {
          $('#openHrs'+[i]).append(offGoal)
          $('#openHrs'+[i]).append(aboveGoal)
        }
        else if ((openHrs[i]*1) < (balanceGoal*1)) {
          $('#openHrs'+[i]).append(belowGoal)
        }
      }
    }
    else if (type == "scoreCard") {
      var count = ""
      var rpt_count = 1
      if (data.msgcount == 0) {
        count = ""
      }
      else if (data.msgcount == 1){
        count = "1"
        rpt_count = 2
      }
      else {
        count = "2"
        rpt_count = 3
      }
      //console.log(data.msgdata)
      if (count == 2) {
        $('#scBlank').html('&nbsp;')
      }
      var addOne = 0
      if ($(data.msgdata).find('select[name="report_name"] option').eq(1).text() == "") {
        addOne = 1
      }
      var reportName = $(data.msgdata).find('select[name="report_name"] option').eq(rpt_count + addOne).text().split('_')
      // console.log(reportName);
      $('#scPPE'+count).html(reportName[0])
      var dataTable = $(data.msgdata).find('.data_tbl tbody tr').each(function(i) {
        if (i == 4) {
          //30 Mins
          $(this).find('td').each(function(i) {
            if (i == 2) {
              var sc30minMWF = $(this).text()
              $('#sc30minMWF'+count).html(sc30minMWF)
              if (sc30minMWF == "") {
                $('#sc30minMWF'+count).html("&nbsp;")
              }
            }
            else if (i == 3) {
              var sc30minMWFDetail = $(this).text()
              var sc30minMWFDetails = sc30minMWFDetail.split(") ")
              sc30minMWFDetail = sc30minMWFDetails.join(')\n')
              $('#sc30minMWF'+count).prop('title',sc30minMWFDetail)
            }
            else if (i == 4) {
              var sc30minTTS = $(this).text()
              $('#sc30minTTS'+count).html(sc30minTTS)
              if (sc30minTTS == "") {
                $('#sc30minTTS'+count).html("&nbsp;")
              }
            }
            else if (i == 5) {
              var sc30minTTSDetail = $(this).text()
              var sc30minTTSDetails = sc30minTTSDetail.split(") ")
              sc30minTTSDetail = sc30minTTSDetails.join(')\n')
              $('#sc30minTTS'+count).prop('title',sc30minTTSDetail)
              $('#sc30minGoal').html('> 90%')
            }
          })
        }
        else if (i == 6) {
          //Pt Exp
          $(this).find('td').each(function(i) {
            if (i == 1) {
              var scPtExp = $(this).text()
              $('#scPtExp'+count).html(scPtExp)
              $('#scPtGoal').html('75%')
            }
          })
        }
        else if (i == 8) {
          //Staff Exp
          $(this).find('td').each(function(i) {
            if (i == 1) {
              var scStaffExp = $(this).text()
              $('#scStaffExp'+count).html(scStaffExp)
              $('#scStaffGoal').html('80%')
            }
          })
        }
        else if (i == 10) {
          //N/A Chairs
          $(this).find('td').each(function(i) {
            //each cell
          })
        }
        else if (i == 11) {
          //Open Chairs
          $(this).find('td').each(function(i) {
            if (i == 2) {
              var scOpenChairMWF = $(this).text()
              $('#scOpenChairMWF'+count).html(scOpenChairMWF)
              if (scOpenChairMWF == "") {
                $('#scOpenChairMWF'+count).html("&nbsp;")
              }
            }
            else if (i == 4) {
              var scOpenChairTTS = $(this).text()
              $('#scOpenChairTTS'+count).html(scOpenChairTTS)
              $('#scOpenChairGoal').html('> 0')
              if (scOpenChairTTS == "") {
                $('#scOpenChairTTS'+count).html("&nbsp;")
              }
            }
          })
        }
        else if (i == 13) {
          //Open Hours
          $(this).find('td').each(function(i) {
            if (i == 1) {
              var scOpenHrs = $(this).text()
              $('#scOpenHrs'+count).html(scOpenHrs)
            }
            else if (i == 6) {
              var scOpenHrsGoal = $(this).text()
              $('#scOpenHrsGoal').html(scOpenHrsGoal)
            }
          })
        }
        else if (i == 14) {
          //>75 Minutes
          var percentDecMWF = ""
          var percentDecTTS = ""
          $(this).find('td').each(function(i) {
            if (i == 2) {
              var sc75minMWF = $(this).text()
              percentDecMWF = sc75minMWF.split('%')
              percentDecMWF = (100 - (percentDecMWF[0]*1))
              $('#sc75minMWF'+count).html(sc75minMWF)
              if (sc75minMWF == "") {
                $('#sc75minMWF'+count).html("&nbsp;")
              }
            }
            else if (i == 3) {
              var sc75minMWFDetail = $(this).text()
              var sc75minMWFDetails = sc75minMWFDetail.split(") ")
              var sc75minSizeMWF = sc75minMWFDetails.length
              var goalTurnMWF = Math.floor((sc75minSizeMWF/(percentDecMWF*.01)) - ((sc75minSizeMWF/(percentDecMWF*.01))*.85))
              sc75minMWFDetail = sc75minMWFDetails.join(')\n')
              sc75minMWFDetail = sc75minMWFDetail + '\n\nTotal: '+sc75minSizeMWF+' Turnovers >75 mins'
              sc75minMWFDetail = sc75minMWFDetail + '\nGoal: <= '+goalTurnMWF+ ' Turnovers >75 mins'
              $('#sc75minMWF'+count).prop('title',sc75minMWFDetail)
            }
            else if (i == 4) {
              var sc75minTTS = $(this).text()
              percentDecTTS = sc75minTTS.split('%')
              percentDecTTS = (100 - (percentDecTTS[0]*1))
              $('#sc75minTTS'+count).html(sc75minTTS)
              if (sc75minTTS == "") {
                $('#sc75minTTS'+count).html("&nbsp;")
              }
            }
            else if (i == 5) {
              var sc75minTTSDetail = $(this).text()
              var sc75minTTSDetails = sc75minTTSDetail.split(") ")
              var sc75minSizeTTS = sc75minTTSDetails.length
              var goalTurnTTS = Math.floor((sc75minSizeTTS/(percentDecTTS*.01)) - ((sc75minSizeTTS/(percentDecTTS*.01))*.85))
              sc75minTTSDetail = sc75minTTSDetails.join(')\n')
              sc75minTTSDetail = sc75minTTSDetail + '\n\nTotal: '+sc75minSizeTTS+' Turnovers >75 mins'
              sc75minTTSDetail = sc75minTTSDetail + '\nGoal: <= '+goalTurnTTS+ ' Turnovers >75 mins'
              $('#sc75minTTS'+count).prop('title',sc75minTTSDetail)
              $('#sc75minGoal').html('> 85%')
            }
          })
        }
        else if (i == 16) {
          //OT Hours
          $(this).find('td').each(function(i) {
            if (i == 1) {

            }
          })
        }
        else if (i == 17) {
          //OT Percentage
          $(this).find('td').each(function(i) {
            if (i == 1) {

            }
          })
        }
        // console.log($(this).find('td:eq(3)').text())
      })
    }
    else if (type == "ptExpTrend") {
      var ptExpValues = []
      var ptExpDates = []
      var trendColors = []
      $(info).each(function(i) {
        var ptTrends = $(this)[0].metricTrends
        $(ptTrends).each(function() {
          if (i == 0) {
            var ptExpValue = $(this)[0].metricValue
            if (ptExpValue) {
              ptExpValues.push($(this)[0].metricValue)
              ptExpDates.push($(this)[0].metricDt)
              if ($(this)[0].metricValue >= 75) {
                trendColors.push("rgba(0, 153, 0, 0.6)")
              }
              else {
                trendColors.push("rgba(255, 0, 0, 0.6)")
              }
            }
          }
        })
      })
      trendType = "ptExp"
      insertTrends(trendType,ptExpValues,ptExpDates,trendColors)
    }
    else if (type == "openHrsTrend") {
      var openValues = []
      var openDates = []
      var ptExpValues = []
      var storeOpenGoals = []
      var openHrsTrendColors = []
      $(info).each(function(){
        openValues.push($(this)[0].metricValue)
        openDates.push($(this)[0].metricdt)
      })
      trendType = "openTrend"
      storeOpenDates = openDates
      storeOpenValues = openValues
      insertTrends(trendType,openValues,openDates)

      for (var i = 0; i < storeOpenValues.length; i++) {
        storeOpenGoals.push(storeOpenHrsGoal)
        storeOpenValues[i]

        if ((storeOpenValues[i]*1) <= storeOpenHrsGoal) {
          openHrsTrendColors.push("rgba(0, 153, 0, 0.6)")
        }
        else {
          openHrsTrendColors.push("rgba(255, 0, 0, 0.6)")
        }
      }
        ($('.dropdown-toggle').first().text().trim() == "Mon / Wed / Fri") ? $('#openTrendBox h4').html('Open Trend ' + dow) : $('#openTrendBox h4').html('Open Trend ' + dow);

        trendType = "openTrend"
        insertTrends(trendType,storeOpenValues,storeOpenDates,openHrsTrendColors,storeOpenGoals)

    }
    else if (type == "ptOntime") {
      $('.pcard-accomodations').hide()
      $('.actualsKg').remove()
      $('.timebox').css("background-color", "")
      $('<div class="actualsKg" style="font-size:.85em;color:blue">Actual patient on times below in blue for ' + info[0].treatmentDate + '</div>').insertAfter('fsw-productivity-dashboard')
      var forEach = function(array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
          callback.call(scope, i, array[i]); // passes back stuff we need
        }
      };

      //scraping more data from angular
      var patientCardsKg = angular.element(document.querySelectorAll('fsw-patient-schedule-card'));
      forEach(patientCardsKg, function(index, value) {
        //console.log(value);
        var ptData = $(value).data();
        if (ptData) {
          if (ptData.$fswPatientScheduleCardController.patient) {
            ptMRN = ptData.$fswPatientScheduleCardController.patient.MEDICALRECORDNUMBER
            $(info).each(function() {
              if (this.mrn) {
                if (this.mrn == ptMRN) {

                  if (this.actualStartTime) {
                    var ptStartTime = $(value).eq(0).find('.timebox').eq(0).find('input').val()
                    var actualStartTime = (this.actualStartTime).slice(-5)
                    var ptStartMins = hourstomins(ptStartTime)
                    var ptActualStartMins = hourstomins(actualStartTime)
                    var actualStartTimeDiff = ptActualStartMins - ptStartMins
                    // console.log(actualStartTimeDiff);
                    if (actualStartTimeDiff > 15 || actualStartTimeDiff < -15 ) {
                      var color = "red"
                    }
                    else {
                      var color = "green"
                    }
                    var actualDiv = '<div class="timebox actualsKg"><span class="pcard-time-off actualsKg" style="font-size:.85em;color:blue">'+actualStartTime+'</span></div>' +
                    '<div class="timebox actualsKg"><span class="pcard-time-off actualsKg" style="font-size:.85em;color:'+color+'">'+actualStartTimeDiff+' min(s)</span></div>'

                    $(value).find('.pcard-bottom-row > .timebox:nth-child(2)').after(actualDiv)
                  }
                }
              }
            })
          }
        }
      });
    }
  }

function minusDate() {
  var previousKg = new Date($('input[name="datePicker"]').val());
  previousKg.setDate(previousKg.getDate() - 1);
  if (previousKg.getWeekDay() == "Sun") {
    previousKg.setDate(previousKg.getDate() - 1);
  }
  $('input[name="datePicker"]').val(getSlashDate(previousKg))
}
function plusDate() {
  var nextKg = new Date($('input[name="datePicker"]').val());
  nextKg.setDate(nextKg.getDate() + 1);
  if (nextKg.getWeekDay() == "Sun") {
    nextKg.setDate(nextKg.getDate() + 1);
  }
  $('input[name="datePicker"]').val(getSlashDate(nextKg))
}
function minusPtDate() {
  var previousKg = new Date($('input[name="datePicker"]').val());
  previousKg.setDate(previousKg.getDate() - 1);
  if (previousKg.getWeekDay() == "Sun") {
    previousKg.setDate(previousKg.getDate() - 1);
  }
  return getSlashDate(previousKg)
}

function clearDashPanel() {
  $('.ezDash').html("&nbsp;")
}

Date.prototype.getWeekDay = function() {
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekday[this.getDay()];
}

var expChart = null

function insertTrends(trendType, trendValues,trendDates,trendColors, trendGoals) {
  var ctx = null
  var label = ""

    if (trendType == "ptExp") {
      if (!(trendGoals)) {
        trendGoals = [75,75,75,75,75,75,75,75,75,75,75,75]
      }

      if ($('#ptExpChart').is(':visible')) {
        $('#ptExpChart').remove()
        var $div4 = $('<canvas id="ptExpChart" width="250" height="250"></canvas>')
        $div4.appendTo($('div#ptTrendBox'));
      }
      else {
        var $div4 = $('<canvas id="ptExpChart" width="250" height="250"></canvas>')
        $div4.appendTo($('div#ptTrendBox'));
      }
      ctx = document.getElementById('ptExpChart').getContext('2d');
      label = "% On Time"
    }

    if (trendType == "openTrend") {
      if ($('#openChart').is(':visible')) {
        $('#openChart').remove()
        var $div4 = $('<canvas id="openChart" width="250" height="250"></canvas>')
        $div4.appendTo($('div#openTrendBox'));
      }
      else {
        var $div4 = $('<canvas id="openChart" width="250" height="250"></canvas>')
        $div4.appendTo($('div#openTrendBox'));
      }
      ctx = document.getElementById('openChart').getContext('2d');
      label = "Avg Open Hours"
    }

    expChart = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: [{
              label: label,
              data: trendValues,
              backgroundColor: trendColors
          },
          {
              pointRadius: 0,
              label: "Goal",
              data: trendGoals,
              borderColor: "rgba(0, 153, 0, 0.8)",
              backgroundColor: "rgba(0, 153, 0, 0.8)",
              borderWidth: 2
          }
        ],
          labels: trendDates,
      },
      options: {
          elements: {
              line: {
                  borderColor: "rgba(0, 102, 255,0.5)",
                  borderWidth: 1
              },
              point: {
                  radius: 5
              }
          },
          scales: {
              y: {
                  beginAtZero: false
              }
          }
      }
  });
}

function addTrends() {
  var $div4 = $('<div class="row" id="scoreCardTrendRow">' +
      '<div class="col-xs-4" style="text-align:center;" id="ptTrendBox"><h4>Patient Experience Trend</h4>' +
        '</div>' +
        '<div class="col-xs-4" style="text-align:center;" id="openTrendBox"><h4>Open Trend</h4>' +
      '</div>' +
      '<div class="col-xs-4" style="text-align:center;" id="scTrendBox"><h4>&nbsp;</h4>' +
      '</div>' +
      '</div>')
  $div4.insertAfter($('div#scoreCardRow2'));
}

function addMultiSC() {
  $('#scorecardBox').remove()

  var $div = ('<div class="col-xs-4" id="scorecardBox" style="text-align:center;"><h4>Score Card</h4>' +
      '<div class="row grid-space">' +
          '<div class="col-xs-3 grid-right grid-padding"></div>' +
          '<div id="scPPE" class="ezDash col-xs-9 grid-border grid-grey grid-padding" style="text-align: center">&nbsp;</div>' +
      '</div>' +
      '<div class="row grid-space">' +
          '<div class="col-xs-3 grid-right grid-padding"></div>' +
          '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">MWF</div>' +
          '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">TTS</div>' +
          '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">MWF</div>' +
          '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">TTS</div>' +
          '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">MWF</div>' +
          '<div id="" class="col-xs-1 grid-border grid-grey grid-padding" style="text-align: center">TTS</div>' +
          '<div id="" class="col-xs-3 grid-border grid-grey grid-padding" style="text-align: center">Goal</div>' +
      '</div>' +
      '<div class="row grid-space grid-grey" style="">' +
        '<div class="col-xs-3 grid-right grid-padding">< 30 Min %</div>' +
        '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="sc30minMWF" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="sc30minTTS" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-5 grid-border grid-grey-light grid-padding" id="sc30minGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
      '</div>' +
      '<div class="row grid-space grid-grey" style="">' +
        '<div class="col-xs-3 grid-right grid-padding">Patient Exp</div>' +
        '<div class="ezDash col-xs-4 grid-border grid-grey-light grid-padding" id="scPtExp" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-5 grid-border grid-grey-light grid-padding" id="scPtGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
      '</div>' +
      '<div class="row grid-space grid-grey" style="">' +
        '<div class="col-xs-3 grid-right grid-padding">Staff Exp</div>' +
        '<div class="ezDash col-xs-4 grid-border grid-grey-light grid-padding" id="scStaffExp" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-5 grid-border grid-grey-light grid-padding" id="scStaffGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
      '</div>' +
      '<div class="row grid-space grid-grey" style="">' +
        '<div class="col-xs-3 grid-right grid-padding">Open Chairs</div>' +
        '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scOpenChairMWF" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="scOpenChairTTS" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-5 grid-border grid-grey-light grid-padding" id="scOpenChairGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
      '</div>' +
      '<div class="row grid-space grid-grey" style="">' +
        '<div class="col-xs-3 grid-right grid-padding">Open Hrs</div>' +
        '<div class="ezDash col-xs-4 grid-border grid-grey-light grid-padding" id="scOpenHrs" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-5 grid-border grid-grey-light grid-padding" id="scOpenHrsGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
      '</div>' +
      '<div class="row grid-space grid-grey" style="">' +
        '<div class="col-xs-3 grid-right grid-padding">> 75 Min %</div>' +
        '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="sc75minMWF" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-2 grid-border grid-grey-light grid-padding" id="sc75minTTS" style="text-align: center">&nbsp;</div>' +
        '<div class="ezDash col-xs-5 grid-border grid-grey-light grid-padding" id="sc75minGoal" style="text-align: center;color: #8c8c8c">&nbsp;</div>' +
      '</div>' +
  '</div>')
  $('#scoreCardRow2').append($div)

}

function hourstomins(time) {
      var sTime = new Date();
      splitTime = time.split(":");
      sTime.setHours(splitTime[0], splitTime[1], 0);
      var minsconverted = (sTime.getHours() * 60) + sTime.getMinutes();
      return minsconverted
}

function exportData(){
  var data = "Name,Age,Gender\nJohn,30,Male\nJane,25,Female";
  var blob = new Blob([data], { type: 'text/csv' });
  var file = new File([blob], "data.csv", { type: 'text/csv' });
  var url = URL.createObjectURL(file);
  var a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

//Prep for turnover check
//list each turnover time below
function checkTurnovers() {
  var start1 = ""
  var start2 = ""
  var end1 = ""
  var previousTimebox = ""
  var turnovers = 0
  var longTurns = 0

  $('.pcard-accomodations').hide()
  $('.actualsKg').remove()
  $('.timebox').css("background-color", "")

  $('.timebox').each(function(i) {
      if(typeof($(this).find('.time-entry form input').val()) != "undefined"){
        start1 = start2
        start2 = hourstomins($(this).find('.time-entry form input').val())
        var turnoverTime = start2 - end1
        if (turnoverTime >= 0) {
          if (turnoverTime > 75 && i > 1) {
            turnovers = turnovers + 1
            longTurns = longTurns + 1
            $(this).css('backgroundColor', 'pink')
            $(previousTimebox).css('backgroundColor', 'pink')
            var turnDiv = '<div class="actualsKg"><span class="actualsKg" style="font-size:.85em;color:red; margin: 2px 2px 0px 2px; padding: 0px 8px;">'+turnoverTime+' mins turnover</span></div>'
            $(previousTimebox).after(turnDiv)
          }
          else {
            if ( i > 1) {
              turnovers = turnovers + 1
            }
            var turnDiv = '<div class="actualsKg"><span class="actualsKg" style="font-size:.85em;color:black; margin: 2px 2px 0px 2px; padding: 0px 8px;">'+turnoverTime+' mins turnover</span></div>'
            $(previousTimebox).after(turnDiv)
          }
        }
      }
      else {
          end1 = hourstomins($(this).text().trim())
          //console.log(end1)
      }
      previousTimebox = $(this)
  })
}

function changeStart(numMins) {
  var start1 = ""
  var start2 = ""
  var end1 = ""
  var previousTimebox = ""
  var turnovers = 0
  var longTurns = 0

  $('.pcard-accomodations').hide()
  $('.actualsKg').remove()
  $('.timebox').css("background-color", "")

  $('.timebox').each(function(i) {
      if(typeof($(this).find('.time-entry form input').val()) != "undefined"){
        start1 = hourstomins($(this).find('.time-entry form input').val())
        var newStartMins = numMins
        newStartTime = start1 + newStartMins
        newStartTime = convertMinsToHrsMins(newStartTime)
        var turnDiv = '<div class="actualsKg"><span class="actualsKg" style="font-size:.85em;color:red; margin: 2px 2px 0px 2px; padding: 0px 8px;">'+newStartTime+' new start</span></div>'
        $(this).after(turnDiv)
      }
  })
}


function createLetters() {
  // define variables
  const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
  };
  const rawDate = document.getElementById("letterDate");
  const dateParts = rawDate.value.split("-"); // split the date string into its components
  const selectedDate = new Date(
    parseInt(dateParts[0]), // year
    parseInt(dateParts[1]) - 1, // month (subtract 1 because months are 0-indexed in JavaScript)
    parseInt(dateParts[2]) // day
  );
  var clinicNum = $('fsw-pod-schedule').data().$fswPodScheduleController.selectedCenter.CENTERDISPLAYNAME
  var initialDow = $('fsw-pod-schedule').data().$fswPodScheduleController.selectedDaySet.label
  var mainDow = initialDow.replace(/\//g, "-")
  var rows = [];
  var date = selectedDate;
  date = date.toLocaleString('en-US', options).replace(',', '');
  rows.push(["name", "time", "DOW", "date"])
  // loop through each element on the page
  $('fsw-patient-schedule-card').each(function() {
    if($(this).data().$fswPatientScheduleCardController.patient){
        var name = toProperCase($(this).data().$fswPatientScheduleCardController.patient.PATIENTLOBBYNAME)
    }
    if ($(this).data().$fswPatientScheduleCardController.patient) {
        var rawTime = $(this).data().$fswPatientScheduleCardController.patient.STARTTIME
        var standardTime = militaryToStandardTime(rawTime);
        var time = '"' + standardTime + '"'; // add quotes to the string and comma to separate values
    }
    if($(this).data().$fswPatientScheduleCardController.patientDetail){
        var dowStart = $(this).data().$fswPatientScheduleCardController.patientDetail.SCHEDULEDAYS
        DOW = dowStart.replace(/M/g, "Monday").replace(/W/g, "Wednesday").replace(/F/g, "Friday").replace(/T(?!\w)/g, "Tuesday").replace(/Th/g, "Thursday").replace(/S(?!\w)/g, "Saturday").replace(/\//g, "/");
    }

    // check if name is defined
    if (name !== "") {
      rows.push([name, time, DOW, date]);
    }
  });

  // create CSV file
  var csvContent = "data:text/csv;charset=utf-8,"
    + rows.map(row => row.join(",")).join("\n");

  // create download link
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  var fileName = (clinicNum + "-" + mainDow + "-Letters.csv").replace(/\s+/g, '')
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
}

function militaryToStandardTime(militaryTime) {
  var timeArr = militaryTime.split(":");
  var hour = parseInt(timeArr[0]);
  var minute = timeArr[1];
  var timePeriod = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? (hour < 10 ? hour : hour) : 12;

  return hour + ":" + minute + " " + timePeriod;
}

function toProperCase(str) {
  return str.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function runningGraph() {
  d3.select("svg#ptRunningSvg").selectAll("*").remove();
  var svg = d3.select("svg#ptRunningSvg"),
      margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear()
          .range([0, width]);

      var y = d3.scaleLinear()
          .rangeRound([height, 0]);

      var y2 = d3.scaleLinear()
          .rangeRound([height, 0])


      var formatTime = d3.timeFormat("%H:%M");
      var formatHour = d3.timeFormat("%H");

      data = getPtData()


// ------------------------------------------------------
      function isNonZeroRecord(record) {
          return record.ptCount !== 0 || record.staffCount !== 0 || record.supportCount !== 0;
      }

      // Preprocess data to remove zero values from the front and end
      let firstNonZeroIndex = data.findIndex(isNonZeroRecord);
      let lastNonZeroIndex = data.length - 1 - data.slice().reverse().findIndex(isNonZeroRecord);

      // Keep the record 1 hour before the first non-zero
      firstNonZeroIndex = Math.max(0, firstNonZeroIndex - 4); // Assuming 15 min intervals, 4 records make 1 hour
      // Keep the record 1 hour after the last non-zero
      lastNonZeroIndex = Math.min(data.length - 1, lastNonZeroIndex + 4); // Assuming 15 min intervals, 4 records make 1 hour

      // Store the number of items trimmed from the beginning
      let trimCount = firstNonZeroIndex;

      // Filter the data
      data = data.slice(firstNonZeroIndex, lastNonZeroIndex + 1);

// -----------------------------------------------------------

      x.domain([0, data.length]);
      y.domain([0, d3.max(data, function(d) {
          return Math.max(d.ptCount, d.supportCount, d.staffCount);
      })]);

      var pctLineData = data.map(function(d, i) {
          return {x: i, y: d.staffCount}; // replace `someProperty` with the relevant property
      });

      var rnLineData = data.map(function(d, i) {
          return {x: i, y: d.supportCount}; // replace `someProperty` with the relevant property
      });

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .ticks(data.length) // 124 ticks for 124 data points
            .tickFormat(function(d) {
              return (d + trimCount) % 4 === 0 ? ((d + trimCount) / 4) % 24 : "";
            })
        );

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y)
              .ticks(d3.max(data, function(d) { return d.ptCount; }))
              .tickFormat(function(d) {
                  return d % 2 ? "" : d;
              }));

      var barWidth = width / data.length;

      g.selectAll(".bar")
          .data(data)
          .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d,i) {return x(i)})
              .attr("y", function(d) { return y(d.ptCount); })
              .attr("width", barWidth)
              .attr("height", function(d) { return Math.max(0, height - y(d.ptCount)); })
              .append("title")
              .text(function(d, i) {
                  // Extract the values for RNs and PCTs at the same index from their respective datasets
                  var ratioRNs = d.supportCount;
                  var ratioPCTs = d.staffCount;

                  var rnRatio = d.ptCount / ratioRNs;
                  var pctRatio = d.ptCount / ratioPCTs;

                  // Only keep 1 digit after decimal if the fractional part is non-zero
                  rnRatio = (rnRatio % 1 !== 0) ? rnRatio.toFixed(1) : Math.floor(rnRatio);
                  pctRatio = (pctRatio % 1 !== 0) ? pctRatio.toFixed(1) : Math.floor(pctRatio);


                  // Add 's' if the value is not equal to 1
                  var ptSuffix = (d.ptCount !== 1) ? "s" : "";
                  var rnSuffix = (ratioRNs !== 1) ? "s" : "";
                  var pctSuffix = (ratioPCTs !== 1) ? "s" : "";

                  return d.time + "\n" +
                        d.ptCount + " Patient" + ptSuffix + "\n" +
                        ratioRNs + " RN" + rnSuffix + " - 1:" + rnRatio + " Ratio\n" +
                        ratioPCTs + " PCT" + pctSuffix + " - 1:" + pctRatio + " Ratio";
              });

      var line = d3.line()
          .x(function(d) { return x(d.x); }) // Scale x using the x scale.
          .y(function(d) { return y(d.y); }) // Scale y using the y scale.
          .curve(d3.curveStepAfter);

      // Add the line
      g.append("path")
          .datum(pctLineData)
          .attr("fill", "none")
          .attr("stroke", "green")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1)
          .attr("d", line);

      g.append("path")
          .datum(rnLineData)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1)
          .attr("d", line);

    g.append("text")
      .attr("transform", "translate(" + (width/2) + " ," + (-margin.top / 2) + ")")
      .style("text-anchor", "middle")
      .text("Patients On");
}

function getPtData() {
          // Assuming your data is in this format
        var ptData = $('clinic-workflow-chart').data().$clinicWorkflowChartController.patientData;
        var staffData = $('clinic-workflow-chart').data().$clinicWorkflowChartController.staffData;

        // Toggle to exclude 'Open Chair'
        var excludeOpenChair = true; // Set to false if you don't want to exclude 'Open Chair'

        // Function to convert HH:mm format to minutes
        function timeToMinutes(time) {
            var [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
        }

        // 31 hours in minutes
        var totalMinutes = 31 * 60;
        var result = [];

        // Iterate through every 15 minutes
        for (var i = 0; i < totalMinutes; i += 15) {
            var ptCount = 0;
            var ptNames = [];
            var staffCount = 0;
            var supportCount = 0;

            // Iterate through each patient data
            ptData.forEach(pt => {
                var ptStart = timeToMinutes(pt.STARTTIME);
                var ptEnd = ptStart + pt.DURATIONINMINUTES;

                // Check if the patient is 'Open Chair' and if it should be excluded
                if (excludeOpenChair && pt.FIRSTNAME === 'Open' && pt.LASTNAME === 'Chair') {
                    return;
                }

                // Check if the patient is on during this 15 minutes interval
                if (i >= ptStart && i < ptEnd) {
                    ptCount++;
                    ptNames.push(pt.FIRSTNAME + " " + pt.LASTNAME);
                }
            });

            // Iterate through each staff data
            staffData.staff.forEach(staff => {
                var staffStart = timeToMinutes(staff.STARTTIME);
                var staffEnd = staffStart + staff.DURATIONINMINUTES;

                // Check if the staff is on during this 15 minutes interval
                if (i >= staffStart && i < staffEnd) {
                    staffCount++;
                }
            });

            // Iterate through each support data
            staffData.support.forEach(support => {
                var supportStart = timeToMinutes(support.STARTTIME);
                var supportEnd = supportStart + support.DURATIONINMINUTES;

                // Check if the support is on during this 15 minutes interval
                if (i >= supportStart && i < supportEnd) {
                    supportCount++;
                }
            });

            var hours = Math.floor(i / 60) % 24; // Using modulo 24 to revert back to 0 after 23
            var minutes = i % 60;
            var currentTime = String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0');

            result.push({
                xlabel: i / 15,
                time: currentTime,
                ptCount: ptCount,
                ptNames: ptNames,
                staffCount: staffCount,
                supportCount: supportCount
            });
        }
        return(result)
}
