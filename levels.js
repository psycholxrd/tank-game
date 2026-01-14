const final_level = 10;
let starting_time;
let final_time;
let game_completed = false;
let game_active = false;
let current_level = 1;
let apples = [];
let enemies = [];
let projectiles = [];
let proj_timers = [];
let levels = {
  //apple syntax: [x, y, radius] enemy syntax: [x, y, side length on grid 16x9, boss or slave, type]
  1: {
    apples: [
      [2, 1, 0.2],
      [5, 2, 0.1],
      [4, 2.5, 0.1],
      [1.5, 4.5, 0.2],
      [5, 5, 0.3],
      [5.5, 3.75, 0.1],
      [8.25, 4.5, 0.2],
      [8, 2, 0.1],
      [9.25, 1.75, 0.3],
      [10, 8, 0.2],
      [11, 3.5, 0.2],
    ],
    enemies: [
      [3.25, 2.25, 0.5, "slave", "Frosty"],
      [7.25, 6.25, 1, "slave", "Frosty"],
      [12.25, 5.25, 0.75, "slave", "Frosty"],
    ],
  },
  2: {
    apples: [
      [3, 8, 0.1],
      [4, 8, 0.2],
      [5, 8, 0.3],
      [6, 8, 0.2],
      [7, 8, 0.1],
      [8, 8, 0.2],
      [9, 8, 0.3],
      [10, 8, 0.2],
      [11, 8, 0.1],
      [14, 2, 0.5],
    ],
    enemies: [
      [2, 2, 0.4, "slave", "Frosty"],
      [3, 3, 0.4, "slave", "Frosty"],
      [4, 4, 0.4, "slave", "Frosty"],
      [12, 3, 1.5, "slave", "Frosty"],
      [15.5, 8, 0.2, "slave", "Frosty"],
    ],
  },
  3: {
    apples: [
      [7, 3, 0.2],
      [8.5, 3, 0.2],
      [10, 3, 0.2],
      [5.5, 5.5, 0.1],
      [8.5, 7.5, 0.1],
      [11.5, 5.5, 0.1],
      [8.5, 1.5, 0.3],
      [1.5, 4.5, 0.3],
      [14.5, 4.5, 0.3],
      [4.5, 2, 0.2],
      [12.5, 2, 0.2],
    ],
    enemies: [
      [7.5, 3.5, 2, "boss", "Ice Wizard"],
      [1, 1, 0.75, "slave", "Frosty"],
      [14, 1, 0.75, "slave", "Frosty"],
      [7, 8, 0.25, "slave", "Frosty"],
    ],
  },
  4: {
    apples: [
      [1, 1, 0.1],
      [2, 2, 0.2],
      [2.5, 3, 0.3],
      [3, 4, 0.2],
      [4, 5, 0.1],
      [3, 8, 0.2],
      [14, 2, 1],
    ],
    enemies: [
      [5, 1, 1, "slave", "Crier"],
      [5.5, 1, 0.25, "slave", "Crier"],
      [7, 1, 1.25, "slave", "Crier"],
      [9, 1, 0.75, "slave", "Crier"],
      [12, 5, 1, "slave", "Frosty"],
    ],
  },
  5: {
    apples: [
      [4, 8, 0.1],
      [4.5, 8, 0.1],
      [5, 7.5, 0.1],
      [5.5, 7.5, 0.2],
      [6, 7, 0.2],
      [6.5, 7, 0.3],
      [7, 6.5, 0.3],
      [7.5, 5.5, 0.4],
      [8, 6.5, 0.3],
      [8.5, 7, 0.3],
      [9, 7, 0.2],
      [9.5, 7.5, 0.2],
      [10, 7.5, 0.1],
      [10.5, 8, 0.1],
      [11, 8, 0.1],
    ],
    enemies: [
      [2, 1, 0.25, "slave", "Crier"],
      [2.5, 1, 0.25, "slave", "Crier"],
      [3, 1, 0.25, "slave", "Crier"],
      [3.5, 1, 0.25, "slave", "Crier"],
      [4, 1, 0.25, "slave", "Crier"],
      [4.5, 1, 0.25, "slave", "Crier"],
      [5, 1, 0.25, "slave", "Crier"],
      [5.5, 1, 0.25, "slave", "Crier"],
      [6, 1, 0.25, "slave", "Crier"],
      [6.5, 1, 0.25, "slave", "Crier"],
      [7.125, 1, 1, "slave", "Crier"],
      [8.5, 1, 0.25, "slave", "Crier"],
      [9, 1, 0.25, "slave", "Crier"],
      [9.5, 1, 0.25, "slave", "Crier"],
      [10, 1, 0.25, "slave", "Crier"],
      [10.5, 1, 0.25, "slave", "Crier"],
      [11, 1, 0.25, "slave", "Crier"],
      [11.5, 1, 0.25, "slave", "Crier"],
      [12, 1, 0.25, "slave", "Crier"],
      [12.5, 1, 0.25, "slave", "Crier"],
      [13, 1, 0.25, "slave", "Crier"],
    ],
  },
  6: {
    apples: [
      [1, 1, 0.2],
      [5, 3, 0.2],
      [6, 2, 0.3],
      [7.5, 1.5, 0.1],
      [11.25, 4, 0.2],
      [8, 7, 0.2],
      [9, 0.5, 0.1]
    ],
    enemies: [
      [13, 1, 2, "boss", "Cry Baby"],
      [13, 5, 0.5, "slave", "Crier"],
      [3, 1, 0.75, "slave", "Crier"],
      [8, 3, 1.25, "slave", "Crier"],
      [6, 5, 0.75, "slave", "Frosty"],
      [12, 8, 0.4, "slave", "Frosty"],
    ],
  },
  7: {
    apples: [
      [7, 5, 0.4],
      [1, 1, 0.1],
      [1.5, 1.5, 0.1],
      [2, 2, 0.1],
      [2.5, 2.5, 0.1],
      [11, 5, 0.1],
      [12, 5, 0.1],
      [13, 5, 0.1],
      [14, 5, 0.1],
      [15, 5, 0.1],
      [11, 6, 0.2],
      [12, 6, 0.2],
      [13, 6, 0.2],
      [14, 6, 0.2],
      [15, 6, 0.2],
    ],
    enemies: [
      [5, 5, 0.5, "slave", "Org"],
      [12, 2, 0.75, "slave", "Org"],
      [4, 1, 0.4, "slave", "Crier"],
      [9, 7, 0.6, "slave", "Frosty"],
      [7, 2, 1.5, "slave", "Crier"],
    ],
  },
  8: {
    apples: [
      [4, 1, 0.1],
      [4, 2, 0.1],
      [4, 3, 0.1],
      [4, 4, 0.1],
      [4, 5, 0.1],
      [7.25, 3.25, 1]
    ],
    enemies: [
      [7, 1, 0.5, "slave", "Org"],
      [6, 1.25, 0.5, "slave", "Org"],
      [5.25, 2, 0.5, "slave", "Org"],
      [5, 3, 0.5, "slave", "Org"],
      [5.25, 4, 0.5, "slave", "Org"],
      [6, 4.75, 0.5, "slave", "Org"],
      [7, 5, 0.5, "slave", "Org"],
    ]
  },
  9: {
    apples: [
      [1, 1, 0.1],
      [2, 3, 0.1],
      [4, 8, 0.1],
      [15, 1, 0.2],
      [11, 2, 0.2],
      [11, 7, 0.1],
      [4, 2, 0.2],
      [3, 7, 0.1]
    ],
    enemies: [
      [6, 2, 3, "boss", "Mega Org"],
    ]
  },
  10: {
    apples: [],
    enemies: [],
  }
};

function load_level(number) {
  if(!game_active){
    starting_time = performance.now();
  }
  if(number == final_level){
    game_completed = true;
    game_active = false;
    final_time = performance.now();
    let last_best = localStorage.getItem('[Tanks] BestTime');
    if(last_best){
      console.log(JSON.parse(last_best), final_time);
      if(JSON.parse(last_best) > final_time){
        console.log('new best time!');
        localStorage.setItem('[Tanks] BestTime', final_time);
      }
    }else{
      console.log('new best time!');
      localStorage.setItem('[Tanks] BestTime', final_time);
    }
    return
  }
  game_completed = false;
  apples = [];
  enemies = [];
  projectiles = [];
  proj_timers = [];
  game_active = true;
  current_level = number;
  let l1 = levels[number].apples.length;
  let l2 = levels[number].enemies.length;
  for (let i = 0; i < l1; i++) {
    let current = levels[number].apples[i];
    apples.push(new Apple(current[0], current[1], current[2]));
  }
  for (let i = 0; i < l2; i++) {
    let current = levels[number].enemies[i];
    let temp_enemy = new Enemy(
      current[0],
      current[1],
      current[2],
      current[2],
      current[4]
    );
    switch (current[3]) {
      case "slave":
        temp_enemy.is_Slave = true;
        temp_enemy.is_Boss = false;
        break;
      case "boss":
        temp_enemy.is_Slave = false;
        temp_enemy.is_Boss = true;
        break;
    }
    enemies.push(temp_enemy); //[2] twice, because square
  }
}
