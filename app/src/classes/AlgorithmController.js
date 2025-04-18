
// This class represents controller which controls given algorithm and saves it states in each step
export default class AlgorithmController {

    #algorithm
    #algorithmStates;
    #currentStateIndex;

    constructor (algorithm) {
        this.#algorithm = algorithm;

        this.#algorithmStates = [];
        this.#currentStateIndex = 0;

        this.#saveState();
    }
    
    // Save state of algorithm
    #saveState () {
        this.#algorithmStates.push(this.#algorithm.getState());
    }

    // Jumps to start
    jumpToStart() {
        this.#currentStateIndex = 0;
    }

    // Makes one step back
    back() {
        if (this.#currentStateIndex > 0) {
            this.#currentStateIndex--;
        }
    }

    /*
        Makes one step forward.
        If the step is somewhere in state history, no algorithm action is done.
        If the step is new, it actions algorithm for one step and saves it state.
    */
    forward() {
        if (this.#currentStateIndex === this.#algorithmStates.length - 1) {
            if (this.#algorithm.isFinished()) {
                // Algorithm is finished, no action made
                return;
            }

            // Making next step in algorithm
            this.#algorithm.forward();

            // Saving to history
            this.#saveState();
        }

        this.#currentStateIndex++;
    }

    // Jumps to end
    jumpToEnd() {
        while (!this.#algorithm.isFinished()) {
            this.forward();
        }

        this.#currentStateIndex = this.#algorithmStates.length - 1;
    }

    // Returns if controller is on start
    algorithmIsOnStart() {
        return this.#currentStateIndex === 0;
    }

    // Returns if algorithm is finished and controller is on the last state
    algorithmIsOnEnd() {
        return this.#algorithm.isFinished() && (this.#currentStateIndex === this.#algorithmStates.length - 1);
    }

    // Returns current state of controller
    getCurrentState() {
        return this.#algorithmStates[this.#currentStateIndex];
    }

}