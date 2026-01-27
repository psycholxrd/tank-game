const freezing_time = 250;

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
let difficulty = 'normal';

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
    playerDamage: 0.8,
  }
}

let stats = {
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

const starting_HP = 500;
const starting_rFactor = 0.75;
const starting_damage = 12.5; //old 7.5
const starting_speed = 45; //old 50
const min_rFactor = 0.4;

class Player {
  constructor(radius, start_x, start_y) {
    let _difficulty = (difficulty in difficulty_modifiers) ? difficulty : 'normal';
    this._hp = starting_HP * difficulty_modifiers[_difficulty].playerHP;
    this.damage = starting_damage * difficulty_modifiers[_difficulty].playerDamage;
    this.r = radius;
    this._rFactor = starting_rFactor;
    this.raw = {
      x: start_x,
      y: start_y,
    };
    this.x, this.y;
    this.xOffset = 0;
    this.yOffset = 0;
    this.speed = starting_speed;
    this.playerColor = "yellow";
    this.damageColor = "darkred";
    this.freezeColor = "blue";
    this.activeColor = this.playerColor;
    this.color = "rgb(0, 0, 0)"; //line color
  }
  //limitations
  set hp(value){
    let _difficulty = (difficulty in difficulty_modifiers) ? difficulty : 'normal';
    this._hp = Math.min(value, starting_HP * difficulty_modifiers[_difficulty].playerHP*3);
  }
  get hp(){
    return this._hp;
  }
  set rFactor(value){
    this._rFactor = Math.max(value, min_rFactor);
  }
  get rFactor(){
    return this._rFactor;
  }
  correct_spawn_point(){
    this.raw.x = u * 2;
    this.raw.y = u * 7;
  }
  update_pos() {
    if(this.xOffset != 0 && this.yOffset != 0){
      const neg_sqrt = (x) => Math.sign(x) * Math.sqrt(Math.abs(x));
      this.xOffset = neg_sqrt(this.xOffset);
      this.yOffset = neg_sqrt(this.yOffset);
    }
    this.raw.x += this.xOffset * this.speed;
    this.raw.y += this.yOffset * this.speed;
    this.x = (this.raw.x * u) / 100;
    this.y = (this.raw.y * u) / 100;
  }

  update_speed() {
    this.speed = 3 / this.rFactor;
  }
  update_damage() {
    this.damage = 7.5 / this.rFactor;
  }
  update_radius() {
    this.r = u * this.rFactor;
  }
  update_color(r, g, b) {
    this.color = `rgb(${r}, ${g}, ${b})`;
  }
}

class Apple {
  constructor(x, y, rFactor = 0.1, unit='u') {
    this.unit = unit;
    this.r = 1;
    this.rFactor = rFactor;
    this.raw = {
      x: x,
      y: y,
    };
    this.x, this.y;
    this.color = "red";
  }
  update_values() {
    let unit = this.unit === 'u' ? u : this.unit === 'u2' ? u2 : 1;
    this.r = this.rFactor * unit;
    this.x = this.raw.x * unit;
    this.y = this.raw.y * unit;
  }
}

class Enemy {
  constructor(x, y, w, h, type = "Crier", unit = 'u') {
    let _difficulty = (difficulty in difficulty_modifiers) ? difficulty : 'normal';
    this.unit = unit;
    this.p_ctxs = [];
    this.hp = (w + h) * 100;
    this.enemyColor = "SlateBlue";
    this.damage_active = false;
    this.is_Boss = false;
    this.is_Slave = false;
    this.type = (type in stats) ? type : 'Default';
    this.raw = {
      x: x,
      y: y,
      w: w,
      h: h,
    };
    this.projectile_directions = stats[this.type].projectile_directions;
    this.last_direction = stats[this.type].last_direction;
    this.projectile_type = stats[this.type].projectile_type;
    this.pdamage = stats[this.type].damage * difficulty_modifiers[_difficulty].damage;
    this.p_cd = stats[this.type].cooldown * difficulty_modifiers[_difficulty].cooldown;
    this.p_rscale = stats[this.type].projectileSlowness * difficulty_modifiers[_difficulty].projectileSlowness;
    this.pbouncy = stats[this.type].isBouncy;
    this.bounceTime = stats[this.type].bounceTime * difficulty_modifiers[_difficulty].bounceTime;
    this.pwavy = stats[this.type].isWavy;
    this.pfrequency = stats[this.type].frequency;
    this.pamplitude = stats[this.type].amplitude;
    this.x,
      this.y,
      this.w,
      this.h,
      this.corners;
  }
  update_values() {
    let unit = this.unit === 'u' ? u : this.unit === 'u2' ? u2 : 1;
    this.x = this.raw.x * unit;
    this.y = this.raw.y * unit;
    this.w = this.raw.w * unit;
    this.h = this.raw.h * unit;
    this.corners = {
      lu: {
        x: this.x,
        y: this.y,
      },
      ld: {
        x: this.x,
        y: this.y + this.h,
      },
      ru: {
        x: this.x + this.w,
        y: this.y,
      },
      rd: {
        x: this.x + this.w,
        y: this.y + this.h,
      },
    };
  }
}

class Projectile {
  constructor(type, direction, raw_coords, rFactor, rScale, damage, bouncy = false, bounceTime = 10000, wavy = false, frequency = 1, amplitude = 1) {
    this.raw = raw_coords;
    this.direction = direction; //{0}not moving {1}up, {2}right-up, {3}right, {4}right-down, {5}down, {6}left-down, {7}left, {8}left-up
    this.rFactor = rFactor;
    this.rScale = rScale;
    this.type = type;
    this.speed = 0;
    this.damage = damage;
    this.teleportCooldown = new RandomAreaCooldown(1500);
    this.x, this.y, this.r;
    //bounce logic
    this.bouncy = bouncy;
    this.clock = new BulletClock(bounceTime, this);
    this.clock.start();
    //wave logic
    this.wavy = wavy;
    this.frequency = frequency;
    this.amplitude = amplitude;
  }
  update_speed() {
    this.speed = this.rFactor / this.rScale;
  }
  update_radius() {
    this.r = this.rFactor * u;
  }
  update_pos() {
    let random_area = {
      start_x: this.r / u,
      start_y: this.r / u,
      end_x: pigeon.w / u - this.r / u,
      end_y: pigeon.h / u - this.r / u,
    };

    let wave = {
      x: 0,
      y: 0,
    }

    let define_wave = () => {
      let instructions = {
        1: () => wave.y = Math.sin(this.raw.y * this.frequency) * this.amplitude * u,
        3: () => wave.x = Math.cos(this.raw.x * this.frequency) * this.amplitude * u,
        5: () => wave.y = Math.sin(this.raw.y * this.frequency) * this.amplitude * u,
        7: () => wave.x = Math.cos(this.raw.x * this.frequency) * this.amplitude * u
      };
      instructions[this.direction]();
    }
    if(this.wavy) define_wave();

    //0 needs a cooldown
    let instructions = {
      0: () => {
        if (this.teleportCooldown.canTeleport()) {
          this.raw.x =
            Math.floor(
              Math.random() * (random_area.end_x - random_area.start_x)
            ) + random_area.start_x;
          this.raw.y =
            Math.floor(
              Math.random() * (random_area.end_y - random_area.start_y)
            ) + random_area.start_y;
        }
      },
      1: () => {
        this.raw.y -= this.speed;
      },
      2: () => {
        this.raw.x += this.speed;
        this.raw.y -= this.speed;
      },
      3: () => {
        this.raw.x += this.speed;
      },
      4: () => {
        this.raw.x += this.speed;
        this.raw.y += this.speed;
      },
      5: () => {
        this.raw.y += this.speed;
      },
      6: () => {
        this.raw.x -= this.speed;
        this.raw.y += this.speed;
      },
      7: () => {
        this.raw.x -= this.speed;
      },
      8: () => {
        this.raw.x -= this.speed;
        this.raw.y -= this.speed;
      },
    };
    instructions[this.direction]();
    this.x = this.raw.x * u + wave.y;
    this.y = this.raw.y * u + wave.x;
  }
}
