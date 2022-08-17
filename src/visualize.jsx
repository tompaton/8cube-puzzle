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
