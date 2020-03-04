import VNumeric from './VNumeric/VNumeric'
import VNumericInput from './VNumeric/VNumericInput'
import VCalculator from './VNumeric/VCalculator'

function install (Vue) {
  Vue.component('v-numeric', VNumeric)
  Vue.component('v-numeric-input', VNumericInput)
  Vue.component('v-calculator', VCalculator)
}

export default install

export {
  VNumeric,
  VNumericInput,
  VCalculator
}
