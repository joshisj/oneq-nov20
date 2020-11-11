import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
//import awsconfig from '../config/awsconfig';
import RequestForm from "./saRequestForm";

//Amplify.configure(awsconfig);

function AuthButton() {
    const [user, setUser] = useState(null);
    const [creds, setCreds] = useState(null)

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            console.log("Received Event")
            console.log(event)
            switch (event) {
                case 'signIn':
                    console.log('signIn event detected')
                    console.log(data);
                    break
                case 'cognitoHostedUI':
                    console.log('cognitoHostedUI event detected')
                    console.log(data)
                    getUser().then(userData => setUser(userData));
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                    console.log("Normal sign in failure")
                    break
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
                default:
                    console.log('No matching cases in auth flow')
                    break
            }
        });

        getUser().then(userData => setUser(userData));
    }, []);

    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then(userData => {
                console.log('User Data:',userData)
                // For some reason the identities key, which contains the
                // username is a string, not an object, so we're going to
                // fix that when the user is retrieved
                const identities = JSON.parse(userData.attributes.identities)
                console.log(identities)
                userData.attributes.identitiesList = identities
                return userData
            })
            .catch(() => console.log('Not signed in'));
    }

    return (
        <div>
            {user ? (
                <div >
                    <RequestForm/>
                    <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={() => Auth.signOut()}>Sign Out</button>
                </div>
            ) : (
                <div>
                    <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={() => Auth.federatedSignIn()}>Sign In</button>
                </div>
            )}
        </div>
    );
}

export default AuthButton;