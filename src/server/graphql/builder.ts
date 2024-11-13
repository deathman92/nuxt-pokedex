import SchemaBuilder from '@pothos/core'
import RelayPlugin from '@pothos/plugin-relay'
import SimpleObjectPlugin from '@pothos/plugin-simple-objects'
import type { YogaInitialContext } from 'graphql-yoga'

export type Builder = typeof builder

export const builderFn = (builder: Builder) => builder

export const builder = new SchemaBuilder<{
  Scalars: {
    File: { Input: File; Output: never }
    Map: { Input: never; Output: unknown }
  }
  Context: YogaInitialContext & Context
}>({
  plugins: [RelayPlugin, SimpleObjectPlugin],
})

builder.scalarType('File', {
  description: 'The `File` scalar type represents a file upload.',
  serialize: () => {
    throw new Error('Uploads can only be used as input types')
  },
})

builder.scalarType('Map', {
  serialize: (output) => output,
})

builder.queryType({})

builder.mutationType({})

// builder.subscriptionType({})
