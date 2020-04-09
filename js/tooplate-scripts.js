const width_threshold = 480;


function drawPieChart() {
  if ($("#pieChart").length) {
    ctxPie = document.getElementById("pieChart").getContext("2d");
    optionsPie = {
      responsive: true,
      maintainAspectRatio: false
    };

    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [4600, 5400],
            backgroundColor: [
              window.chartColors.orange,
              window.chartColors.green
            ],
            label: "Porcentajetomas"
          }
        ],
        labels: ["Tomas perdidas", "Tomas correctas"]
      },
      options: optionsPie
    };

    pieChart = new Chart(ctxPie, configPie);
  }
}

//...............????............
function updateChartOptions() {
  if ($(window).width() < width_threshold) {
    if (optionsPie) {
      optionsPie.maintainAspectRatio = false;
    }
  } else {
    if (optionsPie) {
      optionsPie.maintainAspectRatio = true;
    }
  }
}

function updatePieChart() {
  if (PieChart) {
    PieChart.options = optionsPie;
    PieChart.update();
  }
}

//.............?????...............


function reloadPage() {
  setTimeout(function() {
    window.location.reload();
  }); // Reload the page so that charts will display correctly
}



function drawCalendar() {
  if ($("#calendar").length) {
    $("#calendar").fullCalendar({
      height: 400,
      events: [
        {
          title: "Meeting",
          start: "2018-09-1",
          end: "2018-09-2"
        },
        {
          title: "Marketing trip",
          start: "2018-09-6",
          end: "2018-09-8"
        },
        {
          title: "Follow up",
          start: "2018-10-12"
        },
        {
          title: "Team",
          start: "2018-10-17"
        },
        {
          title: "Company Trip",
          start: "2018-10-25",
		  end: "2018-10-27"
        },
        {
          title: "Review",
          start: "2018-11-12"
        },
        {
          title: "Plan",
          start: "2018-11-18"
        }
      ],
      eventColor: "rgba(54, 162, 235, 0.4)"
    });
  }
}
