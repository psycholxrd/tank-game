class Vector2D{
    constructor(start, end){
        if(!(start instanceof Array) || !(end instanceof Array)) throw new TypeError('expected Array at Vector class');
        if(start.length != 2 || end.length != 2) throw new Error('expected 2 dimensional Vector');
        if(typeof start[0] != 'number' || typeof start[1] != 'number') throw new TypeError('expected a number in Vector class, start');
        if(typeof end[0] != 'number' || typeof end[1] != 'number') throw new TypeError('expected a number in Vector class, end');
        this._start = start;
        this._end = end;
    }
    get start(){
        return this._start;
    }
    set start(new_start){
        if(new_start instanceof Array && new_start.length === 2 && typeof new_end[0] === 'number' && typeof new_end[1] === 'number'){
            this._start = new_start;
        }else{
            console.warn('INVALID VALUE FOR START');
        }
    }
    get end(){
        return this._end;
    }
    set end(new_end){
        if(new_end instanceof Array && new_end.length === 2 && typeof new_end[0] === 'number' && typeof new_end[1] === 'number'){
            this._end = new_end;
        }else{
            console.warn('INVALID VALUE FOR END');
        }
    }
    get raw(){
        //console.log(this.start, this.end);
        return [this.end[0]-this.start[0], this.end[1]-this.start[1]];
    }
    get unscaledRaw(){
        if(!u) alert('missing u');
        let r = this.raw;
        //console.log(r);
        return [r[0] / u, r[1] / u];
    }
    get unscaledStart(){
        if(!u) alert('missing u');
        //console.log(this.start);
        return [this.start[0] / u, this.start[1] / u];
    }
    get unscaledEnd(){
        if(!u) alert('missing u');
        //console.log(this.end);
        return [this.end[0] / u, this.end[1] / u];
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