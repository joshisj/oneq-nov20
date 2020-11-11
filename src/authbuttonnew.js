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
                </div>
            ) : (
                <div class='siginpage'>
                    <h1 className='signintitle'>Solutions Architect Activity Request</h1>
                    <br></br>
                    <br></br>
                    <button className='sigin' onClick={() => Auth.federatedSignIn()}>Sign In with Midway</button>
                    <p>Please give the form a couple seconds to load after signing in</p>
                </div>
            )}
        </div>
    );
}

export default AuthButton;

//sign out button
//<button className='sigin' onClick={() => Auth.signOut()}>Sign Out</button>