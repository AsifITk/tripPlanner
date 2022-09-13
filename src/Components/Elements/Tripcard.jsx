import React from "react";
import { useNavigate } from "react-router-dom";

function Tripcard({ trip, img, use }) {
    let goTo = useNavigate();
    console.log(use);
    return (
        <div className="trip-card" onClick={() => goTo(`alltrips/${use}`)}>
            {/* < div className="max-w-2xl mx-auto" > */}
            < div className="trip-card" >
                <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img
                            className="rounded-t-lg p-8"
                            // src="https://source.unsplash.com/random"
                            src={img}
                            alt="Place"
                        />
                    </a>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                                {trip.title}
                            </h3>
                        </a>
                        <div className="flex items-center mt-2.5 mb-5">
                            <div className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3 locations ">
                                {trip.location.map((location) => <span>location</span>)}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-1xl font-bold text-gray-900 dark:text-white">
                                {trip.date}
                            </span>
                            <span className="text-1xl font-bold text-gray-900 dark:text-white">
                                {trip.enddate}
                            </span>
                            <a
                                href="#"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {trip.status}
                            </a>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Tripcard;
