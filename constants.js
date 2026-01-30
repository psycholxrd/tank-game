// --DIFFICULTY--
let difficulty = 'normal';

/*
this essentially tweaks some stats based on the selected difficulty
*/
const difficulty_modifiers = {
  'easy': {
    damage: 0.6,
    cooldown: 3.5,
    projectileSlowness: 3,
    bounceTime: 0.55,
    playerHP: 1.25,
    playerDamage: 3,
  },
  'normal': {
    damage: 1,
    cooldown: 1,
    projectileSlowness: 1,
    bounceTime: 1,
    playerHP: 1,
    playerDamage: 1,
  },
  'hard': {
    damage: 1.25,
    cooldown: 0.7,
    projectileSlowness: 0.6,
    bounceTime: 0.9,
    playerHP: 0.95,
    playerDamage: 0.6,
  }
}

// --ENEMIES--
const enemy_knock_damage = 150;
const boss_types = ["Ice Wizard", "Cry Baby", "Mega Org"];
const slave_types = ["Frosty", "Crier", "Org"];
/*
EXPLANATION:
- projectile_directions has 1 for allowed direction and 0 for disallowed. The index represents a direction
- last_direction potentially useless
- projectile_type not only determines skin, but also effect (like freezing)
- damage just raw damage number dealt to the player when hit by projectile
- cooldown basically shooting cooldown in milliseconds (or frames I don't remember)
- projectileSlowness higher value makes projectiles fly slower
- isBouncy when true, reverses the direction of the projectile when touching the border
- bounceTime how long can a projectile live before despawning
- isWavy when true, moves in sinus/cosinus curves
- frequency how close the waves are to each other
- amplitude how big are the waves
*/
const stats = {
  'Ice Wizard': {
    projectile_directions: [0, 1, 1, 1, 1, 1, 1, 1, 1],
    last_direction: 1,
    projectile_type: 'Freeze',
    damage: 150,
    cooldown: 1000,
    projectileSlowness: 5,
    isBouncy: false,
    bounceTime: 0,
    isWavy: false,
    frequency: 0,
    amplitude: 0,
  },
  'Cry Baby': {
    projectile_directions: [0, 0, 0, 0, 1, 0, 1, 0, 0],
    last_direction: 4,
    projectile_type: 'BigTear',
    damage: 175,
    cooldown: 1750,
    projectileSlowness: 7,
    isBouncy: true,
    bounceTime: 10000,
    isWavy: false,
    frequency: 1,
    amplitude: 1,
  },
  'Mega Org': {
    projectile_directions: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    last_direction: 0,
    projectile_type: 'BigSnipe',
    damage: 400,
    cooldown: 3750,
    projectileSlowness: 5,
    isBouncy: false,
    bounceTime: 0,
    isWavy: false,
    frequency: 1,
    amplitude: 1,
  },
  'Frosty': {
    projectile_directions: [0, 1, 0, 1, 0, 1, 0, 1, 0],
    last_direction: 1,
    projectile_type: 'Arrow',
    damage: 100,
    cooldown: 875,
    projectileSlowness: 4,
    isBouncy: false,
    bounceTime: 0,
    isWavy: false,
    frequency: 1,
    amplitude: 1,
  },
  'Crier': {
    projectile_directions: [0, 0, 0, 0, 0, 1, 0, 0, 0],
    last_direction: 5,
    projectile_type: 'Tear',
    damage: 175,
    cooldown: 1100,
    projectileSlowness: 2,
    isBouncy: false,
    bounceTime: 0,
    isWavy: false,
    frequency: 1,
    amplitude: 1,
  },
  'Org': {
    projectile_directions: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    last_direction: 0,
    projectile_type: 'Snipe',
    damage: 250,
    cooldown: 5000,
    projectileSlowness: 5,
    isBouncy: false,
    bounceTime: 0,
    isWavy: false,
    frequency: 1,
    amplitude: 1,
  },
  'Default': {
    projectile_directions: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    last_direction: 0,
    projectile_type: 'Arrow',
    damage: 250,
    cooldown: 1000,
    projectileSlowness: 5,
    isBouncy: false,
    bounceTime: 0,
    isWavy: false,
    frequency: 1,
    amplitude: 1,
  }
}

// --PROJECTILES--
const teleportCoolDownTime = 1500;

// --PLAYER--
const starting_HP = 500;
const starting_rFactor = 0.75;
const starting_damage = 10.5;
const starting_speed = 45;
const min_rFactor = 0.4;

// --WEAPONS--
const weapon_types = ["Laser", "Sniper"];
const player_projectile_types = ["Snipe"];