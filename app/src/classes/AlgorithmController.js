
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
    
    #saveState () {
        this.#algorithmStates.push(this.#algorithm.getState());
    }

    jumpToStart() {
        this.#currentStateIndex = 0;
    }

    back() {
        if (this.#currentStateIndex > 0) {
            this.#currentStateIndex--;
        }
    }

    forward() {
        if (this.#currentStateIndex === this.#algorithmStates.length - 1) {
            if (this.#algorithm.isFinished()) {
                //Algorithm is finished, no action made
                return;
            }

            //Making next step in algorithm
            this.#algorithm.forward();
            console.log(this.#algorithm.isFinished());

            //Saving to history
            this.#saveState();
        }

        this.#currentStateIndex++;
    }

    jumpToEnd() {
        while (!this.#algorithm.isFinished()) {
            this.forward();
        }

        this.#currentStateIndex = this.#algorithmStates.length - 1;
    }

    algorithmIsOnStart() {
        return this.#currentStateIndex === 0;
    }

    algorithmIsOnEnd() {
        return this.#algorithm.isFinished() && (this.#currentStateIndex === this.#algorithmStates.length - 1);
    }

    getCurrentState() {
        return this.#algorithmStates[this.#currentStateIndex];
    }

}