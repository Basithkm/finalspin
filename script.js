    /* --------------- Spin Wheel  --------------------- */
    const spinWheel = document.getElementById("spinWheel");
    const spinBtn = document.getElementById("spin_btn");
    const text = document.getElementById("text");
    
    var firstinputElement = document.getElementById("first_prority");
    var first_prority = firstinputElement.value;
    
    var secondinputElement = document.getElementById("second_prority");
    var second_prority = secondinputElement.value;


    var thirdinputElement = document.getElementById("third_prority");
    var third_prority = thirdinputElement.value;

    var forthinputElement = document.getElementById("forth_prority");
    var forth_prority = forthinputElement.value;

    var fifthinputElement = document.getElementById("fifth_prority");
    var fifth_prority = fifthinputElement.value;

    var sixthinputElement = document.getElementById("sixth_prority");
    var sixth_prority = sixthinputElement.value;


    var seventhinputElement = document.getElementById("seventh_prority");
    var seventh_prority = seventhinputElement.value;

    var eighthinputElement = document.getElementById("eighth_prority");
    var eighth_prority = eighthinputElement.value;

    var nienthinputElement = document.getElementById("nienth_prority");
    var nienth_prority = nienthinputElement.value;

    var tenthinputElement = document.getElementById("tenth_prority");
    var tenth_prority = tenthinputElement.value;

    var eleventhinputElement = document.getElementById("eleventh_prority");
    var eleventh_prority = eleventhinputElement.value;

    var twelthinputElement = document.getElementById("twelth_prority");
    var twelth_prority = twelthinputElement.value;
    
    

    
    /* --------------- Minimum And Maximum Angle For A value  --------------------- */
    const spinValues = [
      { minDegree: 61, maxDegree: 90, value: third_prority },
      { minDegree: 31, maxDegree: 60, value: second_prority  },
      { minDegree: 0, maxDegree: 30, value: first_prority },
      { minDegree: 331, maxDegree: 360, value: twelth_prority  },
      { minDegree: 301, maxDegree: 330, value: eleventh_prority  },
      { minDegree: 271, maxDegree: 300, value: tenth_prority  },
      { minDegree: 241, maxDegree: 270, value: nienth_prority },
      { minDegree: 211, maxDegree: 240, value: eighth_prority  },
      { minDegree: 181, maxDegree: 210, value: seventh_prority },
      { minDegree: 151, maxDegree: 180, value: sixth_prority  },
      { minDegree: 121, maxDegree: 150, value:fifth_prority  },
      { minDegree: 91, maxDegree: 120, value: forth_prority  },
    ];
    /* --------------- Size Of Each Piece  --------------------- */
    const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    /* --------------- Background Colors  --------------------- */
    var spinColors = [
      "#E74C3C",
      "#7D3C98",
      "#2E86C1",
      "#138D75",
      "#F1C40F",
      "#D35400",
      "#138D75",
      "#F1C40F",
      "#b163da",
      "#E74C3C",
      "#7D3C98",
      "#138D75",
    ];
    
    
    /* --------------- Chart --------------------- */
    /* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
    let spinChart = new Chart(spinWheel, {
      plugins: [ChartDataLabels],
      type: "pie",
      data: {
        labels: [third_prority, second_prority, first_prority, twelth_prority, eleventh_prority, tenth_prority,nienth_prority, eighth_prority, seventh_prority, sixth_prority, fifth_prority, forth_prority],
        datasets: [
          {
            backgroundColor: spinColors,
            data: size,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: {
            display: false,
          },
          datalabels: {
            rotation: 90,
            color: "#ffffff",
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 24 },
          },
        },
      },
    });
    /* --------------- Display Value Based On The Angle --------------------- */
    const generateValue = (angleValue) => {
      for (let i of spinValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
          text.innerHTML = `<p>Congratulations, You Have Won ${i.value} ! </p>`;
          spinBtn.disabled = false;
          break;
        }
      }
    };
    /* --------------- Spinning Code --------------------- */
    let count = 0;
    let resultValue = 101;
    spinBtn.addEventListener("click", () => {
      spinBtn.disabled = true;
      text.innerHTML = `<p>Best Of Luck!</p>`;
      let randomDegree = Math.floor(Math.random() * (60 - 0 + 1) + 0);
      let rotationInterval = window.setInterval(() => {
        spinChart.options.rotation = spinChart.options.rotation + resultValue;
        spinChart.update();
        if (spinChart.options.rotation >= 360) {
          count += 1;
          resultValue -= 5;
          spinChart.options.rotation = 0;
        } else if (count > 15 && spinChart.options.rotation == randomDegree) {
          generateValue(randomDegree);
          clearInterval(rotationInterval);
          count = 0;
          resultValue = 101;
        }
      }, 10);
    });