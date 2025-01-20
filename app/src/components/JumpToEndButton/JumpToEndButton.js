
import { BsChevronBarRight } from "react-icons/bs";

export default function JumpToEndButton({func}) {

    return (
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={func}><BsChevronBarRight /></button>
    );

}