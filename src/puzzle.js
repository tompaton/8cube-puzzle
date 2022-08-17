class Face {
    constructor (edges) {
        this.left = !!(edges & 0b1000);
        this.top = !!(edges & 0b0100);
        this.right = !!(edges & 0b0010);
        this.bottom = !!(edges & 0b0001);
    }
}

class Cube {
    constructor (faces) {
        this.faces = faces.map((f) => new Face(f));
    }
    get face_a() { return this.faces[0]; }
    get face_b() { return this.faces[1]; }
    get face_c() { return this.faces[2]; }
    get face_d() { return this.faces[3]; }
    get face_e() { return this.faces[4]; }
    get face_f() { return this.faces[5]; }
}

export default { Cube };
