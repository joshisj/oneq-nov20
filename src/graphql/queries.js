/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
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
      activityRegion
      activitySubregion
      activityTerritory
      activityWatchers
      activitySubtopic
      activityBusinessUnit
      activityTerritorySegment
      activityGeo
      activityRoute
      createdAt
      updatedAt
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        activityRegion
        activitySubregion
        activityTerritory
        activityWatchers
        activitySubtopic
        activityBusinessUnit
        activityTerritorySegment
        activityGeo
        activityRoute
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
