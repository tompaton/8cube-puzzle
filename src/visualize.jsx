import styles from './App.module.css';
import { useStore } from "./store";
import puzzle from "./puzzle.js";

function CubeFace(props) {
    return (
        <td classList={{[styles.face]: true, [styles.selected]: props.selected}}
            onClick={props.onClick} >
            <svg width="90" height="90">
                <g fill="none" stroke="#000" stroke-width="3">
                    <rect x="0" y="0" width="90" height="90" stroke-width="1" />
                    {puzzle.horizontal_edge(props.face)
                     ? <rect x="0" y="30" width="90" height="30" />
                     : ""}
                    {puzzle.left_edge(props.face)
                     ? <circle cx="0" cy="45" r="15"/>
                     : "" }
                    {puzzle.right_edge(props.face)
                     ? <circle cx="90" cy="45" r="15" />
                     : "" }
                    {puzzle.vertical_edge(props.face)
                     ? <rect x="30" y="0" width="30" height="90" />
                     : ""}
                    {puzzle.top_edge(props.face)
                     ? <circle cx="45" cy="0" r="15" />
                     : "" }
                    {puzzle.bottom_edge(props.face)
                     ? <circle cx="45" cy="90" r="15" />
                     : "" }
                </g>
            </svg>
        </td>
    );
}

export function CubeNet(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <CubeFace face={puzzle.rotated_face(props.cube, 0, 1)} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 1, 1)} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 2, 1)} />
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cube, 3, 1)} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 4, 1)} />
                    <CubeFace face={puzzle.rotated_face(props.cube, 5, 1)} />
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
                    <td><CubeNet cube={puzzle.rotate(5, 0)(props.cube)} /></td>
                    <td></td>
                </tr>
                <tr>
                    <td><CubeNet cube={puzzle.rotate(0, 1)(props.cube)} /></td>
                    <td><CubeNet cube={props.cube} /></td>
                    <td><CubeNet cube={puzzle.rotate(2, 1)(props.cube)} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><CubeNet cube={puzzle.rotate(3, 0)(props.cube)} /></td>
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
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 0, 1)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 1, 1)}
                              onClick={() => select(0, 0)}
                              selected={is_selected(0, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 1, 1, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 1, 1, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][1], 1, 1)}
                              onClick={() => select(0, 1)}
                              selected={is_selected(0, 1)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 1, 1, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 1, 1, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][2], 1, 1)}
                              onClick={() => select(0, 2)}
                              selected={is_selected(0, 2)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 1, 1, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 1, 1, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 1, 1)}
                              onClick={() => select(0, 3)}
                              selected={is_selected(0, 3)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 2, 1)} />
                </tr>
                <tr>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 0, 1, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][0], 0, 1, 1)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 1, 1, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][0], 1, 1, 1)} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 1, 1, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 1, 1, 1)} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 1, 1, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 1, 1, 1)} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][3], 1, 1, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 1, 1, 1)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][3], 2, 1, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 2, 1, 1)} />
                </tr>
                <tr>
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 0, 1)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 1, 1)}
                              onClick={() => select(1, 0)}
                              selected={is_selected(1, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 1, 1, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 1, 1, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][1], 1, 1)}
                              onClick={() => select(1, 1)}
                              selected={is_selected(1, 1)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 1, 1, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 1, 1, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][2], 1, 1)}
                              onClick={() => select(1, 2)}
                              selected={is_selected(1, 2)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 1, 1, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 1, 1, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 1, 1)}
                              onClick={() => select(1, 3)}
                              selected={is_selected(1, 3)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 2, 1)} />
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 3, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 3, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 3, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][1], 3, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 3, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 3, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][2], 3, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 3, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 3, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 3, 0)} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][0], 4, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 4, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][1], 4, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][1], 4, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 4, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][2], 4, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][2], 4, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 4, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[1][3], 4, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[1][3], 4, 0)} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][0], 4, 0, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][0], 4, 0, 1)} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][1], 4, 0, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 4, 0, 1)} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][2], 4, 0, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 4, 0, 1)} />
                    <td></td>
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[1][3], 4, 0, 3)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 4, 0, 1)} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 4, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 4, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 4, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][1], 4, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 4, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 4, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][2], 4, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 4, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 4, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 4, 0)} />
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][0], 5, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][0], 5, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][1], 5, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][1], 5, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][1], 5, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][2], 5, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][2], 5, 0)} />
                    <CheckAdjacent edge1={puzzle.rotated_edge(props.cubes[0][2], 5, 0, 2)}
                                   edge2={puzzle.rotated_edge(props.cubes[0][3], 5, 0, 0)} />
                    <CubeFace face={puzzle.rotated_face(props.cubes[0][3], 5, 0)} />
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}
