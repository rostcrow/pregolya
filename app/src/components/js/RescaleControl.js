
// IMPORT
// React
import { RiFocusMode } from "react-icons/ri";

// React Sigma
import { useSigma } from "@react-sigma/core";

// CODE
// Button for rescaling graph
export default function RescaleControl() {

    const sigma = useSigma();

    // Handles click action
    function handleClick () {
        sigma.setCustomBBox(null);
        sigma.refresh();
        sigma.getCamera().animatedReset();
    }

    return (
        <div className="react-sigma-control">
            <button title="Rescale" onClick={handleClick}><RiFocusMode /></button>
        </div>
        
    );
}