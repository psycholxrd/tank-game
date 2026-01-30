function distance(x1, y1, x2, y2){
    return Math.hypot(x2-x1, y2-y1);
}

class Weapon{
    constructor(type, damage, reloadKey, owner){
        if(!(owner instanceof Player)) throw TypeError('expected Player as Owner');
        this.type = type;
        this._damage = damage;
        this.reloadKey = reloadKey; //used for clock class
        this.owner = owner;
    }
    get damage(){
        return this._damage;
    }
}

class Laser extends Weapon{
    constructor(owner){
        super('Laser', 0, 'shoot_enemy', owner);
    }
    get rgb_value(){
        //min = player radius * 1.25
        //max = 255
        if(!mouse.x || !mouse.y) return 255;
        let d = distance(mouse.x, mouse.y, this.owner.x, this.owner.y);
        if (d < this.owner.r * 1.25) d = this.owner.r * 1.25;
        let calculated_value = (255 / Math.min(window.innerWidth, window.innerHeight)) * d;
        return Math.min(255, calculated_value);
    }
    get damage(){
        return (this.owner.damage * 100) / this.rgb_value;
    }
    draw(){
        let rgb_val = laser.rgb_value;
        let rgb = [rgb_val, rgb_val, rgb_val];
        you.update_color(...rgb);
        c.begin();
        c.set_property("lineWidth", 1000 / laser.rgb_value);
        c.set_property("strokeStyle", you.color);
        c.moveTo(you.x, you.y);
        c.lineTo(mouse.x, mouse.y);
        c.stroke();

        c.begin();
        c.set_property("lineWidth", 5);
        c.set_property(
            "strokeStyle",
            clock.cd.locked[laser.reloadKey] ? "darkred" : "lime"
        );
        let _100percent = 2 * Math.PI;
        let _current_percent =
        (clock.cd.current[laser.reloadKey] / clock.cd.default[laser.reloadKey]) * 100;
        c.arc(
            mouse.x,
            mouse.y,
            u / 2,
            0,
            clock.cd.locked[laser.reloadKey]
            ? (_100percent / 100) * _current_percent
            : _100percent
        );
        c.stroke();
    }
}

class Sniper extends Weapon{
    constructor(owner){
        super('Sniper', 0, 'snipe_enemy', owner);
        this.vector = new Vector2D([this.owner.x, this.owner.y], [mouse.x, mouse.y]);
        this.bullet_start = this.vector.end;
        this.bullet_direction = this.vector.raw;
    }
    update_vector(){
        this.vector.start = [this.owner.x, this.owner.y];
        this.vector.end = [mouse.x, mouse.y];
    }
    draw(){
        this.update_vector();
        this.vector.v_len = this.owner.r * 2.25;
        c.begin();
        c.set_property('strokeStyle', 'red');
        c.set_property('lineWidth', this.owner.r * 0.9);
        c.moveTo(this.owner.x, this.owner.y);
        c.lineTo(...this.vector.end);
        c.stroke();

        this.vector.v_len = this.owner.r * 2.2;
        c.begin();
        c.set_property('strokeStyle', 'white');
        c.set_property('lineWidth', this.owner.r * 0.8);
        c.moveTo(this.owner.x, this.owner.y);
        c.lineTo(...this.vector.end);
        c.stroke();
    }
}