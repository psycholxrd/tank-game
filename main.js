const timer = document.getElementById("timer");
const menu_cont = document.getElementById("menu-container");
const difficulty_cont = document.getElementById("difficulty-container");
const chosen_difficulty = document.getElementById("chosen-difficulty");
const level_selector_cont = document.getElementById("level-selector-container");
const level_editor_cont = document.getElementById("level-editor-container");
const game_cont = document.getElementById('game-container');
const highscore_text = document.getElementById("highscore");
const entity_panel = document.getElementById("entity-panel");
const grid_slider = document.getElementById("grid-intensity");
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

function getDist(x1, y1, x2, y2){
  return Math.hypot(x2-x1, y2-y1);
}

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
  highscore_text.innerHTML = "Best Time: " + suffix;
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

function draw_grid(a, b, _c = c, lines = true, text = true) {
  if (_c == c && !debug.grid.active) return;
  _c.begin();
  _c.set_property("strokeStyle", "darkblue");
  let snippet_a = _c.canvas.width / a;
  let snippet_b = _c.canvas.height / b;
  for (let i = 0; i < a; i++) {
    if(!lines) break;
    _c.moveTo(snippet_a * i, 0);
    _c.lineTo(snippet_a * i, _c.canvas.height);
    _c.stroke();
  }
  for (let i = 0; i < b; i++) {
    if(!lines) break;
    _c.moveTo(0, snippet_b * i);
    _c.lineTo(_c.canvas.width, snippet_b * i);
    _c.stroke();
  }
  for (let i = 0; i < a; i++) {
    if(!text) break;
    for (let j = 0; j < b; j++) {
      _c.begin();
      _c.set_property("lineWidth", 0.5);
      _c.set_property("strokeStyle", "black");
      _c.strokeText(`a: ${i} b: ${j}`, snippet_a * i, snippet_b * j, 0.1);
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
    case "KeyW":
    case "ArrowUp":
      keys.u = true;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.d = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.l = true;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.r = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
      keys.u = false;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.d = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.l = false;
      break;
    case "KeyD":
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

//screen changer
const allowed_screens = ['menu', 'game', 'difficulty', 'level-selector', 'level-editor', 'game-completed'];
const screen_displays = {
  'menu': 'flex',
  'game': 'block',
  'difficulty': 'flex',
  'level-selector': 'flex',
  'level-editor': 'flex',
  'game-completed': 'block' 
}
const screen_containers = {
  'menu': menu_cont,
  'game': game_cont,
  'difficulty': difficulty_cont,
  'level-selector': level_selector_cont,
  'level-editor': level_editor_cont,
  'game-completed': {},
};

let active_screen = 'menu';
function change_screen(new_screen){
  if(!allowed_screens.includes(new_screen)) return console.warn(new_screen + ' is not allowed!');
  screen_containers[active_screen].style.display = 'none';
  screen_containers[new_screen].style.display = screen_displays[new_screen];
  active_screen = new_screen;
}

//start game
//load_level(1);

//temporary
function handleGameFinished(){
  if(!game_active && game_completed){
    change_screen('menu');
    updateHighscoreText();
    return;
  }
  window.requestAnimationFrame(handleGameFinished);
}
window.requestAnimationFrame(handleGameFinished);

function start_game(){
  if(game_active) return;
  change_screen('game');
  load_level(1);
  setTimeout(start_proj_loop, 250);
}

function open_difficulties(){
  change_screen('difficulty');
}

function setEasyDifficulty(){
  difficulty = "easy";
  chosen_difficulty.innerHTML = 'Difficulty: Easy';
  change_screen('menu');
}

function setNormalDifficulty(){
  difficulty = "normal";
  chosen_difficulty.innerHTML = 'Difficulty: Normal';
  change_screen('menu');
}

function setHardDifficulty(){
  difficulty = "hard";
  chosen_difficulty.innerHTML = 'Difficulty: Hard';
  change_screen('menu');
}

function open_level_selector(){
  change_screen('level-selector');
}
let editor_canvas_mouse = {
  x: 0,
  y: 0,
}

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

c2.canvas.addEventListener('mousemove', (e) => {
  editor_canvas_mouse = getMousePos(c2.canvas, e);
})

let circle_units = {
  x: undefined,
  y: undefined,
}

function draw_pos_circles(grid_intensity){
  let a = debug.grid.a / grid_intensity;
  let b = debug.grid.b / grid_intensity;
  let r = u2/10;
  let snippet_a = c2.canvas.width / a;
  let snippet_b = c2.canvas.height / b;
  
  // Reset these every frame so we don't snap to old positions
  let temp_x = undefined; 
  let temp_y = undefined;

  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      const x = i * snippet_a;
      const y = j * snippet_b;
      const d = getDist(x, y, editor_canvas_mouse.x, editor_canvas_mouse.y);
      
      c2.begin();
      c2.set_property('globalAlpha', 0.2);
      
      if(d < r){
        c2.set_property('fillStyle', 'green');
        temp_x = i; // This is the index (0, 1, 2...)
        temp_y = j;
      } else {
        c2.set_property('fillStyle', 'red');
      }
      c2.arc(x, y, r, 0, 2*Math.PI, false);
      c2.fill();
      c2.set_property('globalAlpha', 1);
    }
  }
  circle_units.x = temp_x;
  circle_units.y = temp_y;
}

let last_editor_type, last_editor_entity;

function drawEditorApples(_apples){
  for(let _apple of _apples){
    let temp_apple = new Apple(..._apple, 'u2');
    temp_apple.update_values();
    c2.begin();
    c2.set_property("fillStyle", temp_apple.color);
    c2.arc(temp_apple.x, temp_apple.y, temp_apple.r, 0, 2 * Math.PI);
    c2.fill();
  }
}

function drawEditorEnemies(_enemies){
  for(let enemy of _enemies){
    let _enemy = new Enemy(
      enemy[0],
      enemy[1],
      enemy[2],
      enemy[2],
      enemy[4],
      'u2'
    );
    switch (enemy[3]) {
      case "slave":
        _enemy.is_Slave = true;
        _enemy.is_Boss = false;
        break;
      case "boss":
        _enemy.is_Slave = false;
        _enemy.is_Boss = true;
        break;
    }
    _enemy.update_values();
    _enemy.damage_active
          ? null
          : (_enemy.enemyColor = skin_colors[_enemy.type].body);
    c2.begin();
    c2.set_property("fillStyle", _enemy.enemyColor);
    c2.fillRect(_enemy.x, _enemy.y, _enemy.w, _enemy.h);
    draw_enemy_skin(_enemy, c2);
  }
}

let editor_level = {enemies: [], apples: []}; //default
let active_editor_level;
let u3 = 1;
let entity_default_canvases = {
  slaves: [],
  bosses: [],
  apples: [],
};

let grid_intensity = 1;

grid_slider.addEventListener('input', (e) => {
  grid_intensity = grid_slider.value*0.25;
  grid_slider.innerHTML = grid_slider.value;
})

function update_editor_canvas(){
  c2.clear();
  drawEditorEnemies(editor_level.enemies);
  drawEditorApples(editor_level.apples);
  draw_grid(debug.grid.a / grid_intensity, debug.grid.b / grid_intensity, c2, true, false);
  draw_pos_circles(grid_intensity);
  window.requestAnimationFrame(update_editor_canvas);
}

let dragPreview = null;

function start_entity_drag(entity_type, name, e) {
  // Create clone canvas (not appended to panel)
  const cloneCanvasWrapper = new_entity_canvas(entity_type, name, true);
  const cloneCanvas = cloneCanvasWrapper.canvas; 
  // assuming your Canvas class stores .canvas reference

  cloneCanvas.classList.add('entity-drag-preview');
  document.body.appendChild(cloneCanvas);

  dragPreview = cloneCanvas;

  move_drag_preview(e);

  window.addEventListener('mousemove', move_drag_preview);
  window.addEventListener('mouseup', end_entity_drag);
}

function move_drag_preview(e) {
  if (!dragPreview) return;
  dragPreview.style.left = e.clientX + 'px';
  dragPreview.style.top  = e.clientY + 'px';
}

function end_entity_drag() {
  if (!dragPreview) return;
  dragPreview.remove();
  dragPreview = null;

  if(circle_units.x !== undefined && circle_units.y !== undefined){
    const normalizedX = circle_units.x * grid_intensity;
    const normalizedY = circle_units.y * grid_intensity;
    const scale = parseInt(document.getElementById(`${last_editor_entity}-slider`).value)*0.05;
    if(last_editor_type === 'apple'){
      editor_level.apples.push([normalizedX, normalizedY, scale]);
    } else {
      editor_level.enemies.push([normalizedX, normalizedY, scale, last_editor_type, last_editor_entity]);
    }
  }

  window.removeEventListener('mousemove', move_drag_preview);
  window.removeEventListener('mouseup', end_entity_drag);
}


function new_entity_canvas(entity_type, name, clone = false){
  let _canvas = document.createElement('canvas');
  _canvas.width = 256;
  _canvas.height = 256;
  _canvas.classList.add('entity-canvas');
  let _ctx = _canvas.getContext('2d');
  let _c = new Canvas(_canvas, _ctx);
  if(!clone){
    _canvas.addEventListener('mousedown', (e) => {
      last_editor_type = entity_type;
      last_editor_entity = name;
      start_entity_drag(entity_type, name, e);
    })
    entity_panel.appendChild(_canvas);
    //slider
    let slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 2;
    slider.max = 40;
    slider.value = 10;
    slider.id = `${name}-slider`;
    entity_panel.appendChild(slider);
  }
  if(entity_type === 'apple'){
    let _apple = new Apple(_canvas.width/2, _canvas.width/2, 75, '');
    _apple.update_values();
    _c.begin();
    _c.set_property("fillStyle", _apple.color);
    _c.arc(_apple.x, _apple.y, _apple.r, 0, 2 * Math.PI);
    _c.fill();
    return _c;
  }
  const sF = 5;
  let _enemy = new Enemy(_canvas.width/sF, _canvas.width/sF, _canvas.width-(_canvas.width/(sF/2)), _canvas.width-(_canvas.width/(sF/2)), name, '');
  switch (entity_type) {
      case "slave":
        _enemy.is_Slave = true;
        _enemy.is_Boss = false;
        break;
      case "boss":
        _enemy.is_Slave = false;
        _enemy.is_Boss = true;
        break;
    }
  _enemy.update_values();
  _enemy.damage_active
      ? null
      : (_enemy.enemyColor = skin_colors[_enemy.type].body);
  _c.begin();
  _c.set_property("fillStyle", _enemy.enemyColor);
  _c.fillRect(_enemy.x, _enemy.y, _enemy.w, _enemy.h);
  draw_enemy_skin(_enemy, _c);
  return _c;
}

function create_entity_default_canvases(){
  const e = entity_default_canvases;
  for(let i = 0; i < slave_types.length; i++){
    e.slaves.push(new_entity_canvas('slave', slave_types[i]));
  }
  for(let i = 0; i < boss_types.length; i++){
    e.bosses.push(new_entity_canvas('boss', boss_types[i]));
  }
  //there is only 1 type of apples so...
  entity_default_canvases.apples.push(new_entity_canvas('apple', 'apple'));
}

function open_level(key){
  editor_level = levels[key];
  active_editor_level = key;
  create_entity_default_canvases();
  change_screen('level-editor');
  draw_grid(debug.grid.a, debug.grid.b, c2, true, false);
  window.requestAnimationFrame(update_editor_canvas);
}

function loadLevelButtons(){
  let keys = Object.keys(levels);
  for(let key of keys){
    let btn = document.createElement('div');
    btn.innerHTML = key;
    btn.classList.add('level-selector-btn');
    btn.addEventListener("mousedown", (e) => {
      open_level(key);
    });
    level_selector_cont.appendChild(btn);
  }
  let btn = document.createElement('div');
  btn.innerHTML = 'return back to menu';
  btn.classList.add('level-selector-btn');
  btn.addEventListener("mousedown", (e) => {
    change_screen('menu');
  });
  level_selector_cont.appendChild(btn);
}
loadLevelButtons();

//functions for level loading/saving
function export_level(){
  window.navigator.clipboard.writeText(JSON.stringify(editor_level));
  alert('copied!');
}

function import_level(){
  let level_contents = prompt('Enter the exported level data', '{"apples": [], "enemies": [[3.25, 2.25, 0.5, "slave", "Frosty"]]}');
  let level_obj;
  if(level_contents !== null && level_contents !== ''){
    try{
      level_obj = JSON.parse(level_contents);
    }catch(err){
      let problems = [];
      let problem_str = 'Importing failed! Possible problems:';
      if(!level_contents.includes('{') || !level_contents.includes('}')) problems.push('imported Level is probably not an object');
      if(!level_contents.includes('enemies')) problems.push('Missing enemies key');
      if(!level_contents.includes('apples')) problems.push('Missing apples key');
      if(problems.length === 0) problems.push(err);
      for(let problem of problems){
        problem_str += `\n- ${problem}`;
      }
      alert(problem_str);
      return;
    }
  }else{
    return;
  }
  if(!level_obj.enemies || level_obj.enemies.length === 0){
    alert('need at least 1 enemy!');
    return;
  }
  levels[active_editor_level] = level_obj;
  editor_level = levels[active_editor_level];
}

function remember_level(){
  localStorage.setItem(`[Tanks] Level ${active_editor_level}`, JSON.stringify(editor_level));
  alert('Successfully remembered level! It will now automatically load even when you refresh the page. To undo this, click the "Forget level" button.');
}

function forget_level(){
  let answer = confirm('Are you sure you want to forget level?\nAfter you do this, your changes will be deleted once you refresh the page.');
  if(answer) localStorage.removeItem(`[Tanks] Level ${active_editor_level}`);
}

function reset_level(){
  let answer = confirm('Are you sure you want to reset Level?\nAll your changes will be deleted,\nunless you pressed Remember level\nand reload the page.');
  if(answer){
    levels[active_editor_level] = default_levels[active_editor_level];
    editor_level = levels[active_editor_level];
    alert('Resetting completed.');
  }
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