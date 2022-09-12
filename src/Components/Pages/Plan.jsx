import React, { useRef, useState } from "react";
// import { AddressAutofill } from "@mapbox/search-js-react";
import {
    doc,
    // updateDoc,
    // getFirestore,
    // arrayUnion,
    // arrayRemove,
    // collection,
    setDoc,
    // collectionGroup,
} from "firebase/firestore";

import { db } from "../../config";
export default function Form({ userId, user }) {

    console.log(user);

    const accessToken =
        "pk.eyJ1IjoiYXJuYXZwdXJpIiwiYSI6ImNrZHNhb3ppYTBkNDYyeHFza3diMXZtdnkifQ.fCuBiUZ9JjgUbBlaBDvPrw";


    let location = useRef([]);
    let locations = useRef([]);
    let title = useRef();
    let date = useRef();
    let enddate = useRef();
    let description = useRef();
    let status = useRef();
    let [place, setPlace] = useState([]);
    let [show, setShow] = useState(true);

    let fetchLocations = async (query) => {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}`
        );
        const data = await response.json();
        setPlace(data.features);

        return data.features;
    };

    const addToLocations = (loc) => {
        console.log(locations);
        locations.current.push(loc);
        setShow(false)
        console.log(locations.current);
    };

    let updatefun = async () => {
        console.log(locations.current);
        console.log(title.current.value);
        console.log(date.current.value);

        console.log(enddate.current.value);
        console.log(description.current.value);
        console.log(status.current.value);

        await setDoc(doc(db, "users", user, "places", location.current.value), {
            location: locations.current,
            title: title.current.value,
            date: date.current.value,
            enddate: enddate.current.value,
            description: description.current.value,
            status: status.current.value,
        });
    };



    return (
        <div className="form-div">
            <div className="form-header">
                <h1>Plan Your Trip</h1>
            </div>
            <div className="details">
                <div>{locations.current.map((loc) => {
                    return <div key={Math.random()}>{loc.place_name}</div>
                })

                }</div>

            </div>
            <form>
                <label>Location</label>
                <input
                    ref={location}
                    on
                    type="text"
                    onKeyPress={(e) => e.key === "Enter" && fetchLocations(location.current.value)}
                />

                {show ?
                    <div className='location'
                    >

                        {place.map((place, index) => {
                            return (
                                <div key={index}>
                                    <p>{place.place_name}</p>
                                    <span className="add-btn" onClick={() => addToLocations(place.place_name)}>Add</span>
                                </div>
                            );
                        })}

                        {locations.current.length != 0 ? (place.map((place, index) => {
                            return (
                                <div key={index}>
                                    <p>{place.place_name}</p>
                                    <span className="add-btn" onClick={() => addToLocations(place.place_name)}>Add</span>
                                </div>
                            );
                        })) : <div></div>}

                    </div> : <div></div>
                }

                <label>Title</label>
                <input ref={title} type="text" />
                <label>Date</label>
                <input ref={date} type="text" />
                <label>EndDate</label>
                <input ref={enddate} type="text" />
                <label>Description</label>
                <input ref={description} type="text" />
                <label>Statue</label>
                <select ref={status} name="cars" id="cars" form="carform">
                    <option value="upcoming" selected>
                        Upcoming
                    </option>

                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </form >

            <button type="text" onClick={() => updatefun()}>
                Submit
            </button>
        </div >
    );
}
