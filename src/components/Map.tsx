import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './Map.css';
import { ReactComponent as MapSVG } from "../data/map.svg";
// import MapSVG from "../data/map.svg";

interface IMapProps {
    onSelectRoom: (room: any) => void;
}

const Map: React.FC<IMapProps> = ({ onSelectRoom }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const enableZoomOnSvg = () => {
        // create a D3 selection of the SVG itself - https://github.com/d3/d3-selection
        const svg = d3.select<Element, unknown>("#svg1");
        //create a D3 selection of the image element
        const image = svg.selectChild("#floor4");

        // create and configure an instance of zoom behaviour - https://github.com/d3/d3-zoom
        const zoom = d3.zoom().on("zoom", zoomed);

        // apply configured zoom behaviour to our svg
        svg.call(zoom);

        function zoomed(event: any) {
            const { transform } = event;
            console.log(transform);
            // apply calculated transform to the image
            image.attr("transform", transform.toString());
        }
    }

    const bindClickOnRoomListener = () => {
        // let svg = (document.getElementById("svg1") as HTMLObjectElement).contentDocument;
        let svg = svgRef.current;
        console.log(svg)
        let roomsGroup = svg?.getElementById("rooms");

        roomsGroup?.addEventListener("click", (e) => {
            onSelectRoom((e.target as HTMLElement).id);
        })
    }

    enableZoomOnSvg();
    useEffect(() => { bindClickOnRoomListener() }, [])

    return (
        <div id="container">
            {/* <strong>{name}</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p> */}
            {/* <svg id="map" width="100%" height="100%" style={{ backgroundColor: 'red' }}>
                <image id="image" href={map} />
            </svg> */}
            {/* <svg id="map" width="100%" height="100%">
                <MapSVG />
            </svg> */}
            <MapSVG ref={svgRef} width="100%" height="100%" />
        </div>
    );
};

export default Map;