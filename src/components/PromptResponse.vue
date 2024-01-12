<script setup lang="ts">
import { useSigCodeGuesserStore } from '@/stores/sigCodeGuesser'
import { ref, computed } from 'vue'

const sigCodeGuesserStore = useSigCodeGuesserStore()
const text = ref('')

const submitAnswer = () => {
  sigCodeGuesserStore.checkAnswer(text.value)
  text.value = ''
}

const resultMessage = computed(() => {
  const currentPrompt = sigCodeGuesserStore.currentPrompt
  return currentPrompt.correct === false ? 'Incorrect, try again!' : null
})
</script>

<template>
  <div>
    <hr />
    <form @submit.prevent="submitAnswer">
      <div>
        <label for="sigCodeInput">Enter Sig Code:</label>
      </div>
      <input id="sigCodeInput" v-model="text" placeholder="Enter Sig Code" required />
      <div>
        <button type="submit" :disabled="text.length === 0">Submit!</button>
      </div>
      <div id="result">
        {{ resultMessage }}
      </div>
    </form>
  </div>
</template>

<style scoped></style>
