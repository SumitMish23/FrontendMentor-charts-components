// import { Chart as Chart, ArcElement, Tooltip, Legend, LinearScale } from 'chart.js';

//fetching the data from data.json
var dataAns = [];
async function getData() {
  const response = await fetch("data.json");
  const dataAns = await response.json();
  intializeChart(dataAns);
}
//intialising the chart
function intializeChart(dataAns) {
  const ctx = document.getElementById("myChart");
  let hoverIndex=-1;
  const barColors=[{
    active:'hsl(186, 34%, 70%)',
    inActive:'hsl(10, 79%, 65%)'}];
    
  new Chart(ctx, {
    type: "bar",
    options: {
      onHover:(e,i)=>{
          e.native.target.style.cursor="pointer";
          hoverIndex=i[0]?.index;
        },
      scales: {
        x: {
          grid: {
            display: false,
              },
        },
        y: {
         display:false
        },
      },
      animation: true,
      plugins: {
         legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
          caretSize:0,
         callbacks:{
          label:(()=> '$ ' + dataAns[hoverIndex].amount),
          title:(()=>'')
         },
          enabled: true,
          xAlign:'center',
          yAlign:'bottom',
        },
        datalabels: {
          display: false,
        },
      },
    },

    data: {
      display: false,
      labels: dataAns.map((val) => val.day),
      datasets: [
        {
          fill: false,
          label: false,
          data: dataAns.map((val) => val.amount),
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          hoverBackgroundColor:()=> [...Array(7)].map((v,barIndex)=>{
            console.log(hoverIndex,barIndex)
            if(barIndex == hoverIndex){
              console.log('i')
              return barColors[0].inActive;
            }
            return barColors[0].active;
          }),
        
        },
      ],
    },
  });
}

//call the functions
getData();
