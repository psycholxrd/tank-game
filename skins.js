let boss_types = ["Ice Wizard", "Cry Baby", "Mega Org"];
let slave_types = ["Frosty", "Crier", "Org"];
let skin_colors = {
  //Enemies
  "Ice Wizard": {
    body: "pink",
    damaged_body: "LightCoral",
    left_eye: "white",
    right_eye: "white",
    mouth: "white",
    upper_beard: "lightblue",
    bottom_beard: "lightblue",
  },
  "Cry Baby": {
    body: "SlateBlue",
    damaged_body: "MediumSlateBlue",
    left_eyebrow: "black",
    left_eye: "black",
    right_eyebrow: "black",
    right_eye: "black",
    mouth: "black",
  },
  "Mega Org": {
    body: "darkgreen",
    damaged_body: "DarkSeaGreen",
    big_eye: "white",
    small_eye: "black",
    big_belt: "Olive",
    small_belt: "OliveDrab",
  },
  Frosty: {
    body: "Plum",
    damaged_body: "Magenta",
    left_eye: "black",
    right_eye: "black",
  },
  Crier: {
    body: "darkblue",
    damaged_body: "RoyalBlue",
    left_tear: "lightblue",
    left_eye: "white",
    right_tear: "lightblue",
    right_eye: "white",
  },
  Org: {
    body: "darkgreen",
    damaged_body: "DarkSeaGreen",
    big_eye: "white",
    small_eye: "black",
  },
  //Projectiles
  Freeze: {
    outline: "lightblue",
  },
  BigTear: {
    outline: "darkblue",
    inside: "blue",
  },
  BigSnipe: {
    outline: "darkred",
    target_line: "red",
    target_circle: "yellow",
  },
  Arrow: {
    outline: "magenta",
  },
  Tear: {
    outline: "purple",
    inside: "white",
  },
  Snipe: {
    outline: "darkred",
    target_line: "red",
    target_circle: "yellow",
  },
  //debug
  default: {
    test: "green",
  },
};

function draw_enemy_skin(Enemy) {
  //console.log("argument passed: ", Enemy);
  if (Enemy.is_Boss) {
    //console.log("is Boss is true!");
    switch (Enemy.type) {
      case boss_types[0]:
        //console.log("type matched", boss_types[0]);
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //left eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].left_eye);
        c.moveTo(Enemy.x + Enemy.w / 8, Enemy.y + Enemy.h / 2);
        c.lineTo(Enemy.x + Enemy.w / 8, Enemy.y + Enemy.h / 4);
        c.lineTo(Enemy.x + (Enemy.w / 8) * 3, Enemy.y + Enemy.h / 2);
        c.fill();

        //right eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].right_eye_eye);
        c.moveTo(Enemy.x + (Enemy.w / 8) * 5, Enemy.y + Enemy.h / 2);
        c.lineTo(Enemy.x + (Enemy.w / 8) * 7, Enemy.y + Enemy.h / 4);
        c.lineTo(Enemy.x + (Enemy.w / 8) * 7, Enemy.y + Enemy.h / 2);
        c.fill();

        //beard

        //top light blue half circle
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].upper_beard);
        c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + Enemy.h,
          Enemy.w / 3,
          1 * Math.PI,
          0
        );
        c.fill();
        //inner white circle
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].mouth);
        c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + (Enemy.h / 8) * 7,
          Enemy.w / 10,
          0,
          2 * Math.PI
        );
        c.fill();
        //bottom part of the beard
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].bottom_beard);
        c.moveTo(Enemy.x + Enemy.w / 2 - Enemy.w / 3, Enemy.y + Enemy.h);
        c.lineTo(Enemy.x + Enemy.w / 2 + Enemy.w / 3, Enemy.y + Enemy.h);
        c.lineTo(Enemy.x + Enemy.w / 2 + Enemy.w / 3, Enemy.y + Enemy.h * 1.5);
        c.lineTo(Enemy.x + Enemy.w / 2 + Enemy.w / 6, Enemy.y + Enemy.h * 1.25);
        c.lineTo(Enemy.x + Enemy.w / 2, Enemy.y + Enemy.h * 1.5);
        c.lineTo(Enemy.x + Enemy.w / 2 - Enemy.w / 6, Enemy.y + Enemy.h * 1.25);
        c.lineTo(Enemy.x + Enemy.w / 2 - Enemy.w / 3, Enemy.y + Enemy.h * 1.5);
        c.lineTo(Enemy.x + Enemy.w / 2 - Enemy.w / 3, Enemy.y + Enemy.h); //last line
        c.fill();
        break;
      case boss_types[1]:
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //left eyebrow
        c.begin();
        c.set_property("strokeStyle", skin_colors[Enemy.type].left_eyebrow);
        c.moveTo(Enemy.x + Enemy.w / 8, Enemy.y + (Enemy.h / 8) * 3);
        c.lineTo(Enemy.x + (Enemy.w / 8) * 3, Enemy.y + Enemy.h / 4);
        c.stroke();
        //left closed eye
        c.begin();
        c.set_property("strokeStyle", skin_colors[Enemy.type].left_eye);
        c.arc(
          Enemy.x + Enemy.w / 4,
          Enemy.y + (Enemy.h / 16) * 8,
          (Enemy.w / 16) * 3,
          0,
          1 * Math.PI
        );
        c.stroke();
        //right eyebrow
        c.begin();
        c.set_property("strokeStyle", skin_colors[Enemy.type].right_eyebrow);
        c.moveTo(Enemy.x + (Enemy.w / 8) * 5, Enemy.y + Enemy.h / 4);
        c.lineTo(Enemy.x + (Enemy.w / 8) * 7, Enemy.y + (Enemy.h / 8) * 3);
        c.stroke();
        //right closed eye
        c.begin();
        c.set_property("strokeStyle", skin_colors[Enemy.type].right_eye);
        c.arc(
          Enemy.x + (Enemy.w / 4) * 3,
          Enemy.y + (Enemy.h / 16) * 8,
          (Enemy.w / 16) * 3,
          0,
          1 * Math.PI
        );
        c.stroke();
        //mouth
        c.begin();
        c.set_property("strokeStyle", skin_colors[Enemy.type].mouth);
        c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + (Enemy.h / 8) * 7,
          Enemy.w / 16,
          1 * Math.PI,
          0
        );
        c.stroke();
        //left leg
        c.begin();
        c.set_property("fillStyle", Enemy.enemyColor);
        c.fillRect(
          Enemy.x + Enemy.w / 8,
          Enemy.y + Enemy.h,
          Enemy.w / 8,
          Enemy.h / 4
        );
        //right legt
        c.begin();
        c.set_property("fillStyle", Enemy.enemyColor);
        c.fillRect(
          Enemy.x + (Enemy.w / 8) * 6,
          Enemy.y + Enemy.h,
          Enemy.w / 8,
          Enemy.h / 4
        );
        break;
      case boss_types[2]:
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //White eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].big_eye);
        c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + Enemy.h / 4,
          (Enemy.w / 8) * 3,
          0,
          1 * Math.PI
        );
        c.fill();
        //black eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].small_eye);
        c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + (Enemy.h / 16) * 7,
          Enemy.w / 8,
          0,
          2 * Math.PI
        );
        c.fill();
        //belt (big)
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].big_belt);
        c.fillRect(
          Enemy.x - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        c.fillRect(
          Enemy.x + Enemy.w / 3 - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        c.fillRect(
          Enemy.x + (Enemy.w / 3) * 2 - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        c.fillRect(
          Enemy.x + Enemy.w - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        //belt (small)
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].small_belt);
        c.fillRect(
          Enemy.x + Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 6
        );
        c.fillRect(
          Enemy.x + Enemy.w / 3 + Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 6
        );
        c.fillRect(
          Enemy.x + (Enemy.w / 3) * 2 + Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 6
        );
        break;
    }
  } else if (Enemy.is_Slave) {
    //console.log("is slave is true!");
    switch (Enemy.type) {
      case slave_types[0]:
        //console.log("type matched", slave_types[0]);
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //left eye
        c.begin();
        c.set_property("strokeStyle", skin_colors[Enemy.type].left_eye);
        c.moveTo(Enemy.x + Enemy.w / 8, Enemy.y + Enemy.h / 2);
        c.lineTo(Enemy.x + Enemy.w / 4, Enemy.y + Enemy.h / 4);
        c.lineTo(Enemy.x + (Enemy.w / 8) * 3, Enemy.y + Enemy.h / 2);
        c.stroke();

        //right eye
        c.begin();
        c.set_property("strokeStyle", skin_colors[Enemy.type].right_eye);
        c.moveTo(Enemy.x + (Enemy.w / 8) * 5, Enemy.y + Enemy.h / 2);
        c.lineTo(Enemy.x + (Enemy.w / 4) * 3, Enemy.y + Enemy.h / 4);
        c.lineTo(Enemy.x + (Enemy.w / 8) * 7, Enemy.y + Enemy.h / 2);
        c.stroke();
        break;
      case slave_types[1]:
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //left tear
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].left_tear);
        c.fillRect(
          Enemy.x + Enemy.w / 8,
          Enemy.y + Enemy.h / 4,
          Enemy.w / 4,
          (Enemy.h / 4) * 3
        );
        //left eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].left_eye);
        c.arc(
          Enemy.x + Enemy.w / 4,
          Enemy.y + Enemy.h / 4,
          Enemy.w / 8,
          0,
          2 * Math.PI
        );
        c.fill();
        //right tear
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].right_tear);
        c.fillRect(
          Enemy.x + (Enemy.w / 8) * 5,
          Enemy.y + Enemy.h / 4,
          Enemy.w / 4,
          (Enemy.h / 4) * 3
        );
        //right eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].right_eye);
        c.arc(
          Enemy.x + (Enemy.w / 4) * 3,
          Enemy.y + Enemy.h / 4,
          Enemy.w / 8,
          0,
          2 * Math.PI
        );
        c.fill();
        break;
      case slave_types[2]:
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //white eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].big_eye);
        c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + Enemy.h / 2,
          Enemy.w / 4,
          0,
          2 * Math.PI
        );
        c.fill();
        //black eye
        c.begin();
        c.set_property("fillStyle", skin_colors[Enemy.type].small_eye);
        c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + Enemy.h / 2,
          Enemy.w / 8,
          0,
          2 * Math.PI
        );
        c.fill();
        break;
    }
  }
}

function draw_projectile_skin(projectile) {
  switch (projectile.type) {
    case "Freeze":
      let angles = {
        1: {
          start: Math.PI,
          end: 0,
        },
        2: {
          start: Math.PI,
          end: Math.PI / 2,
        },
        3: {
          start: -Math.PI / 2,
          end: Math.PI / 2,
        },
        4: {
          start: 1.5 * Math.PI,
          end: Math.PI,
        },
        5: {
          start: 0,
          end: Math.PI,
        },
        6: {
          start: 0,
          end: 1.5 * Math.PI,
        },
        7: {
          start: Math.PI / 2,
          end: -Math.PI / 2,
        },
        8: {
          start: Math.PI / 2,
          end: 0,
        },
      };
      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].outline);
      c.set_property("lineWidth", projectile.r / 5);
      c.arc(
        projectile.x,
        projectile.y,
        projectile.r,
        angles[projectile.direction].start,
        angles[projectile.direction].end,
        0
      );
      c.stroke();
      break;
    case "BigTear":
      c.begin();
      c.set_property("fillStyle", skin_colors[projectile.type].inside);
      c.arc(projectile.x, projectile.y, projectile.r, 0, 2 * Math.PI);
      c.fill();

      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].outline);
      c.set_property("lineWidth", projectile.r / 5);
      c.arc(projectile.x, projectile.y, projectile.r, 0, 2 * Math.PI);
      c.stroke();
      break;
    case "BigSnipe":
      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].outline);
      c.set_property("lineWidth", projectile.r / 5);
      c.arc(projectile.x, projectile.y, projectile.r, 0, 2 * Math.PI);
      c.stroke();

      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].target_line);
      c.set_property("lineWidth", projectile.r / 5);
      c.moveTo(projectile.x - projectile.r, projectile.y);
      c.lineTo(projectile.x + projectile.r, projectile.y);
      c.stroke();

      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].target_line);
      c.set_property("lineWidth", projectile.r / 5);
      c.moveTo(projectile.x, projectile.y - projectile.r);
      c.lineTo(projectile.x, projectile.y + projectile.r);
      c.stroke();

      c.begin();
      c.set_property("fillStyle", skin_colors[projectile.type].target_circle);
      c.arc(projectile.x, projectile.y, projectile.r / 4, 0, 2 * Math.PI);
      c.fill();
      break;
    case "Arrow":
      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].outline);
      c.set_property("lineWidth", projectile.r / 5);
      switch (projectile.direction) {
        case 1: //up
          c.moveTo(projectile.x - projectile.r, projectile.y);
          c.lineTo(projectile.x, projectile.y - projectile.r);
          c.lineTo(projectile.x + projectile.r, projectile.y);
          break;
        case 3: //right
          c.moveTo(projectile.x, projectile.y - projectile.r);
          c.lineTo(projectile.x + projectile.r, projectile.y);
          c.lineTo(projectile.x, projectile.y + projectile.r);
          break;
        case 5: //down
          c.moveTo(projectile.x - projectile.r, projectile.y);
          c.lineTo(projectile.x, projectile.y + projectile.r);
          c.lineTo(projectile.x + projectile.r, projectile.y);
          break;
        case 7: //left
          c.moveTo(projectile.x, projectile.y - projectile.r);
          c.lineTo(projectile.x - projectile.r, projectile.y);
          c.lineTo(projectile.x, projectile.y + projectile.r);
          break;
      }
      c.stroke();
      break;
    case "Tear":
      c.begin();
      c.set_property("fillStyle", skin_colors[projectile.type].inside);
      c.arc(projectile.x, projectile.y, projectile.r, 0, 2 * Math.PI);
      c.fill();

      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].outline);
      c.set_property("lineWidth", projectile.r / 5);
      c.arc(projectile.x, projectile.y, projectile.r, 0, 2 * Math.PI);
      c.stroke();
      break;
    case "Snipe":
      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].outline);
      c.set_property("lineWidth", projectile.r / 5);
      c.arc(projectile.x, projectile.y, projectile.r, 0, 2 * Math.PI);
      c.stroke();

      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].target_line);
      c.set_property("lineWidth", projectile.r / 5);
      c.moveTo(projectile.x - projectile.r, projectile.y);
      c.lineTo(projectile.x + projectile.r, projectile.y);
      c.stroke();

      c.begin();
      c.set_property("strokeStyle", skin_colors[projectile.type].target_line);
      c.set_property("lineWidth", projectile.r / 5);
      c.moveTo(projectile.x, projectile.y - projectile.r);
      c.lineTo(projectile.x, projectile.y + projectile.r);
      c.stroke();

      c.begin();
      c.set_property("fillStyle", skin_colors[projectile.type].target_circle);
      c.arc(projectile.x, projectile.y, projectile.r / 4, 0, 2 * Math.PI);
      c.fill();
      break;
  }
  /*for debugging
  c.begin();
  c.set_property("fillStyle", skin_colors.default.test);
  c.arc(projectile.x, projectile.y, projectile.r, 0, 2 * Math.PI);
  c.fill();
  */
}
