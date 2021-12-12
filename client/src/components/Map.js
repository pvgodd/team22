import React, { useState, useEffect } from "react";
import ReactMapGL, {
    Marker,
    NavigationControl,
    ScaleControl
} from "react-map-gl";

import { accessToken } from "./mapbox";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const ICON_SIZE = 20;

const navStyle = {
    top: "1rem",
    left: "1rem"
};

const scaleControlStyle = {
    bottom: "3rem",
    left: "1rem"
};

export default function Map({ places, center }) {
    const [viewport, setViewport] = useState({
        latitude: center[1],
        longitude: center[0],
        zoom: 4
    });

    useEffect(() => {
        setViewport({
            latitude: center[1],
            longitude: center[0],
            zoom: 4
        });
    }, [center]);

    return (
        <ReactMapGL
            {...viewport}
            width="calc(100% - 400px)"
            height="100%"
            className="map"
            mapboxApiAccessToken={accessToken}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {places.map(({ id, name, lngLat }) => (
                <Marker key={id} longitude={lngLat[0]} latitude={lngLat[1]}>
                    <svg
                        height={ICON_SIZE}
                        viewBox="0 0 24 24"
                        style={{
                            cursor: "pointer",
                            fill: "#d00",
                            stroke: "none",
                            transform: `translate(${-ICON_SIZE / 2}px,${-ICON_SIZE}px)`
                        }}
                    >
                        <path d={ICON} />
                    </svg>
                </Marker>
            ))}
            <NavigationControl style={navStyle} />
            <ScaleControl style={scaleControlStyle} />
        </ReactMapGL>
    );
}
