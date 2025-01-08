import { ApolloClient, InMemoryCache, split, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

export class ClientApollo {
  client: ApolloClient<NormalizedCacheObject> | null = null;

  constructor(isServer: boolean) {
    this.client = this.setUpClient(isServer);
  }

  setUpClient(isServer: boolean) {
    const httpLink = new HttpLink({
      uri: 'http://localhost:4000/graphql',
    });
    
    const wsLink = !isServer
      ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:4000/graphql',
        })
      )
      : null;

    const splitLink = !isServer && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;
      
    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache()
    });
  }

  getClient(isServer = false) {
    if (this.client) {
      return this.client
    }

    this.client = this.setUpClient(isServer);
    return this.client;
  }
}
