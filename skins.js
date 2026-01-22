let boss_types = ["Ice Wizard", "Cry Baby", "Mega Org"];
let slave_types = ["Frosty", "Crier", "Org"];
let skin_colors = {
  //Enemies
  "Ice Wizard": {
    body: "pink",
    damaged_body: "LightCoral",
    left_eyebrow: "lightblue",
    left_eye: "white",
    left_eyeball_inner: "AliceBlue",
    left_eyeball_outer: "LightSteelBlue",
    right_eyebrow: "lightblue",
    right_eye: "white",
    right_eyeball_inner: "AliceBlue",
    right_eyeball_outer: "LightSteelBlue",
    wrinkles: "black",
    jawlines: "black",
    left_ear_inner: "pink",
    right_ear_inner: "pink",
    left_ear_outer: "black",
    right_ear_outer: "black",
    mouth: "black",
    nose_outer: "black",
    upper_beard: "lightblue",
    bottom_beard: "lightblue",
    outline: "black",
  },
  "Cry Baby": {
    body: "SlateBlue",
    damaged_body: "MediumSlateBlue",
    left_eyebrow: "black",
    left_eye: "black",
    left_tear: "DimGrey",
    right_eyebrow: "black",
    right_eye: "black",
    right_tear: "DimGrey",
    mouth: "black",
    holes: "black",
    left_ear_inner: "SlateBlue",
    left_ear_outer: "black",
    left_arm_inner: "SlateBlue",
    left_arm_outer: "black",
    right_ear_inner: "SlateBlue",
    right_ear_oute: "black",
    right_arm_inner: "SlateBlue",
    right_arm_outer: "black",
    outline: "black",
  },
  "Mega Org": {
    body: "darkgreen",
    damaged_body: "DarkSeaGreen",
    outer_eye: "black",
    eye_lashes: "black",
    inner_big_eye: "red",
    inner_small_eye: "white",
    eyebrow: "brown",
    jawlines: "black",
    left_ear_inner: "darkgreen",
    left_ear_outer: "black",
    left_cheek: "lime",
    right_ear_inner: "darkgreen",
    right_ear_outer: "black",
    right_cheek: "lime",
    mouth: "black",
    teeth: "white",
  },
  Frosty: {
    body: "Plum",
    damaged_body: "Magenta",
    left_eye: "black",
    right_eye: "black",
    left_eyebrow: "black",
    right_eyebrow: "black",
    mouth: "black",
    outline: "black",
  },
  Crier: {
    body: "darkblue",
    damaged_body: "RoyalBlue",
    left_tear: "lightblue",
    left_eye: "white",
    left_eyebrow: "white",
    right_tear: "lightblue",
    right_eye: "white",
    right_eyebrow: "white",
    mouth: "white",
    outline: "black",
  },
  Org: {
    body: "darkgreen",
    damaged_body: "DarkSeaGreen",
    outer_eye: "white",
    big_eye: "maroon",
    small_eye: "black",
    eyebrow: "SaddleBrown",
    eyebrow_outline: "black",
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
  const w = Enemy.w; //this is basically 100% for x
  const h = Enemy.h; //this is basically 100% for y
  const x = Enemy.x; //this is the starting x point of the "skin coordinate system"
  const y = Enemy.y; //this is the starting y point of the "skin coordinate system"
  /*
  EXPLANATION:
    o function is 1-dimensional.
    base = starting point. Basically coordinate origin offsetted by base.
    unit = 100%. If it's 10 for example, then 2 would be 20% of it.
    dimension = percentage scaling. if unit = 10 and dimension = 2, then we are using 20% steps each time
    offset = how many steps we take. it can go below 0% and above 100%.
  */
  const o = (base, unit, dimension=1, offset=1) => base + ((unit/dimension)*offset);
  const x16 = (input_x) => o(x, w, 16, input_x); //16% steps for more accurate drawings
  const y16 = (input_y) => o(y, h, 16, input_y); //16% steps for more accurate drawings
  //helper function for bosses to reduce code size
  const fillPath16 = (color, path) => {
    _c.begin();
    _c.set_property("fillStyle", color);
    _c.moveTo(x16(path[0][0]), y16(path[0][1]));
    for(let i = 1; i < path.length; i++){
      let destination = path[i];
      _c.lineTo(x16(destination[0]), y16(destination[1]));
    }
    _c.fill();
  }
  //helper function for bosses to reduce code size
  const strokePath16 = (color, path) => {
    _c.begin();
    _c.set_property("strokeStyle", color);
    _c.moveTo(x16(path[0][0]), y16(path[0][1]));
    for(let i = 1; i < path.length; i++){
      let destination = path[i];
      _c.lineTo(x16(destination[0]), y16(destination[1]));
    }
    _c.stroke();
  }
  if (Enemy.is_Boss) {
    switch (Enemy.type) {
      case boss_types[0]: //Ice Wizard
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        
        //left eye
        fillPath16(skin_colors[Enemy.type].left_eye, [
          [2, 6],
          [4, 5],
          [7, 6],
          [7, 7],
          [5, 8],
          [3, 7]
        ]);
        //left eye ball
        _c.begin();
        _c.set_property('fillStyle', skin_colors[Enemy.type].left_eyeball_inner);
        _c.arc(x16(5), y16(7), o(0, w, 16), 0, Math.PI*2);
        _c.fill();

        _c.begin();
        _c.set_property('strokeStyle', skin_colors[Enemy.type].left_eyeball_outer);
        _c.arc(x16(5), y16(7), o(0, w, 16), 0, Math.PI*2);
        _c.stroke();
        //left eye brow
        fillPath16(skin_colors[Enemy.type].left_eyebrow, [
          [1, 5],
          [3, 3],
          [5, 3],
          [7, 4],
          [7, 5],
          [5, 5],
          [3, 4],
        ]);
        //right eye
        fillPath16(skin_colors[Enemy.type].right_eye, [
          [9, 6],
          [12, 5],
          [14, 6],
          [13, 7],
          [11, 8],
          [9, 7]
        ]);
        //right eye ball
        _c.begin();
        _c.set_property('fillStyle', skin_colors[Enemy.type].right_eyeball_inner);
        _c.arc(x16(11), y16(7), o(0, w, 16), 0, Math.PI*2);
        _c.fill();

        _c.begin();
        _c.set_property('strokeStyle', skin_colors[Enemy.type].right_eyeball_outer);
        _c.arc(x16(11), y16(7), o(0, w, 16), 0, Math.PI*2);
        _c.stroke();
        //right eye brow
        fillPath16(skin_colors[Enemy.type].right_eyebrow, [
          [9, 4],
          [11, 3],
          [13, 3],
          [15, 5],
          [13, 4],
          [11, 5],
          [9, 5]
        ]);
        //wrinkles
        strokePath16(skin_colors[Enemy.type].wrinkles, [
          [5, 1],
          [11, 1]
        ]);
        strokePath16(skin_colors[Enemy.type].wrinkles, [
          [4, 2],
          [12, 2]
        ]);
        //jawlines
        strokePath16(skin_colors[Enemy.type].jawlines, [
          [1, 9],
          [2, 11],
          [3, 12],
          [3, 13],
        ]);
        strokePath16(skin_colors[Enemy.type].jawlines, [
          [15, 9],
          [14, 11],
          [13, 12],
          [13, 13],
        ]);
        //mouth
        fillPath16(skin_colors[Enemy.type].mouth, [
          [7, 13],
          [9, 13],
          [10, 15],
          [6, 15],
        ]);
        //left ear
        fillPath16(skin_colors[Enemy.type].left_ear_inner, [
          [0, 7],
          [-1, 6],
          [-2, 7],
          [-1, 9],
          [0, 10],
        ]);
        strokePath16(skin_colors[Enemy.type].left_ear_outer, [
          [0, 7],
          [-1, 6],
          [-2, 7],
          [-1, 9],
          [0, 10],
        ]);
        //right ear
        fillPath16(skin_colors[Enemy.type].right_ear_inner, [
          [16, 7],
          [17, 6],
          [18, 7],
          [17, 9],
          [16, 10],
        ]);
        strokePath16(skin_colors[Enemy.type].right_ear_outer, [
          [16, 7],
          [17, 6],
          [18, 7],
          [17, 9],
          [16, 10],
        ]);
        //outline
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].outline);
        _c.strokeRect(x, y, w, h);
        //upper beard
        fillPath16(skin_colors[Enemy.type].upper_beard, [
          [2, 16],
          [4, 12],
          [6, 11],
          [10, 11],
          [12, 12],
          [14, 16],
          [13, 19],
          [13, 20],
          [12, 19],
          [12, 17],
          [10, 13],
          [6, 13],
          [4, 17],
          [4, 19],
          [3, 20],
          [3, 19]
        ]);
        //bottom beard
        fillPath16(skin_colors[Enemy.type].bottom_beard, [
          [6, 16],
          [10, 16],
          [9, 18],
          [8, 19],
          [7, 18],
        ]);
        //nose
        strokePath16(skin_colors[Enemy.type].nose_outer, [
          [8, 7],
          [7, 8],
          [7, 10],
        ]);
        strokePath16(skin_colors[Enemy.type].nose_outer, [
          [7, 9],
          [6, 10],
          [7, 11],
        ]);
        strokePath16(skin_colors[Enemy.type].nose_outer, [
          [8, 11],
          [9, 10],
        ]);
        break;
      case boss_types[1]: //Cry Baby
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
          //holes
          fillPath16(skin_colors[Enemy.type].holes, [
            [0, 0],
            [2, 0],
            [2, 2],
            [0, 2]
          ]);
          fillPath16(skin_colors[Enemy.type].holes, [
            [14, 0],
            [16, 0],
            [16, 2],
            [14, 2],
          ]);
          fillPath16(skin_colors[Enemy.type].holes, [
            [0, 14],
            [2, 14],
            [2, 16],
            [0, 16]
          ]);
          fillPath16(skin_colors[Enemy.type].holes, [
            [14, 14],
            [16, 14],
            [16, 16],
            [14, 16]
          ]);
          //left eye brow
          fillPath16(skin_colors[Enemy.type].left_eyebrow, [
            [2, 6],
            [3, 5],
            [7, 3],
            [6, 5]
          ]);
          //left tear
          fillPath16(skin_colors[Enemy.type].left_tear, [
            [3, 7],
            [5, 8],
            [7, 7],
            [5, 11],
            [3, 14],
            [2, 13]
          ]);
          //left eye
          fillPath16(skin_colors[Enemy.type].left_eye, [
            [3, 6],
            [4, 7],
            [6, 7],
            [7, 6],
            [7, 7],
            [5, 8],
            [3, 7],
          ]);
          //left ear
          fillPath16(skin_colors[Enemy.type].left_ear_inner, [
            [0, 0],
            [-2, 7],
            [-1, 9],
            [0, 9]
          ]);
          strokePath16(skin_colors[Enemy.type].left_ear_outer, [
            [0, 0],
            [-2, 7],
            [-1, 9],
            [0, 9]
          ]);
          //left arm
          fillPath16(skin_colors[Enemy.type].left_arm_inner, [
            [2, 16],
            [5, 16],
            [5, 21],
            [2, 21]
          ]);
          strokePath16(skin_colors[Enemy.type].left_arm_outer, [
            [2, 16],
            [5, 16],
            [5, 21],
            [2, 21]
          ]);
          strokePath16(skin_colors[Enemy.type].left_arm_outer, [
            [3, 20],
            [3, 21]
          ]);
          strokePath16(skin_colors[Enemy.type].left_arm_outer, [
            [4, 20],
            [4, 21]
          ]);
          //right eye brow
          fillPath16(skin_colors[Enemy.type].right_eyebrow, [
            [9, 3],
            [13, 5],
            [14, 6],
            [10, 5]
          ]);
          //right tear
          fillPath16(skin_colors[Enemy.type].right_tear, [
            [9, 7],
            [11, 8],
            [13, 7],
            [14, 13],
            [13, 14],
            [11, 11]
          ]);
          //right eye
          fillPath16(skin_colors[Enemy.type].right_eye, [
            [9, 6],
            [10, 7],
            [12, 7],
            [13, 6],
            [13, 7],
            [11, 8],
            [9, 7],
          ]);
          //right ear
          fillPath16(skin_colors[Enemy.type].right_ear_inner, [
            [16, 0],
            [18, 7],
            [17, 9],
            [16, 9]
          ]);
          strokePath16(skin_colors[Enemy.type].right_ear_outer, [
            [16, 0],
            [18, 7],
            [17, 9],
            [16, 9]
          ]);
          //right arm
          fillPath16(skin_colors[Enemy.type].right_arm_inner, [
            [11, 16],
            [14, 16],
            [14, 21],
            [11, 21]
          ]);
          strokePath16(skin_colors[Enemy.type].right_arm_outer, [
            [11, 16],
            [14, 16],
            [14, 21],
            [11, 21]
          ]);
          strokePath16(skin_colors[Enemy.type].right_arm_outer, [
            [12, 20],
            [12, 21]
          ]);
          strokePath16(skin_colors[Enemy.type].right_arm_outer, [
            [13, 20],
            [13, 21]
          ]);
          //mouth
          fillPath16(skin_colors[Enemy.type].mouth, [
            [5, 11],
            [7, 10],
            [9, 10],
            [11, 11],
            [12, 15],
            [11, 14],
            [9, 13],
            [7, 13],
            [5, 14],
            [4, 15]
          ]);
          //outline
          _c.begin();
          _c.set_property("strokeStyle", skin_colors[Enemy.type].outline);
          _c.strokeRect(x, y, w, h);
        break;
      case boss_types[2]: //Mega Orc
        Enemy.damage_active
          ? null
          : (Enemy.enemyColor = skin_colors[Enemy.type].body);
        
        //eyebrow
        fillPath16(skin_colors[Enemy.type].eyebrow, [
          [1, 1],
          [15, 1],
          [8, 2]
        ]);
        //eyelashes
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [3, 5],
          [3, 6]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [5, 4],
          [5, 5]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [8, 3],
          [8, 4]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [11, 4],
          [11, 5]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [13, 5],
          [13, 6]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [13, 8],
          [13, 9]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [11, 9],
          [11, 10]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [8, 10],
          [8, 11]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [5, 9],
          [5, 10]
        ]);
        strokePath16(skin_colors[Enemy.type].eye_lashes, [
          [3, 8],
          [3, 9]
        ]);
        //outer eye
        fillPath16(skin_colors[Enemy.type].outer_eye, [
          [2, 7],
          [3, 6],
          [8, 4],
          [13, 6],
          [14, 7],
          [13, 8],
          [8, 10],
          [3, 8],
        ]);
        //big inner eye
        fillPath16(skin_colors[Enemy.type].inner_big_eye, [
          [8, 4],
          [7, 5],
          [6, 7],
          [7, 9],
          [8, 10],
          [9, 9],
          [10, 7],
          [9, 5]
        ]);
        //small inner eye
        fillPath16(skin_colors[Enemy.type].inner_small_eye, [
          [8, 4],
          [7, 7],
          [8, 10],
          [9, 7]
        ]);
        //left ear
        fillPath16(skin_colors[Enemy.type].left_ear_inner, [
          [0, 7],
          [-2, 5],
          [-2, 8],
          [0, 11]
        ]);
        strokePath16(skin_colors[Enemy.type].left_ear_outer, [
          [0, 7],
          [-2, 5],
          [-2, 8],
          [0, 11]
        ]);
        //right ear
        fillPath16(skin_colors[Enemy.type].right_ear_inner, [
          [16, 7],
          [18, 5],
          [18, 8],
          [16, 11]
        ]);
        strokePath16(skin_colors[Enemy.type].right_ear_outer, [
          [16, 7],
          [18, 5],
          [18, 8],
          [16, 11]
        ]);
        //cheeks
        fillPath16(skin_colors[Enemy.type].left_cheek, [
          [1, 9],
          [0, 11],
          [1, 13],
          [2, 11]
        ]);
        fillPath16(skin_colors[Enemy.type].right_cheek, [
          [15, 9],
          [14, 11],
          [15, 13],
          [16, 11]
        ])
        //jawlines
        strokePath16(skin_colors[Enemy.type].jawlines, [
          [0, 12],
          [2, 15]
        ]);
        strokePath16(skin_colors[Enemy.type].jawlines, [
          [16, 12],
          [14, 15]
        ]);
        //mouth
        fillPath16(skin_colors[Enemy.type].mouth, [
          [3, 12],
          [13, 12],
          [12, 14],
          [9, 15],
          [7, 15],
          [4, 14]
        ]);
        //teeth
        fillPath16(skin_colors[Enemy.type].teeth, [
          [4, 12],
          [12, 12],
          [12, 14],
          [11, 12],
          [10, 14],
          [9, 12],
          [8, 15],
          [7, 12],
          [6, 14],
          [5, 12],
          [4, 14]
        ]);
        //outline
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].outline);
        _c.strokeRect(x, y, w, h);
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
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_eyebrow);
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
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_eyebrow);
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
        _c.set_property("fillStyle", skin_colors[Enemy.type].left_eyebrow);
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
        _c.set_property("fillStyle", skin_colors[Enemy.type].right_eyebrow);
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
        _c.set_property("fillStyle", skin_colors[Enemy.type].eyebrow);
        _c.fillRect(o(x, w, 4), y, o(0, w, 2), o(0, h, 8));
        //eye brow outline
        _c.begin();
        _c.set_property("strokeStyle", skin_colors[Enemy.type].eyebrow_outline);
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
