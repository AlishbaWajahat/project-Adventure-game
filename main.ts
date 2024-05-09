#! /usr/bin/env node



import inquirer from "inquirer";
import chalk from "chalk";

class Player {
  name: string;
  Health: number = 100;
  EnergyBooster: number = 2;
  constructor(name: string) {
    this.name = name;
  }
  healthIncrease() {
    this.Health = 100;
  }
  healthDecrease() {
    this.Health -= 25;
  }
  energyBooster() {
    if (this.EnergyBooster > 0) {
      this.Health=100;
      this.EnergyBooster --;
      console.log(chalk.greenBright.bold(`You have drunk an Energy drink`));
    }else{
        console.log(chalk.redBright.bold(`You had only 2 Energy boosters!`));
        
    }
  }
}

class Opponent {
  name: string;
  Health: number = 100;
  bonusAttack: number = 1;
  constructor(name: string) {
    this.name = name;
  }
  healthDecrease() {
    this.Health -= 25;
  }
  BonusAttack() {
    if (this.bonusAttack > 0) {
      this.Health -= 50;
      this.bonusAttack --;
    } else {
      console.log(chalk.redBright.bold(`You had only one bonus attack`));
    }
  }
}

async function main() {
  console.log(`Welcome to my adventure game!`);
  console.log("-".repeat(70));

  var condition = true;
  while (condition) {
    let question0 = await inquirer.prompt([
      {
        message: "What is the Player's name?",
        type: "input",
        name: "playerName",
      },
      {
        message: "Choose your Opponent",
        type: "list",
        name: "opponent",
        choices: ["Skeleton", "Alien", "Zombie"],
      },
      {
        message: "Choose your weapon",
        type: "list",
        name: "weapon",
        choices: ["Gun", "Sword", "Bomb"],
      },
    ]);
    let p1 = new Player(question0.playerName);
    let O1 = new Opponent(question0.opponent);

    while (p1.Health > 0 && O1.Health > 0) {
      if (
        question0.opponent === "Skeleton" ||
        question0.opponent === "Alien" ||
        question0.opponent === "Zombie"
      ) {
        let question1 = await inquirer.prompt({
          message: "Take a move!",
          type: "list",
          name: "move",
          choices: [
            "Attack",
            "Drink ENERGY BOOSTER",
            "Use bonus attack",
            "Run for life",
          ],
        });
        if (question1.move === "Attack") {
          var num = Math.floor(Math.random() * 2);
          if (num > 0) {
            p1.healthDecrease();
            console.log(
              chalk.red.italic(`${question0.playerName}:${p1.Health}`)
            );
            console.log(
              chalk.green.italic(`${question0.opponent}:${O1.Health}`)
            );
            if (p1.Health <= 0) {
              console.log(`You loose!, Better luck next time.`);
            }
          } else {
            O1.healthDecrease();
            console.log(
              chalk.green.italic(`${question0.playerName}:${p1.Health}`)
            );
            console.log(chalk.red.italic(`${question0.opponent}:${O1.Health}`));
            if (O1.Health <= 0) {
              console.log(`You won!.`);
            }
          }
        } 
        
        
        else if (question1.move === "Drink ENERGY BOOSTER") {
          p1.energyBooster();
          console.log(chalk.green.italic(`${question0.playerName}:${p1.Health}`));
          console.log(chalk.red.italic(`${question0.opponent}:${O1.Health}`));
        } 
        
        
        else if (question1.move === "Use bonus attack") {
          O1.BonusAttack();
          console.log(chalk.green.italic(`${question0.playerName}:${p1.Health}`));
          console.log(chalk.red.italic(`${question0.opponent}:${O1.Health}`));
          if (O1.Health <= 0) {
            console.log(`You won!.`);
          }
        }
        
        else if (question1.move === "Run for life") {
          console.log(chalk.black.bold(`You loose!, Better luck next time.`));
          process.exit()
        }
      }
    }

    let quitGame = await inquirer.prompt({
      message: "Do you want to play again?",
      type: "confirm",
      default: true,
      name: "playagain",
    });
    condition = quitGame.playagain;
  }
}
main();
