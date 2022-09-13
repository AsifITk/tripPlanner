import React, { useEffect, useState } from 'react'
import Tripcard from '../Elements/Tripcard'
import { useNavigate, useParams } from "react-router-dom";
import { collectionGroup } from 'firebase/firestore';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../../config';


function Alltrips({ userId, user, setUser }) {
    let params = useParams();
    userId = params.id;
    setUser(userId);
    console.log(userId)

    const [trips, setTrips] = useState(null);

    let getData = async () => {


        // const docRef = doc(db, "users", `${userId}`);
        // const docSnap = await getDoc(docRef);
        // console.log(docSnap);


        // if (docSnap.exists()) {
        //     setTrips(docSnap.data().Alltour);
        //     console.log(trips);

        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }





        const querySnapshot = await getDocs(collection(db, "users", `${userId}`, 'places'));
        let newObj = {};
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            newObj[doc.id] = doc.data();
            // console.log(doc.id, " => ", doc.data());

        });
        setTrips(newObj)
        console.log(newObj);

    }



    let goTo = useNavigate();
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className='alltrips-head'>ALL Trips Here</div>
            <div className="addTripDiv"> <button className='addTrip' onClick={() => goTo('/plan')}>Add A Trip</button ></div>
            <div className='trips-details'>


                <button onClick={(e) => { getData() }}> Refresh</button>
                {/* <div className='alltrips' >
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                </div>
                <h3>Completed Trips</h3>
                <div className='alltrips' >
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                </div>
                <h3>Cancelled Trips</h3>
                <div className='alltrips'>
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                    <Tripcard />
                </div> */}

                {trips ? (
                    Object.keys(trips).map((key, i) => {
                        let img = `https://source.unsplash.com/random/?${i}`;
                        return (

                            <div className='alltrips' key={key} >
                                <Tripcard trip={trips[key]} img={img} use={key} />
                            </div>
                        )
                    }
                    )) : (<div>Loading</div>)}





            </div>
        </>
    )
}

export default Alltrips