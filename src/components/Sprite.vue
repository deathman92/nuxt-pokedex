<script setup lang="ts">
const SpriteInfo = graphql(`
  fragment SpriteInfo on Species {
    name
    sprites {
      front
    }
  }
`);

const { species } = defineProps<{
  species: FragmentType<typeof SpriteInfo>;
  width?: string | number;
  height?: string | number;
}>();

const info = useFragment(SpriteInfo, species);
</script>

<template>
  <div class="sprite">
    <NuxtImg
      :src="info.sprites.front"
      :alt="`${info.name} sprite`"
      :height="height"
      :width="width"
      placeholder
      preload
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
  image-rendering: pixelated;
  border: inset #9aa28b 3px;
  border-radius: 5px;
  margin: 10px 0;
  box-sizing: border-box;
  background: linear-gradient(
    15deg,
    #cad5b5 64%,
    #dde2d4 70%,
    #dde2d4 81%,
    #fff 86%,
    #dde2d4 89%,
    #dde2d4 100%
  );
  align-items: center;
  justify-content: center;
}
</style>
