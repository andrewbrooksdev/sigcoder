import type ISigCode from '../interfaces/ISigCode'

export default class SigCodeGuesserAnswer {
  sigCode: ISigCode
  correct?: boolean

  constructor(sigCode: ISigCode, correct?: boolean) {
    this.sigCode = sigCode
    this.correct = correct
  }
}
