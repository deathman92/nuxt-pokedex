import { createYoga, useExecutionCancellation } from 'graphql-yoga'
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations'
import persistedOperations from '~/gql/persisted-documents.json'

export const server = createYoga<Context>({
  graphqlEndpoint: '/api/graphql',
  schema,
  plugins: [
    useExecutionCancellation(),
    usePersistedOperations({
      getPersistedOperation(key: string) {
        const store = persistedOperations as any
        return store[key]
      },
      allowArbitraryOperations: import.meta.dev,
    }),
    // useGraphQLSSE({ endpoint: "/api/graphql/stream" }),
  ],
  graphiql: import.meta.dev,
  fetchAPI: { Response: globalThis.Response },
})
