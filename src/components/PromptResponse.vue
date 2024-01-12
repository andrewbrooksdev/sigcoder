<script setup lang="ts">
import { useSigCodeGuesserStore } from '@/stores/sigCodeGuesser'
import { ref, computed } from 'vue'

const sigCodeGuesserStore = useSigCodeGuesserStore()
const text = ref('')

const submitAnswer = () => {
  sigCodeGuesserStore.checkAnswer(text.value)
  text.value = ''
}

// Computed property for conditional rendering
const resultMessage = computed(() => {
  const currentPrompt = sigCodeGuesserStore.currentPrompt
  return currentPrompt.correct === false ? 'Incorrect, try again!' : null
})
</script>

<template>
  <div>
    <input v-model="text" placeholder="Enter Sig Code" />
    <button @click="submitAnswer()">Submit!</button>
    <div id="result">
      {{ resultMessage }}
    </div>
  </div>
</template>

<style scoped></style>
