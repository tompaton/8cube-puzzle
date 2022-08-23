import { Show } from "solid-js";

import { useStore, CubeA, CubeB, CubeC, CubeD } from "./store";
import puzzle from "./puzzle.js";
import { Board, CubeNet, TurnCube } from './visualize.jsx';

import styles from './App.module.css';

function App() {
    const [state, { }] = useStore();
    return (
        <div class={styles.App}>
            <Show when={puzzle.invalid(state.cubes)} fallback="Solved!">
                Invalid: {puzzle.invalid(state.cubes)}
            </Show>

            <Board cubes={state.cubes} />
            <Controls />

            <h2>A</h2>
            <TurnCube cube={CubeA} />

            <h2>B</h2>
            <CubeNet cube={CubeB} />

            <h2>C</h2>
            <CubeNet cube={CubeC} />

            <h2>D</h2>
            <CubeNet cube={CubeD} />
        </div>
    );
}


function Controls(props) {
    const [state, { start_swap, cancel_swap,
                    turn_left, turn_right, turn_top, turn_bottom,
                    turn_cw, turn_ccw,
                    solve}] = useStore();
    return (
        <div>
            <button onClick={() => state.swapping ? cancel_swap() : start_swap()}>{state.swapping ? "cancel" : "swap"}</button>
            <button onClick={() => turn_left()}>turn left</button>
            <button onClick={() => turn_right()}>turn right</button>
            <button onClick={() => turn_top()}>turn top</button>
            <button onClick={() => turn_bottom()}>turn bottom</button>
            <button onClick={() => turn_cw()}>spin cw</button>
            <button onClick={() => turn_ccw()}>spin ccw</button>
            <br/>
            <br/>
            <button onClick={() => solve()}>solve</button>
            <Show when={state.solutions}>
                {state.solution + 1} / {state.solutions.length}
            </Show>
        </div>
    );
}

export default App;
