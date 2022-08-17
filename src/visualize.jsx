import styles from './App.module.css';

const DOT = '•';

function CubeFace(props) {
    return (
        <td class={styles.face}>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>{props.top ? DOT : ''}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{props.left ? DOT : ''}</td>
                        <td></td>
                        <td>{props.right ? DOT : ''}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{props.bottom ? DOT : ''}</td>
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
                    <CubeFace {...props.face_a} />
                    <CubeFace {...props.face_b} />
                    <CubeFace {...props.face_c} />
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <CubeFace {...props.face_d} />
                    <CubeFace {...props.face_e} />
                    <CubeFace {...props.face_f} />
                </tr>
            </tbody>
        </table>
    );
}

