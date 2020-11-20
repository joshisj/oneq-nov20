import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

//added
import Amplify,  { Auth } from 'aws-amplify';
import {oauthconfig, oauthconfigLocal} from './config/oauthconfig';
import awsconfig from './config/awsconfig';
Amplify.configure(awsconfig);
oauthconfig.redirectSignIn = window.location.href;
Auth.configure({ oauth: oauthconfig });
//till here

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//<React.StrictMode>
//</React.StrictMode>,
