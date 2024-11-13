/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment FavoritePreview on Species {\n    id\n    name\n    sprites {\n      front\n    }\n  }\n": types.FavoritePreviewFragmentDoc,
    "\n  fragment MoveDisplay on SpeciesMove {\n    learnedAt\n    method\n    move {\n      name\n      accuracy\n      power\n      pp\n      type\n    }\n  }\n": types.MoveDisplayFragmentDoc,
    "\n  fragment SpeciesPreview on Species {\n    id\n    name\n    ...SpriteInfo\n  }\n": types.SpeciesPreviewFragmentDoc,
    "\n  fragment SpriteInfo on Species {\n    name\n    sprites {\n      front\n    }\n  }\n": types.SpriteInfoFragmentDoc,
    "\n  query Info(\n    $id: Int! = 1\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n  ) {\n    species(id: $id) {\n      id\n      name\n      flavorText\n      favorite\n      evolutionChain {\n        id\n        ...SpeciesPreview\n      }\n      ...SpriteInfo\n\n      moves(first: $first, last: $last, after: $after, before: $before) {\n        edges {\n          cursor\n          node {\n            move {\n              name\n            }\n            ...MoveDisplay\n          }\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n    favorites {\n      id\n      ...FavoritePreview\n    }\n  }\n": types.InfoDocument,
    "\n    mutation ToggleFavorite($id: Int!) {\n      toggleFavorite(id: $id) {\n        species {\n          id\n          favorite\n        }\n      }\n    }\n  ": types.ToggleFavoriteDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FavoritePreview on Species {\n    id\n    name\n    sprites {\n      front\n    }\n  }\n"): (typeof documents)["\n  fragment FavoritePreview on Species {\n    id\n    name\n    sprites {\n      front\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MoveDisplay on SpeciesMove {\n    learnedAt\n    method\n    move {\n      name\n      accuracy\n      power\n      pp\n      type\n    }\n  }\n"): (typeof documents)["\n  fragment MoveDisplay on SpeciesMove {\n    learnedAt\n    method\n    move {\n      name\n      accuracy\n      power\n      pp\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SpeciesPreview on Species {\n    id\n    name\n    ...SpriteInfo\n  }\n"): (typeof documents)["\n  fragment SpeciesPreview on Species {\n    id\n    name\n    ...SpriteInfo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SpriteInfo on Species {\n    name\n    sprites {\n      front\n    }\n  }\n"): (typeof documents)["\n  fragment SpriteInfo on Species {\n    name\n    sprites {\n      front\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Info(\n    $id: Int! = 1\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n  ) {\n    species(id: $id) {\n      id\n      name\n      flavorText\n      favorite\n      evolutionChain {\n        id\n        ...SpeciesPreview\n      }\n      ...SpriteInfo\n\n      moves(first: $first, last: $last, after: $after, before: $before) {\n        edges {\n          cursor\n          node {\n            move {\n              name\n            }\n            ...MoveDisplay\n          }\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n    favorites {\n      id\n      ...FavoritePreview\n    }\n  }\n"): (typeof documents)["\n  query Info(\n    $id: Int! = 1\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n  ) {\n    species(id: $id) {\n      id\n      name\n      flavorText\n      favorite\n      evolutionChain {\n        id\n        ...SpeciesPreview\n      }\n      ...SpriteInfo\n\n      moves(first: $first, last: $last, after: $after, before: $before) {\n        edges {\n          cursor\n          node {\n            move {\n              name\n            }\n            ...MoveDisplay\n          }\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n    favorites {\n      id\n      ...FavoritePreview\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ToggleFavorite($id: Int!) {\n      toggleFavorite(id: $id) {\n        species {\n          id\n          favorite\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation ToggleFavorite($id: Int!) {\n      toggleFavorite(id: $id) {\n        species {\n          id\n          favorite\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;