<script setup lang="ts">
import { useSigCodeGuesserStore } from '@/stores/sigCodeGuesser'

const sigCodeGuesserStore = useSigCodeGuesserStore()
</script>

<template>
  <p>{{ sigCodeGuesserStore.currentPrompt.sigCode.explanation }}</p>
  <p>Correct answer: {{ sigCodeGuesserStore.currentPrompt.sigCode.sig_code }}</p>
</template>

<style scoped></style>
