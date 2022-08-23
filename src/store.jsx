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

function get_cube(assignment, which) {
    const [face, edge] = assignment[which];
    const cube = {'A': CubeA, 'B': CubeB, 'C': CubeC, 'D': CubeD}[assignment['cubes'][CUBE[which]]];
    return puzzle.rotate(face, edge)(cube);
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

        const cube1 = get_cube(assignment, this.variables[0]);
        const cube2 = get_cube(assignment, this.variables[1]);

        const a = (face, edge) => puzzle.edge_view(cube1, face, edge);
        const b = (face, edge) => puzzle.edge_view(cube2, face, edge);

        if(this.check === 'left') {
            if(a(3, 0) != b(5, 2)) return false;
            if(a(3, 3) != b(5, 3)) return false;
            if(a(3, 2) != b(5, 0)) return false;
        } else if(this.check === 'top') {
            if(a(2, 0) != b(0, 2)) return false;
            if(a(2, 1) != b(0, 1)) return false;
            if(a(2, 2) != b(0, 0)) return false;
        } else if(this.check === 'right') {
            if(a(3, 0) != b(5, 2)) return false;
            if(a(3, 1) != b(5, 1)) return false;
            if(a(3, 2) != b(5, 0)) return false;
        } else if(this.check === 'middle') {
            if(a(3, 0) != b(5, 2)) return false;
            if(a(3, 2) != b(5, 0)) return false;
        } else if(this.check === 'bottom') {
            if(a(2, 0) != b(0, 2)) return false;
            if(a(2, 3) != b(0, 3)) return false;
            if(a(2, 2) != b(0, 0)) return false;
        }

        return true;
    }
}

function solve_csp() {
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

    const csp = new CSP(variables, domains);

    // order checks so that it gets solved from the top left
    // 1 3 5 7
    // 2 4 6 8
    csp.add_constraint(new EdgeConstraint('cube00', 'cube10', 'left'));
    csp.add_constraint(new EdgeConstraint('cube00', 'cube01', 'top'));
    csp.add_constraint(new EdgeConstraint('cube10', 'cube11', 'bottom'));
    csp.add_constraint(new EdgeConstraint('cube01', 'cube11', 'middle'));
    csp.add_constraint(new EdgeConstraint('cube01', 'cube02', 'top'));
    csp.add_constraint(new EdgeConstraint('cube11', 'cube12', 'bottom'));
    csp.add_constraint(new EdgeConstraint('cube02', 'cube12', 'middle'));
    csp.add_constraint(new EdgeConstraint('cube02', 'cube03', 'top'));
    csp.add_constraint(new EdgeConstraint('cube03', 'cube13', 'right'));
    csp.add_constraint(new EdgeConstraint('cube12', 'cube13', 'bottom'));

    const result = csp.backtracking_search();
    console.log('Solution', result);
    return result;
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
            solve() {
                const result = solve_csp();
                setState('cubes', 0, 0, get_cube(result, 'cube00'));
                setState('cubes', 0, 1, get_cube(result, 'cube01'));
                setState('cubes', 0, 2, get_cube(result, 'cube02'));
                setState('cubes', 0, 3, get_cube(result, 'cube03'));
                setState('cubes', 1, 0, get_cube(result, 'cube10'));
                setState('cubes', 1, 1, get_cube(result, 'cube11'));
                setState('cubes', 1, 2, get_cube(result, 'cube12'));
                setState('cubes', 1, 3, get_cube(result, 'cube13'));
            }
        }
    ];

    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    );
}

export function useStore() { return useContext(StoreContext); }
