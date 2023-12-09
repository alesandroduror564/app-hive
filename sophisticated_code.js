/*
Filename: sophisticated_code.js
Content: 

This code demonstrates a sophisticated simulation of a virtual ecosystem. It models the interactions between different organisms such as plants, herbivores, and predators. The ecosystem undergoes changes over multiple iterations, simulating the growth, reproduction, and movement of organisms. It incorporates various advanced concepts such as object-oriented programming, event-driven programming, and randomization.

*/

// Define the Plant class
class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.energy = Math.floor(Math.random() * 10) + 1;
  }
  
  grow() {
    // simulate plant growth
    if (Math.random() < 0.2) {
      this.energy += Math.floor(Math.random() * 2) + 1;
    }
    if (this.energy > 15) {
      this.energy = 10;
      this.reproduce();
    }
  }
  
  reproduce() {
    // simulate plant reproduction
    let newX = this.x + Math.floor(Math.random() * 3) - 1;
    let newY = this.y + Math.floor(Math.random() * 3) - 1;
    let newPlant = new Plant(newX, newY);
    ecosystem.plants.push(newPlant);
  }
  
  update() {
    // simulate plant update
    this.grow();
    if (this.energy <= 0) {
      this.isAlive = false;
    }
  }
}

// Define the Herbivore class
class Herbivore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.energy = Math.floor(Math.random() * 20) + 10;
  }
  
  eat() {
    // simulate herbivore eating plants
    let nearbyPlants = ecosystem.getNearbyPlants(this.x, this.y);
    if (nearbyPlants.length > 0) {
      let randomPlant = nearbyPlants[Math.floor(Math.random() * nearbyPlants.length)];
      this.energy += randomPlant.energy;
      randomPlant.energy = 0;
    }
  }
  
  reproduce() {
    // simulate herbivore reproduction
    let newX = this.x + Math.floor(Math.random() * 3) - 1;
    let newY = this.y + Math.floor(Math.random() * 3) - 1;
    let newHerbivore = new Herbivore(newX, newY);
    ecosystem.herbivores.push(newHerbivore);
  }
  
  update() {
    // simulate herbivore update
    this.eat();
    this.energy -= 1;
    if (this.energy <= 0) {
      this.isAlive = false;
    }
    if (this.energy > 40) {
      this.energy = 20;
      this.reproduce();
    }
  }
}

// Define the Predator class
class Predator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.energy = Math.floor(Math.random() * 50) + 20;
  }
  
  hunt() {
    // simulate predator hunting herbivores
    let nearbyHerbivores = ecosystem.getNearbyHerbivores(this.x, this.y);
    if (nearbyHerbivores.length > 0) {
      let randomHerbivore = nearbyHerbivores[Math.floor(Math.random() * nearbyHerbivores.length)];
      this.energy += randomHerbivore.energy;
      randomHerbivore.energy = 0;
    }
  }
  
  reproduce() {
    // simulate predator reproduction
    let newX = this.x + Math.floor(Math.random() * 3) - 1;
    let newY = this.y + Math.floor(Math.random() * 3) - 1;
    let newPredator = new Predator(newX, newY);
    ecosystem.predators.push(newPredator);
  }
  
  update() {
    // simulate predator update
    this.hunt();
    this.energy -= 2;
    if (this.energy <= 0) {
      this.isAlive = false;
    }
    if (this.energy > 80) {
      this.energy = 40;
      this.reproduce();
    }
  }
}

// Define the Ecosystem class
class Ecosystem {
  constructor() {
    this.plants = [];
    this.herbivores = [];
    this.predators = [];
  }
  
  generateInitialOrganisms() {
    // generate initial plants, herbivores, and predators
    for (let i = 0; i < 50; i++) {
      let x = Math.floor(Math.random() * 100);
      let y = Math.floor(Math.random() * 100);
      let plant = new Plant(x, y);
      this.plants.push(plant);
    }
    
    for (let i = 0; i < 10; i++) {
      let x = Math.floor(Math.random() * 100);
      let y = Math.floor(Math.random() * 100);
      let herbivore = new Herbivore(x, y);
      this.herbivores.push(herbivore);
    }
    
    for (let i = 0; i < 5; i++) {
      let x = Math.floor(Math.random() * 100);
      let y = Math.floor(Math.random() * 100);
      let predator = new Predator(x, y);
      this.predators.push(predator);
    }
  }
  
  getNearbyPlants(x, y) {
    // get nearby plants within a certain range
    let plantsInRange = [];
    for (let plant of this.plants) {
      let distance = Math.sqrt((plant.x - x) ** 2 + (plant.y - y) ** 2);
      if (distance <= 5) {
        plantsInRange.push(plant);
      }
    }
    return plantsInRange;
  }
  
  getNearbyHerbivores(x, y) {
    // get nearby herbivores within a certain range
    let herbivoresInRange = [];
    for (let herbivore of this.herbivores) {
      let distance = Math.sqrt((herbivore.x - x) ** 2 + (herbivore.y - y) ** 2);
      if (distance <= 10) {
        herbivoresInRange.push(herbivore);
      }
    }
    return herbivoresInRange;
  }
  
  simulate(iterations) {
    // simulate the ecosystem for a given number of iterations
    for (let i = 0; i < iterations; i++) {
      console.log(`Iteration ${i + 1}`);
      
      // update plants
      for (let plant of this.plants) {
        plant.update();
      }
      this.plants = this.plants.filter((plant) => plant.isAlive);
      
      // update herbivores
      for (let herbivore of this.herbivores) {
        herbivore.update();
      }
      this.herbivores = this.herbivores.filter((herbivore) => herbivore.isAlive);
      
      // update predators
      for (let predator of this.predators) {
        predator.update();
      }
      this.predators = this.predators.filter((predator) => predator.isAlive);
      
      // display current state
      console.log(`Plants: ${this.plants.length}`);
      console.log(`Herbivores: ${this.herbivores.length}`);
      console.log(`Predators: ${this.predators.length}`);
    }
  }
}

// Create an instance of the Ecosystem class and simulate for 100 iterations
const ecosystem = new Ecosystem();
ecosystem.generateInitialOrganisms();
ecosystem.simulate(100);