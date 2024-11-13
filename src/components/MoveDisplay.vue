<script setup lang="ts">
const MoveDisplay = graphql(`
  fragment MoveDisplay on SpeciesMove {
    learnedAt
    method
    move {
      name
      accuracy
      power
      pp
      type
    }
  }
`)

const { move } = defineProps<{ move: FragmentType<typeof MoveDisplay> }>()

const data = useFragment(MoveDisplay, move)

const padValue = (val: string | number | null | undefined) => {
  if (val === null || val === undefined) {
    return '..0'
  }

  return (
    Array.from({ length: 3 - val.toString().length })
      .map(() => '.')
      .join('') + val
  )
}

const padKey = (val: string) => {
  return (
    val +
    Array.from({ length: 8 - val.toString().length })
      .map(() => '.')
      .join('')
  )
}
</script>

<template>
  <Display id="move-display">
    <div>
      <h3>
        {{ data.move.name }}
      </h3>
      <div class="stat">
        {{ padKey('Accuracy') }}.....{{ padValue(data.move.accuracy) }}
      </div>
      <div class="stat">
        {{ padKey('Power') }}.....{{ padValue(data.move.power) }}
      </div>
      <div class="stat">
        {{ padKey('PP') }}.....{{ padValue(data.move.pp) }}
      </div>
    </div>
    <div class="right-column">
      <div class="type-pill">Type: {{ data.move.type }}</div>
      <div class="learn-data">
        Learn:
        <template v-if="data.method === 'level-up'">
          Lvl {{ data.learnedAt }}
        </template>
        <template v-else> TM </template>
      </div>
    </div>
  </Display>
</template>

<style scoped>
:global(#move-display) {
  position: relative;
  padding: 10px 20px;
  height: 80px;
  flex-direction: row;
  display: flex;
}

h3 {
  margin: 0;
  font-weight: normal;
  font-size: 24px;
  border-bottom: 2px solid black;
  padding: 0 4px;
  width: 103px;
  text-align: center;
  white-space: nowrap;
}

.type-pill {
  font-size: 18px;
  text-transform: uppercase;
  border: solid black 2px;
  border-radius: 7px;
  padding: 2px 10px;
  text-align: center;
}

.right-column {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-grow: 1;
}

.learn-data {
  margin-right: 10px;
}

.stat {
  margin-top: 3px;
}
</style>
