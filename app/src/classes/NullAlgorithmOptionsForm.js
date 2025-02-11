import AlgorithmOptionsForm from "./AlgorithmOptionsForm";

export default class NullAlgorithmOptionsForm extends AlgorithmOptionsForm {

    getDefaultOptions() {
        return [];
    }

    getComponents() {
        return <></>;
    }

}