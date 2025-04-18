
// IMPORT
// React
import { PiGraphBold } from "react-icons/pi";

// CODE
// Button for changing layout
export default function LayoutControl({layoutKey, changeLayoutKeyFunc}) {

    return (
        <div className="react-sigma-control">
            <button title={"Change layout\nCurrent: " + layoutKey} onClick={changeLayoutKeyFunc}><PiGraphBold /></button>
        </div>
    );
}