import React from 'react';
import { Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid';
import { Form, Header, Segment } from 'semantic-ui-react';
import { API, graphqlOperation } from "aws-amplify";
import RequestSchema from './saRequestSchema';
import * as mutations from './graphql/mutations';
import {
    AutoField,
    AutoForm,
    ErrorsField,
    DateField,
    RadioField,
    LongTextField,
    SubmitField
} from 'uniforms-semantic';
import './App.css'
// Get the query parameters and default them into the form
let search = window.location.search;
let params = new URLSearchParams(search);
// Salesforce account data passed into this script
let urlAcctLink = params.get('acctlink');
let urlAcctName = params.get('acctname');
let urlOptLink = params.get('optlink');
let urlregion = params.get('region');
let urlsubregion = params.get('subregion');
let urlterritory = params.get('territory');
let urlgeo = params.get('geo');
let urlterritorysegment = params.get('territoryseg');
let urlbu = params.get('bu');
console.log(urlAcctName);

const style = {
    "margin-left": 100,
    "margin-right": 100,
    "margin-bottom": 50,
    border: '3px solid orange',
    padding: '20px',
    background: '#DCDCDC',
    titleStyle: {
        fontFamily: 'sans-Serif',
        "text-align": "center",
        "padding-top":'50px',
        "font-size": '45px',
        color: "gray"
    },
        button:{
        background: 'orange',
        padding: '15px 32px',
    },
    contact:{
        "text-align": "center"
    }
};

var handleAdd = (doc) => {

    // generate unique request# and file name for S3
    var requestID = uuidv4();
    var s3fileName = 'sa-requests/request-' + requestID + '.json'
    console.log('Request ID:', requestID)
    console.log('File Name:', s3fileName);

    console.log("Here is the document",doc)
    //api.posts.createPost({ post: post}).then(json => displayMessage(json))

    // save the form data to S3 cloud Storage
    var addToStorage = () => {
        Storage.put(s3fileName, doc)
            .then (result => {
                console.log('result: ', result)
            })
            .catch(err => console.log('error: ', err));
    }
    addToStorage();

    //Create activitytitle from topic and type
    var type=doc.activityType;
    var topic=doc.activityTopic;
    var name=doc.accountName
    var title=type.concat(" - ", topic, " - ",name);
    doc.activityTitle=title;
    
    //write data to the API using Graphql
    (async () => {
          const newRequest = await API.graphql(graphqlOperation(mutations.createRequest, {input: doc}));
    })();


    //Alert confirming form submitted
    //alert("Thank you. The form was submitted");
    reloadpage();
}

function reloadpage(){
    var returnURL = "success.html";
//    window.close();
    setTimeout(function()
    {
        window.location=returnURL;
    }, 1500 );
}

export default function RequestForm() {
return (
        <form>
            <h1 className='saformtitle'>Solutions Architect Activity Request</h1>
            <AutoForm style={style} schema={RequestSchema} onSubmit={doc => handleAdd(doc)}>
                <br></br>
                <Form.Group widths="equal">
                    <AutoField name="accountLink" value={urlAcctLink} placeholder="Salesforce link to account"/>
                    <AutoField name="accountName" value={urlAcctName} placeholder="Account name as per Salesforce"/>
                    <AutoField name="accountOpportunity" value={urlOptLink} placeholder="Salesforce link to opportunity. N/A for none." />
                </Form.Group>
                <Form.Group widths="equal">
                    <AutoField name="activityRequester" placeholder="Enter your amazon alias here"/>
                    <AutoField name="activityAM" placeholder="Enter the account manager's alias" />
                    <AutoField name="activityrequestedSA" placeholder="Is there a specific SA this should be handled by?" />
                </Form.Group>
                <h3>Activity Details</h3>
                <Form.Group widths="equal">
                    <AutoField name="activityType" />
                    <AutoField name="activityTopic"/>
                </Form.Group>
                <Form.Group widths="equal">
                    <AutoField name="activityDomain" />
                    <AutoField name="activitySubtopic" placeholder="Specific topic(if any)" />
                </Form.Group>
                <LongTextField name="activityDetails" placeholder="Enter any relevant details related to the activity here" />
                <AutoField name="activityComplexity" />
                <Form.Group widths="equal">
                    <DateField name="activityFromDate" />
                    <DateField name="activityToDate" />
                </Form.Group>
                <Form.Group widths={"equal"}>
                    <AutoField name="activityLocation" placeholder="Enter N/A if the meeting is virtual" />
                    <AutoField name="activityLanguage" placeholder="Preferred interaction language with customer"/>
                </Form.Group>
                <RadioField name={"activityInteractionType"}/>
                <AutoField name="activityWatchers" placeholder="Enter comma-separated alias of people you would like to be CC'ed to the SIM issue ex. abc,xyz"/>
                <AutoField name="activityRoute" />
                <h3>SFDC Details (Do not edit)</h3>
                <Form.Group widths="equal">
                    <AutoField name="activityRegion" value={urlregion} placeholder="Region as per Salesforce"/>
                    <AutoField name="activitySubregion" value={urlsubregion} placeholder="Sub-region as per Salesforce" />
                    <AutoField name="activityTerritory" value={urlterritory} placeholder="Territory as per Salesforce" />
                </Form.Group>
                <Form.Group widths="equal">
                    <AutoField name="activityBusinessUnit" value={urlbu} placeholder="Business Unit  as per Salesforce"/>
                    <AutoField name="activityTerritorySegment" value={urlterritorysegment} placeholder="Territory Segment as per Salesforce"/>
                    <AutoField name="activityGeo" value={urlgeo} placeholder="Geo as per Salesforce"/>
                </Form.Group>
                <br></br>
                <SubmitField style={style.button} value='Submit Request'/>
                <ErrorsField />
            </AutoForm>
            <p style={style.contact}><strong>Any Issues?</strong> <a href="https://issues.amazon.com/issues/create?assignedFolder=4e51feb9-2c19-44b6-ab43-518c89a4fe48">Contact Us</a></p>
            <p></p>    
        </form>
    );
}

//align submit button to center
// "margin-left": '40%',