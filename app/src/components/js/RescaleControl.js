import { useSigma } from "@react-sigma/core";
import { RiFocusMode } from "react-icons/ri";

export default function RescaleControl() {

    const sigma = useSigma();

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