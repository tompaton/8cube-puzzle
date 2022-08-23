/*
  cube net
  >  0 1 2
  >      3 4 5
  1 is the top face
  (probably would have been more sensible to use 2 as the top face...)

  each face is [left top right bottom]

  each edge is 1 or 0
*/

function Cube(faces) {
    validate_cube(faces);
    return faces;
}

function face_view(face, faces) {
    return faces.slice(face * 4, (face + 1) * 4);
}

function edge_view(faces, face, edge) {
    return faces[face * 4 + edge];
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

function validate_cube(faces) {
    for(const i in [0, 1, 2, 3, 4, 5])
        validate_face(face_view(i, faces));

    const valid = (
        faces[0][2] == faces[1][0]
            && faces[1][2] == faces[2][0]
            && faces[2][3] == faces[3][1]
            && faces[3][2] == faces[4][0]
            && faces[4][2] == faces[5][0]
            && faces[1][3] == faces[3][0]
            && faces[2][2] == faces[4][1]
            && faces[0][1] == faces[5][3]
            && faces[3][3] == faces[0][3]
            && faces[4][3] == faces[0][0]
            && faces[5][1] == faces[2][1]
            && faces[5][2] == faces[1][1]
    );

    console.assert(valid, "Invalid cube");
}


function validate_face(face) {
    console.assert(!(face[0] && face[1] && face[2] && face[3]),
                   "Invalid face");
}

function cw(face) {
    return [face[3], face[0], face[1], face[2]];
}

function ccw(face) {
    return [face[1], face[2], face[3], face[0]];
}

// 6 faces, 4 edges (left, top, right, bottom)
const IDENTITY = [0, 1, 2, 3,
                  4, 5, 6, 7,
                  8, 9, 10, 11,
                  12, 13, 14, 15,
                  16, 17, 18, 19,
                  20, 21, 22, 23];

const TURN_LEFT = [
    ... ccw(face_view(4, IDENTITY)),
    ... face_view(0, IDENTITY),
    ... face_view(1, IDENTITY),
    ... cw(face_view(3, IDENTITY)),
    ... cw(face_view(2, IDENTITY)),
    ... ccw(face_view(5, IDENTITY))
];

const TURN_TOP = [
    ... cw(face_view(0, IDENTITY)),
    ... cw(face_view(5, IDENTITY)),
    ... ccw(face_view(2, IDENTITY)),
    ... ccw(face_view(1, IDENTITY)),
    ... face_view(3, IDENTITY),
    ... face_view(4, IDENTITY)
];

const TURN_CW = [
    ... cw(cw((face_view(3, IDENTITY)))),
    ... cw(face_view(1, IDENTITY)),
    ... cw(cw(face_view(5, IDENTITY))),
    ... face_view(2, IDENTITY),
    ... ccw(face_view(4, IDENTITY)),
    ... face_view(0, IDENTITY)
];

function _permute(cube, map) {
    const result = [];
    for(const i of map)
        result.push(cube[i]);
    return result;
}

function _compose() {
    var result = IDENTITY.slice();
    for(const fn of arguments)
        result = _permute(result, fn);
    return result;
}

const TURN_RIGHT = _compose(TURN_LEFT, TURN_LEFT, TURN_LEFT);
const TURN_BOTTOM = _compose(TURN_TOP, TURN_TOP, TURN_TOP);
const TURN_CCW = _compose(TURN_CW, TURN_CW, TURN_CW);

const ROTATE = [ // [face][edge]
    [
        _compose(TURN_LEFT, TURN_CW),
        TURN_LEFT,
        _compose(TURN_LEFT, TURN_CCW),
        _compose(TURN_LEFT, TURN_CW, TURN_CW),
    ],
    [
        TURN_CW,
        IDENTITY,
        TURN_CCW,
        _compose(TURN_CW, TURN_CW),
    ],
    [
        _compose(TURN_RIGHT, TURN_CW),
        TURN_RIGHT,
        _compose(TURN_RIGHT, TURN_CCW),
        _compose(TURN_RIGHT, TURN_CW, TURN_CW),
    ],
    [
        TURN_BOTTOM,
        _compose(TURN_BOTTOM, TURN_CCW),
        _compose(TURN_BOTTOM, TURN_CW, TURN_CW),
        _compose(TURN_BOTTOM, TURN_CW),
    ],
    [
        _compose(TURN_TOP, TURN_TOP),
        _compose(TURN_TOP, TURN_TOP, TURN_CCW),
        _compose(TURN_TOP, TURN_TOP, TURN_CW, TURN_CW),
        _compose(TURN_TOP, TURN_TOP, TURN_CW),
    ],
    [
        TURN_TOP,
        _compose(TURN_TOP, TURN_CCW),
        _compose(TURN_TOP, TURN_CW, TURN_CW),
        _compose(TURN_TOP, TURN_CW),
    ]
];

// console.log("ROTATE", ROTATE);

function rotate(face, edge) {
    return (cube) => _permute(cube, ROTATE[face][edge]);
}

function rotated_face(cube, face, edge) {
    // return face_view(1, rotate(face, edge, cube));
    // const result = [];
    // for(const i of ROTATE[face][edge].slice(4, 8))
    //     result = cube[i];
    // return result;
    return _permute(cube, face_view(1, ROTATE[face][edge]));
}

function rotated_edge(cube, face, edge, edge2) {
    // return rotated_face(face, edge, cube)[edge2];
    return cube[ROTATE[face][edge][4 + edge2]];
}


function invalid(cubes) {
    var count = 0;

    if(edge_view(cubes[0][0], 1, 2) != edge_view(cubes[0][1], 1, 0)) count++;
    if(edge_view(cubes[0][1], 1, 2) != edge_view(cubes[0][2], 1, 0)) count++;
    if(edge_view(cubes[0][2], 1, 2) != edge_view(cubes[0][3], 1, 0)) count++;

    if(edge_view(cubes[0][0], 0, 3) != edge_view(cubes[1][0], 0, 1)) count++;
    if(edge_view(cubes[0][0], 1, 3) != edge_view(cubes[1][0], 1, 1)) count++;
    if(edge_view(cubes[0][1], 1, 3) != edge_view(cubes[1][1], 1, 1)) count++;
    if(edge_view(cubes[0][2], 1, 3) != edge_view(cubes[1][2], 1, 1)) count++;
    if(edge_view(cubes[0][3], 1, 3) != edge_view(cubes[1][3], 1, 1)) count++;
    if(edge_view(cubes[0][3], 2, 3) != edge_view(cubes[1][3], 2, 1)) count++;

    if(edge_view(cubes[1][0], 1, 2) != edge_view(cubes[1][1], 1, 0)) count++;
    if(edge_view(cubes[1][1], 1, 2) != edge_view(cubes[1][2], 1, 0)) count++;
    if(edge_view(cubes[1][2], 1, 2) != edge_view(cubes[1][3], 1, 0)) count++;

    if(edge_view(cubes[1][0], 3, 1) != edge_view(cubes[1][1], 3, 3)) count++;
    if(edge_view(cubes[1][1], 3, 1) != edge_view(cubes[1][2], 3, 3)) count++;
    if(edge_view(cubes[1][2], 3, 1) != edge_view(cubes[1][3], 3, 3)) count++;

    if(edge_view(cubes[1][0], 4, 1) != edge_view(cubes[1][1], 4, 3)) count++;
    if(edge_view(cubes[1][1], 4, 1) != edge_view(cubes[1][2], 4, 3)) count++;
    if(edge_view(cubes[1][2], 4, 1) != edge_view(cubes[1][3], 4, 3)) count++;

    if(edge_view(cubes[1][0], 4, 2) != edge_view(cubes[0][0], 4, 0)) count++;
    if(edge_view(cubes[1][1], 4, 2) != edge_view(cubes[0][1], 4, 0)) count++;
    if(edge_view(cubes[1][2], 4, 2) != edge_view(cubes[0][2], 4, 0)) count++;
    if(edge_view(cubes[1][3], 4, 2) != edge_view(cubes[0][3], 4, 0)) count++;

    if(edge_view(cubes[0][0], 4, 1) != edge_view(cubes[0][1], 4, 3)) count++;
    if(edge_view(cubes[0][1], 4, 1) != edge_view(cubes[0][2], 4, 3)) count++;
    if(edge_view(cubes[0][2], 4, 1) != edge_view(cubes[0][3], 4, 3)) count++;

    if(edge_view(cubes[0][0], 5, 1) != edge_view(cubes[0][1], 5, 3)) count++;
    if(edge_view(cubes[0][1], 5, 1) != edge_view(cubes[0][2], 5, 3)) count++;
    if(edge_view(cubes[0][2], 5, 1) != edge_view(cubes[0][3], 5, 3)) count++;

    return count;
}

function cube_rotations() {
    const result = [];
    for(const face of [0, 1, 2, 3, 4, 5])
        for(const edge of [0, 1, 2, 3])
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
    rotate, rotated_face, rotated_edge,
    edge_view
};
