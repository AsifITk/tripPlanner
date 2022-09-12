import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config';
import { useRef } from 'react';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../config';
import { useNavigate } from 'react-router-dom';



function Signup() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const userRef = useRef(null)
    const goTo = useNavigate();



    return (
        <div className='signup-container'>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name" />

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />


                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password" />

                        <button
                            onClick={async () => {
                                console.log("buttonclicked");

                                userRef.current = await createUserWithEmailAndPassword(auth, email, password)
                                console.log(userRef.current.user.uid);

                                await setDoc(doc(db, "users", userRef.current.user.uid),
                                    {
                                        name: userName,
                                        email: email
                                    }
                                )

                                goTo(`/${userRef.current.user.uid}`)


                            }}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

                        >Create Account</button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <a className="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup