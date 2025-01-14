import { useSigma } from "@react-sigma/core";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

export default function ZoomControl() {

    const sigma = useSigma();

    function zoomIn () {
        sigma.getCamera().animatedZoom();
    }

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