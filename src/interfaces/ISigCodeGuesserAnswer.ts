export default interface ISigCodeGuesserAnswer {
  sigCode: {
    sig_code: string
    explanation: string
  }
  correct: boolean | undefined
}
