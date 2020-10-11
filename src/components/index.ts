import { VueConstructor, Component } from 'vue'
import VNumeric from './VNumeric/VNumeric'
import VNumericInput from './VNumeric/VNumericInput'
import VCalculator from './VNumeric/VCalculator'

export interface VuetifyNumericUseOptions {
  components?: Record<string, Component>;
}

const defaultComponents = {
  'v-numeric': VNumeric,
  'v-numeric-input': VNumericInput,
  'v-calculator': VCalculator
}

function install (v: VueConstructor, args?: VuetifyNumericUseOptions): VueConstructor<Vue> {
  const components = args ? args.components : defaultComponents
  for (const key in components) {
    const component = components[key]
    if (component) {
      v.component(key, component as typeof v)
    }
  }
  return v
}

export default install

export {
  VNumeric,
  VNumericInput,
  VCalculator
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
