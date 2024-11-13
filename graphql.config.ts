import type { IGraphQLConfig } from 'graphql-config'
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset'

const config: IGraphQLConfig = {
  projects: {
    vscode: {
      schema: './src/gql/schema.graphql',
      documents: ['src/**/*.vue', 'urql.config.ts'],
      extensions: {
        endpoints: {
          dev: 'http://localhost:3000/api/graphql',
        },
      },
    },
    default: {
      schema: ['http://localhost:3000/api/graphql', './src/gql/schema.graphql'],
      documents: ['src/**/*.vue', 'urql.config.ts'],
      extensions: {
        codegen: {
          config: {
            useTypeImports: true,
            nonOptionalTypename: true,
          },
          ignoreNoDocuments: true, // for better experience with the watcher
          generates: {
            './src/gql/': {
              preset: 'client',
              presetConfig: {
                persistedDocuments: true,
              },
              documentTransforms: [addTypenameSelectionDocumentTransform],
              plugins: ['typescript-urql-graphcache'],
            },
            './src/gql/schema.graphql': {
              plugins: ['schema-ast'],
            },
            './src/gql/introspection.ts': {
              plugins: ['urql-introspection'],
              config: {
                includeScalars: true,
              },
            },
          },
        },
      },
    },
  },
}

export default config
