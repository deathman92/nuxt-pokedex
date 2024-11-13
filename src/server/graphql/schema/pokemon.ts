import { resolveArrayConnection } from '@pothos/plugin-relay'

export default builderFn

const favorites: number[] = []

export const TypeEnum = builder.enumType('Type', {
  values: [
    'Grass',
    'Poison',
    'Fire',
    'Flying',
    'Water',
    'Bug',
    'Normal',
    'Electric',
    'Ground',
    'Fairy',
    'Fighting',
    'Psychic',
    'Rock',
    'Steel',
    'Ice',
    'Ghost',
    'Dragon',
    'Dark',
  ],
})

export const MoveType = builder.objectRef<Move>('Move')
MoveType.implement({
  fields: (t) => ({
    name: t.exposeString('name', { nullable: false }),
    power: t.exposeInt('power'),
    accuracy: t.exposeInt('accuracy'),
    pp: t.exposeInt('pp', { nullable: false }),
    type: t.field({
      type: TypeEnum,
      nullable: false,
      resolve: (move) => capitalize(move.type),
    }),
  }),
})

export const SpeciesMoveType = builder.objectRef<SpeciesMove>('SpeciesMove')
SpeciesMoveType.implement({
  fields: (t) => ({
    learnedAt: t.exposeInt('learned_at', { nullable: false }),
    method: t.exposeString('method', { nullable: false }),
    move: t.field({
      type: MoveType,
      nullable: false,
      resolve: ({ name }) => data.moves[name],
    }),
  }),
})

export const SpeciesSpritesType =
  builder.objectRef<SpeciesSprites>('SpeciesSprites')
SpeciesSpritesType.implement({
  fields: (t) => ({
    front: t.exposeString('front', { nullable: false }),
    back: t.exposeString('back', { nullable: false }),
  }),
})

export const SpeciesType = builder.objectRef<Species>('Species')
SpeciesType.implement({
  fields: (t) => ({
    id: t.exposeInt('id', { nullable: false }),
    name: t.string({
      nullable: false,
      resolve: ({ name }) => capitalize(name),
    }),
    flavorText: t.exposeString('flavor_text', { nullable: false }),
    favorite: t.boolean({
      nullable: false,
      resolve: ({ id }) => favorites.includes(id),
    }),
    evolutionChain: t.field({
      type: [SpeciesType],
      nullable: false,
      resolve: ({ evo_chain }) => evo_chain.map((id) => data.species[id - 1]),
    }),
    moves: t.connection(
      {
        type: SpeciesMoveType,
        nullable: false,
        edgesNullable: false,
        nodeNullable: false,
        resolve: ({ moves }, args) => {
          return resolveArrayConnection({ args }, moves)
        },
      },
      {
        name: 'SpeciesMoveConnection',
        fields: (tc) => ({
          totalCount: tc.exposeInt('totalCount', { nullable: false }),
        }),
      },
      { name: 'SpeciesMoveEdge' },
    ),
    types: t.field({
      type: [TypeEnum],
      nullable: false,
      resolve: ({ types }) => types.map(capitalize),
    }),
    sprites: t.field({
      type: SpeciesSpritesType,
      nullable: false,
      resolve: ({ sprites }) => sprites,
    }),
  }),
})

export const ToggleFavoriteOutputType = builder.simpleObject(
  'ToggleFavoriteOutput',
  {
    fields: (t) => ({
      species: t.field({
        type: SpeciesType,
      }),
    }),
  },
)

builder.queryFields((t) => ({
  pokemon: t.connection(
    {
      type: SpeciesType,
      nullable: false,
      edgesNullable: false,
      nodeNullable: false,
      resolve: (_, args) => {
        return resolveArrayConnection({ args }, data.species)
      },
    },
    {
      name: 'SpeciesConnection',
      fields: (tc) => ({
        totalCount: tc.exposeInt('totalCount', { nullable: false }),
      }),
    },
    { name: 'SpeciesEdge' },
  ),
  species: t.field({
    type: SpeciesType,
    args: {
      id: t.arg.int({
        required: true,
      }),
    },
    resolve: (_, { id }) => {
      return data.species[id - 1]
    },
  }),
  favorites: t.field({
    type: [SpeciesType],
    nullable: false,
    resolve: () => {
      return favorites.map((id) => data.species[id - 1])
    },
  }),
}))

builder.mutationFields((t) => ({
  toggleFavorite: t.field({
    type: ToggleFavoriteOutputType,
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (_, { id }) => {
      if (favorites.includes(id)) {
        favorites.splice(favorites.indexOf(id), 1)
      } else {
        favorites.push(id)
      }

      const species = data.species[id - 1]

      return { species }
    },
  }),
}))
