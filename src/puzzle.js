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

    get bits() {
        return ((this.left ? 0b1000 : 0)
                + (this.top ? 0b0100 : 0)
                + (this.right ? 0b0010 : 0)
                + (this.bottom ? 0b0001 : 0));
    }
}

function horizontal_edge(face) {
    return face.left && face.right;
}

function left_edge(face) {
    return face.left && !face.right;
}

function right_edge(face) {
    return !face.left && face.right;
}

function vertical_edge(face) {
    return face.top && face.bottom;
}

function top_edge(face) {
    return face.top && !face.bottom;
}

function bottom_edge(face) {
    return !face.top && face.bottom;
}

class Cube {
    constructor (faces) {
        this.faces = faces.map((f) => new Face(f));
        console.assert(this.valid(), "Invalid cube");
    }
    /*
      cube net
      >  a b c
      >      d e f
      b is the top face
      probably would have been more sensible to use c as the top face...
    */

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
        return new Cube([
            this.face_e.cw.cw.cw.bits, this.face_a.bits, this.face_b.bits,
            this.face_d.cw.bits, this.face_c.cw.bits, this.face_f.cw.cw.cw.bits]);
    }

    turn_top() {
        return new Cube([
            this.face_a.cw.bits, this.face_f.cw.bits, this.face_c.cw.cw.cw.bits,
            this.face_b.cw.cw.cw.bits, this.face_d.bits, this.face_e.bits]);
    }

    turn_cw() {
        return new Cube([
            this.face_d.cw.cw.bits, this.face_b.cw.bits, this.face_f.cw.cw.bits,
            this.face_c.bits, this.face_e.cw.cw.cw.bits, this.face_a.bits]);
    }
}

function rotate(face, edge) {
    if(edge === 'left') {
        if(face === 'a')
            return (cube) => cube.turn_left().turn_cw();
        if(face === 'b')
            return (cube) => cube.turn_cw();
        if(face === 'c')
            return (cube) => cube.turn_left().turn_left().turn_left().turn_cw();
        if(face === 'd')
            return (cube) => cube.turn_top().turn_top().turn_top();
        if(face === 'e')
            return (cube) => cube.turn_top().turn_top();
        if(face === 'f')
            return (cube) => cube.turn_top();
    }
    if(edge === 'top') {
        if(face === 'a')
            return (cube) => cube.turn_left();
        if(face === 'b')
            return (cube) => cube;
        if(face === 'c')
            return (cube) => cube.turn_left().turn_left().turn_left();
        if(face === 'd')
            return (cube) => cube.turn_top().turn_top().turn_top().turn_cw().turn_cw().turn_cw();
        if(face === 'e')
            return (cube) => cube.turn_top().turn_top().turn_cw().turn_cw().turn_cw();
        if(face === 'f')
            return (cube) => cube.turn_top().turn_cw().turn_cw().turn_cw();
    }
    if(edge === 'right') {
        if(face === 'a')
            return (cube) => cube.turn_left().turn_cw().turn_cw().turn_cw();
        if(face === 'b')
            return (cube) => cube.turn_cw().turn_cw().turn_cw();
        if(face === 'c')
            return (cube) => cube.turn_left().turn_left().turn_left().turn_cw().turn_cw().turn_cw();
        if(face === 'd')
            return (cube) => cube.turn_top().turn_top().turn_top().turn_cw().turn_cw();
        if(face === 'e')
            return (cube) => cube.turn_top().turn_top().turn_cw().turn_cw();
        if(face === 'f')
            return (cube) => cube.turn_top().turn_cw().turn_cw();
    }
    if(edge === 'bottom') {
        if(face === 'a')
            return (cube) => cube.turn_left().turn_cw().turn_cw();
        if(face === 'b')
            return (cube) => cube.turn_cw().turn_cw();
        if(face === 'c')
            return (cube) => cube.turn_left().turn_left().turn_left().turn_cw().turn_cw();
        if(face === 'd')
            return (cube) => cube.turn_top().turn_top().turn_top().turn_cw();
        if(face === 'e')
            return (cube) => cube.turn_top().turn_top().turn_cw();
        if(face === 'f')
            return (cube) => cube.turn_top().turn_cw();
    }
}

function rotated_face(cube, face, edge) { return rotate(face, edge)(cube).face_b; }
function rotated_edge(cube, face, edge, edge2) { return rotate(face, edge)(cube).face_b[edge2]; }

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

function cube_rotations() {
    const result = [];
    for(const face of ['a', 'b', 'c', 'd', 'e', 'f'])
        for(const edge of ['left', 'top', 'right', 'bottom'])
            result.push([face, edge]);
    return result;
}

// console.log('cube_rotations', cube_rotations());

// options "AAABBCCD"
// cube permutations: 8! / 4 (symmetries) / (3! x 2! x 2! = 24) (repeats) = 420
function cube_permutations(options) {
    const seen = {};
    const results = [];
    for(const result of all_permutations(options))
        if(seen[result] === undefined) {
            results.push(result);
            for(const same of symmetries(result))
                seen[same] = true;
        }
    console.assert(Object.keys(seen).length == 40320, "Not all permutations seen?");
    return results;
}

// console.log('cube_permutations', cube_permutations('AAABBCCD'));

// all permutations: 8! = 40320
function all_permutations(options) {
      function *permute(a, n = a.length) {
          if (n <= 1) yield a.slice();
          else for (let i = 0; i < n; i++) {
              yield *permute(a, n - 1);
              const j = n % 2 ? 0 : i;
              [a[n-1], a[j]] = [a[j], a[n-1]];
          }
      }

    return Array.from(permute(options.split(''))).map(perm => perm.join(''));
}

// console.log('all_permutations', all_permutations('AAABBCCD'));

function symmetries(result) {
    const results = [];

    // result is an 8 letter string
    // 0123
    // 4567
    results.push(result);

    // flip vertically
    // 4567
    // 0123
    const r0 = result.substr(0, 4);
    const r1 = result.substr(4, 4);
    results.push(r1 + r0);

    // flip horizontally
    // 3210
    // 7654
    const flip0 = r0[3] + r0[2] + r0[1] + r0[0];
    const flip1 = r1[3] + r1[2] + r1[1] + r1[0];
    results.push(flip0 + flip1);

    // rotate 180
    // 7654
    // 3210
    results.push(flip1 + flip0);

    return results;
}

// console.log('symmetries', symmetries('01234567'));

export default {
    Cube, invalid, cube_rotations, cube_permutations,
    horizontal_edge, left_edge, right_edge,
    vertical_edge, top_edge, bottom_edge,
    rotate, rotated_face, rotated_edge
};
