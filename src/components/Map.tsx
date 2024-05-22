import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import './Map.css';
import { ReactComponent as MapSVGFloor1 } from "../data/map_floor_1.svg";
import { ReactComponent as MapSVGFloor2 } from "../data/map_floor_2.svg";
import { ReactComponent as MapSVGFloor3 } from "../data/map_floor_3.svg";
import { ReactComponent as MapSVGFloor4 } from "../data/map_floor_4.svg";
import { drawPathOnMap } from '../data/MapPathModule';
// import MapSVG from "../data/map.svg";

interface IMapProps {
    onSelectRoom: (room: any) => void;
    selectedRooms: any[];
    route: any[];
    floorNumber: string;
}

// const floorComponents = {
//     floor1: MapSVGFloor1,
//     floor2: MapSVGFloor2,
//     floor3: MapSVGFloor3,
//     floor4: MapSVGFloor4,
// }

const Map: React.FC<IMapProps> = ({ onSelectRoom, selectedRooms, route, floorNumber }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isRoomNumbersDrawed, setIsRoomNumbersDrawed] = useState(false);
    const [zoom, setZoom] = useState<any>(null);

    const enableZoomOnSvg = () => {
        // create a D3 selection of the SVG itself - https://github.com/d3/d3-selection
        const svg = d3.select<Element, unknown>("#svgFloor" + floorNumber);
        //create a D3 selection of the image element
        const image = svg.selectChild("#floor" + floorNumber);

        // create and configure an instance of zoom behaviour - https://github.com/d3/d3-zoom
        const zoom = d3.zoom().on("zoom", zoomed);

        // apply configured zoom behaviour to our svg
        svg.call(zoom);

        function zoomed(event: any) {
            const { transform } = event;
            // apply calculated transform to the image
            image.attr("transform", transform.toString());
        }

        // Отобразить названия аудиторий
        const rects = svg.selectAll("#rooms *");
        !isRoomNumbersDrawed && rects.each((d, i, nodes) => {
            // console.log(i);

            const x = (nodes[i] as SVGAElement).getAttribute("x");
            // console.log(x);
            const y = (nodes[i] as SVGAElement).getAttribute("y");
            const width = (nodes[i] as SVGAElement).getAttribute("width");
            const height = (nodes[i] as SVGAElement).getAttribute("height");

            const roomId = (nodes[i] as SVGAElement).getAttribute("id");

            svg.selectChild("#floor" + floorNumber).append("text").attr("x", x && width ? parseFloat(x) + parseFloat(width) / 2 : 0)
                .attr("y", y && height ? parseFloat(y) + parseFloat(height) / 2 : 0)
                .attr("width", width)
                .attr("height", width)
                .attr("font-size", "7")
                .attr("text-anchor", "middle")
                .attr("lengthAdjust", "spacingAndGlyphs")
                .attr("fill", "#000")
                .attr("class", "roomName")
                .text(roomId && parseInt(roomId.split("_")[2]) ? roomId.split("_")[2] : "")
        })
        setIsRoomNumbersDrawed(true);

        // rects.append("text")
        //     .attr("x", (d, i, nodes) => {
        //         // console.log(nodes[i])
        //         //console.log(d);
        //         const f = d as SVGTextElement;
        //         //console.log(f);
        //         // return f.getAttribute("x") + f.getAttribute("width") / 2
        //         return 1;
        //     })
        //     // .attr("y", (d: any) => d.getAttribute("y") + d.getAttribute("height") / 2)
        //     .attr("font-size", "14")
        //     .attr("text-anchor", "middle")
        //     .attr("fill", "#000")
        //     .text("lol")
        // // .text((d: any) => d.getAttribute("id"));
    }

    const handleClick = (event: Event) => {
        onSelectRoom((event.target as HTMLElement).id);
    };

    const bindClickOnRoomListener = () => {
        // let svg = (document.getElementById("svg1") as HTMLObjectElement).contentDocument;
        let svg = svgRef.current;
        let roomsGroup = svg?.getElementById("rooms");

        roomsGroup?.addEventListener("click", handleClick)
    }

    const highlightSelectedRooms = () => {
        let svg = svgRef.current;
        let roomsGroup = svg?.getElementById("rooms");

        // selectedRooms.forEach(room => {
        //     svg?.getElementById(room).classList.add("selected-room");
        // });
        //clearRoomsHighlight();

        roomsGroup?.childNodes.forEach(roomRect => {
            if (!selectedRooms.includes((roomRect as HTMLObjectElement).id))
                (roomRect as HTMLObjectElement).classList.remove("selected-room");
            else
                (roomRect as HTMLObjectElement).classList.add("selected-room");
        });
    }

    const clearRoomsHighlight = () => {
        let svg = svgRef.current;
        let roomsGroup = svg?.getElementById("rooms");
        roomsGroup?.querySelectorAll(".selected-room").forEach(roomRect => {
            if (!selectedRooms.includes(roomRect.id))
                (roomRect as HTMLObjectElement).classList.remove("selected-room");
        });
    }

    const deleteRoute = () => {
        var element = svgRef.current?.getElementById('pathIdD');
        if (typeof (element) != 'undefined' && element != null) {
            element.remove()
        }
    }

    const drawRoute = () => {
        if (route.length == 0)
            return;

        let svg = svgRef.current;
        let pointsGroup = svg?.getElementById("points");
        drawPathOnMap(svg, route);
        // create a D3 selection of the SVG itself - https://github.com/d3/d3-selection
        d3.select("#pathIdD").attr("stroke-dashoffset", 0); // Initialize the dash offset

        // Animate the dash offset
        // d3.select("#pathIdD").transition()
        //     .duration(Infinity)
        //     .ease(d3.easeLinear)
        //     .attrTween('stroke-dashoffset', () => {
        //         const interpolate = d3.interpolate(0, -100);
        //         return (t: number) => interpolate(t).toString();
        //     }).each(() => {
        //         console.log();
        //     })

        const svg1 = d3.select<Element, unknown>("#svgFloor" + floorNumber);
        const zoom = d3.zoom().on("zoom", zoomed);
        svg1.call(zoom);
        const image = svg1.selectChild("#floor" + floorNumber);

        function zoomed(event: any) {
            const { transform } = event;
            // apply calculated transform to the image
            image.attr("transform", transform.toString());
        }

        var bbox = (d3.select("#pathIdD").node() as SVGAElement).getBBox();
        console.log('bbox = ', bbox);
        var scale = 2;
        svg1.transition()
            .call(zoom.translateBy, (- bbox.x - bbox.width / 2) * scale, (- bbox.y - bbox.height / 3) * scale)
            .call(zoom.scaleBy, scale);
    }

    useEffect(() => {
        console.log("enable zoom");
        enableZoomOnSvg();
    }, [floorNumber])
    useEffect(() => {
        bindClickOnRoomListener();
        return () => {
            let svg = svgRef.current;
            let roomsGroup = svg?.getElementById("rooms");

            roomsGroup?.removeEventListener("click", handleClick);
        }
    }, [])
    useEffect(() => {
        highlightSelectedRooms();
        //return clearRoomsHighlight;
    }, [selectedRooms, floorNumber])
    useEffect(() => {
        drawRoute();
        //return clearRoomsHighlight;
    }, [route, floorNumber])



    const component = (floorNumber: string) => {
        switch (floorNumber) {
            case '1':
                return <MapSVGFloor1 ref={svgRef} width="100%" height="100%" />
            case '2':
                return <MapSVGFloor2 ref={svgRef} width="100%" height="100%" />
            case '3':
                return <MapSVGFloor3 ref={svgRef} width="100%" height="100%" />
            case '4':
                return <MapSVGFloor4 ref={svgRef} width="100%" height="100%" />
            default:
                return <div>Unknown component</div>;
        }
    };

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
            {component(floorNumber)}
            {/* <MapSVGFloor ref={svgRef} width="100%" height="100%" /> */}
            {/* <floorComponents[floorNumber] /> */}
        </div>
    );
};

export default Map;