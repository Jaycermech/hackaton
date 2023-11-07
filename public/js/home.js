function viewResources() {
  var response = "";
  var request = new XMLHttpRequest();
  request.open("GET", "/view-resources", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    var html = "";

    var categories = new Map();

    for (var b = 0; b < response.length; b++) {
      if (!categories.has(response[b].description))
        categories.set(response[b].description, 0);
    }

    console.log(categories);

    for (let [key, value] of categories) {
      console.log(key + " = " + value);
      for (var j = 0; j < response.length; j++) {
        if (response[j].description === key) {
          console.log(response[j].description);
          console.log(response[j].amount);
          value += parseFloat(response[j].amount);
          categories.set(key, parseFloat(value.toFixed(2))); // Convert the value to a float with two decimal points
          console.log("am i being run");
        }
      }
    }

    console.log(categories);
    displayPie(categories);

    for (let [key, value] of categories) {
      html += "<tr><td>" + key + "</td><td>$" + value + "</td></tr>";
    }
    document.getElementById("tableContent").innerHTML = html;
  };
  request.send();
}

function displayPie(data) {
  const expensesData = Array.from(data, ([category, amount]) => ({
    category,
    amount,
  }));

  const categories = expensesData.map((expense) => expense.category);
  const amounts = expensesData.map((expense) => expense.amount);

  const ctx = document.getElementById("expensesChart").getContext("2d");
  const expensesChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)", // Color for Utilities
            "rgba(54, 162, 235, 0.7)", // Color for Groceries
            "rgba(54, 162, 135, 0.7)",
            // Add more colors for other categories if needed
          ],
          // Include labels for each section
          labels: categories,
        },
      ],
    },
    options: {
      legend: {
        display: true,
        position: "right", // Adjust the position as needed
      },
    },
  });
}

function displayPie(data) {
  const expensesData = Array.from(data, ([category, amount]) => ({
    category,
    amount,
  }));

  const categories = expensesData.map((expense) => expense.category);
  const amounts = expensesData.map((expense) => expense.amount);

  // Function to generate diverse colors
  const generateDiverseColors = (numberOfColors) => {
    const colors = [];
    const goldenRatioConjugate = 0.618033988749895;
    const hueValues = [];
    for (let i = 0; i < numberOfColors; i++) {
      hueValues.push((i * goldenRatioConjugate) % 1);
    }
    for (let hue of hueValues) {
      const color = `hsl(${Math.floor(hue * 360)}, 70%, 60%)`;
      colors.push(color);
    }
    return colors;
  };

  const numberOfCategories = categories.length;

  // Generate diverse colors for each category
  const backgroundColors = generateDiverseColors(numberOfCategories);

  const ctx = document.getElementById("expensesChart").getContext("2d");
  const expensesChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: backgroundColors,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          color: "#fff", // Label text color
          anchor: "end", // Label position, 'end' will display the label outside the segment
          align: "start", // Label alignment
          formatter: (value, ctx) => {
            let label = ctx.chart.data.labels[ctx.dataIndex];
            return label + ": " + value + "%"; // Display category and value as label
          },
        },
      },
    },
  });
}

// function addResource() {
//   var response = "";
//   var jsonData = new Object();

//   var e = document.getElementById("ammenity_dropdown");
//   jsonData.description = e.value;
//   console.log(jsonData.description);

//   jsonData.amount = document.getElementById("amount").value;
//   console.log(jsonData.amount);
//   if (jsonData.name == "" || jsonData.description == "") {
//     document.getElementById("message").innerHTML = "All fields are required!";
//     document.getElementById("message").setAttribute("class", "text-danger");
//     return;
//   }
//   var request = new XMLHttpRequest();
//   request.open("POST", "/add-resource", true);
//   request.setRequestHeader("Content-Type", "application/json");
//   request.onload = function () {
//     response = JSON.parse(request.responseText);
//     console.log(response);
//     if (response.message == undefined) {
//       document.getElementById("message").innerHTML =
//         "Added Resource: " + jsonData.description + "!";

//       document.getElementById("amount").value = "";
//       // document.getElementById("description").value = "";
//       window.location.href = "home.html";
//       location.reload();
//     } else {
//       document.getElementById("message").innerHTML = "Unable to add resource!";
//       document.getElementById("message").setAttribute("class", "textdanger");
//       document.getElementById("message").setAttribute("class", "text-danger");
//     }
//   };
//   request.send(JSON.stringify(jsonData));
//   console.log(jsonData.toString());
// }

function addResource() {
  var response = "";
  var jsonData = new Object();

  var e = document.getElementById("ammenity_dropdown");
  jsonData.description = e.value;
  console.log(jsonData.description);

  jsonData.amount = document.getElementById("amount").value;
  console.log(jsonData.amount);

  // Validation: Check if the fields are empty
  if (jsonData.description === "" || jsonData.amount === "") {
    document.getElementById("message").innerHTML = "All fields are required!";
    document.getElementById("message").setAttribute("class", "text-danger");
    return;
  }

  var request = new XMLHttpRequest();
  request.open("POST", "/add-resource", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);
    if (response.message === undefined) {
      document.getElementById("message").innerHTML =
        "Added Resource: " + jsonData.description + "!";

      document.getElementById("amount").value = "";
      window.location.href = "home.html";
      // Consider whether 'location.reload()' is necessary here
    } else {
      document.getElementById("message").innerHTML = "Unable to add resource!";
      document.getElementById("message").setAttribute("class", "text-danger");
    }
  };
  request.send(JSON.stringify(jsonData));
}
