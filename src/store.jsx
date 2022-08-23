import { createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import puzzle from './puzzle.js';
import { Constraint, CSP } from './constraints.js';

export const CubeA = new puzzle.Cube([0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0]);  // x 3
export const CubeB = new puzzle.Cube([0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0]);  // x 2
export const CubeC = new puzzle.Cube([0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0]);  // x 2
export const CubeD = new puzzle.Cube([0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0]);  // x 1

const CUBE = {
    'cube00': 0,
    'cube01': 1,
    'cube02': 2,
    'cube03': 3,
    'cube10': 4,
    'cube11': 5,
    'cube12': 6,
    'cube13': 7
};

function get_cube(which, face, edge) {
    return puzzle.rotate(face, edge)({'A': CubeA, 'B': CubeB, 'C': CubeC, 'D': CubeD}[which]);
}

class EdgeConstraint extends Constraint {
    constructor(cube1, cube2, check) {
        super([cube1, cube2]);
        this.check = check;
    }

    satisfied(assignment) {
        if(assignment['cubes'] === undefined) return true;
        if(assignment[this.variables[0]] === undefined) return true;
        if(assignment[this.variables[1]] === undefined) return true;

        const cube1 = get_cube(assignment['cubes'][CUBE[this.variables[0]]],
                               assignment[this.variables[0]][0],
                               assignment[this.variables[0]][1]);
        const cube2 = get_cube(assignment['cubes'][CUBE[this.variables[1]]],
                               assignment[this.variables[1]][0],
                               assignment[this.variables[1]][1]);

        if(this.check === 'left') {

        } else if(this.check === 'top') {

        } else if(this.check === 'right') {

        } else if(this.check === 'middle') {

        } else if(this.check === 'bottom') {

        }

        /*
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
         */

        return false;
    }
}

function solve() {
    const variables = [
        // cube permutation
        'cubes',
        // rotation for each cube
        'cube00', 'cube01', 'cube02', 'cube03',
        'cube10', 'cube11', 'cube12', 'cube13'
    ];
    const domains = {};
    for(const cube of variables)
        domains[cube] = puzzle.cube_rotations();
    domains['cubes'] = puzzle.cube_permutations('AAABBCCD');

    const csp = CSP(variables, domains);

    // order checks so that it gets solved from the top left
    // 1 3 5 7
    // 2 4 6 8
    csp.add_constraint(EdgeConstraint('cube00', 'cube10', 'left'));
    csp.add_constraint(EdgeConstraint('cube00', 'cube01', 'top'));
    csp.add_constraint(EdgeConstraint('cube10', 'cube11', 'bottom'));
    csp.add_constraint(EdgeConstraint('cube01', 'cube11', 'middle'));
    csp.add_constraint(EdgeConstraint('cube01', 'cube02', 'top'));
    csp.add_constraint(EdgeConstraint('cube11', 'cube12', 'bottom'));
    csp.add_constraint(EdgeConstraint('cube02', 'cube12', 'middle'));
    csp.add_constraint(EdgeConstraint('cube02', 'cube03', 'top'));
    csp.add_constraint(EdgeConstraint('cube03', 'cube13', 'right'));
    csp.add_constraint(EdgeConstraint('cube12', 'cube13', 'bottom'));

    console.log('Solution', csp.backtracking_search());
}

const StoreContext = createContext();

export function StoreProvider(props) {
    const [state, setState] = createStore({
        selected: [0, 0],
        swapping: null,
        cubes: [[CubeA, CubeA, CubeA, CubeD],
                [CubeB, CubeB, CubeC, CubeC]]
    });
    const swap = (r, c, r1, c1) => {
        const a = state.cubes[r][c];
        const b = state.cubes[r1][c1];
        setState('cubes', r1, c1, a);
        setState('cubes', r, c, b);
    };
    const store = [
        state,
        {
            select(r, c) {
                if(state.swapping) {
                    const [r1, c1] = state.selected;
                    swap(r, c, r1, c1);
                    setState('selected', [r, c]);
                    setState('swapping', null);
                } else {
                    setState('selected', [r, c]);
                }
            },
            is_selected(r, c) {
                return state.selected[0] == r && state.selected[1] == c;
            },
            start_swap() {
                setState('swapping', state.selected);
            },
            cancel_swap() {
                setState('swapping', null);
            },
            turn_left() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => puzzle.rotate(0, 1)(old));
            },
            turn_right() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => puzzle.rotate(2, 1)(old));
            },
            turn_top() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => puzzle.rotate(5, 0)(old));
            },
            turn_bottom() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => puzzle.rotate(3, 0)(old));
            },
            turn_cw() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => puzzle.rotate(1, 0)(old));
            },
            turn_ccw() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => puzzle.rotate(1, 2)(old));
            },
            solve
        }
    ];

    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    );
}

export function useStore() { return useContext(StoreContext); }
