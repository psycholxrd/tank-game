const freezing_time = 250;

class Player {
  constructor(radius, start_x, start_y) {
    this.hp = 500;
    this.damage = 7.5;
    this.r = radius;
    this.rFactor = 0.75;
    this.raw = {
      x: start_x,
      y: start_y,
    };
    this.x, this.y;
    this.xOffset = 0;
    this.yOffset = 0;
    this.speed = 50;
    this.playerColor = "yellow";
    this.damageColor = "darkred";
    this.freezeColor = "blue";
    this.activeColor = this.playerColor;
    this.color = "rgb(0, 0, 0)"; //line color
  }
  update_pos() {
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
    this.unit = 'u';
    this.r = 1;
    this.rFactor = rFactor;
    this.raw = {
      x: x,
      y: y,
    };
    this.x = x * u;
    this.y = y * u;
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
    this.unit = unit;
    this.p_ctxs = [];
    this.hp = (w + h) * 100;
    this.enemyColor = "SlateBlue";
    this.damage_active = false;
    this.is_Boss = false;
    this.is_Slave = false;
    this.type = type;
    this.raw = {
      x: x,
      y: y,
      w: w,
      h: h,
    };
    this.pbouncy = false; //if projectiles can bounce
    this.bounceTime = 0; //bounce time
    this.pwavy = false;
    this.pfrequency = 1;
    this.pamplitude = 1;
    this.p_rscale = 5; //changes projectile speed (bigger = slower)
    this.x,
      this.y,
      this.w,
      this.h,
      this.corners,
      this.last_direction,
      this.pdamage, //how much damage a projectile deals
      this.p_cd; //projectile shooting cooldown
    switch (this.type) {
      case "Ice Wizard":
        this.projectile_directions = [0, 1, 1, 1, 1, 1, 1, 1, 1];
        this.last_direction = 1;
        this.projectile_type = "Freeze";
        this.pdamage = 150;
        this.p_cd = 1000;
        break;
      case "Cry Baby":
        this.projectile_directions = [0, 0, 0, 0, 1, 0, 1, 0, 0];
        this.last_direction = 4;
        this.projectile_type = "BigTear";
        this.pdamage = 175;
        this.p_cd = 3750;
        this.pbouncy = true;
        this.p_rscale = 7;
        this.bounceTime = 10000;
        break;
      case "Mega Org":
        this.projectile_directions = [1, 0, 0, 0, 0, 0, 0, 0, 0];
        this.last_direction = 0;
        this.projectile_type = "BigSnipe";
        this.pdamage = 400;
        this.p_cd = 3750;
        break;
      case "Frosty":
        this.projectile_directions = [0, 1, 0, 1, 0, 1, 0, 1, 0];
        this.last_direction = 1;
        this.projectile_type = "Arrow";
        this.pdamage = 100;
        this.p_cd = 875;
        this.p_rscale = 4;
        break;
      case "Crier":
        this.projectile_directions = [0, 0, 0, 0, 0, 1, 0, 0, 0];
        this.last_direction = 5;
        this.projectile_type = "Tear";
        this.pdamage = 175;
        this.p_cd = 1100;
        this.p_rscale = 2;
        break;
      case "Org":
        this.projectile_directions = [1, 0, 0, 0, 0, 0, 0, 0, 0];
        this.last_direction = 0;
        this.projectile_type = "Snipe";
        this.pdamage = 250;
        this.p_cd = 5000;
        break;
    }
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
