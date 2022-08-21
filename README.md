# 8 Cube Puzzle

4x2 grid
8 cubes
6 faces
4 directions
can flip and rotate around each axis to get another solution (reduce positions by 1/8)

8! x 6 x 4 x 1/8 options = 40320 x 3 = 120960 positions

edges on adjacent faces have to match

duplicate cubes further reduces number of positions by 3! x 2! x 2! = 24 --> only 5040?!


1. define board

2. define cubes

3. visualise

4. interactive

5. define constraints

6. visualise constraints

7. depth first search to find solution with max number of constraints satisfied
a) just choosing which cubes
b) which face up
c) which orientation

8. generate new cubes


variables / domains

- cube arrangement
  - do as a single variable so that we can remove symmetrical variants
  - domain is all permutations minus rotated/mirrored and identical cubes

- rotation for each cube (6)
- spin for each cube (4)
  - i.e. 16 variables in total
  - this way we can prune the tree early if any two cubes are not consistent
    with each other
  - or 8 variables with a domain of (6 x 4)

constraints

- single constraint that the board is valid?
  - won't work as not all cube rotations will be defined...

- 28 constraints between adjacent edges



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


## Future

3D svg rendering?


## Optimisations

store cube structure more efficiently

do rotations of cubes and faces as permutations

can combine permutations before constructing new cube

permutation can just be a view into a single cube object, not
necessary to construct a new cube

precompute 4 x 6 permutations and store those as the domain
