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
        cubes: [[CubeA, CubeA, CubeA, CubeD],
                [CubeB, CubeB, CubeC, CubeC]]
    });
    const store = [
        state,
        {
            select(r, c) {
                setState('selected', [r, c]);
            },
            is_selected(r, c) {
                return state.selected[0] == r && state.selected[1] == c;
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
            spin_cw() {},
            spin_ccw() {}
        }
    ];

    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    );
}

export function useStore() { return useContext(StoreContext); }
