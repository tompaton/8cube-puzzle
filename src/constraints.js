export class Constraint {
    constructor (variables) {
        this.variables = variables;
    }

    satisfied(assignment) {
        return false;
    }
}

export class CSP {
    constructor (variables, domains) {
        this.variables = variables;
        this.domains = domains;

        this.constraints = {};
        for(const variable of this.variables) {
            this.constraints[variable] = [];
            if(this.domains[variable] === undefined) {
                throw "Every variable should have a domain assigned to it.";
            }
        }
    }

    add_constraint(constraint) {
        for(const variable of constraint.variables) {
            if(this.constraints[variable] === undefined) {
                throw "Variable in constraint not in CSP";
            } else {
                this.constraints[variable].push(constraint);
            }
        }
    }

    consistent(variable, assignment) {
        for(const constraint of this.constraints[variable]) {
            if(!constraint.satisfied(assignment))
                return false;
        }
        return true;
    }

    backtracking_search(assignment) {
        if(assignment === undefined) assignment = {};

        if(Object.keys(assignment).length === this.variables.length)
            return assignment;

        const unassigned = [];
        for(const v of this.variables)
            if(assignment[v] === undefined)
                unassigned.push(v);

        const first = unassigned[0];

        for(const value of this.domains[first]) {
            const local_assignment = {...assignment};
            local_assignment[first] = value;

            if(this.consistent(first, local_assignment)) {
                const result = this.backtracking_search(local_assignment);
                if(result !== null)
                    return result;
            }
        }

        return null;
    }
}
