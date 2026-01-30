class Vector2D{
    constructor(start, end){
        if(!(start instanceof Array) || !(end instanceof Array)) throw new TypeError('expected Array at Vector class');
        if(start.length != 2 || end.length != 2) throw new Error('expected 2 dimensional Vector');
        this.start = start;
        this.end = end;
    }
    get raw(){
        return [this.end[0]-this.start[0], this.end[1]-this.start[1]];
    }
    get v_len(){
        return Math.sqrt(Math.pow(this.raw[0], 2) + Math.pow(this.raw[1],2));
    }
    get unit_v(){
        const len = this.v_len;
        if (len === 0) throw new Error("Cannot normalize zero-length vector");
        return [this.raw[0] / len, this.raw[1] / len];
    }
    set v_len(new_len){
        let [sx, sy] = this.start;
        let [ux, uy] = this.unit_v;
        this.end = [sx + (ux*new_len), sy + (uy*new_len)];
    }
}