import puzzle from './puzzle.js';
import { CubeNet } from './visualize.jsx';

import styles from './App.module.css';

const CubeA = new puzzle.Cube([0b0000, 0b0011, 0b1010, 0b1010, 0b1100, 0b0000]);
const CubeB = new puzzle.Cube([0b0000, 0b0001, 0b0101, 0b1110, 0b1000, 0b0100]);
const CubeC = new puzzle.Cube([0b0010, 0b1110, 0b1101, 0b0100, 0b0010, 0b1110]);
const CubeD = new puzzle.Cube([0b0000, 0b0100, 0b0101, 0b0100, 0b0010, 0b1110]);

function App() {
  return (
      <div class={styles.App}>
          <h2>A</h2>
          <CubeNet {...CubeA} />

          <h2>B</h2>
          <CubeNet {...CubeB} />

          <h2>C</h2>
          <CubeNet {...CubeC} />

          <h2>D</h2>
          <CubeNet {...CubeD} />
    </div>
  );
}


export default App;
