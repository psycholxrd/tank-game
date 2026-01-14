const timer = document.getElementById("timer");
const menu_cont = document.getElementById("menu-container");
const highscore_text = document.getElementById("highscore");
const clock = new Clock();
const freezeClock = new FreezeClock(freezing_time);
const respawn_point = {
  x: u * 2,
  y: u * 7,
};
const you = new Player(u / 2, respawn_point.x, respawn_point.y);
let debug = {
  grid: {
    active: false,
    a: 16,
    b: 9,
  },
};

function msToTime(ms){
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);

  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');
  const millisecondsStr = milliseconds.toString().padStart(3, '0');
  return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
}

function updateHighscoreText(){
  let last_best = localStorage.getItem('[Tanks] BestTime');
  let suffix = !!last_best ? msToTime(JSON.parse(last_best)) : '-';
  highscore_text.innerHTML = "Highscore: " + suffix;
}
updateHighscoreText();

function create_apples(amount) {
  for (let i = 0; i < amount; i++) {
    let x = Math.floor(Math.random() * 16) + 1;
    let y = Math.floor(Math.random() * 9) + 1;
    let apple = new Apple(x, y);
    apples.push(apple);
  }
}

function create_enemies(amount) {
  for (let i = 0; i < amount; i++) {
    let x = Math.floor(Math.random() * 16) + 1;
    let y = Math.floor(Math.random() * 9) + 1;
    let enemy = new Enemy(x, y, 0.5, 0.5);
    enemies.push(enemy);
  }
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function get_rgb() {
  let d = distance(mouse.x, mouse.y, you.x, you.y);
  if (d < you.r * 1.25) d = you.r * 1.25;
  let value = (255 / Math.min(window.innerWidth, window.innerHeight)) * d;
  return [value, value, value];
}

function apple_collision_check() {
  for (apple in apples) {
    let curr = apples[apple];
    let index = apples.indexOf(curr);
    let d = distance(curr.x, curr.y, you.x, you.y);
    if (d < curr.r + you.r) {
      you.rFactor *= 1 - 0.2 * curr.rFactor;
      you.hp += 500 * curr.rFactor;
      apples.splice(index, 1);
    }
  }
}

function enemy_collision_check() {
  for (let i = 0; i < enemies.length; i++) {
    let curr = enemies[i];

    // Ensure enemy dimensions are updated
    curr.update_values();

    // Player properties
    let px = you.x;
    let py = you.y;
    let pr = you.r;

    // Enemy properties
    let ex = curr.x;
    let ey = curr.y;
    let ew = curr.w;
    let eh = curr.h;

    // Find the closest point on the rectangle to the circle
    let closestX = Math.max(ex, Math.min(px, ex + ew));
    let closestY = Math.max(ey, Math.min(py, ey + eh));

    // Calculate the distance between the circle's center and this closest point
    let dx = px - closestX;
    let dy = py - closestY;
    let distanceSquared = dx * dx + dy * dy;

    // Collision check
    if (distanceSquared <= pr * pr) {
      return true;
    }
  }
  return false;
}

function handle_enemy_collision() {
  let coll = enemy_collision_check();
  if (coll && !clock.cd.locked.enemy_knock_damage) {
    clock.enemy_knock_damage();
    you.hp -= 150;
  }
  if (clock.cd.locked.enemy_knock_damage) {
    you.activeColor = you.damageColor;
  } else {
    you.activeColor = you.playerColor;
  }
}

//player drawing
let mouse = {
  x: 0,
  y: 0,
};
let keys = {
  u: false,
  d: false,
  l: false,
  r: false,
};

function setTime(ms){
  timer.innerHTML = msToTime(ms);
}

//functions
function draw_game() {
  window.requestAnimationFrame(draw_game);
  if(!game_active){
    if(pigeon.el.style.display === 'block') c.clear();
    return;
  }else{
    //update timer
    if(starting_time){
      const ms_passed = performance.now() - starting_time;
      setTime(ms_passed);
    }
  }
  updatePlayerColor();
  draw_tank();
  draw_grid(debug.grid.a, debug.grid.b);
  check_dead_enemies();
  draw_projectiles();
  draw_enemies();
  draw_apples();
  apple_collision_check();
  handle_enemy_collision();
}
window.requestAnimationFrame(draw_game);

function draw_grid(a, b) {
  if (!debug.grid.active) return;
  c.begin();
  c.set_property("strokeStyle", "pink");
  let snippet_a = canvas.width / a;
  let snippet_b = canvas.height / b;
  for (let i = 0; i < a; i++) {
    c.moveTo(snippet_a * i, 0);
    c.lineTo(snippet_a * i, canvas.height);
    c.stroke();
  }
  for (let i = 0; i < b; i++) {
    c.moveTo(0, snippet_b * i);
    c.lineTo(canvas.width, snippet_b * i);
    c.stroke();
  }
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      c.begin();
      c.set_property("lineWidth", 0.5);
      c.set_property("strokeStyle", "black");
      c.strokeText(`a: ${i} b: ${j}`, snippet_a * i, snippet_b * j, 0.1);
    }
  }
}

function draw_tank() {
  you.update_radius();
  you.update_speed();
  you.update_pos();
  you.update_color(...get_rgb());
  c.clear();
  c.begin();
  c.set_property("lineWidth", 1000 / get_rgb()[0]);
  c.set_property("strokeStyle", you.color);
  c.moveTo(you.x, you.y);
  c.lineTo(mouse.x, mouse.y);
  c.stroke();

  c.begin();
  c.set_property("lineWidth", 5);
  c.set_property(
    "strokeStyle",
    clock.cd.locked.shoot_enemy ? "darkred" : "lime"
  );
  let _100percent = 2 * Math.PI;
  let _current_percent =
    (clock.cd.current.shoot_enemy / clock.cd.default.shoot_enemy) * 100;
  c.arc(
    mouse.x,
    mouse.y,
    u / 2,
    0,
    clock.cd.locked.shoot_enemy
      ? (_100percent / 100) * _current_percent
      : _100percent
  );
  c.stroke();

  c.begin();
  c.set_property("fillStyle", you.activeColor);
  c.arc(you.x, you.y, you.r, 0, 2 * Math.PI);
  c.fill();
  c.set_property("strokeStyle", "darkorange");
  c.set_property("lineWidth", 2.5);
  c.stroke();

  c.begin();
  c.set_property("lineWidth", 4);
  c.set_property("strokeStyle", "black");
  c.strokeText(`${you.hp} HP`, you.x - you.r, you.y + you.r * 1.5, 0.5);

  c.begin();
  c.set_property("fillStyle", you.activeColor);
  c.fillText(`${you.hp} HP`, you.x - you.r, you.y + you.r * 1.5, 0.5);
}

function draw_apples() {
  for (apple in apples) {
    c.begin();
    c.set_property("fillStyle", apples[apple].color);
    c.arc(apples[apple].x, apples[apple].y, apples[apple].r, 0, 2 * Math.PI);
    c.fill();
    apples[apple].update_values();
  }
}

function draw_enemies() {
  for (enemy of enemies) {
    c.begin();
    c.set_property("fillStyle", enemy.enemyColor);
    c.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    c.begin();
    c.set_property("lineWidth", 4);
    c.set_property("strokeStyle", "black");
    c.strokeText(
      `${enemy.hp.toFixed(2)} HP`,
      enemy.x,
      enemy.y - enemy.h / 300,
      enemy.h / 300
    );

    c.begin();
    c.set_property("fillStyle", "purple");
    c.fillText(
      `${enemy.hp.toFixed(2)} HP`,
      enemy.x,
      enemy.y - enemy.h / 300,
      enemy.h / 300
    );
    draw_enemy_skin(enemy);
    enemy.update_values();
  }
}

function proj_loop() {
  for (const element of proj_timers) {
    if (element._timer.ready()) {
      create_projectiles(element._enemy);
    }
  }
  requestAnimationFrame(proj_loop); // loop every frame
}

function start_proj_loop() {
  console.log(enemies);
  for (const enemy of enemies) {
    create_projectiles(enemy);
    let p_timer = new ProjClock(enemy.p_cd);
    proj_timers.push({ _timer: p_timer, _enemy: enemy });
  }
  requestAnimationFrame(proj_loop); // start loop once
}

function create_projectiles(enemy) {
  let index = enemy.projectile_directions.indexOf(1);
  let indexes = [];
  while (index != -1) {
    indexes.push(index);
    index = enemy.projectile_directions.indexOf(1, index + 1);
  }
  for (dir of indexes) {
    let proj = new Projectile(
      enemy.projectile_type,
      dir,
      { x: enemy.raw.x + enemy.raw.w / 2, y: enemy.raw.y + enemy.raw.h / 2 },
      enemy.raw.w / 4,
      enemy.p_rscale,
      enemy.pdamage,
      enemy.pbouncy,
      enemy.bounceTime,
      enemy.pwavy,
      enemy.pfrequency,
      enemy.pamplitude
    );
    projectiles.push(proj);
    if(!enemy.p_ctxs.includes(proj)) enemy.p_ctxs.push(proj);
  }
}

function delete_projectile(projectile){
  let i = projectiles.indexOf(projectile);
  projectiles.splice(i, 1);
}

function handle_bounce(projectile){
  let situation = '';
  let x = '.';
  if(projectile.x > pigeon.el.width){
    x = '+'
  }else if(projectile.x < 0){
    x = '-'
  }
  let y = '.';
  if(projectile.y > pigeon.el.height){
    y = '+'
  }else if(projectile.y < 0){
    y = '-'
  }
  situation += projectile.direction;
  situation += x;
  situation += y;
  let situation_map = {
    '1.-': 5,
    '3+.': 7,
    '5.+': 1,
    '7-.': 3,
    '2.-': 4,
    '4+.': 6,
    '6.+': 8,
    '8-.': 2,
    '8.-': 6,
    '2+.': 8,
    '4.+': 2,
    '6-.': 4,
    '2+-': 6,
    '4++': 8,
    '6-+': 2,
    '8--': 4,
  }
  projectile.direction = situation_map[situation];
}

function handle_offscreen_projectile(projectile) {
  if (
    projectile.x > pigeon.el.width ||
    projectile.x < 0 ||
    projectile.y > pigeon.el.height ||
    projectile.y < 0
  ) {
    if(!projectile.bouncy){
      delete_projectile(projectile);
    }else{
      handle_bounce(projectile);
    }
  }
}

function draw_projectiles() {
  if (!projectiles.length > 0) return; //console.warn("projectiles not existing yet");
  for (proj of projectiles) {
    proj.update_radius();
    proj.update_speed();
    proj.update_pos();
    handle_projectile_collision(proj);
    draw_projectile_skin(proj);
    handle_offscreen_projectile(proj);
  }
}

function handle_projectile_collision(projectile) {
  let curr = projectile;
  let index = projectiles.indexOf(projectile);
  let d = distance(curr.x, curr.y, you.x, you.y);
  if (d < curr.r + you.r && !clock.cd.locked.enemy_knock_damage) {
    if(projectile.type === "Freeze"){
      freezeClock.freeze();
    }
    clock.enemy_knock_damage();
    you.hp -= curr.damage;
    projectiles.splice(index, 1);
  }
}

function updatePlayerColor() {
  if (freezeClock.is_frozen()) {
    you.activeColor = you.freezeColor;
  } else if (clock.cd.locked.enemy_knock_damage) {
    you.activeColor = you.damageColor;
  } else {
    you.activeColor = you.playerColor;
  }
}


function is_player_outside_canvas(side) {
  let _barrier;
  switch (side) {
    case "left":
      _barrier = you.x + you.xOffset-- * you.speed - you.r < 0;
      break;
    case "right":
      _barrier = you.x + you.xOffset++ * you.speed + you.r > canvas.width;
      break;
    case "up":
      _barrier = you.y + you.yOffset-- * you.speed - you.r < 0;
      break;
    case "down":
      _barrier = you.y + you.yOffset++ * you.speed + you.r > canvas.height;
      break;
  }
  return _barrier;
}

function handle_player_move(x_or_y, pos_or_neg) {
  if (x_or_y != "x" && x_or_y != "y")
    throw Error("x or y expected as argument!");
  if (pos_or_neg != "+" && pos_or_neg != "-")
    throw Error("+ or - expected as argument!");
  let sides = {
    "-x": "left",
    "+x": "right",
    "-y": "up",
    "+y": "down",
  };
  let combo = pos_or_neg + x_or_y;
  if (!is_player_outside_canvas(sides[combo])) {
    switch (combo) {
      case "-x":
        you.xOffset--;
        break;
      case "+x":
        you.xOffset++;
        break;
      case "-y":
        you.yOffset--;
        break;
      case "+y":
        you.yOffset++;
        break;
    }
  } else {
    you.xOffset = 0;
    you.yOffset = 0;
  }
}

function handle_keys() {
  window.requestAnimationFrame(handle_keys);
  you.xOffset = 0;
  you.yOffset = 0;
  if(freezeClock.is_frozen()) return;
  for (key in keys) {
    switch (key) {
      case "u":
        keys[key] ? handle_player_move("y", "-") : null;
        break;
      case "d":
        keys[key] ? handle_player_move("y", "+") : null;
        break;
      case "l":
        keys[key] ? handle_player_move("x", "-") : null;
        break;
      case "r":
        keys[key] ? handle_player_move("x", "+") : null;
        break;
    }
  }
}

window.requestAnimationFrame(handle_keys);

//event listeners
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      keys.u = true;
      break;
    case "ArrowDown":
      keys.d = true;
      break;
    case "ArrowLeft":
      keys.l = true;
      break;
    case "ArrowRight":
      keys.r = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowUp":
      keys.u = false;
      break;
    case "ArrowDown":
      keys.d = false;
      break;
    case "ArrowLeft":
      keys.l = false;
      break;
    case "ArrowRight":
      keys.r = false;
      break;
  }
});

//shooting logic
function apply_shoot_enemy(_x, _y) {
  for (let enemy of enemies) {
    if (
      _x > enemy.corners.lu.x &&
      _x < enemy.corners.rd.x &&
      _y > enemy.corners.lu.y &&
      _y < enemy.corners.rd.y
    ) {
      console.log("Enemy hit!");
      enemy.hp -= (you.damage * 100) / get_rgb()[0];
      enemy.damage_active = true;
      enemy.enemyColor = skin_colors[enemy.type].damaged_body;
      setTimeout(() => {
        enemy.damage_active = false;
      }, 150);
      clock.shoot_enemy();
    }
  }
}

function check_dead_enemies() {
  for (let enemy of enemies) {
    if (enemy.hp <= 0) {
      let i = 0;
      while (enemy != proj_timers[i]._enemy) {
        i++;
      }
      proj_timers.splice(i, 1);
      enemies.splice(enemies.indexOf(enemy), 1);
      while(enemy.p_ctxs.length > 0){
        delete_projectile(enemy.p_ctxs[enemy.p_ctxs.length-1]);
        enemy.p_ctxs.pop();
      }
    }
  }
}

document.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;
  if (!clock.cd.locked.shoot_enemy) apply_shoot_enemy(e.clientX, e.clientY);
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

//start game
//load_level(1);
function switch_menu_to_game(){
  menu_cont.style.display = 'none';
  pigeon.el.style.display = 'block';
  timer.style.display = 'flex';
}

function switch_game_to_menu(){
  menu_cont.style.display = 'flex';
  pigeon.el.style.display = 'none';
  timer.style.display = 'none';
  updateHighscoreText();
}

//temporary
function handleGameFinished(){
  if(!game_active && game_completed){
    switch_game_to_menu();
    return;
  }
  window.requestAnimationFrame(handleGameFinished);
}
window.requestAnimationFrame(handleGameFinished);

function start_game(){
  if(game_active) return;
  switch_menu_to_game();
  load_level(1);
  setTimeout(start_proj_loop, 250);
}

//check if dead
function spawn_player() {
  you.hp = 500;
  you.raw.x = respawn_point.x;
  you.raw.y = respawn_point.y;
  you.rFactor = 0.75;
}
function apply_death() {
  load_level(current_level);
  spawn_player();
  setTimeout(start_proj_loop, 250);
}

function check_death() {
  if (you.hp <= 0) {
    apply_death();
  }
}
setInterval(check_death, 0);

function check_level_completion() {
  if(override) return; //remove if cheaty thing is disabled
  if (game_active && enemies.length === 0 && levels[current_level + 1]) {
    current_level++;
    load_level(current_level);
    spawn_player();
    setTimeout(start_proj_loop, 250);
  }
}
setInterval(check_level_completion, 0);

//cheaty
var override = false;
function safe_switch_level(level){
  override = true;
  if(!game_active) game_active = true;
  enemies.length = 0;
  current_level = level-1;
  spawn_player();
  override = false;
}