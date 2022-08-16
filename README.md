# 8 Cube Puzzle

4x2 grid
8 cubes
6 faces
4 directions
can flip and rotate around each axis to get another solution (reduce positions by 1/8)

8! x 6 x 4 x 1/8 options = 40320 x 3 = 120960 positions

adjacent faces have to match

faces can be:
blank
top-bottom
left-right
left
right
top
bottom
top-bottom + left
left + bottom

duplicate cubes further reduces number of positions by 3! x 2! x 2! = 24 --> only 5040?!

3 x A
2 x B
2 x C
1 x D

cube net
a b c        - left top right
    d e f    -          front bottom back

A x 3
a blank
b bottom + right
c left-right
d left-right
e left + top
f blank

B x 2
a blank
b bottom
c top-bottom
d top + left-right
e left
f top

C x 2
a right
b left-right + top
c left + top-bottom
d top
e right
f left-right + top

D x 1
a blank
b top
c top-bottom
d top
e right
f left-right + top


1. define board

4 x 2 array of cubes
cube - which type (4) which face up (6) which orientation (4)

2. define cubes

each face is either a connection or not (doesn't matter if it goes through) so 2^4 = 8 options x 6 faces.

rotating cube (orientation) will just shift these connections (from face to face and within top/bottom faces)

3. visualise

2d unwrapped? repeat edges?

4. interactive

choose cubes, select each cube to rotate

5. define constraints

cube i face j edge k = cube p face q edge r

6. visualise constraints

7. depth first search to find solution with max number of constraints satisfied
a) just choosing which cubes
b) which face up
c) which orientation

8. generate new cubes

## Usage

```bash
$ npm install
```

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
