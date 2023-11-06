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
      html +=
        "<tr>" + "<td>" + key + "</td>" + "<td>" + value + "</td>" + "</td>";
    }
    document.getElementById("tableContent").innerHTML = html;
  };
  request.send();
}

function displayPie(data) {
  console.log(data);

  // for (let [key, value] of categories) {
  //   console.log(key + " = " + value);
  //   for (var j = 0; j < response.length; j++) {
  //     if (response[j].description === key) {
  //       console.log(response[j].description);
  //       console.log(response[j].amount);
  //       value += parseFloat(response[j].amount);
  //       categories.set(key, parseFloat(value.toFixed(2))); // Convert the value to a float with two decimal points
  //       console.log("am i being run");
  //     }
  //   }
  // }

  // Your existing viewResources function logic here
  // Obtain the necessary data for the pie chart
  // For instance, let's say you have an array of expenses
  // const expensesData = [
  //   { category: "Utilities", amount: 200 },
  //   { category: "Groceries", amount: 350 },
  //   // ... other expense categories and amounts
  // ];

  const expensesData = Array.from(data, ([category, amount]) => ({
    category,
    amount,
  }));

  // Prepare data for the chart
  const categories = expensesData.map((expense) => expense.category);
  const amounts = expensesData.map((expense) => expense.amount);

  // Render the pie chart
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
        },
      ],
    },
  });
}

function addResource() {
  var response = "";
  var jsonData = new Object();

  var e = document.getElementById("ammenity_dropdown");
  jsonData.description = e.value;
  console.log(jsonData.description);

  jsonData.amount = document.getElementById("amount").value;
  console.log(jsonData.amount);
  if (jsonData.name == "" || jsonData.description == "") {
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
    if (response.message == undefined) {
      document.getElementById("message").innerHTML =
        "Added Resource: " + jsonData.description + "!";

      document.getElementById("amount").value = "";
      // document.getElementById("description").value = "";
      window.location.href = "home.html";
      location.reload();
    } else {
      document.getElementById("message").innerHTML = "Unable to add resource!";
      document.getElementById("message").setAttribute("class", "textdanger");
      document.getElementById("message").setAttribute("class", "text-danger");
    }
  };
  request.send(JSON.stringify(jsonData));
  console.log(jsonData.toString());
}
