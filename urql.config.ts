import { defineUrqlClient } from '#urql/client'
import { fetchExchange } from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { persistedExchange } from '@urql/exchange-persisted'
import { type $Fetch } from 'ofetch'
import type { GraphCacheConfig } from '~/gql/graphql'
import schema from '~/gql/introspection'

// configure urql graphcache with codegen types
const cacheConfig: GraphCacheConfig = {
  schema,
  keys: {
    SpeciesSprites: () => null,
    SpeciesMove: () => null,
    Move: () => null,
  },
  resolvers: {},
  updates: {
    Mutation: {
      toggleFavorite: ({ toggleFavorite }, _, cache) => {
        const species = toggleFavorite?.species
        if (species) {
          const favorites = cache.resolve('Query', 'favorites')
          if (Array.isArray(favorites)) {
            const index = favorites.findIndex(
              (favotite) =>
                cache.keyOfEntity(favotite) === cache.keyOfEntity(species),
            )
            if (index >= 0) {
              favorites.splice(index, 1)
            } else {
              favorites.push(species)
            }
            cache.link('Query', 'favorites', favorites as any)
          }
        }
      },
    },
  },
}

export default defineUrqlClient((ssrExchange) => {
  const exchanges = [
    ssrExchange,
    persistedExchange({
      preferGetForPersistedQueries: true,
      enforcePersistedQueries: true,
      enableForMutation: true,
      generateHash: (_, document: any) =>
        Promise.resolve(document['__meta__']['hash']),
    }),
    fetchExchange,
  ]

  if (import.meta.client) {
    // insert cache exchange
    exchanges.unshift(cacheExchange(cacheConfig))
  }
  if (import.meta.dev) {
    exchanges.unshift(devtoolsExchange)
  }

  const headers = useRequestHeaders(['cookie', 'authorization'])

  return {
    exchanges,
    fetchOptions: () => ({ headers }),
    fetch: ($fetch as $Fetch).native,
  }
})
