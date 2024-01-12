<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSigCodeGuesserStore } from '@/stores/sigCodeGuesser'

const sigCodeGuesserStore = useSigCodeGuesserStore()
const currentPrompt = ref(sigCodeGuesserStore.currentPrompt)

watch(
  () => sigCodeGuesserStore.currentPrompt,
  () => {
    currentPrompt.value = sigCodeGuesserStore.currentPrompt
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div id="sig-coder-explanation" ref="explanationRef">Explanation:</div>
    {{ currentPrompt.sigCode.explanation }}
  </div>
</template>

<style scoped>
#sig-coder-explanation {
  font-weight: bold;
  margin-right: 4px;
}
</style>
