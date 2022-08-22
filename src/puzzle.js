class Face {
    constructor (edges) {
        this.left = !!(edges[0]);
        this.top = !!(edges[1]);
        this.right = !!(edges[2]);
        this.bottom = !!(edges[3]);

        console.assert(!(this.left && this.top && this.right && this.bottom),
                       "Invalid face");
    }
}

function horizontal_edge(face) {
    return face[0] && face[2];
}

function left_edge(face) {
    return face[0] && !face[2];
}

function right_edge(face) {
    return !face[0] && face[2];
}

function vertical_edge(face) {
    return face[1] && face[3];
}

function top_edge(face) {
    return face[1] && !face[3];
}

function bottom_edge(face) {
    return !face[1] && face[3];
}

class Cube {
    constructor (faces) {
        this.raw = faces;
        this.faces = [new Face(face_view('a', faces)),
                      new Face(face_view('b', faces)),
                      new Face(face_view('c', faces)),
                      new Face(face_view('d', faces)),
                      new Face(face_view('e', faces)),
                      new Face(face_view('f', faces))];
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
}

function identity() {
    // 6 faces (a, b, c, d, e, f), 4 edges (left, top, right, bottom)
    return [0, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 10, 11,
            12, 13, 14, 15,
            16, 17, 18, 19,
            20, 21, 22, 23];
}

function cw(face) {
    return [face[3], face[0], face[1], face[2]];
}

function ccw(face) {
    return [face[1], face[2], face[3], face[0]];
}

function face_view(face, cube) {
    // TODO: slice
    const i = {'a': 0, 'b': 4, 'c': 8, 'd': 12, 'e': 16, 'f': 20}[face];
    return [cube[i + 0], cube[i + 1], cube[i + 2], cube[i + 3]];
}

function edge_view(face, edge, cube) {
    return face_view(face, cube)[{'left': 0, 'top': 1, 'right': 2, 'bottom': 3}[edge]];
}

function turn_left(cube) {
    return [
        ... ccw(face_view('e', cube)),
        ... face_view('a', cube),
        ... face_view('b', cube),
        ... cw(face_view('d', cube)),
        ... cw(face_view('c', cube)),
        ... ccw(face_view('f', cube))
    ];
}

function turn_top(cube) {
    return [
        ... cw(face_view('a', cube)),
        ... cw(face_view('f', cube)),
        ... ccw(face_view('c', cube)),
        ... ccw(face_view('b', cube)),
        ... face_view('d', cube),
        ... face_view('e', cube)
    ];
}

function turn_cw(cube) {
    return [
        ... cw(cw((face_view('d', cube)))),
        ... cw(face_view('b', cube)),
        ... cw(cw(face_view('f', cube))),
        ... face_view('c', cube),
        ... ccw(face_view('e', cube)),
        ... face_view('a', cube)
    ];
}

function _view(cube, fn) {
    const result = [];
    for(const i of fn)
        result.push(cube[i]);
    return result;
}

function _compose() {
    var result = identity();
    for(const fn of arguments)
        result = fn(result);
    return result;
}

const turn_right = (cube) => _view(cube, _compose(turn_left, turn_left, turn_left));
const turn_bottom = (cube) => _view(cube, _compose(turn_top, turn_top, turn_top));
const turn_ccw = (cube) => _view(cube, _compose(turn_cw, turn_cw, turn_cw));

const ROTATE = {
    'a': {
        'left': _compose(turn_left, turn_cw),
        'top': _compose(turn_left),
        'right': _compose(turn_left, turn_ccw),
        'bottom': _compose(turn_left, turn_cw, turn_cw),
    },
    'b': {
        'left': _compose(turn_cw),
        'top': _compose(identity),
        'right': _compose(turn_ccw),
        'bottom': _compose(turn_cw, turn_cw),
    },
    'c': {
        'left': _compose(turn_right, turn_cw),
        'top': _compose(turn_right),
        'right': _compose(turn_right, turn_ccw),
        'bottom': _compose(turn_right, turn_cw, turn_cw),
    },
    'd': {
        'left': _compose(turn_bottom),
        'top': _compose(turn_bottom, turn_ccw),
        'right': _compose(turn_bottom, turn_cw, turn_cw),
        'bottom': _compose(turn_bottom, turn_cw),
    },
    'e': {
        'left': _compose(turn_top, turn_top),
        'top': _compose(turn_top, turn_top, turn_ccw),
        'right': _compose(turn_top, turn_top, turn_cw, turn_cw),
        'bottom': _compose(turn_top, turn_top, turn_cw),
    },
    'f': {
        'left': _compose(turn_top),
        'top': _compose(turn_top, turn_ccw),
        'right': _compose(turn_top, turn_cw, turn_cw),
        'bottom': _compose(turn_top, turn_cw),
    },
};

function rotate(face, edge) {
    return (cube) => new Cube(_view(cube.raw, ROTATE[face][edge]));
}

function rotated_face(cube, face, edge) { return face_view('b', rotate(face, edge)(cube).raw); }
function rotated_edge(cube, face, edge, edge2) { return edge_view('b', edge2, rotate(face, edge)(cube).raw); }

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
