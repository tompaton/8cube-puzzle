import styles from './App.module.css';
import { useStore } from "./store";
import puzzle from "./puzzle.js";

function CubeFace(props) {
    return (
        <td classList={{[styles.face]: true, [styles.selected]: props.selected}}
            onClick={props.onClick} >
            <svg width="90" height="90">
                <rect fill="none" stroke="#000" x="0" y="0" width="90" height="90" />
                {puzzle.horizontal_edge(props.face)
                 ? <rect fill="none" stroke="#000" x="0" y="30" width="90" height="30" />
                 : ""}
                {puzzle.left_edge(props.face)
                 ? <circle cx="0" cy="45" r="15" fill="none" stroke="#000" />
                 : "" }
                {puzzle.right_edge(props.face)
                 ? <circle cx="90" cy="45" r="15" fill="none" stroke="#000" />
                 : "" }
                {puzzle.vertical_edge(props.face)
                 ? <rect fill="none" stroke="#000" x="30" y="0" width="30" height="90" />
                 : ""}
                {puzzle.top_edge(props.face)
                 ? <circle cx="45" cy="0" r="15" fill="none" stroke="#000" />
                 : "" }
                {puzzle.bottom_edge(props.face)
                 ? <circle cx="45" cy="90" r="15" fill="none" stroke="#000" />
                 : "" }
            </svg>
        </td>
    );
}

export function CubeNet(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <CubeFace face={puzzle.rotated_face(props.cube, 'a', 'top')} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 'b', 'top')} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 'c', 'top')} />
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cube, 'd', 'top')} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 'e', 'top')} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 'f', 'top')} />
                </tr>
            </tbody>
        </table>
    );
}


export function TurnCube(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td><CubeNet cube={puzzle.rotate('f', 'left')(props.cube)} /></td>
                    <td></td>
                </tr>
                <tr>
                    <td><CubeNet cube={puzzle.rotate('a', 'top')(props.cube)} /></td>
                    <td><CubeNet cube={props.cube} /></td>
                    <td><CubeNet cube={puzzle.rotate('c', 'top')(props.cube)} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><CubeNet cube={puzzle.rotate('d', 'left')(props.cube)} /></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}

function CheckAdjacent(props) {
    return (
        <td class={props.edge1 == props.edge2 ? styles.adjacent_ok : styles.adjacent_bad}></td>
    );
}

export function Board(props) {
    const [state, { select, is_selected }] = useStore();

    return (
        <table>
            <tbody>
                <tr>
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 'a', 'top')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 'b', 'top')}
                              onClick={() => select(0, 0)}
                              selected={is_selected(0, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 'b', 'top', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 'b', 'top', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][1], 'b', 'top')}
                              onClick={() => select(0, 1)}
                              selected={is_selected(0, 1)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 'b', 'top', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 'b', 'top', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][2], 'b', 'top')}
                              onClick={() => select(0, 2)}
                              selected={is_selected(0, 2)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 'b', 'top', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 'b', 'top', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 'b', 'top')}
                              onClick={() => select(0, 3)}
                              selected={is_selected(0, 3)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 'c', 'top')} />
                </tr>
                <tr>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 'a', 'top', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][0], 'a', 'top', 'top')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 'b', 'top', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][0], 'b', 'top', 'top')} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 'b', 'top', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 'b', 'top', 'top')} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 'b', 'top', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 'b', 'top', 'top')} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][3], 'b', 'top', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 'b', 'top', 'top')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][3], 'c', 'top', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 'c', 'top', 'top')} />
                </tr>
                <tr>
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 'a', 'top')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 'b', 'top')}
                              onClick={() => select(1, 0)}
                              selected={is_selected(1, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 'b', 'top', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 'b', 'top', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][1], 'b', 'top')}
                              onClick={() => select(1, 1)}
                              selected={is_selected(1, 1)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 'b', 'top', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 'b', 'top', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][2], 'b', 'top')}
                              onClick={() => select(1, 2)}
                              selected={is_selected(1, 2)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 'b', 'top', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 'b', 'top', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 'b', 'top')}
                              onClick={() => select(1, 3)}
                              selected={is_selected(1, 3)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 'c', 'top')} />
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 'd', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 'd', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 'd', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][1], 'd', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 'd', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 'd', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][2], 'd', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 'd', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 'd', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 'd', 'left')} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 'e', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 'e', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 'e', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][1], 'e', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 'e', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 'e', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][2], 'e', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 'e', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 'e', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 'e', 'left')} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 'e', 'left', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][0], 'e', 'left', 'top')} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 'e', 'left', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 'e', 'left', 'top')} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 'e', 'left', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 'e', 'left', 'top')} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][3], 'e', 'left', 'bottom')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 'e', 'left', 'top')} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 'e', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 'e', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 'e', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][1], 'e', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 'e', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 'e', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][2], 'e', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 'e', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 'e', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 'e', 'left')} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 'f', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 'f', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 'f', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][1], 'f', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 'f', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 'f', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][2], 'f', 'left')} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 'f', 'left', 'right')}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 'f', 'left', 'left')} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 'f', 'left')} />
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}
