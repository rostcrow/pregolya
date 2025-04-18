
// IMPORT
// React
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

// React Sigma
import { useSigma } from "@react-sigma/core";

// CODE
// Component consisting of two buttons to control graph zoom
export default function ZoomControl() {

    const sigma = useSigma();

    // Zooms in
    function zoomIn () {
        sigma.getCamera().animatedZoom();
    }

    // Zooms out
    function zoomOut () {
        sigma.getCamera().animatedUnzoom();
    }

    return (
        <>
            <div className="react-sigma-control">
                <button title="Zoom in" onClick={zoomIn}><BsZoomIn /></button>
            </div>
            <div className="react-sigma-control">
                <button title="Zoom out" onClick={zoomOut}><BsZoomOut /></button>
            </div>
        </>
    );  
}