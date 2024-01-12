import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import SigCodeData from '../models/SigCodeData'
import type ISigCode from '../interfaces/ISigCode'
import SigCodeGuesserAnswer from '../models/SigCodeGuesserAnswer'
import type ISigCodeGuesserAnswer from '@/interfaces/ISigCodeGuesserAnswer'

const STORAGE_KEY = 'sigCodeGuesserData'

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const createPrompts = (data: ISigCode[]) =>
  reactive(data.map((item) => new SigCodeGuesserAnswer(item)))

const filterUnansweredPrompts = (prompts: ISigCodeGuesserAnswer[]) =>
  prompts.filter((prompt) => prompt.correct === undefined)

export const useSigCodeGuesserStore = defineStore('sigCodeGuesser', () => {
  const sigCodeData: ISigCode[] = new SigCodeData().data

  const storedData = localStorage.getItem(STORAGE_KEY)
  const initialPrompts = storedData ? JSON.parse(storedData) : createPrompts(sigCodeData)

  const prompts = reactive(initialPrompts)
  const unansweredPrompts = computed(() => filterUnansweredPrompts(prompts))
  const randomUnansweredPrompt = computed(
    () => unansweredPrompts.value[getRandomInt(0, unansweredPrompts.value.length - 1)] || null
  )

  const currentPrompt = ref<ISigCodeGuesserAnswer>(randomUnansweredPrompt.value)

  watch(
    prompts,
    () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
    },
    { deep: true }
  )

  const answers = computed(
    () => prompts.filter((prompt: ISigCodeGuesserAnswer) => prompt.correct !== undefined) || []
  )

  const checkAnswer = (sigCode: string) => {
    if (currentPrompt.value) {
      currentPrompt.value.correct = currentPrompt.value.sigCode.sig_code === sigCode
      if (currentPrompt.value.correct) {
        currentPrompt.value = randomUnansweredPrompt.value
      }
    }
  }

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  return { currentPrompt, checkAnswer, answers, resetGame }
})
