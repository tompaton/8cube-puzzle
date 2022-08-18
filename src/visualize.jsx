import styles from './App.module.css';

function CubeFace(props) {
    return (
        <td class={styles.face}>
            <svg width="90" height="90">
                <rect fill="none" stroke="#000" x="0" y="0" width="90" height="90" />
                {props.face.left && props.face.right
                 ? <rect fill="none" stroke="#000" x="0" y="30" width="90" height="30" />
                 : ""}
                {props.face.left && !props.face.right
                 ? <circle cx="0" cy="45" r="15" fill="none" stroke="#000" />
                 : "" }
                {!props.face.left && props.face.right
                 ? <circle cx="90" cy="45" r="15" fill="none" stroke="#000" />
                 : "" }
                {props.face.top && props.face.bottom
                 ? <rect fill="none" stroke="#000" x="30" y="0" width="30" height="90" />
                 : ""}
                {props.face.top && !props.face.bottom
                 ? <circle cx="45" cy="0" r="15" fill="none" stroke="#000" />
                 : "" }
                {!props.face.top && props.face.bottom
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
                    <CubeFace face={props.cube.face_a} />
                    <CubeFace face={props.cube.face_b} />
                    <CubeFace face={props.cube.face_c} />
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <CubeFace face={props.cube.face_d} />
                    <CubeFace face={props.cube.face_e} />
                    <CubeFace face={props.cube.face_f} />
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
                    <td><CubeNet cube={props.cube.turn_top()} /></td>
                    <td></td>
                </tr>
                <tr>
                    <td><CubeNet cube={props.cube.turn_left()} /></td>
                    <td><CubeNet cube={props.cube} /></td>
                    <td><CubeNet cube={props.cube.turn_right()} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><CubeNet cube={props.cube.turn_bottom()} /></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}

export function Board(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <CubeFace face={props.cubes[0][0].face_a} />
                                </tr>
                                <tr>
                                    <CubeFace face={props.cubes[1][0].face_a} />
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <CubeFace face={props.cubes[0][0].face_b} />
                                    <CubeFace face={props.cubes[0][1].face_b} />
                                    <CubeFace face={props.cubes[0][2].face_b} />
                                    <CubeFace face={props.cubes[0][3].face_b} />
                                </tr>
                                <tr>
                                    <CubeFace face={props.cubes[1][0].face_b} />
                                    <CubeFace face={props.cubes[1][1].face_b} />
                                    <CubeFace face={props.cubes[1][2].face_b} />
                                    <CubeFace face={props.cubes[1][3].face_b} />
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <CubeFace face={props.cubes[0][3].face_c} />
                                </tr>
                                <tr>
                                    <CubeFace face={props.cubes[1][3].face_c} />
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <CubeFace face={props.cubes[1][0].turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[1][1].turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[1][2].turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[1][3].turn_bottom().face_b} />
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <CubeFace face={props.cubes[1][0].turn_bottom().turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[1][1].turn_bottom().turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[1][2].turn_bottom().turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[1][3].turn_bottom().turn_bottom().face_b} />
                                </tr>
                                <tr>
                                    <CubeFace face={props.cubes[0][0].turn_bottom().turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[0][1].turn_bottom().turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[0][2].turn_bottom().turn_bottom().face_b} />
                                    <CubeFace face={props.cubes[0][3].turn_bottom().turn_bottom().face_b} />
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <CubeFace face={props.cubes[0][0].turn_top().face_b} />
                                    <CubeFace face={props.cubes[0][1].turn_top().face_b} />
                                    <CubeFace face={props.cubes[0][2].turn_top().face_b} />
                                    <CubeFace face={props.cubes[0][3].turn_top().face_b} />
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}
