import { defineUrqlClient } from "#urql/client";
import { fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import { persistedExchange } from "@urql/exchange-persisted";
import { type $Fetch } from "ofetch";
import type { GraphCacheConfig } from "~/gql/graphql";
import schema from "~/gql/introspection";

// configure urql graphcache with codegen types
const cacheConfig: GraphCacheConfig = {
  schema,
  keys: {
    SpeciesSprites: () => null,
    SpeciesMove: () => null,
    Move: () => null,
  },
  resolvers: {
    Species: {
      moves: (parent, args, cache, info) => {
        const moves = cache.resolve(parent, info.fieldName, args);
        if (!moves) {
          info.partial = true;
          return [];
        }
        return moves as any;
      },
    },
  },
  updates: {
    Mutation: {
      toggleFavorite: ({ toggleFavorite }, _, cache) => {
        const species = toggleFavorite?.species;
        if (species) {
          const favorites = cache.resolve("Query", "favorites");
          if (Array.isArray(favorites)) {
            const index = favorites.findIndex(
              (favotite) =>
                cache.keyOfEntity(favotite) === cache.keyOfEntity(species)
            );
            if (index >= 0) {
              favorites.splice(index, 1);
            } else {
              favorites.push(species);
            }
            cache.link("Query", "favorites", favorites as any);
          }
        }
      },
    },
  },
};

export default defineUrqlClient((ssrExchange) => {
  const exchanges = [
    cacheExchange(cacheConfig),
    ssrExchange,
    persistedExchange({
      preferGetForPersistedQueries: true,
      enforcePersistedQueries: true,
      enableForMutation: true,
      generateHash: (_, document: any) =>
        Promise.resolve(document["__meta__"]["hash"]),
    }),
    fetchExchange,
  ];

  const headers = useRequestHeaders(["cookie", "authorization"]);

  return {
    exchanges,
    fetchOptions: () => ({ headers, credentials: "include" }),
    fetch: ($fetch as $Fetch).native,
  };
});
