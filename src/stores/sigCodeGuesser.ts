import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import SigCodeData from '../models/SigCodeData'
import type ISigCode from '../interfaces/ISigCode'
import SigCodeGuesserAnswer from '../models/SigCodeGuesserAnswer'

export const useSigCodeGuesserStore = defineStore('sigCodeGuesser', () => {
  const sigCodeData: ISigCode[] = new SigCodeData().data

  const prompts: SigCodeGuesserAnswer[] = reactive(
    sigCodeData.map((item) => new SigCodeGuesserAnswer(item))
  )

  const currentPrompt = computed(() => {
    const unansweredPrompts = prompts.filter((prompt) => {
      return prompt.correct === undefined
    })
    const getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const promptIndex = getRandomInt(0, unansweredPrompts.length)

    return unansweredPrompts[promptIndex] || null
  })

  const correctAnswers = computed(() => {
    return prompts.filter((prompt) => {
      return prompt.correct === true
    })
  })

  const incorrectAnswers = computed(() => {
    return prompts.filter((prompt) => {
      return prompt.correct === false
    })
  })

  function checkAnswer(sigCode: string) {
    currentPrompt.value.correct = !!(
      currentPrompt.value && currentPrompt.value.sigCode.sig_code === sigCode
    )
  }

  return { currentPrompt, checkAnswer, correctAnswers, incorrectAnswers }
})
