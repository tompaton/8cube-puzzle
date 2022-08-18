import puzzle from './puzzle.js';
import { Board, CubeNet, TurnCube } from './visualize.jsx';

import styles from './App.module.css';

const CubeA = new puzzle.Cube([0b0000, 0b0011, 0b1010, 0b1010, 0b1100, 0b0000]);  // x 3
const CubeB = new puzzle.Cube([0b0000, 0b0001, 0b0101, 0b1110, 0b1000, 0b0100]);  // x 2
const CubeC = new puzzle.Cube([0b0010, 0b1110, 0b1101, 0b0100, 0b0010, 0b1110]);  // x 2
const CubeD = new puzzle.Cube([0b0000, 0b0100, 0b0101, 0b0100, 0b0010, 0b1110]);  // x 1

const BOARD = new puzzle.Board([[CubeA, CubeA, CubeA, CubeD],
                                [CubeB, CubeB, CubeC, CubeC]]);

function App() {
  return (
      <div class={styles.App}>
          Invalid: {BOARD.invalid()}
          <Board cubes={BOARD.cubes} />

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


export default App;
