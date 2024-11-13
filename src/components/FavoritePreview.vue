<script setup lang="ts">
const FavoritePreview = graphql(`
  fragment FavoritePreview on Species {
    id
    name
    sprites {
      front
    }
  }
`)

const { species } = defineProps<{
  species: FragmentType<typeof FavoritePreview>
}>()

const preview = useFragment(FavoritePreview, species)
</script>

<template>
  <NuxtLink :to="{ params: { id: preview.id } }">
    <NuxtImg
      :src="preview.sprites.front"
      :alt="`${preview.name} sprite`"
      height="96"
      width="96"
    />
  </NuxtLink>
</template>

<style scoped>
a {
  display: flex;
  flex-direction: column;
}
</style>
