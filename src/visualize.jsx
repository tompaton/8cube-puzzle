import styles from './App.module.css';

const DOT = '•';

function CubeFace(props) {
    return (
        <td class={styles.face}>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>{props.face.top ? DOT : ''}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{props.face.left ? DOT : ''}</td>
                        <td></td>
                        <td>{props.face.right ? DOT : ''}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{props.face.bottom ? DOT : ''}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
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

