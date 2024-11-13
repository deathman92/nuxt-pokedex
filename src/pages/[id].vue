<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    const params = route.params as { id: string }
    // Check if the id is made up of digits
    return typeof params.id === 'string' && /^\d+$/.test(params.id)
  },
  middleware: (to) => {
    const params = to.params as { id: string }

    if (params.id === null || params.id === undefined) {
      return
    }

    const id = parseInt(params.id, 10)
    if (id <= 0 || id >= 152) {
      abortNavigation({
        statusCode: 400,
        statusMessage: 'id must be between 1 and 151',
      })
    }
  },
})

const id = useRouteParams('id', undefined, {
  transform(val) {
    if (val) return Number(val)
  },
})

const first = ref<number | undefined>(1)
const last = ref<number | undefined>()
const after = ref<string | null>()
const before = ref<string | null>()

const query = graphql(`
  query Info(
    $id: Int! = 1
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    species(id: $id) {
      id
      name
      flavorText
      favorite
      evolutionChain {
        id
        ...SpeciesPreview
      }
      ...SpriteInfo

      moves(first: $first, last: $last, after: $after, before: $before) {
        edges {
          cursor
          node {
            move {
              name
            }
            ...MoveDisplay
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
    favorites {
      id
      ...FavoritePreview
    }
  }
`)
const { data } = await useQuery({
  query,
  variables: { id, first, last, after, before },
})

const loadPreviousPage = () => {
  last.value = 1
  before.value = data.value?.species?.moves.pageInfo.startCursor

  first.value = undefined
  after.value = undefined
}

const loadNextPage = () => {
  first.value = 1
  after.value = data.value?.species?.moves.pageInfo.endCursor

  last.value = undefined
  before.value = undefined
}

const { executeMutation: toggleFavorite } = useMutation(
  graphql(`
    mutation ToggleFavorite($id: Int!) {
      toggleFavorite(id: $id) {
        species {
          id
          favorite
        }
      }
    }
  `),
)
</script>

<template>
  <FavoritesContainer>
    <template v-if="data?.favorites.length">
      <FavoritePreview
        v-for="favorite of data.favorites"
        :key="favorite.id"
        :species="favorite"
      />
    </template>
    <p v-else>No Favorites Selected</p>
  </FavoritesContainer>

  <Container v-if="!data?.species" />
  <Container v-else>
    <template #left>
      <Panel>
        <button id="favorite" @click="toggleFavorite({ id: data.species.id })">
          <IconStar
            id="favorite-star"
            :fill="data.species.favorite ? 'gold' : 'lightgrey'"
          />
        </button>
        <Display id="species-name">
          {{ data.species.name }}
          <span>no.{{ data.species.id }}</span>
        </Display>
        <Sprite
          id="species-sprite"
          :species="data.species"
          height="350"
          width="350"
        />
        <Display id="species-flavor_text">
          {{ data.species.flavorText }}
        </Display>
      </Panel>
    </template>

    <template #right>
      <Panel>
        <div id="species-evolution-chain">
          <SpeciesPreview
            v-for="(form, i) of data.species.evolutionChain"
            :key="form.id"
            :species="form"
            :number="i + 1"
          />

          <SpeciesPreviewPlaceholder
            v-for="(_, i) of Array.from({
              length: 3 - data.species.evolutionChain.length,
            })"
            :key="i"
            :number="data.species.evolutionChain.length + i + 1"
          />
        </div>

        <div id="move-summary">
          <MoveDisplay
            :move="data.species.moves.edges[0].node"
            :key="data.species.moves.edges[0].node.move.name"
          />
          <div id="move-controls">
            <UpButton
              :disabled="!data.species.moves.pageInfo.hasPreviousPage"
              @click="loadPreviousPage"
            />
            <DownButton
              :disabled="!data.species.moves.pageInfo.hasNextPage"
              @click="loadNextPage"
            />
          </div>
        </div>

        <nav>
          <NuxtLink
            :to="{ params: { id: data.species.id - 1 } }"
            :data-disabled="data.species.id <= 1"
            prefetch
            prefetch-on="interaction"
          >
            previous
          </NuxtLink>
          <NuxtLink
            :to="{ params: { id: data.species.id + 1 } }"
            :data-disabled="data.species.id >= 151"
            prefetch
            prefetch-on="interaction"
          >
            next
          </NuxtLink>
        </nav>
      </Panel>
    </template>
  </Container>
</template>
