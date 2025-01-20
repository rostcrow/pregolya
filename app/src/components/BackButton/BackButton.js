import { BsChevronLeft } from "react-icons/bs";

export default function BackButton({func}) {

    return (
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={func}><BsChevronLeft /></button>
    );
}