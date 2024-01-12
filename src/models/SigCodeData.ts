import { data } from '../data/sigCodes.json'
import type ISigCode from '../interfaces/ISigCode'

export default class SigCodeData {
  data: ISigCode[] = data
  total: number = data.length
}
