import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";
import { addDoc, doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../config";

function SeedUsers() {
    const userRef = useRef(null);
    let userId = useRef([]);
    // !tour plan
    let location = useRef([]);
    let locations = useRef([]);
    let title = useRef();
    let date = useRef();
    let enddate = useRef();
    let description = useRef();
    let status = useRef();
    let [place, setPlace] = useState([]);
    // !add multiple user to firebase
    let seed = async () => {
        userId.current = [];
        for (let i = 0; i < 10; i++) {
            console.log("buttonclicked");

            userRef.current = await createUserWithEmailAndPassword(
                auth,
                `user${i}@user.com`,
                "123456"
            );
            userId.current.push([`user${i}`, userRef.current.user.uid]);
            console.log(userRef.current.user.uid);

            await setDoc(doc(db, "users", userRef.current.user.uid), {
                name: `userName${i}`,
                email: `user${i}@user.com`,
            });
        }
        console.log(userId.current);
    };

    // !add tour plan to all users

    let updatefun = async (user) => {
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
    userId.current = [
        // 'PWbfyiq8D9P8WQ6EEQF7rxS8p2v1',
        // 'Q1BCZBgt1wcUoMM3vr34EKWlmi93',
        // 'Q3UMbEsANwM1BjeNfKfXcg78KMO2',

        "LEKhTjYr7BdiKOau2kJ5fxC7lWy2",
        "grYM2sLSsscnJFwle74HCiIDSrQ2",
        "MT8tgBBRwxXq7cSzfGrrupn58RO2",
        "b2SP8TWjhrfbtuvPBy5fvBu3Hnj2",
        "Od09q7kty3MWQlyjyVfzNHXOYbR2",
        "Q1BCZBgt1wcUoMM3vr34EKWlmi93",
        "XPalVGkIo4ThxANetKuaPA6Zkyt2",
        "k56BhfiBi2dcc9YKQ5kkweURJzC2",
        "RWpFukax5Sd0S2cJSfkj8Xf2lLK2",
    ];

    let seedTourPlan = async () => {
        for (let i = 0; i < userId.current.length; i++) {
            locations.current = [
                `location1${i}`,
                `location2${i}`,
                `location3${i}`,
                `location4${i}`,
                `location5${i}`,
                `location6${i}`,
                `location7${i}`,
                `location8${i}`,
                `location9${i}`,
                `location10${i}`,
            ];
            title.current = `title${i} Let's go`;
            date.current = `date${i}`;
            enddate.current = `enddate${i}`;

            description.current = ` Lorem ipsum dolor sit 
            amet consectetur adipisicing elit. Amet at exercitationem 
            cupiditate, quod velit rerum ducimus dolor a voluptates voluptate,
            nulla sint qui atque esse reprehenderit cumque dicta! Sunt, fuga?${i}`;
            status.current = i % 2 === 0 ? "upcoming" : "Completed";

            let tem = await updateDoc(doc(db, "users", userId.current[i]), {
                'Alltour.tours3': {
                    location: locations.current,
                    title: title.current,
                    date: date.current,
                    enddate: enddate.current,
                    description: description.current,
                    status: "upcoming",
                },
            });
            console.log(tem);
        }
    };

    return (
        <div>
            {/* <button
                onClick={async (e) => {
                    await seed();
                }}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Create Account
            </button> */}
            <button
                onClick={(e) => {
                    console.log("buttonclicked");
                    console.log(userId.current);
                    seedTourPlan();
                }}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                SEED
            </button>
        </div>
    );
}

export default SeedUsers;
