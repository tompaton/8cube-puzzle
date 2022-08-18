class Face {
    constructor (edges) {
        this.left = !!(edges & 0b1000);
        this.top = !!(edges & 0b0100);
        this.right = !!(edges & 0b0010);
        this.bottom = !!(edges & 0b0001);

        console.assert(!(this.left && this.top && this.right && this.bottom),
                       "Invalid face");
    }

    get cw() {
        const f = new Face(0);
        f.left = this.bottom;
        f.top = this.left;
        f.right = this.top;
        f.bottom = this.right;
        return f;
    }

    get ccw() {
        const f = new Face(0);
        f.left = this.top;
        f.top = this.right;
        f.right = this.bottom;
        f.bottom = this.left;
        return f;
    }

    get bits() {
        return ((this.left ? 0b1000 : 0)
                + (this.top ? 0b0100 : 0)
                + (this.right ? 0b0010 : 0)
                + (this.bottom ? 0b0001 : 0));
    }
}

class Cube {
    constructor (faces) {
        this.faces = faces.map((f) => new Face(f));
        console.assert(this.valid(), "Invalid cube");
    }
    get face_a() { return this.faces[0]; }
    get face_b() { return this.faces[1]; }
    get face_c() { return this.faces[2]; }
    get face_d() { return this.faces[3]; }
    get face_e() { return this.faces[4]; }
    get face_f() { return this.faces[5]; }

    valid() {
        return (
            this.face_a.right == this.face_b.left
            && this.face_b.right == this.face_c.left
            && this.face_c.bottom == this.face_d.top
            && this.face_d.right == this.face_e.left
            && this.face_e.right == this.face_f.left
            && this.face_b.bottom == this.face_d.left
            && this.face_c.right == this.face_e.top
            && this.face_a.top == this.face_f.bottom
            && this.face_d.bottom == this.face_a.bottom
            && this.face_e.bottom == this.face_a.left
            && this.face_f.top == this.face_c.top
            && this.face_f.right == this.face_b.top
        );
    }

    turn_left() {
        return new Cube([this.face_e.ccw.bits, this.face_a.bits, this.face_b.bits,
                         this.face_d.cw.bits, this.face_c.cw.bits, this.face_f.ccw.bits]);
    }

    turn_right() {
        return new Cube([this.face_b.bits, this.face_c.bits, this.face_e.ccw.bits,
                         this.face_d.ccw.bits, this.face_a.cw.bits, this.face_f.cw.bits]);
    }

    turn_top() {
        return new Cube([this.face_a.cw.bits, this.face_f.cw.bits, this.face_c.ccw.bits,
                         this.face_b.ccw.bits, this.face_d.bits, this.face_e.bits]);
    }

    turn_bottom() {
        return new Cube([this.face_a.ccw.bits, this.face_d.cw.bits, this.face_c.cw.bits,
                         this.face_e.bits, this.face_f.bits, this.face_b.ccw.bits]);
    }
}

function invalid(cubes) {
    var count = 0;

    if(cubes[0][0].face_b.right != cubes[0][1].face_b.left) count++;
    if(cubes[0][1].face_b.right != cubes[0][2].face_b.left) count++;
    if(cubes[0][2].face_b.right != cubes[0][3].face_b.left) count++;

    if(cubes[0][0].face_a.bottom != cubes[1][0].face_a.top) count++;
    if(cubes[0][0].face_b.bottom != cubes[1][0].face_b.top) count++;
    if(cubes[0][1].face_b.bottom != cubes[1][1].face_b.top) count++;
    if(cubes[0][2].face_b.bottom != cubes[1][2].face_b.top) count++;
    if(cubes[0][3].face_b.bottom != cubes[1][3].face_b.top) count++;
    if(cubes[0][3].face_c.bottom != cubes[1][3].face_c.top) count++;

    if(cubes[1][0].face_b.right != cubes[1][1].face_b.left) count++;
    if(cubes[1][1].face_b.right != cubes[1][2].face_b.left) count++;
    if(cubes[1][2].face_b.right != cubes[1][3].face_b.left) count++;

    if(cubes[1][0].face_d.top != cubes[1][1].face_d.bottom) count++;
    if(cubes[1][1].face_d.top != cubes[1][2].face_d.bottom) count++;
    if(cubes[1][2].face_d.top != cubes[1][3].face_d.bottom) count++;

    if(cubes[1][0].face_e.top != cubes[1][1].face_e.bottom) count++;
    if(cubes[1][1].face_e.top != cubes[1][2].face_e.bottom) count++;
    if(cubes[1][2].face_e.top != cubes[1][3].face_e.bottom) count++;

    if(cubes[1][0].face_e.right != cubes[0][0].face_e.left) count++;
    if(cubes[1][1].face_e.right != cubes[0][1].face_e.left) count++;
    if(cubes[1][2].face_e.right != cubes[0][2].face_e.left) count++;
    if(cubes[1][3].face_e.right != cubes[0][3].face_e.left) count++;

    if(cubes[0][0].face_e.top != cubes[0][1].face_e.bottom) count++;
    if(cubes[0][1].face_e.top != cubes[0][2].face_e.bottom) count++;
    if(cubes[0][2].face_e.top != cubes[0][3].face_e.bottom) count++;

    if(cubes[0][0].face_f.top != cubes[0][1].face_f.bottom) count++;
    if(cubes[0][1].face_f.top != cubes[0][2].face_f.bottom) count++;
    if(cubes[0][2].face_f.top != cubes[0][3].face_f.bottom) count++;

    return count;
}

export default {Cube, invalid};
