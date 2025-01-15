
import { useContext } from "react";
import { PiGraphBold } from "react-icons/pi";
import { LayoutContext } from "../GraphCanvas/GraphCanvas";

export default function LayoutControl() {

    const {
        layoutKey,
        changeLayoutKey
    } = useContext(LayoutContext);

    return (
        <div className="react-sigma-control">
            <button title={"Change layout\nCurrent: " + layoutKey} onClick={changeLayoutKey}><PiGraphBold /></button>
        </div>
    );
}