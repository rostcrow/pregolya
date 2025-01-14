
import { PiGraphBold } from "react-icons/pi";

export default function LayoutControl( {layoutKey, buttonFunc} ) {

    return (
        <div className="react-sigma-control">
            <button title={"Change layout\nCurrent: " + layoutKey} onClick={buttonFunc}><PiGraphBold /></button>
        </div>
    );
}