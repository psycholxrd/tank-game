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
    left_eye_brow: "black",
    right_eye_brow: "black",
    mouth: "black",
    outline: "black",
  },
  Crier: {
    body: "darkblue",
    damaged_body: "RoyalBlue",
    left_tear: "lightblue",
    left_eye: "white",
    left_eye_brow: "white",
    right_tear: "lightblue",
    right_eye: "white",
    right_eye_brow: "white",
    mouth: "white",
    outline: "black",
  },
  Org: {
    body: "darkgreen",
    damaged_body: "DarkSeaGreen",
    outer_eye: "white",
    big_eye: "maroon",
    small_eye: "black",
    eye_brow: "SaddleBrown",
    eye_brow_outline: "black",
    mouth: "black",
    outline: "black",
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

function draw_enemy_skin(Enemy, _c = c) {
  //console.log("argument passed: ", Enemy);
  const w = Enemy.w;
  const h = Enemy.h;
  const x = Enemy.x;
  const y = Enemy.y;
  const o = (base, unit, dimension=1, offset=1) => base + ((unit/dimension)*offset);
  if (Enemy.is_Boss) {
    //console.log("is Boss is true!");
    switch (Enemy.type) {
      case boss_types[0]:
        //console.log("type matched", boss_types[0]);
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //left eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_eye);
        _c.moveTo(Enemy.x + Enemy.w / 8, Enemy.y + Enemy.h / 2);
        _c.lineTo(Enemy.x + Enemy.w / 8, Enemy.y + Enemy.h / 4);
        _c.lineTo(Enemy.x + (Enemy.w / 8) * 3, Enemy.y + Enemy.h / 2);
        _c.fill();

        //right eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_eye_eye);
        _c.moveTo(Enemy.x + (Enemy.w / 8) * 5, Enemy.y + Enemy.h / 2);
        _c.lineTo(Enemy.x + (Enemy.w / 8) * 7, Enemy.y + Enemy.h / 4);
        _c.lineTo(Enemy.x + (Enemy.w / 8) * 7, Enemy.y + Enemy.h / 2);
        _c.fill();

        //beard

        //top light blue half circle
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].upper_beard);
        _c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + Enemy.h,
          Enemy.w / 3,
          1 * Math.PI,
          0
        );
        _c.fill();
        //inner white circle
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].mouth);
        _c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + (Enemy.h / 8) * 7,
          Enemy.w / 10,
          0,
          2 * Math.PI
        );
        _c.fill();
        //bottom part of the beard
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].bottom_beard);
        _c.moveTo(Enemy.x + Enemy.w / 2 - Enemy.w / 3, Enemy.y + Enemy.h);
        _c.lineTo(Enemy.x + Enemy.w / 2 + Enemy.w / 3, Enemy.y + Enemy.h);
        _c.lineTo(Enemy.x + Enemy.w / 2 + Enemy.w / 3, Enemy.y + Enemy.h * 1.5);
        _c.lineTo(Enemy.x + Enemy.w / 2 + Enemy.w / 6, Enemy.y + Enemy.h * 1.25);
        _c.lineTo(Enemy.x + Enemy.w / 2, Enemy.y + Enemy.h * 1.5);
        _c.lineTo(Enemy.x + Enemy.w / 2 - Enemy.w / 6, Enemy.y + Enemy.h * 1.25);
        _c.lineTo(Enemy.x + Enemy.w / 2 - Enemy.w / 3, Enemy.y + Enemy.h * 1.5);
        _c.lineTo(Enemy.x + Enemy.w / 2 - Enemy.w / 3, Enemy.y + Enemy.h); //last line
        _c.fill();
        break;
      case boss_types[1]:
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //left eyebrow
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].left_eyebrow);
        _c.moveTo(Enemy.x + Enemy.w / 8, Enemy.y + (Enemy.h / 8) * 3);
        _c.lineTo(Enemy.x + (Enemy.w / 8) * 3, Enemy.y + Enemy.h / 4);
        _c.stroke();
        //left closed eye
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].left_eye);
        _c.arc(
          Enemy.x + Enemy.w / 4,
          Enemy.y + (Enemy.h / 16) * 8,
          (Enemy.w / 16) * 3,
          0,
          1 * Math.PI
        );
        _c.stroke();
        //right eyebrow
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].right_eyebrow);
        _c.moveTo(Enemy.x + (Enemy.w / 8) * 5, Enemy.y + Enemy.h / 4);
        _c.lineTo(Enemy.x + (Enemy.w / 8) * 7, Enemy.y + (Enemy.h / 8) * 3);
        _c.stroke();
        //right closed eye
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].right_eye);
        _c.arc(
          Enemy.x + (Enemy.w / 4) * 3,
          Enemy.y + (Enemy.h / 16) * 8,
          (Enemy.w / 16) * 3,
          0,
          1 * Math.PI
        );
        _c.stroke();
        //mouth
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].mouth);
        _c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + (Enemy.h / 8) * 7,
          Enemy.w / 16,
          1 * Math.PI,
          0
        );
        _c.stroke();
        //left leg
        _c.begin();
        _c.set_property("fillStyle", Enemy.enemyColor);
        _c.fillRect(
          Enemy.x + Enemy.w / 8,
          Enemy.y + Enemy.h,
          Enemy.w / 8,
          Enemy.h / 4
        );
        //right legt
        _c.begin();
        _c.set_property("fillStyle", Enemy.enemyColor);
        _c.fillRect(
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
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].big_eye);
        _c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + Enemy.h / 4,
          (Enemy.w / 8) * 3,
          0,
          1 * Math.PI
        );
        _c.fill();
        //black eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].small_eye);
        _c.arc(
          Enemy.x + Enemy.w / 2,
          Enemy.y + (Enemy.h / 16) * 7,
          Enemy.w / 8,
          0,
          2 * Math.PI
        );
        _c.fill();
        //belt (big)
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].big_belt);
        _c.fillRect(
          Enemy.x - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        _c.fillRect(
          Enemy.x + Enemy.w / 3 - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        _c.fillRect(
          Enemy.x + (Enemy.w / 3) * 2 - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        _c.fillRect(
          Enemy.x + Enemy.w - Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 4
        );
        //belt (small)
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].small_belt);
        _c.fillRect(
          Enemy.x + Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 6
        );
        _c.fillRect(
          Enemy.x + Enemy.w / 3 + Enemy.w / 12,
          Enemy.y + Enemy.h,
          Enemy.w / 6,
          Enemy.h / 6
        );
        _c.fillRect(
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
      case slave_types[0]: //Frosty
        //console.log("type matched", slave_types[0]);
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);

        //left eye brow
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_eye_brow);
        _c.moveTo(x, o(y, h, 4));
        _c.lineTo(o(x, w, 8), o(y, h, 8));
        _c.lineTo(o(x, w, 8, 3), o(y, h, 8));
        _c.fill();

        //left eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_eye);
        _c.moveTo(o(x, w, 8), o(y, h, 2));
        _c.lineTo(o(x, w, 4), o(y, h, 4));
        _c.lineTo(o(x, w, 8, 3), o(y, h, 2));
        _c.lineTo(o(x, w, 4), o(y, h, 8, 3));
        _c.fill();

        //right eye brow
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_eye_brow);
        _c.moveTo(o(x, w, 8, 5), o(y, h, 8));
        _c.lineTo(o(x, w, 8, 7), o(y, h, 8));
        _c.lineTo(o(x, w), o(y, h, 4));
        _c.fill();

        //right eye
       _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_eye);
        _c.moveTo(o(x, w, 8, 5), o(y, h, 2));
        _c.lineTo(o(x, w, 4, 3), o(y, h, 4));
        _c.lineTo(o(x, w, 8, 7), o(y, h, 2));
        _c.lineTo(o(x, w, 8, 6), o(y, h, 8, 3));
        _c.fill();

        //mouth
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].mouth);
        _c.moveTo(o(x, w, 8), o(y, h, 8, 5));
        _c.lineTo(o(x, w, 8, 7), o(y, h, 8, 5));
        _c.lineTo(o(x, w, 8, 6), o(y, h, 8, 6));
        _c.lineTo(o(x, w, 2), o(y, h, 8, 7));
        _c.lineTo(o(x, w, 4), o(y, h, 8, 6));
        _c.fill();

        //outline
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].outline);
        _c.strokeRect(x, y, w, h);
        break;
      case slave_types[1]: //Crier
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //left tear
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_tear);
        _c.fillRect(
          o(x, w, 8),
          o(y, h, 2),
          o(0, w, 4),
          o(0, h, 2)
        );
        //left eye brow
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_eye_brow);
        _c.moveTo(o(x, w, 8), o(y, h, 8, 3));
        _c.lineTo(o(x, w, 4), o(y, h, 4));
        _c.lineTo(o(x, w, 8, 3), o(y, h, 4));
        _c.fill();
        //left eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_eye);
        _c.moveTo(o(x, w, 8), o(y, h, 2));
        _c.lineTo(o(x, w, 4), o(y, h, 8, 3));
        _c.lineTo(o(x, w, 8, 3), o(y, h, 8, 3));
        _c.lineTo(o(x, w, 8, 3), o(y, h, 2));
        _c.fill();
        //right tear
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_tear);
        _c.fillRect(
          o(x, w, 8, 5),
          o(y, h, 2),
          o(0, w, 4),
          o(0, h, 2)
        );
        //right eye brow
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_eye_brow);
        _c.moveTo(o(x, w, 8, 5), o(y, h, 4));
        _c.lineTo(o(x, w, 4, 3), o(y, h, 4));
        _c.lineTo(o(x, w, 8, 7), o(y, h, 8, 3));
        _c.fill();
        //right eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_eye);
        _c.moveTo(o(x, w, 8, 5), o(y, h, 8, 3));
        _c.lineTo(o(x, w, 4, 3), o(y, h, 8, 3));
        _c.lineTo(o(x, w, 8, 7), o(y, h, 2));
        _c.lineTo(o(x, w, 8, 5), o(y, h, 2));
        _c.fill();
        //mouth
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].mouth);
        _c.moveTo(o(x, w, 8, 3), o(y, h, 8, 7));
        _c.lineTo(o(x, w, 2), o(y, h, 4, 3));
        _c.lineTo(o(x, w, 8, 5), o(y, h, 8, 7));
        _c.fill();
        //outline
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].outline);
        _c.strokeRect(x, y, w, h);
        break;
      case slave_types[2]: //org
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        //outer eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].outer_eye);
        _c.moveTo(o(x, w, 8), o(y, h, 8, 3));
        _c.lineTo(o(x, w, 4), o(y, h, 4));
        _c.lineTo(o(x, w, 2), o(y, h, 8));
        _c.lineTo(o(x, w, 4, 3), o(y, h, 4));
        _c.lineTo(o(x, w, 8, 7), o(y, h, 8, 3));
        _c.lineTo(o(x, w, 4, 3), o(y, h, 2));
        _c.lineTo(o(x, w, 2), o(y, h, 8, 5));
        _c.lineTo(o(x, w, 4), o(y, h, 2));
        _c.fill();
        //big eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].big_eye);
        _c.arc(
          o(x, w, 2),
          o(y, h, 8, 3),
          o(0, w, 16, 3),
          0,
          2 * Math.PI
        );
        _c.fill();
        //small eye
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].small_eye);
         _c.arc(
          o(x, w, 2),
          o(y, h, 8, 3),
          o(0, w, 8),
          0,
          2 * Math.PI
        );
        _c.fill();
        //eye brow
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].eye_brow);
        _c.fillRect(o(x, w, 4), y, o(0, w, 2), o(0, h, 8));
        //eye brow outline
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].eye_brow_outline);
        _c.strokeRect(o(x, w, 4), y, o(0, w, 2), o(0, h, 8));
        //mouth
        _c.begin();
        _c.set_property("fillStyle", skin_colors[Enemy.type].mouth);
        _c.moveTo(o(x, w, 8), o(y, h, 8, 5));
        _c.lineTo(o(x, w, 8, 3), o(y, h, 4, 3));
        _c.lineTo(o(x, w, 8, 5), o(y, h, 4, 3));
        _c.lineTo(o(x, w, 8, 7), o(y, h, 8, 5));
        _c.lineTo(o(x, w, 8, 5), o(y, h, 8, 7));
        _c.lineTo(o(x, w, 8, 3), o(y, h, 8, 7));
        _c.fill();
        //outline
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].outline);
        _c.strokeRect(x, y, w, h);
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
