<script setup lang="ts">
import { useSigCodeGuesserStore } from '@/stores/sigCodeGuesser'
import { watch } from 'vue'

const sigCodeGuesserStore = useSigCodeGuesserStore()
watch(
  () => sigCodeGuesserStore.currentPrompt,
  (state) => {
    console.log(state, 'STATE')
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div id="sig-coder-explanation">Explanation:</div>
    {{ sigCodeGuesserStore.currentPrompt.sigCode.explanation }}
  </div>
</template>

<style scoped>
#sig-coder-explanation {
  font-weight: bold;
  margin-right: 4px;
}
</style>
