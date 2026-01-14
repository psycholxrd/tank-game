class Clock {
  constructor() {
    this.cd = {
      locked: {
        enemy_knock_damage: false,
        shoot_enemy: false,
      },
      default: {
        enemy_knock_damage: 40,
        shoot_enemy: 25,
      },
      current: {
        enemy_knock_damage: 40,
        shoot_enemy: 25,
      },
    };
  }

  cycle_cooldown(type) {
    if (this.cd.current[type] > 0) {
      //console.log(`Cooldown active: ${this.cd.current[type]}`);
      this.cd.current[type]--;
      requestAnimationFrame(() => this.cycle_cooldown(type));
    } else {
      //console.log(`Cooldown ended: ${type}`);
      this.cd.current[type] = this.cd.default[type]; // Reset cooldown
      this.cd.locked[type] = false; // Unlock
    }
  }

  enemy_knock_damage() {
    if (!this.cd.locked.enemy_knock_damage) {
      // Only start if not already running
      this.cd.locked.enemy_knock_damage = true;
      requestAnimationFrame(() => this.cycle_cooldown("enemy_knock_damage"));
    }
  }

  shoot_enemy() {
    if (!this.cd.locked.shoot_enemy) {
      // Only start if not already running
      this.cd.locked.shoot_enemy = true;
      requestAnimationFrame(() => this.cycle_cooldown("shoot_enemy"));
    }
  }
}

class RandomAreaCooldown {
  constructor(cooldown_ms) {
    this.cooldown = cooldown_ms;
    this.nextAllowed = performance.now();
  }

  canTeleport() {
    const now = performance.now();
    if (now >= this.nextAllowed) {
      this.nextAllowed = now + this.cooldown;
      return true;
    }
    return false;
  }
}

class ProjClock {
  constructor(reload_ms) {
    this.reload = reload_ms; // milliseconds
    this.nextFireTime = performance.now() + reload_ms; // wait for the first delay
  }

  ready() {
    const now = performance.now();
    if (now >= this.nextFireTime) {
      this.nextFireTime = now + this.reload;
      return true;
    }
    return false;
  }
}

class FreezeClock{
  constructor(wait_ms){
    this.wait_ms = wait_ms;
    this.timer = performance.now();
  }
  freeze(){
    this.timer = performance.now()+this.wait_ms;
  }

  is_frozen() {
    return performance.now() <= this.timer;
  }
}

class BulletClock{
  constructor(living_time, context){
    this.living_time = living_time;
    this.timer = performance.now();
    this.context = context;
  }
  handle_dissapearing(){
    if(performance.now() > this.timer){
      this.context.bouncy = false;
      return
    }
    requestAnimationFrame(() => {this.handle_dissapearing()});
  }
  start(){
    this.timer = performance.now()+ this.living_time;
    requestAnimationFrame(() => {this.handle_dissapearing()});
  }
}