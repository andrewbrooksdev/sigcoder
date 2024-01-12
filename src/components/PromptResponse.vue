<script setup lang="ts">
import { useSigCodeGuesserStore } from '@/stores/sigCodeGuesser'
import { ref } from 'vue'

const text = ref('')
const sigCodeGuesserStore = useSigCodeGuesserStore()

const submitAnswer = () => {
  sigCodeGuesserStore.checkAnswer(text.value)
  text.value = ''
}
</script>

<template>
  <div>
    <input v-model="text" placeholder="Enter Sig Code" />
    <button @click="submitAnswer()">Submit!</button>
    <div id="result">
      {{ sigCodeGuesserStore.currentPrompt.correct === false ? 'Incorrect, try again!' : null }}
    </div>
  </div>
</template>

<style scoped></style>
