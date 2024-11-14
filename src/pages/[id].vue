<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    if (route.name !== "id") return false;
    // Check if the id is made up of digits
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
  middleware: (to) => {
    if (to.name !== "id") return;

    const id = parseInt(to.params.id, 10);
    if (id <= 0 || id >= 152) {
      abortNavigation({
        statusCode: 400,
        statusMessage: "id must be between 1 and 151",
      });
    }
  },
});

const route = useRoute("id");

const id = computed(() => Number(route.params.id));

const first = ref<number | undefined>(1);
const last = ref<number | undefined>();
const after = ref<string | null>();
const before = ref<string | null>();

const { data, stale, error } = await useQuery({
  query: graphql(`
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
  `),
  variables: { id, first, last, after, before },
});

const loader = useLoadingIndicator();

watch(stale, (value) => {
  if (value) {
    loader.start();
  } else {
    loader.finish({ error: !!error.value });
  }
});

const loadPreviousPage = () => {
  last.value = 1;
  before.value = data.value?.species?.moves.pageInfo.startCursor;

  first.value = undefined;
  after.value = undefined;
};

const loadNextPage = () => {
  first.value = 1;
  after.value = data.value?.species?.moves.pageInfo.endCursor;

  last.value = undefined;
  before.value = undefined;
};

const {
  executeMutation: toggleFavorite,
  fetching,
  error: toggleFavoriteError,
} = useMutation(
  graphql(`
    mutation ToggleFavorite($id: Int!) {
      toggleFavorite(id: $id) {
        species {
          id
          favorite
        }
      }
    }
  `)
);

watch(fetching, (value) => {
  if (value) {
    loader.start();
  } else {
    loader.finish({ error: !!toggleFavoriteError.value });
  }
});
</script>

<template>
  <FavoritesContainer>
    <ClientOnly>
      <template v-if="data?.favorites.length">
        <FavoritePreview
          v-for="favorite of data.favorites"
          :key="favorite.id"
          :species="favorite"
        />
      </template>
      <p v-else>No Favorites Selected</p>
    </ClientOnly>
  </FavoritesContainer>

  <Container v-if="!data?.species" />
  <Container v-else>
    <template #left>
      <Panel>
        <button
          id="favorite"
          @click="toggleFavorite({ id: data.species.id })"
          aria-label="Toggle Favorite"
        >
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
          <template v-if="data.species.moves.edges">
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
          </template>
        </div>

        <nav>
          <NuxtLink
            :to="{ params: { id: data.species.id - 1 } }"
            :data-disabled="data.species.id <= 1"
          >
            previous
          </NuxtLink>
          <NuxtLink
            :to="{ params: { id: data.species.id + 1 } }"
            :data-disabled="data.species.id >= 151"
          >
            next
          </NuxtLink>
        </nav>
      </Panel>
    </template>
  </Container>
</template>
