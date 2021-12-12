import React, { useState, useEffect } from "react";
import PlacesList from "./PlacesList";
import AddPlaceForm from "./AddPlaceForm";
import Map from "./Map";

import "./styles.css";

const initialPlaces = [
    {
        id: 1,
        name: "Berlin, Germany",
        lngLat: [13.383309, 52.516806]
    },
    {
        id: 2,
        name: "Roma, Rome, Italy",
        lngLat: [12.485855, 41.909468]
    },
    {
        id: 3,
        name: "Barcelona, Barcelona, Spain",
        lngLat: [2.177657, 41.401487]
    }
];

async function getPlaces() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(initialPlaces), 500);
    });
}

export default function App() {
    const [isLoading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [center, setCenter] = useState([]);

    // simulate server data loading
    useEffect(() => {
        setLoading(true);
        (async () => {
            const places = await getPlaces();
            setPlaces(places);
            setCenter(places[1].lngLat);
            setLoading(false);
        })();
    }, []);

    function onPlaceClick(place) {
        setCenter(place.lngLat);
    }

    function onPlaceRemove(place) {
        setPlaces(places.filter((x) => x.id !== place.id));
    }

    function onSubmit(place) {
        // find a strategy to avoid duplicates
        if (places.find((x) => x.name === place.name)) {
            alert("Place already existing");
            return;
        }
        const newPlace = {
            ...place,
            id: places[places.length - 1].id + 1
        };
        setPlaces([...places, newPlace]);
        setCenter(place.lngLat);
    }

    return (
        <div className="app">
            <div className="sidebar">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <PlacesList
                            places={places}
                            onPlaceClick={onPlaceClick}
                            onPlaceRemove={onPlaceRemove}
                        />
                        <AddPlaceForm onSubmit={onSubmit} />{" "}
                    </>
                )}
            </div>
            <Map center={center} places={places} />
        </div>
    );
}
