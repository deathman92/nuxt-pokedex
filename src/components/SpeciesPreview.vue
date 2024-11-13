<script setup lang="ts">
const SpeciesPreview = graphql(`
  fragment SpeciesPreview on Species {
    id
    name
    ...SpriteInfo
  }
`)
const { species, number } = defineProps<{
  species: FragmentType<typeof SpeciesPreview>
  number: number
}>()

const preview = useFragment(SpeciesPreview, species)
</script>

<template>
  <NuxtLink :to="{ params: { id: preview.id } }">
    <SpeciesPreviewNumber :value="number" />
    <Sprite :species="preview" height="96" width="96" />
    <Display>
      {{ preview.name }}
    </Display>
  </NuxtLink>
</template>

<style scoped>
:global(.preview-sprite) {
  height: 102px;
  width: 102px;
}
</style>
