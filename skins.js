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
  Invincible: {
    body: "#f2c1ae",
    damaged_body: "#e57373",
    hair: "#1a1a1a",
    mask_blue: "#2b59c3",
    mask_yellow: "#f2d024",
    eyes: "white",
    outline: "black",
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
  //Extra
  "Warning-1": { //this should not appear
    outline: "pink",
    inside: "pink",
    messageFill: "pink",
    messageStroke: "pink",
  },
  Warning1: {
    outline: "orange",
    inside: "yellow",
    messageFill: "red",
    messageStroke: "red",
  },
  Warning2: {
    outline: "white",
    inside: "black",
    messageFill: "white",
    messageStroke: "white",
  },
  //debug
  default: {
    test: "green",
  },
};

Object.defineProperty(window, 'draw_enemy_skin', {
  value: function draw_enemy_skin(Enemy, _c = c) {
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
    const o = (base, unit, dimension = 1, offset = 1) => base + ((unit / dimension) * offset);
    const x16 = (input_x) => o(x, w, 16, input_x); //16% steps for more accurate drawings
    const y16 = (input_y) => o(y, h, 16, input_y); //16% steps for more accurate drawings
    //helper function for bosses to reduce code size
    const fillPath16 = (color, path) => {
      _c.begin();
      _c.set_property("fillStyle", color);
      _c.moveTo(x16(path[0][0]), y16(path[0][1]));
      for (let i = 1; i < path.length; i++) {
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
      for (let i = 1; i < path.length; i++) {
        let destination = path[i];
        _c.lineTo(x16(destination[0]), y16(destination[1]));
      }
      _c.stroke();
    }
    if (Enemy.is_Boss) {
      switch (Enemy.type) {
        case boss_types[0]: //Ice Wizard
          Enemy.damage_active ?
            null :
            (Enemy.enemyColor = skin_colors[Enemy.type].body);

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
          _c.arc(x16(5), y16(7), o(0, w, 16), 0, Math.PI * 2);
          _c.fill();

          _c.begin();
          _c.set_property('strokeStyle', skin_colors[Enemy.type].left_eyeball_outer);
          _c.arc(x16(5), y16(7), o(0, w, 16), 0, Math.PI * 2);
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
          _c.arc(x16(11), y16(7), o(0, w, 16), 0, Math.PI * 2);
          _c.fill();

          _c.begin();
          _c.set_property('strokeStyle', skin_colors[Enemy.type].right_eyeball_outer);
          _c.arc(x16(11), y16(7), o(0, w, 16), 0, Math.PI * 2);
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
          Enemy.damage_active ?
            null :
            (Enemy.enemyColor = skin_colors[Enemy.type].body);
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
            [2, 21],
          ]);
          strokePath16(skin_colors[Enemy.type].left_arm_outer, [
            [2, 16],
            [5, 16],
            [5, 21],
            [2, 21],
            [2, 16]
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
            [11, 21],
            [11, 16],
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
          Enemy.damage_active ?
            null :
            (Enemy.enemyColor = skin_colors[Enemy.type].body);

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
        case boss_types[3]: // Invincible
          // Handle damage color flicker
          let currentBodyColor = Enemy.damage_active ?
            skin_colors[Enemy.type].damaged_body :
            skin_colors[Enemy.type].body;

          // 1. BASE SKIN (The face/neck base)
          _c.begin();
          _c.set_property("fillStyle", currentBodyColor);
          _c.fillRect(x, y, w, h);

          // 2. HAIR (Messy spikes poking out the top)
          fillPath16(skin_colors[Enemy.type].hair, [
        [1, 5], [3, 1], [6, 4], [9, 0], [13, 2], [15, 5], [15, 7], [1, 7]
      ]);

          // 3. BLUE COWL (Sides of the mask)
          fillPath16(skin_colors[Enemy.type].mask_blue, [
        [0, 6], [16, 6], [16, 13], [14, 15], [2, 15], [0, 13]
      ]);

          // 4. YELLOW CENTER STRIP (The "i" shape on the face)
          fillPath16(skin_colors[Enemy.type].mask_yellow, [
        [6, 6], [10, 6], [10, 14], [8, 16], [6, 14]
      ]);

          // 5. EXPOSED CHIN (Clearing the mask for the lower face)
          fillPath16(currentBodyColor, [
        [5, 12], [11, 12], [12, 16], [4, 16]
      ]);

          // 6. LEFT LENS (Angled for a determined look)
          fillPath16(skin_colors[Enemy.type].eyes, [
        [2, 8], [6, 8], [6, 11], [3, 12]
      ]);
          strokePath16(skin_colors[Enemy.type].outline, [
        [2, 8], [6, 8], [6, 11], [3, 12], [2, 8]
      ]);

          // 7. RIGHT LENS
          fillPath16(skin_colors[Enemy.type].eyes, [
        [10, 8], [14, 8], [13, 12], [10, 11]
      ]);
          strokePath16(skin_colors[Enemy.type].outline, [
        [10, 8], [14, 8], [13, 12], [10, 11], [10, 8]
      ]);

          // 8. NOSE & MOUTH DETAILS
          strokePath16(skin_colors[Enemy.type].outline, [[8, 12], [7, 13], [8, 13]]); // Nose
          strokePath16(skin_colors[Enemy.type].outline, [[6, 15], [10, 15]]); // Mouth

          // 9. FINAL BORDER
          _c.begin();
          _c.set_property("strokeStyle", skin_colors[Enemy.type].outline);
          _c.set_property("lineWidth", 1);
          _c.strokeRect(x, y, w, h);
          break;
      }
    } else if (Enemy.is_Slave) {
      //console.log("is slave is true!");
      switch (Enemy.type) {
        case slave_types[0]: //Frosty
          //console.log("type matched", slave_types[0]);
          Enemy.damage_active ?
            null :
            (Enemy.enemyColor = skin_colors[Enemy.type].body);

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
          Enemy.damage_active ?
            null :
            (Enemy.enemyColor = skin_colors[Enemy.type].body);
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
          Enemy.damage_active ?
            null :
            (Enemy.enemyColor = skin_colors[Enemy.type].body);
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
  },
  writable: false,
  configurable: false,
});

Object.defineProperty(window, "draw_projectile_skin", {
  value: function draw_projectile_skin(projectile) {
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
  },
  configurable: false,
  writable: false,
});

function draw_warn_signal(projectile) {
  if (projectile.direction === 0 && projectile.next && projectile.next.x && projectile.next.y && projectile.next.x != projectile.unscaled.x && projectile.next.y != projectile.unscaled.y) {
    let _x = projectile.next.x;
    let _y = projectile.next.y;
    let x = _x * u;
    let y = _y * u;
    let state = projectile.flickeringState;
    c.begin();
    c.set_property("fillStyle", skin_colors[`Warning${state}`].inside);
    c.moveTo(x, y - (projectile.r * 2));
    c.lineTo(x - projectile.r, y);
    c.lineTo(x + projectile.r, y);
    c.fill();

    c.begin();
    c.set_property("strokeStyle", skin_colors[`Warning${state}`].outline);
    c.moveTo(x, y - (projectile.r * 2));
    c.lineTo(x - projectile.r, y);
    c.lineTo(x + projectile.r, y);
    c.ctx.closePath();
    c.stroke();

    c.begin();
    c.set_property("textAlign", "center");
    c.set_property("fillStyle", skin_colors[`Warning${state}`].messageFill);
    c.fillText('!', x, y, projectile.r / 40);

    c.begin();
    c.set_property("textAlign", "center");
    c.set_property("strokeStyle", skin_colors[`Warning${state}`].messageStroke);
    c.strokeText('!', x, y, projectile.r / 40);
  }
}

//PLAYER TRAILS
Object.defineProperty(window, "draw_player_trail", {
  value: function draw_player_trail(_trail, _c = c) {
    const trail = _trail.type in player_trail_colors ? _trail.type : "None";
    if(trail === "None") return;
    _c.begin();
    _c.set_property("fillStyle", player_trail_colors[trail].innerBody);
    _c.arc(_trail.x, _trail.y, _trail.r, 0, 2 * Math.PI);
    _c.fill();
    _c.set_property("strokeStyle", player_trail_colors[trail].outerBody);
    _c.set_property("lineWidth", 2.5);
    _c.stroke();
    const o = (base, unit, dimension = 1, offset = 1) => base + ((unit / dimension) * offset);
    const res_x = (input_x, resolution) => o(_trail.x-_trail.r, _trail.r*2, resolution, input_x);
    const res_y = (input_y, resolution) => o(_trail.y-_trail.r, _trail.r*2, resolution, input_y);
    //helper function for bosses to reduce code size
    const fillPath = (color, path, resolution) => {
      _c.begin();
      _c.set_property("fillStyle", color);
      _c.moveTo(res_x(path[0][0], resolution), res_y(path[0][1], resolution));
      for (let i = 1; i < path.length; i++) {
        let destination = path[i];
        _c.lineTo(res_x(destination[0], resolution), res_y(destination[1], resolution));
      }
      _c.fill();
    }
    //helper function for bosses to reduce code size
    const strokePath = (color, path, resolution) => {
      _c.begin();
      _c.set_property("strokeStyle", color);
      _c.moveTo(res_x(path[0][0], resolution), res_y(path[0][1], resolution));
      for (let i = 1; i < path.length; i++) {
        let destination = path[i];
        _c.lineTo(res_x(destination[0], resolution), res_y(destination[1], resolution));
      }
      _c.stroke();
    }
    switch (trail) {
      case "Default":
        break;
      case "Stone":
        fillPath(player_trail_colors[trail].inner, [
          [14.5, 0],
          [5.5, 2],
          [0, 7],
          [-2.5, 9.5],
          [-1, 21],
          [6, 29.5],
          [3, 30.5],
          [7.5, 33.5],
          [31, 30.5],
          [32, 24.5],
          [35.5, 18.5],
          [30.5, 1.5],
          [19.5, -1.5]
        ], 32);
        strokePath(player_trail_colors[trail].outer, [
          [14.5, 0],
          [5.5, 2],
          [0, 7],
          [-2.5, 9.5],
          [-1, 21],
          [6, 29.5],
          [3, 30.5],
          [7.5, 33.5],
          [31, 30.5],
          [32, 24.5],
          [35.5, 18.5],
          [30.5, 1.5],
          [19.5, -1.5]
        ], 32);
        fillPath(player_trail_colors[trail].part_3, [
          [-1.5, 14.5],
          [-0.5, 21],
          [6.5, 29.5],
          [4, 30.5],
          [7.5, 33],
          [16, 32],
          [30.5, 30],
          [31.5, 24.5],
          [35, 18.5],
          [32, 9]
        ], 32);
        fillPath(player_trail_colors[trail].part_4, [
          [4, 25.5],
          [7, 29.5],
          [5, 31],
          [7.5, 32.5],
          [30.5, 29.5],
          [31, 24.5],
          [35, 18.5],
          [33, 13.5]
        ], 32);
        break;
      case "Ufo":
        fillPath(player_trail_colors[trail].shine_bright, [
          [19, 3],
          [17, 3.5],
          [15, 4.5],
          [15, 6],
          [15.5, 8.5],
          [17.5, 10],
          [21, 12],
          [23.5, 12.5],
          [26.5, 12.5],
          [28, 12],
          [28.5, 11],
          [28.5, 10],
          [28.5, 9],
          [27.5, 7.5],
          [27, 6.5],
          [26, 5.5],
          [23.5, 3.5],
          [22, 3]
        ], 32);
        fillPath(player_trail_colors[trail].simple_body_left_inner, [
          [0, 15.5],
          [1.5, 16.5],
          [5, 18],
          [9, 19],
          [13, 20],
          [16, 20],
          [16, 32],
          [13.5, 32],
          [10, 31.5],
          [7, 31],
          [3, 30],
          [0, 27],
          [-1.5, 21],
          [-3.5, 16.5],
          [-3.5, 15.5],
          [-3.5, 14.5],
          [-1.5, 15]
        ], 32);
        fillPath(player_trail_colors[trail].simple_body_right_inner, [
          [32, 15.5],
          [30.5, 16.5],
          [27, 18],
          [23, 19],
          [19, 20],
          [16, 20],
          [16, 32],
          [18.5, 32],
          [22, 31.5],
          [25, 31],
          [29, 30],
          [32, 27],
          [33.5, 21],
          [35.5, 16.5],
          [35.5, 15.5],
          [35.5, 14.5],
          [33.5, 15]
        ], 32);
        fillPath(player_trail_colors[trail].window1, [
          [0.5, 18],
          [0, 18.5],
          [-0.5, 19.5],
          [0, 21],
          [1, 21],
          [2, 20.5],
          [2.5, 19.5],
          [2.5, 18.5],
          [2, 18],
          [1.5, 17.5]
        ], 32);
        fillPath(player_trail_colors[trail].window2, [
          [31.5, 18],
          [32, 18.5],
          [32.5, 19.5],
          [32, 21],
          [31, 21],
          [30, 20.5],
          [29.5, 19.5],
          [29.5, 18.5],
          [30, 18],
          [30.5, 17.5]
        ], 32);
        fillPath(player_trail_colors[trail].window3, [
          [6, 19.5],
          [5.5, 20],
          [4.5, 21],
          [4.5, 22],
          [5, 23],
          [5.5, 24],
          [6.5, 24],
          [7.5, 23.5],
          [8, 22.5],
          [8, 21],
          [7.5, 20],
          [7, 19.5]
        ], 32);
        fillPath(player_trail_colors[trail].window4, [
          [26, 19.5],
          [26.5, 20],
          [27.5, 21],
          [27.5, 22],
          [27, 23],
          [26.5, 24],
          [25.5, 24],
          [24.5, 23.5],
          [24, 22.5],
          [24, 21],
          [24.5, 20],
          [25, 19.5]
        ], 32);
        fillPath(player_trail_colors[trail].window5, [
          [12.5, 21],
          [11.5, 21.5],
          [11, 22.5],
          [10.5, 23.5],
          [10.5, 25],
          [11.5, 26],
          [12.5, 26.5],
          [13.5, 26],
          [14, 25],
          [14.5, 23.5],
          [14, 22],
          [13.5, 21]
        ], 32);
        fillPath(player_trail_colors[trail].window6, [
          [19.5, 21],
          [20.5, 21.5],
          [21, 22.5],
          [21.5, 23.5],
          [21.5, 25],
          [20.5, 26],
          [19.5, 26.5],
          [18.5, 26],
          [18, 25],
          [17.5, 23.5],
          [18, 22],
          [18.5, 21]
        ], 32);
        fillPath(player_trail_colors[trail].bottom_body_left, [
          [-0.5, 22.5],
          [1, 23.5],
          [3.5, 25],
          [6, 26],
          [10, 27.5],
          [13, 28],
          [16, 28.5],
          [16, 32],
          [14, 32],
          [7, 31],
          [3, 30],
          [0, 27],
          [-1.5, 21]
        ], 32);
        fillPath(player_trail_colors[trail].bottom_body_right, [
          [32.5, 22.5],
          [31, 23.5],
          [28.5, 25],
          [26, 26],
          [22, 27.5],
          [19, 28],
          [16, 28.5],
          [16, 32],
          [18, 32],
          [25, 31],
          [29, 30],
          [32, 27],
          [33.5, 21]
        ], 32);
        strokePath(player_trail_colors[trail].simple_body_left_outer, [
          [0, 15.5],
          [1.5, 16.5],
          [5, 18],
          [9, 19],
          [13, 20],
          [16, 20],
          [16, 32],
          [13.5, 32],
          [10, 31.5],
          [7, 31],
          [3, 30],
          [0, 27],
          [-1.5, 21],
          [-3.5, 16.5],
          [-3.5, 15.5],
          [-3.5, 14.5],
          [-1.5, 15],
          [0, 15.5]
        ], 32);
        strokePath(player_trail_colors[trail].simple_body_right_outer, [
          [32, 15.5],
          [30.5, 16.5],
          [27, 18],
          [23, 19],
          [19, 20],
          [16, 20],
          [16, 32],
          [18.5, 32],
          [22, 31.5],
          [25, 31],
          [29, 30],
          [32, 27],
          [33.5, 21],
          [35.5, 16.5],
          [35.5, 15.5],
          [35.5, 14.5],
          [33.5, 15],
          [32, 15.5]
        ], 32);
        break;
      case "Dirt":
        fillPath(player_trail_colors[trail].part_1_copy, [
          [11.5, 10.5],
          [8, 10],
          [5.5, 8.5],
          [1.5, 8],
          [-0.5, 8.5],
          [-1.5, 10],
          [-3, 13],
          [-1.5, 14.5],
          [2.5, 14],
          [6.5, 12.5],
          [10.5, 12.5],
          [12.5, 12],
          [12.5, 11],
          [11.5, 10.5]
        ], 32);
        strokePath(player_trail_colors[trail].part_1, [
          [11.5, 10.5],
          [8, 10],
          [5.5, 8.5],
          [1.5, 8],
          [-0.5, 8.5],
          [-1.5, 10],
          [-3, 13],
          [-1.5, 14.5],
          [2.5, 14],
          [6.5, 12.5],
          [10.5, 12.5],
          [12.5, 12],
          [12.5, 11],
          [11.5, 10.5]
        ], 32);
        fillPath(player_trail_colors[trail].part_2_copy, [
          [19.5, 27],
          [20, 29],
          [24, 32],
          [31, 33.5],
          [32.5, 30],
          [33, 27.5],
          [32, 26.5],
          [29.5, 26],
          [26.5, 25.5],
          [26, 24.5],
          [24, 24],
          [22.5, 25],
          [20.5, 25.5],
          [19.5, 27]
        ], 32);
        strokePath(player_trail_colors[trail].part_2, [
          [19.5, 27],
          [20, 29],
          [24, 32],
          [31, 33.5],
          [32.5, 30],
          [33, 27.5],
          [32, 26.5],
          [29.5, 26],
          [26.5, 25.5],
          [26, 24.5],
          [24, 24],
          [22.5, 25],
          [20.5, 25.5],
          [19.5, 27]
        ], 32);
        fillPath(player_trail_colors[trail].part_3_copy, [
          [15, 18.5],
          [12.5, 19.5],
          [9, 19.5],
          [5, 18.5],
          [2, 19.5],
          [-1, 21.5],
          [-1.5, 25],
          [-0.5, 28.5],
          [1.5, 29.5],
          [5, 29.5],
          [9.5, 27],
          [12.5, 25],
          [16, 24],
          [17, 22.5],
          [16, 21.5],
          [15, 20.5],
          [15.5, 19.5],
          [15, 18.5]
        ], 32);
        strokePath(player_trail_colors[trail].part_3, [
          [15, 18.5],
          [12.5, 19.5],
          [9, 19.5],
          [5, 18.5],
          [2, 19.5],
          [-1, 21.5],
          [-1.5, 25],
          [-0.5, 28.5],
          [1.5, 29.5],
          [5, 29.5],
          [9.5, 27],
          [12.5, 25],
          [16, 24],
          [17, 22.5],
          [16, 21.5],
          [15, 20.5],
          [15.5, 19.5],
          [15, 18.5]
        ], 32);
        fillPath(player_trail_colors[trail].part_4_copy, [
          [12, -1],
          [9, 3],
          [9.5, 5],
          [14.5, 10.5],
          [22.5, 9],
          [26, 6.5],
          [26, 3],
          [26, 1.5],
          [23.5, 0.5],
          [19, -0.5],
          [14.5, -1],
          [13, -1.5],
          [12, -1]
        ], 32);
        strokePath(player_trail_colors[trail].part_4, [
          [12, -1],
          [9, 3],
          [9.5, 5],
          [14.5, 10.5],
          [22.5, 9],
          [26, 6.5],
          [26, 3],
          [26, 1.5],
          [23.5, 0.5],
          [19, -0.5],
          [14.5, -1],
          [13, -1.5],
          [12, -1]
        ], 32);
        break;
      case "Claws":
        fillPath(player_trail_colors[trail].claw_1_inner, [
          [5, -2],
          [2.5, 0.5],
          [0.5, 5],
          [-0.5, 9],
          [0, 12],
          [1.5, 14.5],
          [1.5, 19.5],
          [0.5, 21.5],
          [-1, 24.5],
          [0, 28.5],
          [2.5, 31.5],
          [6.5, 34.5],
          [5.5, 32],
          [4, 29],
          [3.5, 26.5],
          [3.5, 24],
          [4.5, 21.5],
          [5, 19],
          [4.5, 16],
          [4, 13.5],
          [2.5, 11.5],
          [2, 8.5],
          [3, 5.5],
          [4, 3],
          [5.5, 0.5]
        ], 32);
        strokePath(player_trail_colors[trail].claw_1_outer, [
          [5, -2],
          [2.5, 0.5],
          [0.5, 5],
          [-0.5, 9],
          [0, 12],
          [1.5, 14.5],
          [1.5, 19.5],
          [0.5, 21.5],
          [-1, 24.5],
          [0, 28.5],
          [2.5, 31.5],
          [6.5, 34.5],
          [5.5, 32],
          [4, 29],
          [3.5, 26.5],
          [3.5, 24],
          [4.5, 21.5],
          [5, 19],
          [4.5, 16],
          [4, 13.5],
          [2.5, 11.5],
          [2, 8.5],
          [3, 5.5],
          [4, 3],
          [5.5, 0.5],
          [5, -2]
        ], 32);
        fillPath(player_trail_colors[trail].claw_2_inner, [
          [15, -1.5],
          [13, -0.5],
          [11, 1],
          [9.5, 2.5],
          [8.5, 5],
          [9, 8],
          [10.5, 10.5],
          [12, 13],
          [11, 15],
          [9.5, 17.5],
          [9, 19.5],
          [8.5, 23],
          [9, 27.5],
          [10.5, 31.5],
          [13.5, 35.5],
          [18.5, 36],
          [16.5, 34],
          [15, 32.5],
          [14, 30],
          [14, 25],
          [15, 20],
          [16.5, 18],
          [17, 13.5],
          [16, 11],
          [14.5, 9.5],
          [13, 7],
          [12.5, 4.5],
          [14, 1.5]
        ], 32);
        strokePath(player_trail_colors[trail].claw_2_outer, [
          [15, -1.5],
          [13, -0.5],
          [11, 1],
          [9.5, 2.5],
          [8.5, 5],
          [9, 8],
          [10.5, 10.5],
          [12, 13],
          [11, 15],
          [9.5, 17.5],
          [9, 19.5],
          [8.5, 23],
          [9, 27.5],
          [10.5, 31.5],
          [13.5, 35.5],
          [18.5, 36],
          [16.5, 34],
          [15, 32.5],
          [14, 30],
          [14, 25],
          [15, 20],
          [16.5, 18],
          [17, 13.5],
          [16, 11],
          [14.5, 9.5],
          [13, 7],
          [12.5, 4.5],
          [14, 1.5],
          [15, -1.5]
        ], 32);
        fillPath(player_trail_colors[trail].claw_3_inner, [
          [27.5, -1.5],
          [26, 0.5],
          [24, 2],
          [24, 5],
          [24, 7.5],
          [25, 10.5],
          [24.5, 12.5],
          [23.5, 14],
          [21.5, 15.5],
          [20.5, 19.5],
          [20, 24.5],
          [21, 28.5],
          [23, 33.5],
          [26, 35.5],
          [29.5, 35.5],
          [31, 35],
          [33, 31.5],
          [31.5, 31.5],
          [29, 32.5],
          [28, 33],
          [26.5, 31.5],
          [25.5, 30],
          [24.5, 25.5],
          [25, 21.5],
          [26.5, 19.5],
          [29, 16.5],
          [30, 12.5],
          [29.5, 9.5],
          [28.5, 7],
          [27.5, 6],
          [26.5, 4],
          [27.5, 1],
          [30, -0.5],
          [30.5, -2.5],
          [29.5, -3.5],
          [27.5, -1.5]
        ], 32);
        strokePath(player_trail_colors[trail].claw_3_outer, [
          [27.5, -1.5],
          [26, 0.5],
          [24, 2],
          [24, 5],
          [24, 7.5],
          [25, 10.5],
          [24.5, 12.5],
          [23.5, 14],
          [21.5, 15.5],
          [20.5, 19.5],
          [20, 24.5],
          [21, 28.5],
          [23, 33.5],
          [26, 35.5],
          [29.5, 35.5],
          [31, 35],
          [33, 31.5],
          [31.5, 31.5],
          [29, 32.5],
          [28, 33],
          [26.5, 31.5],
          [25.5, 30],
          [24.5, 25.5],
          [25, 21.5],
          [26.5, 19.5],
          [29, 16.5],
          [30, 12.5],
          [29.5, 9.5],
          [28.5, 7],
          [27.5, 6],
          [26.5, 4],
          [27.5, 1],
          [30, -0.5],
          [30.5, -2.5],
          [29.5, -3.5],
          [27.5, -1.5]
        ], 32);
        break;
      case "XD":
        fillPath(player_trail_colors[trail].X1, [
          [-1, 0],
          [1, -1],
          [7, 16],
          [5, 17]
        ], 16);
        fillPath(player_trail_colors[trail].X2, [
          [5, -1],
          [7, 0],
          [1, 17],
          [-1, 16]
        ], 16);
        fillPath(player_trail_colors[trail].D_outer, [
          [9, -1],
          [9, 17],
          [10, 17],
          [14, 16],
          [17, 14],
          [17, 2],
          [14, 0],
          [10, -1]
        ], 16);
        fillPath(player_trail_colors[trail].D_inner, [
          [10.5, 15],
          [10.5, 0.5],
          [16, 2.5],
          [16, 13.5]
        ], 16);
        break;
      case "Skull":
        fillPath(player_trail_colors[trail].skull_inner, [
          [26, 24],
          [25, 25],
          [24, 24.5],
          [23.5, 23],
          [23.5, 22],
          [23.5, 23],
          [23.5, 25],
          [23, 25.5],
          [22, 25.5],
          [21.5, 25],
          [21.5, 24],
          [21.5, 23],
          [21.5, 24],
          [21.5, 25],
          [21, 25.5],
          [20, 25.5],
          [19.5, 25.5],
          [18.5, 25],
          [18.5, 24.5],
          [18.5, 23.5],
          [18.5, 23],
          [18.5, 23.5],
          [18.5, 24.5],
          [18.5, 25],
          [18, 25.5],
          [17, 25.5],
          [16, 25],
          [15.5, 24.5],
          [15, 24],
          [14.5, 23.5],
          [14, 23],
          [13.5, 23],
          [12.5, 23],
          [11.5, 22.5],
          [10.5, 22],
          [9.5, 21.5],
          [8.5, 21],
          [7.5, 19.5],
          [6.5, 17.5],
          [6, 15.5],
          [6, 13.5],
          [6, 11],
          [6.5, 9.5],
          [7.5, 7.5],
          [9.5, 5.5],
          [11.5, 4],
          [14, 3],
          [15.5, 2.5],
          [17.5, 2.5],
          [21, 3],
          [24, 4],
          [26, 5.5],
          [28.5, 9],
          [29.5, 12],
          [30, 15],
          [29.5, 17],
          [29, 18.5],
          [28, 20],
          [27, 21],
          [26.5, 22],
          [26.5, 23]
        ], 32);
        strokePath(player_trail_colors[trail].skull_inner_copy, [
          [26, 24],
          [25, 25],
          [24, 24.5],
          [23.5, 23],
          [23.5, 22],
          [23.5, 23],
          [23.5, 25],
          [23, 25.5],
          [22, 25.5],
          [21.5, 25],
          [21.5, 24],
          [21.5, 23],
          [21.5, 24],
          [21.5, 25],
          [21, 25.5],
          [20, 25.5],
          [19.5, 25.5],
          [18.5, 25],
          [18.5, 24.5],
          [18.5, 23.5],
          [18.5, 23],
          [18.5, 23.5],
          [18.5, 24.5],
          [18.5, 25],
          [18, 25.5],
          [17, 25.5],
          [16, 25],
          [15.5, 24.5],
          [15, 24],
          [14.5, 23.5],
          [14, 23],
          [13.5, 23],
          [12.5, 23],
          [11.5, 22.5],
          [10.5, 22],
          [9.5, 21.5],
          [8.5, 21],
          [7.5, 19.5],
          [6.5, 17.5],
          [6, 15.5],
          [6, 13.5],
          [6, 11],
          [6.5, 9.5],
          [7.5, 7.5],
          [9.5, 5.5],
          [11.5, 4],
          [14, 3],
          [15.5, 2.5],
          [17.5, 2.5],
          [21, 3],
          [24, 4],
          [26, 5.5],
          [28.5, 9],
          [29.5, 12],
          [30, 15],
          [29.5, 17],
          [29, 18.5],
          [28, 20],
          [27, 21],
          [26.5, 22],
          [26.5, 23],
          [26, 24]
        ], 32);
        fillPath(player_trail_colors[trail].left_eye_inner1, [
          [16.5, 19.5],
          [18, 18],
          [18, 15.5],
          [17.5, 14],
          [15.5, 13],
          [13.5, 13.5],
          [12, 15.5],
          [12, 17],
          [12.5, 18.5],
          [14.5, 20]
        ], 32);
        strokePath(player_trail_colors[trail].left_eye_inner2, [
          [15, 14],
          [16.5, 14.5],
          [17.5, 16],
          [17.5, 17.5],
          [16, 19.5]
        ], 32);
        fillPath(player_trail_colors[trail].right_eye_inner1, [
          [23, 16],
          [23.5, 17.5],
          [25, 18.5],
          [27, 18],
          [27.5, 16.5],
          [27.5, 15],
          [27, 13.5],
          [26.5, 12.5],
          [25, 12],
          [24, 12.5],
          [23, 14]
        ], 32);
        strokePath(player_trail_colors[trail].right_eye_inner2, [
          [25, 13],
          [26, 13.5],
          [26.5, 15],
          [26.5, 16.5],
          [26, 17.5],
          [25.5, 18]
        ], 32);
        fillPath(player_trail_colors[trail].nose_inner1, [
          [21, 17.5],
          [22, 18.5],
          [22, 20],
          [21.5, 20],
          [21, 19.5],
          [20.5, 20],
          [20, 20],
          [19.5, 19.5],
          [19.5, 19],
          [20, 18]
        ], 32);
        strokePath(player_trail_colors[trail].nose_inner2, [
          [21.5, 19.5],
          [21.5, 19],
          [21, 18.5]
        ], 32);
        break;
    }
  },
  writable: false,
  configurable: false,
});

//PLAYER SKINS

Object.defineProperty(window, "draw_player_skin", {
  value: function draw_player_skin(player, _c = c) {
    //base body
    const skin = player.skin in player_skin_colors ? player.skin : "Default";
    _c.begin();
    _c.set_property("fillStyle", player.activeColor);
    _c.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    _c.fill();
    _c.set_property("strokeStyle", player_skin_colors[skin].outerBody);
    _c.set_property("lineWidth", 2.5);
    _c.stroke();

    const o = (base, unit, dimension = 1, offset = 1) => base + ((unit / dimension) * offset);
    const res_x = (input_x, resolution) => o(player.x-player.r, player.r*2, resolution, input_x);
    const res_y = (input_y, resolution) => o(player.y-player.r, player.r*2, resolution, input_y);
    //helper function for bosses to reduce code size
    const fillPath = (color, path, resolution) => {
      _c.begin();
      _c.set_property("fillStyle", color);
      _c.moveTo(res_x(path[0][0], resolution), res_y(path[0][1], resolution));
      for (let i = 1; i < path.length; i++) {
        let destination = path[i];
        _c.lineTo(res_x(destination[0], resolution), res_y(destination[1], resolution));
      }
      _c.fill();
    }
    //helper function for bosses to reduce code size
    const strokePath = (color, path, resolution) => {
      _c.begin();
      _c.set_property("strokeStyle", color);
      _c.moveTo(res_x(path[0][0], resolution), res_y(path[0][1], resolution));
      for (let i = 1; i < path.length; i++) {
        let destination = path[i];
        _c.lineTo(res_x(destination[0], resolution), res_y(destination[1], resolution));
      }
      _c.stroke();
    }
    switch (skin) {
      case "Default":
        break;
      case "Golem":
        fillPath(player_skin_colors[skin].left_eye_inner, [
          [13, 13],
          [11, 11],
          [7, 10],
          [4, 12],
          [6, 13],
          [10, 14]
        ], 32);
        fillPath(player_skin_colors[skin].right_eye_inner, [
          [19, 13],
          [21, 11],
          [25, 10],
          [28, 12],
          [26, 13],
          [22, 14]
        ], 32);
        strokePath(player_skin_colors[skin].left_eye_outer, [
          [13, 13],
          [11, 11],
          [7, 10],
          [4, 12],
          [6, 13],
          [10, 14],
          [13, 13]
        ], 32);
        strokePath(player_skin_colors[skin].left_eye_outer_copy, [
          [19, 13],
          [21, 11],
          [25, 10],
          [28, 12],
          [26, 13],
          [22, 14],
          [19, 13]
        ], 32);
        fillPath(player.activeColor, [
          [1, 21],
          [2, 27],
          [1, 29],
          [3, 31],
          [8, 34],
          [13, 35],
          [16, 35],
          [16, 21]
        ], 32);
        fillPath(player.acitveColor, [
          [31, 21],
          [30, 27],
          [31, 29],
          [29, 31],
          [24, 34],
          [19, 35],
          [16, 35],
          [16, 21]
        ], 32);
        strokePath(player_skin_colors[skin].lower_mouth_outer, [
          [31, 21],
          [30, 27],
          [31, 29],
          [29, 31],
          [24, 34],
          [19, 35],
          [16, 35],
          [13, 35],
          [8, 34],
          [3, 31],
          [1, 29],
          [2, 27],
          [1, 21]
        ], 32);
        fillPath(player_skin_colors[skin].inner_mouth_left, [
          [3, 18],
          [5, 20],
          [5, 23.5],
          [6.5, 27.5],
          [8, 28.5],
          [9, 27.5],
          [10, 27],
          [11, 27.5],
          [12, 28.5],
          [14, 29.5],
          [16, 29.5],
          [16, 25.5],
          [12, 24.5],
          [8.5, 23],
          [6, 20]
        ], 32);
        fillPath(player_skin_colors[skin].inner_mouth_right, [
          [29, 18],
          [27, 20],
          [27, 23.5],
          [25.5, 27.5],
          [24, 28.5],
          [23, 27.5],
          [22, 27],
          [21, 27.5],
          [20, 28.5],
          [18, 29.5],
          [16, 29.5],
          [16, 25.5],
          [20, 24.5],
          [23.5, 23],
          [26, 20]
        ], 32);
        fillPath(player_skin_colors[skin].left_eye_lid, [
          [13, 13],
          [12, 14],
          [9, 15],
          [5, 14],
          [3, 12],
          [4, 12],
          [6, 13],
          [10, 14]
        ], 32);
        fillPath(player_skin_colors[skin].left_right_lid, [
          [19, 13],
          [20, 14],
          [23, 15],
          [27, 14],
          [29, 12],
          [28, 12],
          [26, 13],
          [22, 14]
        ], 32);
        strokePath(player_skin_colors[skin].crack1, [
          [17, 0],
          [18, 1],
          [18, 3],
          [19, 4],
          [18, 5],
          [18, 6],
          [18, 5],
          [19, 4],
          [20, 5],
          [22, 6],
          [21, 7],
          [22, 6],
          [20, 5],
          [21, 5],
          [22, 4]
        ], 32);
        strokePath(player_skin_colors[skin].crack2, [
          [0, 18],
          [1, 17],
          [2, 14],
          [1, 13],
          [2, 14],
          [1, 17],
          [3, 16],
          [4, 17],
          [5, 16]
        ], 32);
        strokePath(player_skin_colors[skin].crack3, [
          [20, 21],
          [19, 20],
          [19, 17],
          [18, 16],
          [19, 17],
          [21, 18],
          [23, 17],
          [21, 18],
          [22, 19],
          [21, 18],
          [19, 17],
          [19, 19],
          [18, 18],
          [17, 20]
        ], 32);
        break;
      case "Alien":
        fillPath(player_skin_colors[skin].left_eye, [
          [14, 17],
          [13, 15],
          [10, 12],
          [8, 11],
          [7, 11],
          [6, 12],
          [6, 14],
          [7, 15.5],
          [10, 16.5],
          [12, 17],
          [13, 17.5]
        ], 32);
        fillPath(player_skin_colors[skin].right_eye, [
          [18, 17],
          [19, 15],
          [22, 12],
          [24, 11],
          [25, 11],
          [26, 12],
          [26, 14],
          [25, 15.5],
          [22, 16.5],
          [20, 17],
          [19, 17.5]
        ], 32);
        fillPath(player_skin_colors[skin].left_nose, [
          [15, 18],
          [14, 19],
          [15, 19]
        ], 32);
        fillPath(player_skin_colors[skin].right_nose, [
          [17, 18],
          [18, 19],
          [17, 19]
        ], 32);
        fillPath(player_skin_colors[skin].left_cheek, [
          [13, 30.5],
          [12, 29],
          [11, 26],
          [9, 25],
          [7, 24],
          [5, 23],
          [4, 22],
          [3, 20],
          [3.5, 21.5],
          [5, 24],
          [7, 25.5],
          [9, 26.5],
          [10, 28],
          [11, 29.5]
        ], 32);
        fillPath(player_skin_colors[skin].right_cheek, [
          [19, 30.5],
          [20, 29],
          [21, 26],
          [23, 25],
          [25, 24],
          [27, 23],
          [28, 22],
          [29, 20],
          [28.5, 21.5],
          [27, 24],
          [25, 25.5],
          [23, 26.5],
          [22, 28],
          [21, 29.5]
        ], 32);
        strokePath(player_skin_colors[skin].mouth, [
          [14, 26],
          [15, 27],
          [17, 27],
          [18, 26]
        ], 32);
        fillPath(player_skin_colors[skin].forehead_left, [
          [3, 8],
          [5, 6.5],
          [8, 5],
          [11, 4],
          [15, 3.5],
          [16, 3.5],
          [16, 3],
          [12, 3],
          [9, 4],
          [6, 5.5]
        ], 32);
        fillPath(player_skin_colors[skin].forehead_right, [
          [29, 8],
          [27, 6.5],
          [24, 5],
          [21, 4],
          [17, 3.5],
          [16, 3.5],
          [16, 3],
          [20, 3],
          [23, 4],
          [26, 5.5]
        ], 32);
        break;
      case "Football":
        fillPath(player_skin_colors[skin].part_1, [
          [3.5, 1.5],
          [2, 2.5],
          [3, 2.5]
        ], 16);
        fillPath(player_skin_colors[skin].part_2, [
          [8.5, 1],
          [10.5, 1],
          [12.5, 2],
          [11.5, 3],
          [10, 2.5],
          [9, 2.5]
        ], 16);
        fillPath(player_skin_colors[skin].part_3, [
          [16, 6.5],
          [15.5, 7.5],
          [16, 8.5]
        ], 16);
        fillPath(player_skin_colors[skin].part_4, [
          [12, 7],
          [14, 8],
          [13.5, 10],
          [11.5, 10.5],
          [11, 8.5]
        ], 16);
        fillPath(player_skin_colors[skin].part_5, [
          [14, 13],
          [13, 13],
          [13, 14]
        ], 16);
        fillPath(player_skin_colors[skin].part_6, [
          [8, 15],
          [8, 14],
          [6.5, 14],
          [5.5, 13],
          [5, 14],
          [6, 15.5]
        ], 16);
        fillPath(player_skin_colors[skin].part_7, [
          [2, 8],
          [4, 9.5],
          [6, 7.5],
          [5.5, 5],
          [2.5, 5.5]
        ], 16);
        fillPath(player_skin_colors[skin].part_8, [
          [0, 8.5],
          [1, 9],
          [0.5, 10]
        ], 16);
        strokePath(player_skin_colors[skin].part_9, [
          [3, 2.5],
          [2.5, 4],
          [2.5, 5.5]
        ], 16);
        strokePath(player_skin_colors[skin].part_10, [
          [3.5, 1.5],
          [5, 1],
          [7, 0.5],
          [8.5, 1]
        ], 16);
        strokePath(player_skin_colors[skin].part_11, [
          [16, 6.5],
          [15, 5],
          [14, 3.5],
          [12.5, 2]
        ], 16);
        strokePath(player_skin_colors[skin].part_12, [
          [12, 7],
          [12.5, 5.5],
          [12, 4],
          [11.5, 3]
        ], 16);
        strokePath(player_skin_colors[skin].part_14, [
          [11, 8.5],
          [6, 7.5]
        ], 16);
        strokePath(player_skin_colors[skin].part_15, [
          [1, 9],
          [2, 8]
        ], 16);
        strokePath(player_skin_colors[skin].part_16, [
          [5.5, 5],
          [7, 3],
          [9, 2.5]
        ], 16);
        strokePath(player_skin_colors[skin].part_17, [
          [11.5, 10.5],
          [11, 11.5],
          [10, 12.5],
          [9, 13.5],
          [8, 14]
        ], 16);
        strokePath(player_skin_colors[skin].part_18, [
          [5, 14],
          [4, 14],
          [2, 13.5]
        ], 16);
        strokePath(player_skin_colors[skin].part_19, [
          [14, 8],
          [15, 8],
          [15.5, 7.5]
        ], 16);
        strokePath(player_skin_colors[skin].part_20, [
          [5.5, 13],
          [5, 12.5],
          [4.5, 11.5],
          [4, 10.5],
          [4, 9.5]
        ], 16);
        strokePath(player_skin_colors[skin].part_21, [
          [8, 15],
          [9, 15.5],
          [10, 15.5],
          [11.5, 15],
          [13, 14]
        ], 16);
        strokePath(player_skin_colors[skin].part_22, [
          [13, 13],
          [13.5, 12.5],
          [14, 11.5],
          [14, 10.5],
          [13.5, 10]
        ], 16);
        break;
      case "Beast":
        fillPath(player_skin_colors[skin].left_eye, [
          [13.5, 15.5],
          [13, 15],
          [12, 14.5],
          [10.5, 14],
          [8.5, 13.5],
          [6, 13],
          [4, 14],
          [1.5, 14.5],
          [3.5, 15.5],
          [8, 16]
        ], 32);
        strokePath(player_skin_colors[skin].left_eye_outer, [
          [13.5, 15.5],
          [13, 15],
          [12, 14.5],
          [10.5, 14],
          [8.5, 13.5],
          [6, 13],
          [4, 14],
          [1.5, 14.5],
          [3.5, 15.5],
          [8, 16],
          [13.5, 15.5]
        ], 32);
        fillPath(player_skin_colors[skin].right_eye, [
          [18.5, 15.5],
          [19, 15],
          [20, 14.5],
          [21.5, 14],
          [23.5, 13.5],
          [26, 13],
          [28, 14],
          [30.5, 14.5],
          [28.5, 15.5],
          [24, 16]
        ], 32);
        strokePath(player_skin_colors[skin].right_eye_outer, [
          [18.5, 15.5],
          [19, 15],
          [20, 14.5],
          [21.5, 14],
          [23.5, 13.5],
          [26, 13],
          [28, 14],
          [30.5, 14.5],
          [28.5, 15.5],
          [24, 16],
          [18.5, 15.5]
        ], 32);
        fillPath(player_skin_colors[skin].left_eyebrow, [
          [4.5, 7],
          [5, 9],
          [8.5, 10.5],
          [12, 11],
          [14, 13],
          [14.5, 14.5],
          [15, 12],
          [12, 9.5],
          [8, 8.5]
        ], 32);
        strokePath(player_skin_colors[skin].left_eyebrow_outline, [
          [4.5, 7],
          [5, 9],
          [8.5, 10.5],
          [12, 11],
          [14, 13],
          [14.5, 14.5],
          [15, 12],
          [12, 9.5],
          [8, 8.5],
          [4.5, 7]
        ], 32);
        fillPath(player_skin_colors[skin].right_eyebrow, [
          [27.5, 7],
          [27, 9],
          [23.5, 10.5],
          [20, 11],
          [18, 13],
          [17.5, 14.5],
          [17, 12],
          [20, 9.5],
          [24, 8.5]
        ], 32);
        strokePath(player_skin_colors[skin].right_eyebrow_outline, [
          [27.5, 7],
          [27, 9],
          [23.5, 10.5],
          [20, 11],
          [18, 13],
          [17.5, 14.5],
          [17, 12],
          [20, 9.5],
          [24, 8.5],
          [27.5, 7]
        ], 32);
        fillPath(player_skin_colors[skin].mouth_inner_left, [
          [16, 20.5],
          [12, 21.5],
          [7.5, 20.5],
          [4.5, 20],
          [2, 19],
          [2.5, 21.5],
          [5, 25.5],
          [9, 27.5],
          [13, 29.5],
          [16, 29.5]
        ], 32);
        fillPath(player_skin_colors[skin].mouth_inner_right, [
          [16, 20.5],
          [20, 21.5],
          [24.5, 20.5],
          [27.5, 20],
          [30, 19],
          [29.5, 21.5],
          [27, 25.5],
          [23, 27.5],
          [19, 29.5],
          [16, 29.5]
        ], 32);
        fillPath(player_skin_colors[skin].upper_teeth_left, [
          [3, 20],
          [3.5, 21.5],
          [4, 20.5],
          [4.5, 22],
          [5.5, 21],
          [6, 22.5],
          [7, 21.5],
          [7.5, 23],
          [8.5, 22],
          [9, 24],
          [10, 22.5],
          [11, 24.5],
          [12.5, 22.5],
          [13.5, 25],
          [14.5, 22],
          [15, 24.5],
          [16, 22.5]
        ], 32);
        fillPath(player_skin_colors[skin].upper_teeth_right, [
          [29, 20],
          [28.5, 21.5],
          [28, 20.5],
          [27.5, 22],
          [26.5, 21],
          [26, 22.5],
          [25, 21.5],
          [24.5, 23],
          [23.5, 22],
          [23, 24],
          [22, 22.5],
          [21, 24.5],
          [19.5, 22.5],
          [18.5, 25],
          [17.5, 22],
          [17, 24.5],
          [16, 22.5]
        ], 32);
        fillPath(player_skin_colors[skin].upper_teeth_filler, [
          [13, 22],
          [16, 21],
          [19, 22],
          [16, 22.5]
        ], 32);
        fillPath(player_skin_colors[skin].bottom_teeth_left, [
          [5, 25],
          [5.5, 24],
          [6, 25.5],
          [7, 24.5],
          [7.5, 26],
          [8.5, 25],
          [9.5, 27],
          [10.5, 26],
          [11.5, 28],
          [12.5, 27],
          [13, 29]
        ], 32);
        fillPath(player_skin_colors[skin].bottom_teeth_right, [
          [27, 25],
          [26.5, 24],
          [26, 25.5],
          [25, 24.5],
          [24.5, 26],
          [23.5, 25],
          [22.5, 27],
          [21.5, 26],
          [20.5, 28],
          [19.5, 27],
          [19, 29]
        ], 32);
        fillPath(player_skin_colors[skin].tongue_inner, [
          [13.5, 28.5],
          [14.5, 27.5],
          [16.5, 27],
          [18.5, 27.5],
          [21.5, 30],
          [22.5, 31.5],
          [22.5, 33],
          [21.5, 34],
          [22, 34.5],
          [22, 35],
          [21.5, 35],
          [21, 35],
          [20.5, 34.5],
          [20, 34],
          [20, 33.5],
          [20, 33],
          [20.5, 32.5],
          [20.5, 32],
          [20, 32],
          [19.5, 31.5],
          [18.5, 31],
          [17.5, 30.5],
          [17, 30],
          [16.5, 29.5],
          [15.5, 29.5],
          [14, 29.5],
          [13.5, 29.5]
        ], 32);
        strokePath(player_skin_colors[skin].tongue_outer, [
          [13.5, 28.5],
          [14.5, 27.5],
          [16.5, 27],
          [18.5, 27.5],
          [21.5, 30],
          [22.5, 31.5],
          [22.5, 33],
          [21.5, 34],
          [22, 34.5],
          [22, 35],
          [21.5, 35],
          [21, 35],
          [20.5, 34.5],
          [20, 34],
          [20, 33.5],
          [20, 33],
          [20.5, 32.5],
          [20.5, 32],
          [20, 32],
          [19.5, 31.5],
          [18.5, 31],
          [17.5, 30.5],
          [17, 30],
          [16.5, 29.5],
          [15.5, 29.5],
          [14, 29.5],
          [13.5, 29.5],
          [13.5, 28.5]
        ], 32);
        fillPath(player_skin_colors[skin].left_nose, [
          [15.5, 17.5],
          [15, 18.5],
          [14.5, 19],
          [15.5, 18.5]
        ], 32);
        fillPath(player_skin_colors[skin].right_nose, [
          [16.5, 17.5],
          [17, 18.5],
          [17.5, 19],
          [16.5, 18.5]
        ], 32);
        fillPath(player.activeColor, [
          [0, 18.5],
          [-0.5, 17],
          [-1.5, 15.5],
          [-2.5, 14],
          [-3.5, 11],
          [-2.5, 8.5],
          [-2, 5.5],
          [-2.5, 4.5],
          [-3.5, 4],
          [-2, 4],
          [-1, 4.5],
          [0, 5.5],
          [1, 7],
          [2, 8.5],
          [0.5, 19],
          [0, 18.5]
        ], 32);
        strokePath(player_skin_colors[skin].left_ear_outer, [
          [0, 18.5],
          [-0.5, 17],
          [-1.5, 15.5],
          [-2.5, 14],
          [-3.5, 11],
          [-2.5, 8.5],
          [-2, 5.5],
          [-2.5, 4.5],
          [-3.5, 4],
          [-2, 4],
          [-1, 4.5],
          [0, 5.5],
          [1, 7],
          [2, 8.5]
        ], 32);
        fillPath(player.activeColor, [
          [32, 18.5],
          [32.5, 17],
          [33.5, 15.5],
          [34.5, 14],
          [35.5, 11],
          [34.5, 8.5],
          [34, 5.5],
          [34.5, 4.5],
          [35.5, 4],
          [34, 4],
          [33, 4.5],
          [32, 5.5],
          [31, 7],
          [30, 8.5],
          [31.5, 19],
          [32, 18.5]
        ], 32);
        strokePath(player_skin_colors[skin].right_ear_outer, [
          [32, 18.5],
          [32.5, 17],
          [33.5, 15.5],
          [34.5, 14],
          [35.5, 11],
          [34.5, 8.5],
          [34, 5.5],
          [34.5, 4.5],
          [35.5, 4],
          [34, 4],
          [33, 4.5],
          [32, 5.5],
          [31, 7],
          [30, 8.5]
        ], 32);
        strokePath(player_skin_colors[skin].left_ear_inner_drawing, [
          [-0.5, 15.5],
          [-1, 14.5],
          [-0.5, 13.5],
          [0, 12],
          [0, 10.5],
          [-0.5, 9.5],
          [-1, 8.5],
          [-2, 9],
          [-2.5, 10],
          [-2.5, 11],
          [-2.5, 10],
          [-2, 9],
          [-1.5, 9.5],
          [-1, 11],
          [-1, 12],
          [-1.5, 12.5]
        ], 32);
        strokePath(player_skin_colors[skin].right_ear_inner_drawing, [
          [32.5, 15.5],
          [33, 14.5],
          [32.5, 13.5],
          [32, 12],
          [32, 10.5],
          [32.5, 9.5],
          [33, 8.5],
          [34, 9],
          [34.5, 10],
          [34.5, 11],
          [34.5, 10],
          [34, 9],
          [33.5, 9.5],
          [33, 11],
          [33, 12],
          [33.5, 12.5]
        ], 32);
        strokePath(player_skin_colors[skin].tongue_inner_drawing, [
          [16, 28.5],
          [17, 28],
          [18, 28.5],
          [20, 30],
          [20.5, 31],
          [21.5, 32]
        ], 32);
        break;
      case "trollface":
        fillPath(player.activeColor, [
          [3.5, 6.5],
          [2.5, 7],
          [1.5, 7.5],
          [0.5, 8.5],
          [-0.5, 9],
          [-1, 9.5],
          [-1.5, 10],
          [-2, 10.5],
          [-2, 11],
          [-2, 11.5],
          [-2, 13],
          [-2, 14],
          [-1.5, 15.5],
          [-1, 16.5],
          [-0.5, 17],
          [0, 18],
          [0, 18.5],
          [1, 21]
        ], 32);
        strokePath(player_skin_colors[skin].left_cheek_outer, [
          [3.5, 6.5],
          [2.5, 7],
          [1.5, 7.5],
          [0.5, 8.5],
          [-0.5, 9],
          [-1, 9.5],
          [-1.5, 10],
          [-2, 10.5],
          [-2, 11],
          [-2, 11.5],
          [-2, 13],
          [-2, 14],
          [-1.5, 15.5],
          [-1, 16.5],
          [-0.5, 17],
          [0, 18],
          [0, 18.5],
          [1, 21]
        ], 32);
        fillPath(player.activeColor, [
          [29.5, 8],
          [30, 9],
          [31, 9.5],
          [31.5, 10],
          [32.5, 10.5],
          [34.5, 12],
          [34.5, 13],
          [35, 14],
          [35, 14],
          [34.5, 16],
          [34, 16],
          [33.5, 17],
          [33, 17],
          [32.5, 17.5],
          [32, 18.5],
          [31.5, 20]
        ], 32);
        strokePath(player_skin_colors[skin].right_cheek_outer, [
          [29.5, 8],
          [30, 9],
          [31, 9.5],
          [31.5, 10],
          [32.5, 10.5],
          [34.5, 12],
          [34.5, 13],
          [35, 14],
          [35, 14],
          [34.5, 16],
          [34, 16],
          [33.5, 17],
          [33, 17],
          [32.5, 17.5],
          [32, 18.5],
          [31.5, 20]
        ], 32);
        fillPath(player.activeColor, [
          [4, 6],
          [4, 5],
          [4.5, 4.5],
          [4, 4],
          [4, 3.5],
          [4.5, 3],
          [5, 2.5],
          [6.5, 1.5],
          [8, 1],
          [8.5, 1],
          [10, 1],
          [11.5, 0.5],
          [13, 0.5],
          [15, 0],
          [21, 0.5],
          [22.5, 1],
          [24.5, 1],
          [25.5, 1.5],
          [26.5, 2],
          [27, 2.5],
          [28, 3.5],
          [28.5, 4.5],
          [28.5, 5],
          [29, 6],
          [29, 7.5]
        ], 32);
        strokePath(player_skin_colors[skin].forehead_outer, [
          [4, 6],
          [4, 5],
          [4.5, 4.5],
          [4, 4],
          [4, 3.5],
          [4.5, 3],
          [5, 2.5],
          [6.5, 1.5],
          [8, 1],
          [8.5, 1],
          [10, 1],
          [11.5, 0.5],
          [13, 0.5],
          [15, 0],
          [21, 0.5],
          [22.5, 1],
          [24.5, 1],
          [25.5, 1.5],
          [26.5, 2],
          [27, 2.5],
          [28, 3.5],
          [28.5, 4.5],
          [28.5, 5],
          [29, 6],
          [29, 7.5]
        ], 32);
        fillPath(player.activeColor, [
          [1, 21.5],
          [1.5, 22],
          [1.5, 23.5],
          [1.5, 24.5],
          [1.5, 26],
          [1, 26.5],
          [0.5, 27.5],
          [0, 28],
          [-0.5, 28.5],
          [-1, 29.5],
          [-1, 30.5],
          [-0.5, 31.5],
          [1, 33],
          [5, 34.5],
          [9, 34.5],
          [16, 34.5],
          [20.5, 33],
          [23.5, 31.5],
          [27.5, 28.5],
          [29.5, 26],
          [30.5, 23.5],
          [30.5, 23],
          [30.5, 22]
        ], 32);
        strokePath(player_skin_colors[skin].jaw_outer, [
          [1, 21.5],
          [1.5, 22],
          [1.5, 23.5],
          [1.5, 24.5],
          [1.5, 26],
          [1, 26.5],
          [0.5, 27.5],
          [0, 28],
          [-0.5, 28.5],
          [-1, 29.5],
          [-1, 30.5],
          [-0.5, 31.5],
          [1, 33],
          [5, 34.5],
          [9, 34.5],
          [16, 34.5],
          [20.5, 33],
          [23.5, 31.5],
          [27.5, 28.5],
          [29.5, 26],
          [30.5, 23.5],
          [30.5, 23],
          [30.5, 22]
        ], 32);
        fillPath(player_skin_colors[skin].left_eye1, [
          [11.5, 9.5],
          [11, 9],
          [10, 8.5],
          [9.5, 8.5],
          [7.5, 8.5],
          [6.5, 8.5],
          [5.5, 9],
          [4.5, 9.5],
          [4.5, 10],
          [7, 10.5],
          [9, 10.5],
          [11.5, 11],
          [12, 10]
        ], 32);
        fillPath(player_skin_colors[skin].left_eye2, [
          [7.5, 9.5],
          [6.5, 9],
          [5.5, 9.5],
          [7, 10]
        ], 32);
        fillPath(player_skin_colors[skin].right_eye1, [
          [17, 10.5],
          [17, 11.5],
          [18, 12],
          [20.5, 11],
          [22.5, 10.5],
          [23.5, 10.5],
          [24.5, 10.5],
          [25.5, 11.5],
          [26.5, 12],
          [27, 11.5],
          [26.5, 10.5],
          [26, 9.5],
          [25.5, 9],
          [24.5, 8.5],
          [23.5, 8],
          [22.5, 8],
          [21, 8],
          [19, 8.5],
          [17.5, 9.5]
        ], 32);
        fillPath(player_skin_colors[skin].right_eye2, [
          [25.5, 10],
          [26, 10],
          [26.5, 11],
          [26, 11],
          [25, 10.5]
        ], 32);
        fillPath(player_skin_colors[skin].right_eye3, [
          [22, 8.5],
          [22, 9.5],
          [22.5, 10],
          [21.5, 10],
          [20.5, 10],
          [19.5, 10.5],
          [18.5, 11],
          [17.5, 10.5],
          [19, 9.5],
          [20.5, 8.5]
        ], 32);
        fillPath(player_skin_colors[skin].nose1, [
          [13.5, 10],
          [12, 10],
          [11.5, 11],
          [11.5, 13],
          [9.5, 14.5],
          [9.5, 15.5],
          [11, 17.5],
          [11.5, 18],
          [12, 17.5],
          [13, 17],
          [12.5, 16.5],
          [11.5, 17],
          [10.5, 15.5],
          [10.5, 14.5],
          [12.5, 13.5],
          [12.5, 11],
          [13.5, 10.5]
        ], 32);
        fillPath(player_skin_colors[skin].nose2, [
          [14.5, 15.5],
          [15.5, 15],
          [17.5, 15.5],
          [17.5, 17],
          [17, 16.5],
          [15.5, 16],
          [15, 16]
        ], 32);
        fillPath(player_skin_colors[skin].nose3, [
          [18, 18],
          [19, 17.5],
          [19.5, 15.5],
          [17.5, 14.5],
          [18.5, 14],
          [20.5, 14.5],
          [20.5, 16],
          [20, 17.5],
          [19.5, 18.5],
          [18.5, 18.5]
        ], 32);
        fillPath(player_skin_colors[skin].mouth1, [
          [27.5, 16],
          [25, 18],
          [23.5, 19],
          [20.5, 20],
          [19.5, 20.5],
          [17, 21.5],
          [15, 22],
          [14, 22],
          [11.5, 22],
          [10, 21.5],
          [8.5, 21],
          [6.5, 19.5],
          [6, 18.5],
          [5, 17],
          [4.5, 15.5],
          [4, 15],
          [3.5, 15],
          [3.5, 16],
          [3.5, 17],
          [3, 17.5],
          [3, 19],
          [3.5, 21],
          [4, 23.5],
          [5.5, 25.5],
          [8, 27],
          [11, 27.5],
          [13.5, 27.5],
          [17, 27.5],
          [20.5, 26.5],
          [22.5, 25],
          [24.5, 23],
          [26.5, 19.5],
          [27.5, 18],
          [28.5, 17],
          [28.5, 16]
        ], 32);
        fillPath(player_skin_colors[skin].mouth2, [
          [28.5, 14],
          [28, 15],
          [28, 16],
          [28.5, 17],
          [29.5, 17.5],
          [30.5, 17.5],
          [29.5, 16.5],
          [29, 15.5],
          [29, 14.5]
        ], 32);
        fillPath(player_skin_colors[skin].mouth3, [
          [1, 13.5],
          [1.5, 13],
          [3.5, 12],
          [5.5, 12.5],
          [6.5, 13.5],
          [7.5, 14],
          [8, 13.5],
          [8.5, 13],
          [9, 13.5],
          [9, 14],
          [8.5, 15],
          [7.5, 15],
          [6, 15],
          [6, 14.5],
          [5.5, 14],
          [4.5, 13.5],
          [4, 13.5],
          [2.5, 13.5],
          [1.5, 14]
        ], 32);
        fillPath(player_skin_colors[skin].mouth4, [
          [22.5, 12.5],
          [22.5, 13],
          [23.5, 14],
          [25.5, 14.5],
          [27, 14.5],
          [28, 14],
          [29, 13.5],
          [30, 13],
          [31.5, 13.5],
          [32, 14.5],
          [32, 16],
          [31.5, 17],
          [31.5, 18],
          [32.5, 17],
          [32.5, 16],
          [33, 15],
          [32.5, 14],
          [32, 13],
          [31, 12.5],
          [29, 12],
          [28, 12.5],
          [27.5, 13],
          [26, 13.5],
          [24.5, 13.5],
          [23.5, 13],
          [23, 12.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth1, [
          [4.5, 17],
          [4, 18],
          [4, 17]
        ], 32);
        fillPath(player_skin_colors[skin].teeth2, [
          [4.5, 19],
          [5, 17.5],
          [5.5, 18.5],
          [5.5, 20],
          [4.5, 19.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth3, [
          [6, 19.5],
          [7, 20.5],
          [7, 22],
          [6, 21]
        ], 32);
        fillPath(player_skin_colors[skin].teeth4, [
          [8, 22.5],
          [8, 21.5],
          [10.5, 22],
          [10, 23]
        ], 32);
        fillPath(player_skin_colors[skin].teeth5, [
          [11.5, 23.5],
          [11.5, 22.5],
          [14, 22.5],
          [14, 23.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth6, [
          [15, 22.5],
          [15, 23.5],
          [17, 23.5],
          [19.5, 22.5],
          [19, 21.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth7, [
          [20, 21],
          [20.5, 22],
          [22, 21.5],
          [23.5, 20.5],
          [24, 19.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth8, [
          [25, 19],
          [25, 20],
          [26.5, 19],
          [28, 16.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth9, [
          [4.5, 23],
          [4, 21.5],
          [4, 22.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth10, [
          [5, 24],
          [6.5, 25],
          [6, 23],
          [5.5, 22.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth11, [
          [7.5, 24.5],
          [7.5, 26],
          [9.5, 26.5],
          [9, 25],
          [9.5, 24.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth12, [
          [10.5, 26.5],
          [10, 25],
          [11.5, 25],
          [12, 25.5],
          [12, 26.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth13, [
          [13, 26.5],
          [13, 25],
          [14.5, 25.5],
          [15.5, 25],
          [15.5, 26.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth14, [
          [16.5, 25],
          [16.5, 26.5],
          [18, 26.5],
          [21, 25.5],
          [20.5, 24],
          [18.5, 25]
        ], 32);
        fillPath(player_skin_colors[skin].teeth15, [
          [21.5, 24],
          [22, 25],
          [23.5, 23.5],
          [23.5, 23],
          [23, 22.5]
        ], 32);
        fillPath(player_skin_colors[skin].teeth16, [
          [24.5, 21.5],
          [25.5, 21],
          [24.5, 22.5]
        ], 32);
        strokePath(player_skin_colors[skin].chin1, [
          [2, 28.5],
          [2.5, 30],
          [3, 30.5],
          [4, 31.5],
          [7, 32.5],
          [10.5, 32.5],
          [14.5, 32.5],
          [17, 32],
          [19, 31.5],
          [22.5, 30.5],
          [25, 29],
          [27, 27.5]
        ], 32);
        strokePath(player_skin_colors[skin].chin2, [
          [4, 28.5],
          [4.5, 29.5],
          [5.5, 30.5],
          [7.5, 31],
          [10, 31.5],
          [13, 31.5],
          [15.5, 31.5],
          [19.5, 30.5],
          [21, 30],
          [23.5, 28],
          [25.5, 27]
        ], 32);
        strokePath(player_skin_colors[skin].chin3, [
          [8.5, 29.5],
          [11.5, 30],
          [14, 30],
          [17.5, 30]
        ], 32);
        strokePath(player_skin_colors[skin].nose_line, [
          [22, 15.5],
          [21.5, 16],
          [21, 17],
          [22, 17.5],
          [23.5, 17],
          [25, 17.5]
        ], 32);
        strokePath(player_skin_colors[skin].nose_line2, [
          [9.5, 14.5],
          [8.5, 16],
          [7.5, 17]
        ], 32);
        strokePath(player_skin_colors[skin].cheek_line, [
          [2.5, 16],
          [1.5, 15.5],
          [0.5, 13],
          [1, 11.5],
          [2.5, 11]
        ], 32);
        strokePath(player_skin_colors[skin].cheek_line2, [
          [2, 17.5],
          [0.5, 17],
          [-0.5, 16.5],
          [-1, 15],
          [-1, 13.5],
          [-1, 12],
          [-0.5, 11],
          [0.5, 10],
          [1.5, 9.5],
          [3, 10],
          [4, 10]
        ], 32);
        strokePath(player_skin_colors[skin].cheek_line3, [
          [33.5, 16.5],
          [33.5, 15],
          [33.5, 13.5],
          [32.5, 12.5],
          [31.5, 12],
          [29.5, 11.5],
          [28.5, 11]
        ], 32);
        strokePath(player_skin_colors[skin].eye_line, [
          [12.5, 9],
          [12.5, 7],
          [12, 6]
        ], 32);
        strokePath(player_skin_colors[skin].eye_line2, [
          [13, 5],
          [11.5, 4.5],
          [9.5, 4],
          [7.5, 4.5],
          [6.5, 5.5],
          [6, 6.5]
        ], 32);
        strokePath(player_skin_colors[skin].eye_line3, [
          [17.5, 8.5],
          [17.5, 7.5],
          [18, 6.5],
          [19, 6]
        ], 32);
        strokePath(player_skin_colors[skin].eye_line4, [
          [18.5, 5],
          [20, 4.5],
          [22.5, 4.5],
          [24, 5],
          [25.5, 6],
          [26.5, 7.5]
        ], 32);
        strokePath(player_skin_colors[skin].eye_line5, [
          [27, 9.5],
          [28, 10],
          [29, 10],
          [27.5, 10.5]
        ], 32);
        strokePath(player_skin_colors[skin].forehead_line1, [
          [6.5, 4],
          [7.5, 3.5],
          [10.5, 3.5],
          [13, 4],
          [17, 3.5],
          [22.5, 3],
          [24, 3.5],
          [26, 4.5],
          [27, 6.5]
        ], 32);
        strokePath(player_skin_colors[skin].forehead_line2, [
          [8.5, 1],
          [11.5, 2],
          [14, 2.5],
          [16, 2.5],
          [17.5, 2],
          [20.5, 2],
          [22.5, 2],
          [24.5, 2.5],
          [25.5, 3.5],
          [27, 5]
        ], 32);
        break;
      case "Goth Girl":
        fillPath(player_skin_colors[skin].part_1, [
          [33.7, 62.7],
          [34, 63],
          [33, 63],
          [33, 62],
          [32, 62],
          [31, 62],
          [31, 61],
          [30, 61],
          [29, 61],
          [29, 60],
          [28, 60],
          [28, 59],
          [27, 59],
          [26, 59],
          [26, 58],
          [25, 58],
          [25, 57],
          [24, 57],
          [23, 57],
          [23, 56],
          [22, 56],
          [22, 55],
          [21, 55],
          [20, 54],
          [19, 54],
          [19, 53],
          [18, 52],
          [18, 51],
          [17, 51],
          [17, 50],
          [16, 49],
          [16, 48],
          [15, 47],
          [15, 46],
          [15, 45],
          [14, 45],
          [14, 44],
          [14, 43],
          [13, 42],
          [13, 41],
          [13, 40],
          [13, 39],
          [12, 38],
          [12, 37],
          [12, 36],
          [12, 35],
          [12, 34],
          [12, 33],
          [11, 33],
          [11, 32],
          [11, 31],
          [11, 30],
          [11, 29],
          [11, 28],
          [10, 28],
          [10, 27],
          [10, 26],
          [10, 25],
          [10, 24],
          [10, 23],
          [10, 22],
          [10, 21],
          [10, 20],
          [10, 19],
          [10, 18],
          [10, 17],
          [10, 16],
          [11, 15],
          [11, 14],
          [11, 13],
          [11, 12],
          [12, 12],
          [12, 11],
          [12, 10],
          [13, 10],
          [13, 9],
          [14, 9],
          [14, 8],
          [15, 8],
          [16, 8],
          [17, 8],
          [18, 7],
          [19, 7],
          [20, 7],
          [21, 7],
          [21, 6],
          [22, 6],
          [23, 6],
          [24, 6],
          [25, 6],
          [26, 6],
          [26, 5],
          [27, 5],
          [28, 5],
          [29, 5],
          [30, 5],
          [31, 4],
          [32, 4],
          [33, 4],
          [34, 4],
          [35, 4],
          [36, 4],
          [37, 4],
          [38, 4],
          [39, 4],
          [40, 4],
          [40, 5],
          [41, 5],
          [42, 5],
          [43, 6],
          [44, 6],
          [44, 7],
          [45, 7],
          [46, 8],
          [47, 8],
          [47, 9],
          [48, 9],
          [49, 10],
          [50, 11],
          [50, 12],
          [51, 12],
          [51, 13],
          [51, 14],
          [52, 14],
          [52, 15],
          [52, 16],
          [52, 17],
          [52, 18],
          [53, 18],
          [53, 19],
          [53, 20],
          [53, 21],
          [53, 22],
          [54, 23],
          [54, 24],
          [54, 25],
          [54, 26],
          [54, 27],
          [54, 28],
          [54, 29],
          [54, 30],
          [54, 31],
          [54, 32],
          [54, 33],
          [54, 34],
          [54, 35],
          [54, 36],
          [54, 37],
          [54, 38],
          [53, 38],
          [53, 39],
          [53, 40],
          [53, 41],
          [53, 42],
          [52, 43],
          [52, 44],
          [52, 45],
          [52, 46],
          [52, 47],
          [52, 48],
          [51, 48],
          [51, 49],
          [50, 49],
          [50, 50],
          [49, 50],
          [49, 51],
          [48, 51],
          [48, 52],
          [48, 53],
          [47, 53],
          [47, 54],
          [46, 55],
          [45, 56],
          [44, 56],
          [44, 57],
          [43, 57],
          [42, 58],
          [41, 58],
          [41, 59],
          [40, 59],
          [40, 60],
          [39, 60],
          [38, 60],
          [38, 61],
          [37, 61],
          [37, 62],
          [33.9, 62.9]
        ], 64);
        fillPath(player_skin_colors[skin].part_2, [
          [28.3, 44.5],
          [28, 44],
          [28, 43],
          [28, 42],
          [27, 42],
          [27, 41],
          [26, 41],
          [26, 40],
          [25, 40],
          [24, 40],
          [24, 39],
          [23, 39],
          [22, 39],
          [21, 39],
          [20, 39],
          [19, 39],
          [18, 39],
          [17, 39],
          [17, 40],
          [17, 41],
          [17, 42],
          [18, 42],
          [18, 43],
          [19, 43],
          [19, 44],
          [20, 44],
          [20, 45],
          [21, 45],
          [22, 45],
          [23, 46],
          [24, 46],
          [24, 47],
          [23, 47],
          [23, 48],
          [22, 48],
          [21, 47],
          [20, 47],
          [19, 47],
          [19, 46],
          [18, 46],
          [18, 45],
          [17, 45],
          [17, 44],
          [16, 43],
          [16, 42],
          [15, 42],
          [15, 41],
          [15, 40],
          [15, 39],
          [15, 38],
          [15, 37],
          [16, 37],
          [16, 36],
          [17, 36],
          [18, 36],
          [19, 36],
          [20, 36],
          [21, 36],
          [22, 36],
          [23, 36],
          [24, 36],
          [25, 36],
          [25, 37],
          [26, 37],
          [27, 37],
          [27, 38],
          [28, 38],
          [28, 39],
          [29, 39],
          [29, 40],
          [29, 41],
          [29, 42],
          [29, 43],
          [29, 44],
          [29, 45]
        ], 64);
        fillPath(player_skin_colors[skin].part_3, [
          [37.6, 43.2],
          [37, 43],
          [37, 42],
          [37, 41],
          [37, 40],
          [37, 39],
          [37, 38],
          [37, 37],
          [38, 37],
          [39, 37],
          [39, 36],
          [40, 36],
          [41, 36],
          [41, 35],
          [42, 35],
          [43, 35],
          [43, 34],
          [44, 34],
          [45, 34],
          [46, 34],
          [47, 34],
          [48, 34],
          [49, 34],
          [49, 35],
          [50, 36],
          [50, 37],
          [50, 38],
          [49, 39],
          [49, 40],
          [49, 41],
          [49, 42],
          [48, 43],
          [48, 44],
          [47, 44],
          [47, 45],
          [46, 45],
          [45, 45],
          [44, 45],
          [43, 45],
          [43, 44],
          [42, 44],
          [41, 44],
          [42, 44],
          [43, 44],
          [43, 43],
          [44, 43],
          [45, 43],
          [46, 43],
          [46, 42],
          [46, 41],
          [47, 41],
          [47, 40],
          [47, 39],
          [47, 38],
          [47, 37],
          [46, 37],
          [45, 37],
          [44, 37],
          [43, 37],
          [42, 37],
          [41, 37],
          [41, 38],
          [40, 38],
          [39, 38],
          [39, 39],
          [39, 40],
          [38, 40],
          [38, 41],
          [38, 42],
          [38, 43],
          [37, 43]
        ], 64);
        fillPath(player_skin_colors[skin].part_4, [
          [21.3, 39.1],
          [21, 39],
          [21, 40],
          [21, 41],
          [21, 42],
          [21, 43],
          [22, 43],
          [23, 43],
          [24, 44],
          [25, 44],
          [25, 43],
          [26, 43],
          [26, 42],
          [26, 41],
          [26, 40],
          [25, 40],
          [25, 39],
          [24, 39],
          [23, 39],
          [22, 39]
        ], 64);
        fillPath(player_skin_colors[skin].part_5, [
          [40, 37.9],
          [40, 38],
          [40, 39],
          [40, 40],
          [40, 41],
          [41, 41],
          [42, 41],
          [43, 41],
          [44, 41],
          [44, 40],
          [45, 40],
          [45, 39],
          [45, 38],
          [44, 38],
          [44, 37],
          [43, 37],
          [42, 37],
          [41, 37]
        ], 64);
        fillPath(player_skin_colors[skin].part_6, [
          [37.5, 55.9],
          [37, 56],
          [36, 55],
          [35, 55],
          [34, 55],
          [34, 56],
          [33, 55],
          [32, 55],
          [32, 56],
          [31, 56],
          [31, 57],
          [31, 58],
          [32, 58],
          [32, 59],
          [33, 59],
          [34, 59],
          [34, 60],
          [35, 60],
          [36, 60],
          [36, 59],
          [37, 59],
          [37, 58],
          [37, 57]
        ], 64);
        fillPath(player_skin_colors[skin].part_8, [
          [38.1, 14],
          [38, 14],
          [38, 15],
          [39, 15],
          [39, 16],
          [39, 17],
          [40, 17],
          [40, 18],
          [40, 19],
          [40, 20],
          [40, 21],
          [40, 22],
          [41, 22],
          [41, 23],
          [41, 24],
          [41, 25],
          [41, 26],
          [41, 27],
          [41, 28],
          [40, 28],
          [40, 29],
          [39, 29],
          [38, 29],
          [37, 30],
          [36, 30],
          [35, 30],
          [34, 30],
          [33, 30],
          [32, 30],
          [31, 30],
          [30, 30],
          [30, 31],
          [29, 31],
          [28, 31],
          [27, 31],
          [26, 31],
          [25, 31],
          [24, 31],
          [23, 31],
          [22, 31],
          [22, 30],
          [22, 29],
          [22, 28],
          [22, 27],
          [22, 26],
          [22, 25],
          [22, 24],
          [22, 23],
          [22, 22],
          [22, 21],
          [22, 20],
          [22, 19],
          [22, 18],
          [22, 17],
          [23, 17],
          [23, 16]
        ], 64);
        fillPath(player_skin_colors[skin].part_9, [
          [22.4, 18.7],
          [22, 19],
          [22, 20],
          [22, 21],
          [22, 22],
          [22, 23],
          [21, 24],
          [21, 25],
          [21, 26],
          [21, 27],
          [21, 28],
          [21, 29],
          [20, 29],
          [20, 30],
          [20, 31],
          [20, 32],
          [19, 33],
          [19, 34],
          [19, 35],
          [18, 35],
          [17, 36],
          [16, 36],
          [16, 37],
          [15, 37],
          [14, 38],
          [13, 38],
          [12, 38],
          [12, 39],
          [11, 39],
          [11, 40],
          [10, 40],
          [9, 41],
          [9, 40],
          [10, 40],
          [10, 39],
          [11, 39],
          [12, 38],
          [13, 37],
          [13, 36],
          [14, 36],
          [15, 35],
          [15, 34],
          [16, 34],
          [15, 34],
          [15, 35],
          [14, 35],
          [13, 35],
          [13, 36],
          [12, 36],
          [11, 36],
          [10, 37],
          [9, 37],
          [8, 38],
          [7, 38],
          [6, 38],
          [5, 38],
          [4, 38],
          [3, 38],
          [2, 38],
          [1, 37],
          [0, 37],
          [-1, 37],
          [-2, 37],
          [-2, 36],
          [-3, 36],
          [-3, 35],
          [-3, 34],
          [-2, 35],
          [-1, 35],
          [1, 35],
          [2, 35],
          [2, 36],
          [3, 36],
          [4, 35],
          [5, 35],
          [6, 35],
          [6, 34],
          [7, 34],
          [7, 33],
          [8, 33],
          [9, 32],
          [9, 31],
          [10, 30],
          [11, 30],
          [11, 29],
          [11, 28],
          [12, 27],
          [12, 26],
          [13, 26],
          [13, 25],
          [13, 24],
          [13, 23],
          [14, 23],
          [14, 22],
          [15, 21],
          [15, 20],
          [16, 20],
          [16, 19],
          [16, 18],
          [16, 17],
          [16, 16],
          [16, 15],
          [16, 14],
          [16, 13],
          [16, 12],
          [16, 10],
          [16, 9],
          [16, 8],
          [16, 7],
          [16, 6],
          [16, 5]
        ], 64);
        fillPath(player_skin_colors[skin].part_10, [
          [9.1, 29.9],
          [9, 30],
          [9, 31],
          [10, 31],
          [10, 32],
          [10, 33],
          [10, 34],
          [10, 35],
          [10, 36],
          [10, 37],
          [11, 37],
          [11, 38],
          [12, 38],
          [12, 39],
          [12, 40],
          [12, 41],
          [13, 41],
          [13, 42],
          [13, 43],
          [13, 44],
          [14, 44],
          [14, 45],
          [14, 46],
          [14, 47],
          [15, 47],
          [15, 48],
          [16, 49],
          [16, 50],
          [17, 51],
          [17, 52],
          [18, 52],
          [18, 53],
          [19, 53],
          [19, 54],
          [20, 55],
          [21, 55],
          [21, 56],
          [22, 56],
          [22, 57],
          [23, 57],
          [23, 58],
          [24, 58],
          [25, 58],
          [25, 59],
          [24, 60],
          [24, 61],
          [24, 62],
          [24, 63],
          [24, 64],
          [24, 65],
          [24, 66],
          [25, 66],
          [25, 67],
          [26, 68],
          [26, 69],
          [27, 69],
          [27, 70],
          [27, 71],
          [28, 71],
          [28, 72],
          [27, 72],
          [27, 71],
          [26, 71],
          [25, 71],
          [24, 70],
          [23, 70],
          [23, 69],
          [22, 69],
          [22, 68],
          [21, 67],
          [21, 66],
          [21, 65],
          [20, 65],
          [20, 66],
          [19, 66],
          [19, 67],
          [19, 68],
          [19, 69],
          [19, 70],
          [18, 70],
          [18, 71],
          [18, 70],
          [18, 68],
          [18, 67],
          [18, 66],
          [18, 65],
          [18, 64],
          [18, 63],
          [17, 63],
          [17, 64],
          [17, 65],
          [17, 66],
          [17, 67],
          [17, 68],
          [16, 69],
          [16, 70],
          [15, 70],
          [13, 71],
          [12, 71],
          [11, 71],
          [10, 71],
          [11, 71],
          [11, 70],
          [11, 69],
          [12, 68],
          [12, 67],
          [12, 66],
          [13, 66],
          [13, 65],
          [13, 64],
          [13, 63],
          [13, 62],
          [13, 61],
          [13, 60],
          [12, 60],
          [12, 59],
          [12, 58],
          [12, 59],
          [12, 60],
          [12, 61],
          [11, 62],
          [11, 63],
          [11, 64],
          [10, 64],
          [10, 63],
          [10, 62],
          [11, 61],
          [11, 60],
          [11, 59],
          [11, 58],
          [11, 57],
          [11, 56],
          [10, 55],
          [10, 54],
          [9, 54],
          [9, 53],
          [8, 54],
          [7, 54],
          [7, 55],
          [6, 55],
          [6, 56],
          [5, 56],
          [4, 57],
          [3, 57],
          [2, 57],
          [2, 56],
          [3, 55],
          [3, 54],
          [3, 53],
          [4, 53],
          [4, 52],
          [5, 52],
          [5, 51],
          [5, 50],
          [5, 51],
          [4, 51],
          [4, 52],
          [3, 53],
          [3, 54],
          [2, 54],
          [2, 55],
          [1, 55],
          [1, 54],
          [1, 53],
          [2, 53],
          [2, 52],
          [2, 51],
          [3, 51],
          [3, 50],
          [3, 49],
          [3, 48],
          [3, 47],
          [3, 46],
          [3, 45],
          [2, 46],
          [1, 47],
          [-1, 48],
          [-2, 48],
          [-2, 49],
          [-3, 49],
          [-4, 49],
          [-5, 49],
          [-6, 49],
          [-7, 49],
          [-8, 49],
          [-7, 49],
          [-7, 48],
          [-6, 47],
          [-5, 47],
          [-5, 46],
          [-4, 46],
          [-4, 45],
          [-3, 45],
          [-3, 44],
          [-2, 44],
          [-2, 43],
          [-1, 43],
          [-1, 42],
          [-1, 41],
          [0, 41],
          [0, 40],
          [0, 39],
          [1, 39],
          [1, 38],
          [0, 38],
          [0, 39],
          [-1, 39],
          [-1, 40],
          [-2, 40],
          [-3, 40],
          [-3, 41],
          [-4, 41],
          [-5, 41],
          [-6, 41],
          [-5, 40],
          [-4, 39],
          [-3, 39],
          [-3, 38],
          [-2, 38],
          [-1, 38],
          [-1, 37],
          [0, 37],
          [1, 36],
          [1, 35],
          [2, 35],
          [2, 34],
          [2, 33],
          [2, 32],
          [2, 31],
          [3, 31],
          [2, 31],
          [2, 32],
          [1, 33],
          [1, 34],
          [0, 34],
          [0, 35],
          [-1, 35],
          [-2, 35],
          [-3, 36],
          [-4, 36],
          [-5, 36],
          [-6, 36],
          [-7, 37],
          [-7, 36],
          [-8, 36],
          [-7, 36],
          [-7, 35],
          [-7, 34],
          [-6, 34],
          [-5, 34],
          [-5, 33],
          [-4, 33],
          [-4, 32],
          [-3, 32],
          [-3, 31],
          [-2, 31],
          [-2, 30],
          [-1, 30],
          [-1, 29],
          [0, 29],
          [1, 28],
          [2, 28],
          [2, 27],
          [3, 26],
          [3, 25],
          [4, 25],
          [4, 24],
          [4, 23],
          [4, 22],
          [5, 21],
          [5, 20],
          [5, 19],
          [4, 19],
          [3, 19],
          [2, 20],
          [1, 20],
          [0, 20],
          [-1, 20],
          [-2, 20],
          [-3, 20],
          [-4, 20],
          [-5, 20],
          [-5, 19],
          [-4, 19],
          [-3, 19],
          [-2, 19],
          [-1, 18],
          [0, 18],
          [1, 18],
          [2, 17],
          [3, 17],
          [4, 17],
          [5, 16],
          [6, 16],
          [6, 15],
          [7, 15],
          [7, 14],
          [8, 13],
          [9, 12],
          [9, 11],
          [9, 10],
          [10, 10],
          [10, 9],
          [11, 9],
          [11, 8],
          [12, 7],
          [13, 6],
          [13, 5],
          [14, 4],
          [14, 3],
          [15, 3],
          [15, 2],
          [16, 2],
          [16, 1],
          [17, 1],
          [18, 1],
          [19, 0],
          [20, 0],
          [21, 0],
          [22, 0],
          [23, 0],
          [24, 0],
          [25, 0],
          [26, 0],
          [27, 0],
          [28, 0],
          [29, 0],
          [30, 0],
          [30, -1],
          [31, -1],
          [32, -1],
          [33, -1],
          [34, -1],
          [35, -1],
          [36, -1],
          [37, -1],
          [38, -1],
          [39, -1],
          [40, 0],
          [41, 0],
          [42, 0],
          [43, 0],
          [43, 1],
          [44, 1],
          [45, 2],
          [46, 2],
          [46, 3],
          [47, 3],
          [47, 4],
          [48, 4],
          [49, 5],
          [50, 5],
          [50, 6],
          [51, 6],
          [51, 7],
          [52, 7],
          [52, 8],
          [53, 8],
          [53, 9],
          [54, 9],
          [54, 10],
          [55, 10],
          [55, 11],
          [56, 11],
          [57, 11],
          [57, 12],
          [58, 12],
          [59, 12],
          [60, 12],
          [61, 12],
          [62, 12],
          [63, 12],
          [64, 12],
          [65, 12],
          [65, 13],
          [65, 14],
          [64, 14],
          [63, 15],
          [62, 15],
          [61, 16],
          [60, 16],
          [59, 16],
          [59, 15],
          [58, 15],
          [57, 14],
          [56, 14],
          [56, 15],
          [57, 15],
          [57, 16],
          [57, 17],
          [58, 17],
          [58, 18],
          [59, 18],
          [59, 19],
          [60, 20],
          [60, 21],
          [61, 21],
          [61, 22],
          [61, 23],
          [62, 23],
          [62, 24],
          [63, 25],
          [64, 25],
          [64, 26],
          [65, 26],
          [66, 27],
          [67, 27],
          [67, 28],
          [68, 28],
          [69, 28],
          [69, 29],
          [68, 29],
          [67, 29],
          [66, 29],
          [65, 29],
          [64, 28],
          [62, 28],
          [61, 28],
          [61, 27],
          [61, 28],
          [62, 28],
          [62, 29],
          [63, 29],
          [63, 30],
          [64, 30],
          [64, 31],
          [65, 31],
          [66, 32],
          [67, 32],
          [68, 33],
          [69, 33],
          [69, 34],
          [70, 34],
          [71, 34],
          [71, 35],
          [70, 35],
          [69, 36],
          [68, 36],
          [67, 36],
          [66, 36],
          [65, 35],
          [64, 35],
          [64, 34],
          [63, 34],
          [64, 35],
          [64, 36],
          [65, 37],
          [66, 38],
          [67, 38],
          [67, 39],
          [68, 39],
          [69, 39],
          [69, 40],
          [70, 40],
          [71, 40],
          [71, 41],
          [70, 41],
          [69, 41],
          [68, 41],
          [67, 41],
          [66, 41],
          [65, 40],
          [64, 40],
          [63, 40],
          [63, 39],
          [62, 39],
          [62, 40],
          [62, 41],
          [62, 42],
          [62, 43],
          [63, 43],
          [63, 44],
          [64, 45],
          [64, 46],
          [65, 46],
          [65, 47],
          [66, 47],
          [66, 48],
          [66, 49],
          [65, 49],
          [65, 48],
          [64, 48],
          [63, 47],
          [62, 47],
          [62, 46],
          [61, 46],
          [61, 47],
          [62, 47],
          [62, 48],
          [62, 49],
          [63, 49],
          [63, 50],
          [64, 50],
          [64, 51],
          [65, 51],
          [66, 52],
          [65, 52],
          [64, 52],
          [63, 52],
          [63, 51],
          [62, 51],
          [61, 51],
          [61, 50],
          [60, 49],
          [59, 48],
          [58, 47],
          [58, 46],
          [58, 47],
          [58, 48],
          [58, 49],
          [58, 50],
          [58, 51],
          [58, 52],
          [57, 52],
          [57, 53],
          [58, 54],
          [58, 55],
          [58, 56],
          [59, 57],
          [59, 59],
          [60, 60],
          [60, 61],
          [60, 62],
          [61, 63],
          [61, 65],
          [62, 66],
          [62, 67],
          [63, 67],
          [62, 66],
          [61, 65],
          [61, 64],
          [60, 64],
          [60, 63],
          [59, 63],
          [59, 62],
          [59, 61],
          [58, 61],
          [58, 60],
          [57, 60],
          [57, 59],
          [57, 58],
          [57, 57],
          [57, 56],
          [57, 55],
          [56, 55],
          [56, 54],
          [56, 55],
          [57, 56],
          [57, 57],
          [57, 58],
          [57, 59],
          [57, 60],
          [57, 61],
          [57, 62],
          [57, 63],
          [57, 64],
          [58, 65],
          [58, 66],
          [59, 66],
          [59, 67],
          [59, 68],
          [59, 69],
          [58, 68],
          [57, 67],
          [56, 66],
          [56, 65],
          [55, 65],
          [55, 64],
          [54, 63],
          [53, 63],
          [53, 62],
          [53, 63],
          [54, 64],
          [54, 65],
          [55, 66],
          [55, 67],
          [55, 68],
          [55, 69],
          [55, 68],
          [54, 68],
          [54, 67],
          [53, 67],
          [52, 66],
          [52, 65],
          [51, 64],
          [51, 63],
          [51, 62],
          [51, 61],
          [51, 62],
          [50, 63],
          [50, 65],
          [49, 66],
          [49, 67],
          [48, 68],
          [48, 69],
          [47, 69],
          [47, 70],
          [46, 70],
          [45, 70],
          [44, 70],
          [44, 69],
          [44, 68],
          [45, 67],
          [45, 66],
          [45, 65],
          [46, 64],
          [46, 63],
          [46, 62],
          [46, 61],
          [45, 61],
          [45, 60],
          [45, 59],
          [45, 58],
          [45, 57],
          [44, 57],
          [44, 56],
          [45, 55],
          [46, 55],
          [46, 54],
          [47, 53],
          [47, 52],
          [48, 51],
          [48, 50],
          [49, 50],
          [49, 49],
          [49, 48],
          [50, 47],
          [50, 46],
          [51, 45],
          [51, 44],
          [51, 43],
          [51, 42],
          [51, 43],
          [50, 44],
          [50, 45],
          [49, 45],
          [49, 46],
          [48, 46],
          [48, 47],
          [47, 47],
          [47, 46],
          [48, 46],
          [48, 45],
          [48, 44],
          [49, 44],
          [49, 43],
          [50, 43],
          [50, 42],
          [51, 42],
          [51, 41],
          [51, 40],
          [52, 39],
          [52, 38],
          [52, 37],
          [53, 37],
          [53, 36],
          [54, 36],
          [55, 36],
          [56, 36],
          [55, 36],
          [54, 36],
          [54, 35],
          [54, 34],
          [54, 33],
          [54, 34],
          [55, 34],
          [56, 34],
          [57, 34],
          [58, 34],
          [59, 34],
          [60, 34],
          [60, 33],
          [61, 33],
          [61, 32],
          [61, 31],
          [60, 31],
          [59, 31],
          [59, 30],
          [58, 30],
          [58, 29],
          [57, 29],
          [56, 29],
          [56, 28],
          [55, 28],
          [54, 27],
          [53, 27],
          [53, 26],
          [52, 26],
          [51, 25],
          [50, 24],
          [49, 24],
          [49, 23],
          [48, 23],
          [48, 22],
          [48, 21],
          [47, 21],
          [47, 20],
          [47, 19],
          [46, 19],
          [46, 18],
          [46, 17],
          [45, 17],
          [45, 16],
          [45, 15],
          [45, 16],
          [46, 16],
          [46, 17],
          [46, 18],
          [47, 19],
          [47, 20],
          [47, 21],
          [48, 21],
          [48, 22],
          [49, 23],
          [49, 24],
          [50, 24],
          [51, 25],
          [51, 26],
          [52, 26],
          [53, 26],
          [53, 27],
          [54, 27],
          [55, 28],
          [56, 28],
          [56, 29],
          [57, 29],
          [58, 29],
          [58, 30],
          [59, 30],
          [60, 30],
          [60, 31],
          [61, 31],
          [61, 32],
          [61, 33],
          [61, 34],
          [60, 34],
          [60, 35],
          [59, 35],
          [58, 35],
          [57, 35],
          [56, 35],
          [56, 34],
          [55, 34],
          [54, 34],
          [53, 34],
          [52, 34],
          [53, 35],
          [53, 36],
          [52, 36],
          [52, 35],
          [51, 35],
          [50, 35],
          [49, 34],
          [48, 34],
          [47, 33],
          [46, 33],
          [46, 32],
          [45, 31],
          [45, 30],
          [44, 30],
          [44, 29],
          [43, 29],
          [43, 28],
          [42, 28],
          [42, 27],
          [41, 27],
          [41, 26],
          [41, 25],
          [40, 25]
        ], 64);
        fillPath(player_skin_colors[skin].part_12, [
          [31.5, 44.8],
          [31, 45],
          [31, 46],
          [31, 47],
          [32, 48],
          [32, 49],
          [33, 49],
          [34, 49],
          [35, 49],
          [35, 48],
          [35, 47],
          [35, 46],
          [35, 45],
          [35, 44],
          [34, 44],
          [33, 44],
          [32, 44]
        ], 64);
        fillPath(player_skin_colors[skin].part_13, [
          [32.8, 42.3],
          [33, 42],
          [32, 42],
          [32, 41],
          [33, 41],
          [33, 42],
          [33.1, 40.3],
          [33, 40],
          [32, 40],
          [32, 39],
          [33, 39],
          [33, 40]
        ], 64);
        strokePath(player_skin_colors[skin].part_14, [
          [30.7, 39.6],
          [31, 40],
          [30, 39],
          [30, 38],
          [30, 37],
          [29, 37],
          [28, 37],
          [27, 36],
          [26, 36],
          [25, 36],
          [25, 35],
          [24, 35],
          [23, 35],
          [22, 35],
          [21, 35],
          [21, 34],
          [20, 34]
        ], 64);
        strokePath(player_skin_colors[skin].part_15, [
          [34.9, 38.9],
          [35, 39],
          [35, 38],
          [35, 37],
          [35, 36],
          [36, 36],
          [37, 36],
          [37, 35],
          [38, 35],
          [39, 35],
          [39, 34],
          [40, 34],
          [40, 33],
          [41, 33],
          [42, 33],
          [42, 32],
          [43, 32]
        ], 64);
        strokePath(player_skin_colors[skin].part_16, [
          [30.4, 51.7],
          [31, 52],
          [31, 53],
          [32, 53],
          [32, 54],
          [33, 54],
          [34, 54],
          [34, 53],
          [35, 53],
          [36, 53],
          [37, 53],
          [37, 52],
          [37, 51]
        ], 64);
        break;
    }
  },
  configurable: false,
  writable: false,
});