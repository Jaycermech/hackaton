class Resource {
  constructor(description, amount) {
    
    this.description = description;
    this.amount = amount;
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, "0");
  }
}
module.exports = { Resource };
