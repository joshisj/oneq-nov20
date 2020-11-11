import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../config/awsconfig';
import RequestForm from '/Users/joshisj/IdeaProjects/oneq-f/src/saRequestForm'
//Amplify.configure(awsconfig);
import '../App.css'

const stylea = {
    "margin-left": 100,
    "margin-right": 100,
    "margin-bottom": 50,
    border: '3px solid orange',
    padding: '20px',
    background: '#DCDCDC',
    titleStyle: {

    },
    button:{
        background: 'orange',
        padding: '15px 32px',
        "margin-left": '44%',
        "margin-bottom": "2%",
        "border": "none",
        "border-radius": "3px"

    },
    box:{
        width: 500,
        height: 150,
        border: '3px solid orange',
    },
}

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
                <div className={stylea.box}>
                    <RequestForm/>
                    <button style={stylea.button}
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                            onClick={() => Auth.signOut()}>Sign Out
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className='demo'>OneQ</h1>
                    <button style={stylea.button} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={() => Auth.federatedSignIn()}>Sign In to OneQ with Midway</button>
                </div>
            )}
        </div>
    );
}

export default AuthButton;

//sign out button
//<button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={() => Auth.signOut()}>Sign Out</button>