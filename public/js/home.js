function viewResources() {
  var response = "";
  var request = new XMLHttpRequest();
  request.open("GET", "/view-resources", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    var html = "";
    for (var i = 0; i < response.length; i++) {
      html +=
        "<tr>" +
        "<td>" +
        (i + 1) +
        "</td>" +
        "<td>" +
        response[i].description +
        "</td>" +
        "<td>" +
        response[i].amount +
        "</td>" +
        "</td>" +
        "</tr>";
    }
    document.getElementById("tableContent").innerHTML = html;
  };
  request.send();
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
