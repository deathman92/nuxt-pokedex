/* eslint-disable */
import { cacheExchange } from '@urql/exchange-graphcache';
import type { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `File` scalar type represents a file upload. */
  File: { input: any; output: any; }
  Map: { input: any; output: any; }
};

export type Move = {
  __typename: 'Move';
  accuracy?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  power?: Maybe<Scalars['Int']['output']>;
  pp: Scalars['Int']['output'];
  type: Type;
};

export type Mutation = {
  __typename: 'Mutation';
  toggleFavorite?: Maybe<ToggleFavoriteOutput>;
};


export type MutationToggleFavoriteArgs = {
  id: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename: 'Query';
  favorites: Array<Species>;
  pokemon: SpeciesConnection;
  species?: Maybe<Species>;
};


export type QueryPokemonArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySpeciesArgs = {
  id: Scalars['Int']['input'];
};

export type Species = {
  __typename: 'Species';
  evolutionChain: Array<Species>;
  favorite: Scalars['Boolean']['output'];
  flavorText: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  moves: SpeciesMoveConnection;
  name: Scalars['String']['output'];
  sprites: SpeciesSprites;
  types: Array<Type>;
};


export type SpeciesMovesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type SpeciesConnection = {
  __typename: 'SpeciesConnection';
  edges: Array<SpeciesEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SpeciesEdge = {
  __typename: 'SpeciesEdge';
  cursor: Scalars['String']['output'];
  node: Species;
};

export type SpeciesMove = {
  __typename: 'SpeciesMove';
  learnedAt: Scalars['Int']['output'];
  method: Scalars['String']['output'];
  move: Move;
};

export type SpeciesMoveConnection = {
  __typename: 'SpeciesMoveConnection';
  edges: Array<SpeciesMoveEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SpeciesMoveEdge = {
  __typename: 'SpeciesMoveEdge';
  cursor: Scalars['String']['output'];
  node: SpeciesMove;
};

export type SpeciesSprites = {
  __typename: 'SpeciesSprites';
  back: Scalars['String']['output'];
  front: Scalars['String']['output'];
};

export type ToggleFavoriteOutput = {
  __typename: 'ToggleFavoriteOutput';
  species?: Maybe<Species>;
};

export enum Type {
  Bug = 'Bug',
  Dark = 'Dark',
  Dragon = 'Dragon',
  Electric = 'Electric',
  Fairy = 'Fairy',
  Fighting = 'Fighting',
  Fire = 'Fire',
  Flying = 'Flying',
  Ghost = 'Ghost',
  Grass = 'Grass',
  Ground = 'Ground',
  Ice = 'Ice',
  Normal = 'Normal',
  Poison = 'Poison',
  Psychic = 'Psychic',
  Rock = 'Rock',
  Steel = 'Steel',
  Water = 'Water'
}

export type FavoritePreviewFragment = { __typename: 'Species', id: number, name: string, sprites: { __typename: 'SpeciesSprites', front: string } } & { ' $fragmentName'?: 'FavoritePreviewFragment' };

export type MoveDisplayFragment = { __typename: 'SpeciesMove', learnedAt: number, method: string, move: { __typename: 'Move', name: string, accuracy?: number | null, power?: number | null, pp: number, type: Type } } & { ' $fragmentName'?: 'MoveDisplayFragment' };

export type SpeciesPreviewFragment = (
  { __typename: 'Species', id: number, name: string }
  & { ' $fragmentRefs'?: { 'SpriteInfoFragment': SpriteInfoFragment } }
) & { ' $fragmentName'?: 'SpeciesPreviewFragment' };

export type SpriteInfoFragment = { __typename: 'Species', name: string, sprites: { __typename: 'SpeciesSprites', front: string } } & { ' $fragmentName'?: 'SpriteInfoFragment' };

export type InfoQueryVariables = Exact<{
  id?: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type InfoQuery = { __typename: 'Query', species?: (
    { __typename: 'Species', id: number, name: string, flavorText: string, favorite: boolean, evolutionChain: Array<(
      { __typename: 'Species', id: number }
      & { ' $fragmentRefs'?: { 'SpeciesPreviewFragment': SpeciesPreviewFragment } }
    )>, moves: { __typename: 'SpeciesMoveConnection', edges: Array<{ __typename: 'SpeciesMoveEdge', cursor: string, node: (
          { __typename: 'SpeciesMove', move: { __typename: 'Move', name: string } }
          & { ' $fragmentRefs'?: { 'MoveDisplayFragment': MoveDisplayFragment } }
        ) }>, pageInfo: { __typename: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } } }
    & { ' $fragmentRefs'?: { 'SpriteInfoFragment': SpriteInfoFragment } }
  ) | null, favorites: Array<(
    { __typename: 'Species', id: number }
    & { ' $fragmentRefs'?: { 'FavoritePreviewFragment': FavoritePreviewFragment } }
  )> };

export type ToggleFavoriteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ToggleFavoriteMutation = { __typename: 'Mutation', toggleFavorite?: { __typename: 'ToggleFavoriteOutput', species?: { __typename: 'Species', id: number, favorite: boolean } | null } | null };

export const FavoritePreviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoritePreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Species"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"front"}}]}}]}}]} as unknown as DocumentNode<FavoritePreviewFragment, unknown>;
export const MoveDisplayFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoveDisplay"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpeciesMove"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"learnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"move"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"power"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<MoveDisplayFragment, unknown>;
export const SpriteInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SpriteInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Species"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"front"}}]}}]}}]} as unknown as DocumentNode<SpriteInfoFragment, unknown>;
export const SpeciesPreviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SpeciesPreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Species"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SpriteInfo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SpriteInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Species"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"front"}}]}}]}}]} as unknown as DocumentNode<SpeciesPreviewFragment, unknown>;
export const InfoDocument = {"__meta__":{"hash":"79d99746fe47000760200608dc42a46f422b5752"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Info"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"species"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"flavorText"}},{"kind":"Field","name":{"kind":"Name","value":"favorite"}},{"kind":"Field","name":{"kind":"Name","value":"evolutionChain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SpeciesPreview"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SpriteInfo"}},{"kind":"Field","name":{"kind":"Name","value":"moves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"move"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MoveDisplay"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"favorites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FavoritePreview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SpriteInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Species"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"front"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SpeciesPreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Species"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SpriteInfo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MoveDisplay"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpeciesMove"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"learnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"move"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"power"}},{"kind":"Field","name":{"kind":"Name","value":"pp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoritePreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Species"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"front"}}]}}]}}]} as unknown as DocumentNode<InfoQuery, InfoQueryVariables>;
export const ToggleFavoriteDocument = {"__meta__":{"hash":"126ff2b946722f10db4c7f5184c5e0c29a82bb81"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"toggleFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"species"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"favorite"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;
export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  Move?: (data: WithTypename<Move>) => null | string,
  PageInfo?: (data: WithTypename<PageInfo>) => null | string,
  Species?: (data: WithTypename<Species>) => null | string,
  SpeciesConnection?: (data: WithTypename<SpeciesConnection>) => null | string,
  SpeciesEdge?: (data: WithTypename<SpeciesEdge>) => null | string,
  SpeciesMove?: (data: WithTypename<SpeciesMove>) => null | string,
  SpeciesMoveConnection?: (data: WithTypename<SpeciesMoveConnection>) => null | string,
  SpeciesMoveEdge?: (data: WithTypename<SpeciesMoveEdge>) => null | string,
  SpeciesSprites?: (data: WithTypename<SpeciesSprites>) => null | string,
  ToggleFavoriteOutput?: (data: WithTypename<ToggleFavoriteOutput>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    favorites?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Species> | string>>,
    pokemon?: GraphCacheResolver<WithTypename<Query>, QueryPokemonArgs, WithTypename<SpeciesConnection> | string>,
    species?: GraphCacheResolver<WithTypename<Query>, QuerySpeciesArgs, WithTypename<Species> | string>
  },
  Move?: {
    accuracy?: GraphCacheResolver<WithTypename<Move>, Record<string, never>, Scalars['Int'] | string>,
    name?: GraphCacheResolver<WithTypename<Move>, Record<string, never>, Scalars['String'] | string>,
    power?: GraphCacheResolver<WithTypename<Move>, Record<string, never>, Scalars['Int'] | string>,
    pp?: GraphCacheResolver<WithTypename<Move>, Record<string, never>, Scalars['Int'] | string>,
    type?: GraphCacheResolver<WithTypename<Move>, Record<string, never>, Type | string>
  },
  PageInfo?: {
    endCursor?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['String'] | string>,
    hasNextPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>,
    hasPreviousPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>,
    startCursor?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['String'] | string>
  },
  Species?: {
    evolutionChain?: GraphCacheResolver<WithTypename<Species>, Record<string, never>, Array<WithTypename<Species> | string>>,
    favorite?: GraphCacheResolver<WithTypename<Species>, Record<string, never>, Scalars['Boolean'] | string>,
    flavorText?: GraphCacheResolver<WithTypename<Species>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Species>, Record<string, never>, Scalars['Int'] | string>,
    moves?: GraphCacheResolver<WithTypename<Species>, SpeciesMovesArgs, WithTypename<SpeciesMoveConnection> | string>,
    name?: GraphCacheResolver<WithTypename<Species>, Record<string, never>, Scalars['String'] | string>,
    sprites?: GraphCacheResolver<WithTypename<Species>, Record<string, never>, WithTypename<SpeciesSprites> | string>,
    types?: GraphCacheResolver<WithTypename<Species>, Record<string, never>, Array<Type | string>>
  },
  SpeciesConnection?: {
    edges?: GraphCacheResolver<WithTypename<SpeciesConnection>, Record<string, never>, Array<WithTypename<SpeciesEdge> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<SpeciesConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<SpeciesConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  SpeciesEdge?: {
    cursor?: GraphCacheResolver<WithTypename<SpeciesEdge>, Record<string, never>, Scalars['String'] | string>,
    node?: GraphCacheResolver<WithTypename<SpeciesEdge>, Record<string, never>, WithTypename<Species> | string>
  },
  SpeciesMove?: {
    learnedAt?: GraphCacheResolver<WithTypename<SpeciesMove>, Record<string, never>, Scalars['Int'] | string>,
    method?: GraphCacheResolver<WithTypename<SpeciesMove>, Record<string, never>, Scalars['String'] | string>,
    move?: GraphCacheResolver<WithTypename<SpeciesMove>, Record<string, never>, WithTypename<Move> | string>
  },
  SpeciesMoveConnection?: {
    edges?: GraphCacheResolver<WithTypename<SpeciesMoveConnection>, Record<string, never>, Array<WithTypename<SpeciesMoveEdge> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<SpeciesMoveConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<SpeciesMoveConnection>, Record<string, never>, Scalars['Int'] | string>
  },
  SpeciesMoveEdge?: {
    cursor?: GraphCacheResolver<WithTypename<SpeciesMoveEdge>, Record<string, never>, Scalars['String'] | string>,
    node?: GraphCacheResolver<WithTypename<SpeciesMoveEdge>, Record<string, never>, WithTypename<SpeciesMove> | string>
  },
  SpeciesSprites?: {
    back?: GraphCacheResolver<WithTypename<SpeciesSprites>, Record<string, never>, Scalars['String'] | string>,
    front?: GraphCacheResolver<WithTypename<SpeciesSprites>, Record<string, never>, Scalars['String'] | string>
  },
  ToggleFavoriteOutput?: {
    species?: GraphCacheResolver<WithTypename<ToggleFavoriteOutput>, Record<string, never>, WithTypename<Species> | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  toggleFavorite?: GraphCacheOptimisticMutationResolver<MutationToggleFavoriteArgs, Maybe<WithTypename<ToggleFavoriteOutput>>>
};

export type GraphCacheUpdaters = {
  Query?: {
    favorites?: GraphCacheUpdateResolver<{ favorites: Array<WithTypename<Species>> }, Record<string, never>>,
    pokemon?: GraphCacheUpdateResolver<{ pokemon: WithTypename<SpeciesConnection> }, QueryPokemonArgs>,
    species?: GraphCacheUpdateResolver<{ species: Maybe<WithTypename<Species>> }, QuerySpeciesArgs>
  },
  Mutation?: {
    toggleFavorite?: GraphCacheUpdateResolver<{ toggleFavorite: Maybe<WithTypename<ToggleFavoriteOutput>> }, MutationToggleFavoriteArgs>
  },
  Subscription?: {},
  Move?: {
    accuracy?: GraphCacheUpdateResolver<Maybe<WithTypename<Move>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Move>>, Record<string, never>>,
    power?: GraphCacheUpdateResolver<Maybe<WithTypename<Move>>, Record<string, never>>,
    pp?: GraphCacheUpdateResolver<Maybe<WithTypename<Move>>, Record<string, never>>,
    type?: GraphCacheUpdateResolver<Maybe<WithTypename<Move>>, Record<string, never>>
  },
  PageInfo?: {
    endCursor?: GraphCacheUpdateResolver<Maybe<WithTypename<PageInfo>>, Record<string, never>>,
    hasNextPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PageInfo>>, Record<string, never>>,
    hasPreviousPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PageInfo>>, Record<string, never>>,
    startCursor?: GraphCacheUpdateResolver<Maybe<WithTypename<PageInfo>>, Record<string, never>>
  },
  Species?: {
    evolutionChain?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, Record<string, never>>,
    favorite?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, Record<string, never>>,
    flavorText?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, Record<string, never>>,
    moves?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, SpeciesMovesArgs>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, Record<string, never>>,
    sprites?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, Record<string, never>>,
    types?: GraphCacheUpdateResolver<Maybe<WithTypename<Species>>, Record<string, never>>
  },
  SpeciesConnection?: {
    edges?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesConnection>>, Record<string, never>>,
    pageInfo?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesConnection>>, Record<string, never>>,
    totalCount?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesConnection>>, Record<string, never>>
  },
  SpeciesEdge?: {
    cursor?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesEdge>>, Record<string, never>>,
    node?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesEdge>>, Record<string, never>>
  },
  SpeciesMove?: {
    learnedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMove>>, Record<string, never>>,
    method?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMove>>, Record<string, never>>,
    move?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMove>>, Record<string, never>>
  },
  SpeciesMoveConnection?: {
    edges?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMoveConnection>>, Record<string, never>>,
    pageInfo?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMoveConnection>>, Record<string, never>>,
    totalCount?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMoveConnection>>, Record<string, never>>
  },
  SpeciesMoveEdge?: {
    cursor?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMoveEdge>>, Record<string, never>>,
    node?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesMoveEdge>>, Record<string, never>>
  },
  SpeciesSprites?: {
    back?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesSprites>>, Record<string, never>>,
    front?: GraphCacheUpdateResolver<Maybe<WithTypename<SpeciesSprites>>, Record<string, never>>
  },
  ToggleFavoriteOutput?: {
    species?: GraphCacheUpdateResolver<Maybe<WithTypename<ToggleFavoriteOutput>>, Record<string, never>>
  },
};

export type GraphCacheConfig = Parameters<typeof cacheExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};