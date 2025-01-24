
export default class AlgorithmController {

    #algorithm
    #algorithmMementoFactory;
    #algorithmMementos;
    #currentStep;

    constructor (algorithm, algorithmMementoFactory) {
        this.#algorithm = algorithm;

        this.#algorithmMementoFactory = algorithmMementoFactory;
        this.#algorithmMementos = [];
        this.#currentStep = 0;

        this.#makeMemento();

        if (this.constructor === AlgorithmController) {
            throw new Error("AlgorithmController class is abstract");
        }
    }
    
    #makeMemento () {
        this.#algorithmMementos.push(this.#algorithmMementoFactory.createAlgorithmMemento());
    }

    jumpToStart() {
        this.#currentStep = 0;
    }

    back() {
        if (this.#currentStep > 0) {
            this.#currentStep--;
        }
    }

    forward() {
        if (this.#currentStep === this.#algorithmMementos.length - 1) {
            if (this.#algorithm.isFinished()) {
                //Algorithm is finished, no action made
                return;
            }

            //Making next step in algorithm
            this.#algorithm.forward();

            //Checking finish again
            if (this.#algorithm.isFinished()) {
                return;
            }

            //Saving to history
            this.#makeMemento();
        }

        this.#currentStep++;
    }

    jumpToEnd() {
        while (!this.#algorithm.isFinished()) {
            this.forward();
        }

        this.#currentStep = this.#algorithmMementos.length - 1;
    }

    algorithmIsOnStart() {
        return this.#currentStep === 0;
    }

    algorithmIsOnEnd() {
        return this.#algorithm.isFinished() && (this.#currentStep === this.#algorithmMementos.length - 1);
    }

    getCurrentGraphVisual() {
        return this.#algorithmMementos[this.#currentStep].getGraphVisual();
    }

    getCurrentSideComponents() {
        return this.#algorithmMementos[this.#currentStep].getSideComponents();
    }
}