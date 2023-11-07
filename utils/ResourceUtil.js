const { readJSON, writeJSON } = require("./UserUtil");

const { Resource } = require("../models/Resource");
async function viewResources(req, res) {
  try {
    const allResources = await readJSON("utils/resources.json");
    return res.status(201).json(allResources);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function addResource(req, res) {
  try {
    const description = req.body.description;
    const amount = req.body.amount;
    const newResource = new Resource(description, amount);
    const updatedResources = await writeJSON(
      newResource,
      "utils/resources.json"
    );
    return res.status(201).json(updatedResources);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  viewResources,
  addResource,
};
