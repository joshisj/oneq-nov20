import React from 'react';
import './App.css';
import RequestForm from './saRequestForm'
import { AmplifySignOut } from "@aws-amplify/ui-react";


function form(){
    return(
        <div>
            <RequestForm />
            <AmplifySignOut />
        </div>

    );
}

export default form;