import React, { Component } from "react";

import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import RequestForm from './saRequestForm'
import AuthButton from './components/authbutton'

const listTodos = `query listTodos {
  listTodos{
    items{
    id
    accountLink
    accountName
    activityRequester
    accountOpportunity
    activityTitle
    activityType
    activityTopic
    activityDomain
    activityComplexity
    activityDetails
    activityFromDate
    activityToDate
    activityLocation
    activityInteractionType
    activityLanguage
    activityAM
    activityrequestedSA
    activityPriority
    activityRegion
    activitySubregion
    activityTerritory
    activityWatchers
    activitySubtopic
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description:String! $activityRequester:String! $activitySubtopic:String! $activityWatchers:String! $activityTerritory:String! $activitySubregion:String! $activityRegion:String! $activityPriority:String! $activityrequestedSA:String! $activityAM:String! $activityLanguage:String! $activityInteractionType:String! $activityLocation:String! $activityToDate:String! $activityFromDate:String! $activityDetails:String! $accountOpportunity:String! $activityTitle:String! $activityType:String! $activityTopic:String! $activityDomain:String! $activityComplexity:String!) {
  createTodo(input:{
    accountLink:$name
    accountName:$description
    activityRequester:$activityRequester
    accountOpportunity:$accountOpportunity
    activityTitle:$activityTitle
    activityType:$activityType
    activityTopic:$activityTopic
    activityDomain:$activityDomain
    activityComplexity:$activityComplexity
    activityDetails:$activityDetails
    activityFromDate:$activityFromDate
    activityToDate:$activityToDate
    activityLocation:$activityLocation
    activityInteractionType:$activityInteractionType
    activityLanguage:$activityLanguage
    activityAM:$activityAM
    activityrequestedSA:$activityrequestedSA
    activityPriority:$activityPriority
    activityRegion:$activityRegion
    activitySubregion:$activitySubregion
    activityTerritory:$activityTerritory
    activityWatchers:$activityWatchers
    activitySubtopic:$activitySubtopic
  }){
    id
    accountLink
    accountName
    activityRequester
    accountOpportunity
    activityTitle
    activityType
    activityTopic
    activityDomain
    activityComplexity
    activityDetails
    activityFromDate
    activityToDate
    activityLocation
    activityInteractionType
    activityLanguage
    activityAM
    activityrequestedSA
    activityPriority
    activityRegion
    activitySubregion
    activityTerritory
    activityWatchers
    activitySubtopic
  }
}`;

class App extends Component {
    todoMutation = async () => {
        const todoDetails = {
            name: "Party!",
            description: "Amplify CLI!",
            activityRequester:"ac",
            accountOpportunity:"ac",
            activityTitle:"ac",
            activityType:"ac",
            activityTopic:"ac",
            activityDomain:"ac",
            activityComplexity:"ac",
            activityDetails:"ac",
            activityFromDate:"ac",
            activityToDate:"ac",
            activityLocation:"ac",
            activityInteractionType:"ac",
            activityLanguage:"ac",
            activityAM:"ac",
            activityrequestedSA:"ac",
            activityPriority:"ac",
            activityRegion:"ac",
            activitySubregion:"ac",
            activityTerritory:"ac",
            activityWatchers:"ac",
            activitySubtopic:"ac"
        };

        const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
        alert(JSON.stringify(newTodo));
    };

    listQuery = async () => {
        console.log("listing todos");
        const allTodos = await API.graphql(graphqlOperation(listTodos));
        alert(JSON.stringify(allTodos));
    };


    render() {
        return (
            <div>
                <AuthButton/>
            </div>
        );
    }
}

export default App
//export default withAuthenticator(App, true);