import { BsChevronRight } from "react-icons/bs";

export default function NextButton ( {func} ) {

    return (
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={func}><BsChevronRight /></button>
    );

}