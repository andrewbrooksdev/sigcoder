import type ISigCode from '../interfaces/ISigCode'
import type ISigCodeGuesserAnswer from '../interfaces/ISigCodeGuesserAnswer'

export default class SigCodeGuesserAnswer implements ISigCodeGuesserAnswer {
  sigCode: ISigCode
  correct: boolean | undefined

  constructor(sigCode: ISigCode, correct?: boolean) {
    this.sigCode = sigCode
    this.correct = correct
  }
}
