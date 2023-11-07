const { app } = require("../index");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it } = require("mocha");
const { expect } = require("chai");

const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

// const driver = new Builder().forBrowser("chrome").build();

// const driver = new Builder().forBrowser("firefox").build();

// const edge = require('selenium-webdriver/edge');

// const driver = new Builder()
//     .forBrowser('MicrosoftEdge')
//     .setEdgeOptions(new edge.Options()) // Optional: You can set specific options for Edge
//     .build();

// var server;
 
before(async function () {
  server = await new Promise((resolve) => {
    server = app.listen(0, "localhost", () => {
      resolve(server);
    });
  });
});

// describe("Testing Open Webpage UI", function () {
//   this.timeout(100000); // Set timeout as 10 seconds
//   it("Should show title:DVOPS - Resource Management Web App", async () => {
//     await driver.get("http://localhost:5050/home.html");

//     console.log("am i being tun");

//     const title = await driver.getTitle(); // Get the title of the web page
//     expect(title).to.equal("DVOPS - Resource Management Web App"); // Assert that title matches "Swag Labs"

//     const addExpensebtn1 = await driver.findElement(By.id("addExpensebtn1"));
//     await addExpensebtn1.click();

//     // opens ammenity drop down button
//     const ammenity_dropdown = await driver.findElement(
//       By.id("ammenity_dropdown")
//     );
//     await driver.wait(until.elementIsVisible(ammenity_dropdown), 5000);
//     await ammenity_dropdown.click();

//     // opens ammenity drop down and choose food option
//     const ammenity_dropdown_food = await driver.findElement(By.id("Food"));
//     await driver.wait(until.elementIsVisible(ammenity_dropdown_food), 5000);
//     await ammenity_dropdown_food.click();
//     await ammenity_dropdown.click();

//     //select amount input box and type amount
//     const amount_input_modal = await driver.findElement(
//       By.id("amount_input_modal")
//     );
//     // console.log("ni gn ma");
//     // console.log(document.getElementById("amount_input_modal"));
//     await amount_input_modal.click();
//     await amount_input_modal.sendKeys(300);

//     // console.log("ni gn ma 2");
//     // const resource_modal = await driver.findElement(By.id("resourceModal)"));
//     // resource_modal.click();

//     // Wait for the modal to load
//     const addExpensebtn2 = await driver.findElement(By.id("addExpensebtn2"));
//     await driver.wait(until.elementIsVisible(addExpensebtn2), 5000);
//     await addExpensebtn2.click();
//   });
// });

describe("Testing Open Webpage UI - Main Screen", function () {
  this.timeout(100000); // Set timeout as 10 seconds
  it("Should show title: DVOPS - Resource Management Web App", async () => {
    await driver.get("http://localhost:6060/home.html");
    const title = await driver.getTitle(); // Get the title of the web page
    expect(title).to.equal("DVOPS - Resource Management Web App"); // Assert that title matches "DVOPS - Resource Management Web App"
  });
});

describe("Testing Add Expense and Dropdown Selection", function () {
  this.timeout(100000); // Set timeout as 10 seconds
  it("Should open dropdown and select Food option after clicking addExpensebtn1", async () => {
    const addExpensebtn1 = await driver.findElement(By.id("addExpensebtn1"));
    await addExpensebtn1.click();
 
    const ammenity_dropdown = await driver.findElement(
      By.id("ammenity_dropdown")
    );
    await driver.wait(until.elementIsVisible(ammenity_dropdown), 5000);
    await ammenity_dropdown.click();

    const ammenity_dropdown_food = await driver.findElement(By.id("Food"));
    await driver.wait(until.elementIsVisible(ammenity_dropdown_food), 5000);
    await ammenity_dropdown_food.click();
    await ammenity_dropdown.click();

    const amount_input_modal = await driver.findElement(
      By.id("amount_input_modal")
    );
    await amount_input_modal.click();
    await amount_input_modal.sendKeys(300);

    const addExpensebtn2 = await driver.findElement(By.id("addExpensebtn2"));
    await addExpensebtn2.click();
  });
});

after(async function () {
  await driver.quit();
  await server.close();
});
