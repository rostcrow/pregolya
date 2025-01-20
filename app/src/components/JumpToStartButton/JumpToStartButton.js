
import { BsChevronBarLeft } from "react-icons/bs";

export default function JumpToStartButton( {func} ) {

    return (
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={func}><BsChevronBarLeft /></button>
    );

}