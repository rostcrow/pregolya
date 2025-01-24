
export default class AlgorithmController {

    #algorithm
    #stepHistory;
    #currentStep;

    setAlgorithm(algorithm) {
        //Algorithm init
        this.#algorithm = algorithm;
        this.#algorithm.init();
        
        //Step history init
        this.#stepHistory = [this.#algorithm.getData()];
        this.#currentStep = 0;
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
        if (this.#currentStep === this.#stepHistory.length - 1) {
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
            this.#stepHistory.push(this.#algorithm.getData());
        }

        this.#currentStep++;
    }

    jumpToEnd() {
        while (!this.#algorithm.isFinished()) {
            this.forward();
        }

        this.#currentStep = this.#stepHistory.length - 1;
    }

    getCurrentGraphVisual() {
        return this.#stepHistory[this.#currentStep]["visual"];
    }

    algorithmIsOnStart() {
        return this.#currentStep === 0;
    }

    algorithmIsOnEnd() {
        return this.#algorithm.isFinished() && (this.#currentStep === this.#stepHistory.length - 1);
    }

    algorithmIsRunnable() {
        return !this.algorithmIsOnEnd();
    }

    getCurrentSideComponents() {
        return this.#stepHistory[this.#currentStep]["components"];
    }
}