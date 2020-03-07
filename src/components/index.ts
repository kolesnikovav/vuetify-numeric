import { VueConstructor } from 'vue'
import VNumeric from './VNumeric/VNumeric'
import VNumericInput from './VNumeric/VNumericInput'
import VCalculator from './VNumeric/VCalculator'

function install (v: VueConstructor) {
  v.component('v-numeric', VNumeric)
  v.component('v-numeric-input', VNumericInput)
  v.component('v-calculator', VCalculator)
}

export default install

export {
  VNumeric,
  VNumericInput,
  VCalculator
}
