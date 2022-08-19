import { createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import puzzle from './puzzle.js';

export const CubeA = new puzzle.Cube([0b0000, 0b0011, 0b1010, 0b1010, 0b1100, 0b0000]);  // x 3
export const CubeB = new puzzle.Cube([0b0000, 0b0001, 0b0101, 0b1110, 0b1000, 0b0100]);  // x 2
export const CubeC = new puzzle.Cube([0b0010, 0b1110, 0b1101, 0b0100, 0b0010, 0b1110]);  // x 2
export const CubeD = new puzzle.Cube([0b0000, 0b0100, 0b0101, 0b0100, 0b0010, 0b1110]);  // x 1

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
                setState('cubes', r, c, (old) => old.turn_left());
            },
            turn_right() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => old.turn_right());
            },
            turn_top() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => old.turn_top());
            },
            turn_bottom() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => old.turn_bottom());
            },
            turn_cw() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => old.turn_cw());
            },
            turn_ccw() {
                const [r, c] = state.selected;
                setState('cubes', r, c, (old) => old.turn_ccw());
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
