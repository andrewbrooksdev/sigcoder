import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import SigCodeData from '../models/SigCodeData'
import type ISigCode from '../interfaces/ISigCode'
import SigCodeGuesserAnswer from '../models/SigCodeGuesserAnswer'
import type ISigCodeGuesserAnswer from '@/interfaces/ISigCodeGuesserAnswer'

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const createPrompts = (data: ISigCode[]) =>
  reactive(data.map((item) => new SigCodeGuesserAnswer(item)))

const filterUnansweredPrompts = (prompts: ISigCodeGuesserAnswer[]) =>
  prompts.filter((prompt) => prompt.correct === undefined)

export const useSigCodeGuesserStore = defineStore('sigCodeGuesser', () => {
  const sigCodeData: ISigCode[] = new SigCodeData().data

  const prompts = computed(() => createPrompts(sigCodeData))
  const unansweredPrompts = computed(() => filterUnansweredPrompts(prompts.value))
  const randomUnansweredPrompt = computed(
    () => unansweredPrompts.value[getRandomInt(0, unansweredPrompts.value.length - 1)] || null
  )

  const currentPrompt = ref<ISigCodeGuesserAnswer>(randomUnansweredPrompt.value)

  const answers = computed(() => prompts.value.filter((prompt) => prompt.correct !== undefined))

  const checkAnswer = (sigCode: string) => {
    if (currentPrompt.value) {
      currentPrompt.value.correct = currentPrompt.value.sigCode.sig_code === sigCode
      if (currentPrompt.value.correct) {
        currentPrompt.value = randomUnansweredPrompt.value
      }
    }
  }

  return { currentPrompt, checkAnswer, answers }
})
