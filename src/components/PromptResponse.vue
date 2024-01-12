<script setup lang="ts">
import { useSigCodeGuesserStore } from '@/stores/sigCodeGuesser'
import { ref } from 'vue'

const text = ref('')
const sigCodeGuesserStore = useSigCodeGuesserStore()

const preCheckAnswer = () => {
  sigCodeGuesserStore.checkAnswer(text.value)
  text.value = ''
}
</script>

<template>
  <div>
    <input v-model="text" placeholder="Enter the Sig Code equivalent" />
    <button @click="preCheckAnswer()">Submit!</button>
    <p>Correct count: {{ sigCodeGuesserStore.correctAnswers.length }}</p>
    <p>Incorrect count: {{ sigCodeGuesserStore.incorrectAnswers.length }}</p>
  </div>
</template>

<style scoped></style>
