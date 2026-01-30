class Player {
  constructor(radius, start_x, start_y, selected_weapon = "Laser") {
    let _difficulty = (difficulty in difficulty_modifiers) ? difficulty : 'normal';
    let _selected_weapon = weapon_types.includes(selected_weapon) ? selected_weapon : "Laser";
    this.selected_weapon = _selected_weapon;
    this._hp = starting_HP * difficulty_modifiers[_difficulty].playerHP;
    this.damage = starting_damage * difficulty_modifiers[_difficulty].playerDamage;
    this.r = radius;
    this._rFactor = starting_rFactor;
    this.unscaled = {
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
    window.addEventListener('keydown', (e) => {
      if(e.code === "ShiftLeft" || e.code === "ShiftRight"){
        this.switch_weapon();
      }
    })
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
  switch_weapon(){
    if(!clock.cd.locked.switch_weapon){
      this.selected_weapon = weapon_types[(weapon_types.indexOf(this.selected_weapon)+1) % weapon_types.length];
      clock.switch_weapon();
    }
  }
  correct_spawn_point(){
    this.unscaled.x = u * 2;
    this.unscaled.y = u * 7;
  }
  update_pos() {
    if(this.xOffset != 0 && this.yOffset != 0){
      const neg_sqrt = (x) => Math.sign(x) * Math.sqrt(Math.abs(x));
      this.xOffset = neg_sqrt(this.xOffset);
      this.yOffset = neg_sqrt(this.yOffset);
    }
    this.unscaled.x += this.xOffset * this.speed;
    this.unscaled.y += this.yOffset * this.speed;
    this.x = (this.unscaled.x * u) / 100;
    this.y = (this.unscaled.y * u) / 100;
  }

  update_speed() {
    this.speed = 3 / this.rFactor;
  }
  update_damage() {
    let _difficulty = (difficulty in difficulty_modifiers) ? difficulty : 'normal';
    this.damage = (starting_damage * difficulty_modifiers[_difficulty].playerDamage) / (this.rFactor * 1.425);
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
    this.unscaled = {
      x: x,
      y: y,
    };
    this.x, this.y;
    this.color = "red";
  }
  update_values() {
    let unit = this.unit === 'u' ? u : this.unit === 'u2' ? u2 : 1;
    this.r = this.rFactor * unit;
    this.x = this.unscaled.x * unit;
    this.y = this.unscaled.y * unit;
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
    this.unscaled = {
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
    this.x = this.unscaled.x * unit;
    this.y = this.unscaled.y * unit;
    this.w = this.unscaled.w * unit;
    this.h = this.unscaled.h * unit;
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
  constructor(type, direction, unscaled_coords, rFactor, rScale, damage, bouncy = false, bounceTime = 10000, wavy = false, frequency = 1, amplitude = 1) {
    this.unscaled = unscaled_coords;
    this.next = {
      x: this.unscaled.x,
      y: this.unscaled.y
    };
    this.direction = direction; //{0}not moving {1}up, {2}right-up, {3}right, {4}right-down, {5}down, {6}left-down, {7}left, {8}left-up
    this.rFactor = rFactor;
    this.rScale = rScale;
    this.type = type;
    this.speed = 0;
    this.damage = damage;
    this.teleportCooldown = new RandomAreaCooldown(teleportCoolDownTime);
    //warning logic
    this.flickeringState = 1;
    this.warningClock = new WarningClock(teleportCoolDownTime/3, teleportCoolDownTime/30, this);
    this.warningClock.start();
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
        1: () => wave.y = Math.sin(this.unscaled.y * this.frequency) * this.amplitude * u,
        3: () => wave.x = Math.cos(this.unscaled.x * this.frequency) * this.amplitude * u,
        5: () => wave.y = Math.sin(this.unscaled.y * this.frequency) * this.amplitude * u,
        7: () => wave.x = Math.cos(this.unscaled.x * this.frequency) * this.amplitude * u
      };
      instructions[this.direction]();
    }
    if(this.wavy) define_wave();

    let instructions = {
      0: () => {
        if (this.teleportCooldown.canTeleport()) {
          this.unscaled.x = this.next.x;
          this.unscaled.y = this.next.y;
          this.next.x =
            Math.floor(
              Math.random() * (random_area.end_x - random_area.start_x)
            ) + random_area.start_x;
          this.next.y =
            Math.floor(
              Math.random() * (random_area.end_y - random_area.start_y)
            ) + random_area.start_y;
        }
      },
      1: () => {
        this.unscaled.y -= this.speed;
      },
      2: () => {
        this.unscaled.x += this.speed;
        this.unscaled.y -= this.speed;
      },
      3: () => {
        this.unscaled.x += this.speed;
      },
      4: () => {
        this.unscaled.x += this.speed;
        this.unscaled.y += this.speed;
      },
      5: () => {
        this.unscaled.y += this.speed;
      },
      6: () => {
        this.unscaled.x -= this.speed;
        this.unscaled.y += this.speed;
      },
      7: () => {
        this.unscaled.x -= this.speed;
      },
      8: () => {
        this.unscaled.x -= this.speed;
        this.unscaled.y -= this.speed;
      },
    };
    instructions[this.direction]();
    this.x = this.unscaled.x * u + wave.y;
    this.y = this.unscaled.y * u + wave.x;
  }
}

class PlayerProjectile{
  constructor(type, starting_point, direction_vector, speed, damage, radius){
    if(isNaN(starting_point[0]) || isNaN(starting_point[1]) || isNaN(direction_vector[0]) || isNaN(direction_vector[1])) throw new Error('NAN detected in PlayerProjectile');
    let _type = player_projectile_types.includes(type) ? type : 'Snipe';
    this.type = _type;
    this.unscaled_starting_point = starting_point;
    this.unscaled_direction_vector = direction_vector;
    this.unscaled_speed = speed;
    this.unscaled_radius = radius;
    this.damage = damage;
    this.steps = 0;
    this.unscaled_pos = {
      x: this.unscaled_starting_point[0],
      y: this.unscaled_starting_point[1]
    };
  }
  get starting_point(){
    let [x, y] = this.unscaled_starting_point;
    return [x*u, y*u];
  }
  get direction_vector(){
    let [x, y] = this.direction_vector;
    return [x*u, y*u];
  }
  get speed(){
    return this.unscaled_speed * u;
  }
  get radius(){
    return this.unscaled_radius * u;
  }
  get pos(){
    return {
      x: (this.unscaled_pos.x + (this.unscaled_direction_vector[0] / this.unscaled_speed * this.steps)) * u,
      y: (this.unscaled_pos.y + (this.unscaled_direction_vector[1] / this.unscaled_speed * this.steps)) * u
    };
  }
  step(){
    this.steps++;
  }
  draw(){
    c.begin();
    c.set_property('fillStyle', 'white');
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
    c.fill();
  }
}