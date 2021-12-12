import React from "react";

export default function PlacesList({ places, onPlaceClick, onPlaceRemove }) {
    return (
        <section className="places-list">
            <h2>Places I want to visit</h2>
            <ul>
                {places.map((place) => (
                    <li key={place.id}>
                        <span onClick={() => onPlaceClick(place)}>{place.name}</span>{" "}
                        <button onClick={() => onPlaceRemove(place)}>×</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
