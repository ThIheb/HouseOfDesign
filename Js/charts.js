document.addEventListener("DOMContentLoaded", async function (event) {
	console.log("Ready to start with phase 4");


  //Carica il file JSON locale
  fetch("Js/infoPhase4.json")
    .then(response => response.json())
    .then(data => {
        items = data.items
        console.log(items)
        for (var item of items) {
          var info = item.info
          countVals(usage, info.Usage)
          countVals(hist, info.History)
          countVals(designer, info.Designer)
          
        }
        console.log(usage.data)
        console.log(hist.data)
        console.log(designer.data)
        usgChart.update()
        hisChart.update()
        desChart.update()
      })
    .catch(error => console.error('Errore nel caricamento dei dati:', error));

});


var usage = {
  "labels":["Furniture","Lights", "Appliances", "Decoration"],
  "data":[0,0,0,0]
}
var hist = {
  "labels":["1950s","1960s","1970s","1980s","1990s"],
  "data":[0,0,0,0,0]
}
var designer = {
  "labels":["Marco Zanuso", "Ettore Jr. Sottsass", "Enzo Mari", "Vico Magistretti","Achille Castiglioni","Joe Colombo", "Pietro Geranzani"],
  "data":[0,0,0,0,0,0,0]
}

function countVals(obj, value) {
  const index = obj.labels.indexOf(value);
  if (index !== -1) {
    obj.data[index]++;
    console.log(`Dato aggiornato: ${obj.labels[index]} -> ${obj.data[index]}`);
  } else {
    console.error(`Valore "${value}" non trovato tra le etichette.`);
  }
}

// Usa i dati del JSON per creare il grafico
const ctx = document.getElementById('usg').getContext('2d');
const usgChart = new Chart(ctx, {
  type: 'doughnut', // Tipo di grafico
  data: {
    labels: usage.labels, // Etichette dal JSON
    datasets: [{
      label: 'usage',
      data: usage.data, // Dati dal JSON
      backgroundColor: ['rgb(214, 5, 78, 1)','rgb(214, 5, 78, 0.9)', 'rgb(214, 5, 78, 0.8)',
        'rgb(214, 5, 78, 0.7)'],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins:{
      legend:{
        position:"left",
        labels:{
          font:{
            family:"Poppins"
          }
        }
      },
      tooltip:{
        caretSize: 0,
        cornerRadius: 0,
        backgroundColor: "rgb(255, 255, 255, 0.6)",
        titleFont:{weight:'normal'},
        titleColor:"black",
        bodyColor:"black",
      }   
    },
  } 
});

const cty = document.getElementById('his').getContext('2d');

const hisChart = new Chart(cty, {
  type: 'doughnut', // Tipo di grafico
  data: {
    labels: hist.labels, // Etichette dal JSON
    datasets: [{
      label: 'history',
      data: hist.data, // Dati dal JSON
      backgroundColor: ['rgb(214, 5, 78, 1)','rgb(214, 5, 78, 0.9)', 'rgb(214, 5, 78, 0.8)',
        'rgb(214, 5, 78, 0.7)','rgb(214, 5, 78, 0.6)'],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins:{
      legend:{
        position:"left",
        labels:{
          font:{
            family:"Poppins"
          }
        }
      },
      tooltip:{
        caretSize: 0,
        cornerRadius: 0,
        backgroundColor: "rgb(255, 255, 255, 0.6)",
        titleFont:{weight:'normal'},
        titleColor:"black",
        bodyColor:"black",
      }   
    }
  }
});
const ctz = document.getElementById('des').getContext('2d');

const desChart = new Chart(ctz, {
  type: 'doughnut', // Tipo di grafico
  data: {
    labels: designer.labels, // Etichette dal JSON
    datasets: [{
      label: 'designer',
      data: designer.data, // Dati dal JSON
      backgroundColor: ['rgb(214, 5, 78, 1)','rgb(214, 5, 78, 0.9)', 'rgb(214, 5, 78, 0.8)',
        'rgb(214, 5, 78, 0.7)','rgb(214, 5, 78, 0.6)','rgb(214, 5, 78, 0.5)','rgb(214, 5, 78, 0.4)'],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins:{
      legend:{
        position:"left",
        labels:{
          font:{
            family:"Poppins"
          }
        }
      },
      tooltip:{
        caretSize: 0,
        cornerRadius: 0,
        backgroundColor: "rgb(0, 0, 0, 0.7)",
        titleFont:{weight:'normal'},
        titleColor:"white",
        bodyColor:"white",
      }   
    }
  }
  });



  let graph = document.querySelector("#graphs")
  const observerGraph = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        desChart.reset();
        desChart.update();
        usgChart.reset();
        usgChart.update();
        hisChart.reset();
        hisChart.update();
      }
    })
  });

  observerGraph.observe(graph)