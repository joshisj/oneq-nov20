import React, { Component } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import RequestForm from './saRequestForm'
import AuthButton from './components/authbutton'
import Amplify, { Auth, Hub } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react/lib/Auth'
import form from './form';

    function App() {
        return (
            <div className="">
                <AuthButton/>
            </div>
        );
    }


export default App
//export default withAuthenticator(App, true);
//<button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>