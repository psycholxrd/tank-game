function old60FPSCooldownToMilliseconds(cooldown){
  return (cooldown/60)*1000;
}

class Clock {
  constructor() {
    this._expiresAt = {
      enemy_knock_damage: 0,
      shoot_enemy: 0,
    };

    this.cd = {
      default: {
        enemy_knock_damage: old60FPSCooldownToMilliseconds(40),
        shoot_enemy: old60FPSCooldownToMilliseconds(25),
      },

      locked: {
        get enemy_knock_damage() {
          return performance.now() < this._parent._expiresAt.enemy_knock_damage;
        },
        get shoot_enemy() {
          return performance.now() < this._parent._expiresAt.shoot_enemy;
        },
        _parent: this
      },

      current: {
        get enemy_knock_damage() {
          return Math.max(0, this._parent._expiresAt.enemy_knock_damage - performance.now());
        },
        get shoot_enemy() {
          return Math.max(0, this._parent._expiresAt.shoot_enemy - performance.now());
        },
        _parent: this
      }
    };
  }

  enemy_knock_damage() {
    if (!this.cd.locked.enemy_knock_damage) {
      this._expiresAt.enemy_knock_damage = performance.now() + this.cd.default.enemy_knock_damage;
    }
  }

  shoot_enemy() {
    if (!this.cd.locked.shoot_enemy) {
      this._expiresAt.shoot_enemy = performance.now() + this.cd.default.shoot_enemy;
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

class WarningClock{
  constructor(flickeringTime, waitingTime, context){
    this.fT = flickeringTime;
    this.wT = waitingTime;
    this.context = context;
    this.fTimer = performance.now();
    this.wTimer = performance.now();
    this.startedFlickering = false;
    this.startedWaiting = false;
  }
  startFlickering(){
    this.fTimer = performance.now() + this.fT;
    this.startedFlickering = true;
  }
  get doneFlickering(){
    return performance.now() > this.fTimer;
  }
  startWaiting(){
    this.wTimer = performance.now() + this.wT;
    this.startedWaiting = true;
  }
  get doneWaiting(){
    return performance.now() > this.wTimer;
  }
  get nextFlickeringState(){
    switch(this.context.flickeringState){
      case 1:
        return 2;
      case 2:
        return 1;
      default:
        return -1
    }
  }
  get isWarningOver(){
    return this.context.next.x === this.context.raw.x && this.context.next.y === this.context.raw.y;
  }
  restart(){
    if(!this.isWarningOver){
      window.requestAnimationFrame(()=>this.restart());
    }else{
      //only reset if the next loop started
      this.startedFlickering = false;
      this.startedWaiting = false;
      window.requestAnimationFrame(()=>this.start());
    }
  }
  start(){
    if(this.isWarningOver) return this.restart();
    if(!this.startedWaiting) this.startWaiting(); //skip this if already started
    if(this.doneWaiting){ //wait until starting timer is done
      if(!this.startedFlickering) this.startFlickering(); //skip this if already started
      if(this.doneFlickering){ //wait until flickering timer is done
        //update flickering state upon finishing cycle
        this.context.flickeringState = this.nextFlickeringState;
        //restart flickering
        this.startedFlickering = false;
        window.requestAnimationFrame(()=>this.start()); //using requestAnimationFrame to prevent recursion memory overflow
      }else{
        window.requestAnimationFrame(()=>this.start());
      }
    }else{
      window.requestAnimationFrame(()=>this.start());
    }
  }
}