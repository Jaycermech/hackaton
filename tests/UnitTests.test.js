const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const { addResource, viewResources } = require("../utils/ResourceUtil");

describe("Testing addResource Function", () => {
  const resourcesFilePath = "utils/resources.json";
  var orgContent = "";
  beforeEach(async () => {
    orgContent = await fs.readFile(resourcesFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  afterEach(async () => {
    await fs.writeFile(resourcesFilePath, JSON.stringify(orgContent), "utf8");
  });

  it("Should add a new resource successfully", async () => {
    const req = {
      body: {
        description: "Groceries",
        amount: "10",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data).to.have.lengthOf(orgContent.length + 1);
        expect(data[orgContent.length].description).to.equal(
          req.body.description
        );
      },
    };
    await addResource(req, res);
  });

  it("Should show resource successfully", async () => {
    const req = {};
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data).to.have.lengthOf(orgContent.length);
      },
    };
    await viewResources(req, res);
  });
});
 