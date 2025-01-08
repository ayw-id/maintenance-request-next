import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type MaintenanceRequest = {
  __typename?: 'MaintenanceRequest';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Status;
  title: Scalars['String']['output'];
  urgency: Urgency;
};

export type MaintenanceRequestResult = {
  __typename?: 'MaintenanceRequestResult';
  maintenanceRequests: Array<MaintenanceRequest>;
  metrics: Metrics;
};

export type Metrics = {
  __typename?: 'Metrics';
  averageResolutionTime?: Maybe<Scalars['Float']['output']>;
  openCount: Scalars['Int']['output'];
  urgentCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRequest: MaintenanceRequest;
  updateRequestStatus: MaintenanceRequest;
};


export type MutationAddRequestArgs = {
  description: Scalars['String']['input'];
  status: Status;
  title: Scalars['String']['input'];
  urgency: Urgency;
};


export type MutationUpdateRequestStatusArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  status: Status;
  title?: InputMaybe<Scalars['String']['input']>;
  urgency?: InputMaybe<Urgency>;
};

export type Query = {
  __typename?: 'Query';
  maintenanceRequests: MaintenanceRequestResult;
};

export enum Status {
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type Subscription = {
  __typename?: 'Subscription';
  saveRequest?: Maybe<SubscriptionData>;
};

export type SubscriptionData = {
  __typename?: 'SubscriptionData';
  maintenanceRequest?: Maybe<MaintenanceRequest>;
  metrics: Metrics;
};

export enum Urgency {
  Emergency = 'EMERGENCY',
  LessUrgent = 'LESS_URGENT',
  NotUrgent = 'NOT_URGENT',
  Urgent = 'URGENT'
}

export type MaintenanceRequestFragmentFragment = { __typename?: 'MaintenanceRequest', id: number, title: string, description: string, urgency: Urgency, status: Status, createdAt: any, resolvedAt?: any | null };

export type AddRequestMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Status;
  urgency: Urgency;
}>;


export type AddRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'MaintenanceRequest', id: number, title: string, description: string, urgency: Urgency, status: Status, createdAt: any, resolvedAt?: any | null } };

export type UpdateRequestStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  status: Status;
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  urgency?: InputMaybe<Urgency>;
}>;


export type UpdateRequestStatusMutation = { __typename?: 'Mutation', updateRequestStatus: { __typename?: 'MaintenanceRequest', id: number, title: string, description: string, urgency: Urgency, status: Status, createdAt: any, resolvedAt?: any | null } };

export type MaintenanceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type MaintenanceRequestsQuery = { __typename?: 'Query', maintenanceRequests: { __typename?: 'MaintenanceRequestResult', maintenanceRequests: Array<{ __typename?: 'MaintenanceRequest', id: number, title: string, description: string, urgency: Urgency, status: Status, createdAt: any, resolvedAt?: any | null }>, metrics: { __typename?: 'Metrics', openCount: number, averageResolutionTime?: number | null, urgentCount: number } } };

export type SaveRequestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SaveRequestSubscription = { __typename?: 'Subscription', saveRequest?: { __typename?: 'SubscriptionData', maintenanceRequest?: { __typename?: 'MaintenanceRequest', id: number, title: string, description: string, urgency: Urgency, status: Status, createdAt: any, resolvedAt?: any | null } | null, metrics: { __typename?: 'Metrics', averageResolutionTime?: number | null, openCount: number, urgentCount: number } } | null };

export const MaintenanceRequestFragmentFragmentDoc = gql`
    fragment MaintenanceRequestFragment on MaintenanceRequest {
  id
  title
  description
  urgency
  status
  createdAt
  resolvedAt
}
    `;
export const AddRequestDocument = gql`
    mutation addRequest($title: String!, $description: String!, $status: STATUS!, $urgency: URGENCY!) {
  addRequest(
    title: $title
    description: $description
    status: $status
    urgency: $urgency
  ) {
    ...MaintenanceRequestFragment
  }
}
    ${MaintenanceRequestFragmentFragmentDoc}`;
export type AddRequestMutationFn = Apollo.MutationFunction<AddRequestMutation, AddRequestMutationVariables>;

/**
 * __useAddRequestMutation__
 *
 * To run a mutation, you first call `useAddRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRequestMutation, { data, loading, error }] = useAddRequestMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *      urgency: // value for 'urgency'
 *   },
 * });
 */
export function useAddRequestMutation(baseOptions?: Apollo.MutationHookOptions<AddRequestMutation, AddRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRequestMutation, AddRequestMutationVariables>(AddRequestDocument, options);
      }
export type AddRequestMutationHookResult = ReturnType<typeof useAddRequestMutation>;
export type AddRequestMutationResult = Apollo.MutationResult<AddRequestMutation>;
export type AddRequestMutationOptions = Apollo.BaseMutationOptions<AddRequestMutation, AddRequestMutationVariables>;
export const UpdateRequestStatusDocument = gql`
    mutation updateRequestStatus($id: Int!, $status: STATUS!, $title: String, $description: String, $urgency: URGENCY) {
  updateRequestStatus(
    id: $id
    status: $status
    title: $title
    description: $description
    urgency: $urgency
  ) {
    ...MaintenanceRequestFragment
  }
}
    ${MaintenanceRequestFragmentFragmentDoc}`;
export type UpdateRequestStatusMutationFn = Apollo.MutationFunction<UpdateRequestStatusMutation, UpdateRequestStatusMutationVariables>;

/**
 * __useUpdateRequestStatusMutation__
 *
 * To run a mutation, you first call `useUpdateRequestStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestStatusMutation, { data, loading, error }] = useUpdateRequestStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      urgency: // value for 'urgency'
 *   },
 * });
 */
export function useUpdateRequestStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRequestStatusMutation, UpdateRequestStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRequestStatusMutation, UpdateRequestStatusMutationVariables>(UpdateRequestStatusDocument, options);
      }
export type UpdateRequestStatusMutationHookResult = ReturnType<typeof useUpdateRequestStatusMutation>;
export type UpdateRequestStatusMutationResult = Apollo.MutationResult<UpdateRequestStatusMutation>;
export type UpdateRequestStatusMutationOptions = Apollo.BaseMutationOptions<UpdateRequestStatusMutation, UpdateRequestStatusMutationVariables>;
export const MaintenanceRequestsDocument = gql`
    query MaintenanceRequests {
  maintenanceRequests {
    maintenanceRequests {
      ...MaintenanceRequestFragment
    }
    metrics {
      openCount
      averageResolutionTime
      urgentCount
    }
  }
}
    ${MaintenanceRequestFragmentFragmentDoc}`;

/**
 * __useMaintenanceRequestsQuery__
 *
 * To run a query within a React component, call `useMaintenanceRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaintenanceRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaintenanceRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMaintenanceRequestsQuery(baseOptions?: Apollo.QueryHookOptions<MaintenanceRequestsQuery, MaintenanceRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaintenanceRequestsQuery, MaintenanceRequestsQueryVariables>(MaintenanceRequestsDocument, options);
      }
export function useMaintenanceRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaintenanceRequestsQuery, MaintenanceRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaintenanceRequestsQuery, MaintenanceRequestsQueryVariables>(MaintenanceRequestsDocument, options);
        }
export function useMaintenanceRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MaintenanceRequestsQuery, MaintenanceRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MaintenanceRequestsQuery, MaintenanceRequestsQueryVariables>(MaintenanceRequestsDocument, options);
        }
export type MaintenanceRequestsQueryHookResult = ReturnType<typeof useMaintenanceRequestsQuery>;
export type MaintenanceRequestsLazyQueryHookResult = ReturnType<typeof useMaintenanceRequestsLazyQuery>;
export type MaintenanceRequestsSuspenseQueryHookResult = ReturnType<typeof useMaintenanceRequestsSuspenseQuery>;
export type MaintenanceRequestsQueryResult = Apollo.QueryResult<MaintenanceRequestsQuery, MaintenanceRequestsQueryVariables>;
export const SaveRequestDocument = gql`
    subscription saveRequest {
  saveRequest {
    maintenanceRequest {
      ...MaintenanceRequestFragment
    }
    metrics {
      averageResolutionTime
      openCount
      urgentCount
    }
  }
}
    ${MaintenanceRequestFragmentFragmentDoc}`;

/**
 * __useSaveRequestSubscription__
 *
 * To run a query within a React component, call `useSaveRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSaveRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaveRequestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSaveRequestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SaveRequestSubscription, SaveRequestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SaveRequestSubscription, SaveRequestSubscriptionVariables>(SaveRequestDocument, options);
      }
export type SaveRequestSubscriptionHookResult = ReturnType<typeof useSaveRequestSubscription>;
export type SaveRequestSubscriptionResult = Apollo.SubscriptionResult<SaveRequestSubscription>;