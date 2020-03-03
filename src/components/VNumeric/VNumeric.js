import Vue from 'vue'
import { VMenu, VTextField } from 'vuetify/lib'
import VCalculator from './VCalculator'
import VNumericInput from './VNumericInput'

export default Vue.extend({
  name: 'v-numeric',
  props: {
    min: {
      type: Number,
      default: -Number.MAX_VALUE
    },
    max: {
      type: Number,
      default: Number.MAX_VALUE
    },
    lenght: {
      type: Number,
      default: 10
    },
    precision: {
      type: Number,
      default: 0
    },
    negativeTextColor: {
      type: String,
      default: 'red'
    },
    textColor: {
      type: Function,
      default: undefined
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    useGrouping: {
      type: Boolean,
      default: true
    },
    ...VTextField.options.props
  },
  computed: {

  },
  data: () => ({
    internalValue: 0,
    isMenuActive: false
  }),
  methods: {
    activateCalculator (val) {
      this.isMenuActive = true
    },
    closeCalculator (val) {
      this.isMenuActive = false
      this.changeValue(val)
    },
    changeValue (val) {
      if (val) {
        this.internalValue = Number(val)
      }
    },
    genCalculator () {
      return this.$createElement(VCalculator, {
        props: {
          initialValue: this.internalValue
        },
        on: {
          'return-value': (val) => this.closeCalculator(val)
        }
      })
    },
    genInput () {
      const props = Object.assign({}, this.props)
      props.value = this.internalValue
      return this.$createElement(VNumericInput, {
        props,
        slot: 'activator',
        on: {
          'activate-calculator': (val) => this.activateCalculator(val),
          'change-value': (val) => this.changeValue(val)
        }
      })
    }
  },
  render () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return this.$createElement(VMenu, {
      props: {
        closeOnContentClick: false,
        value: this.isMenuActive,
        dark: this.dark,
        dense: this.dense
      },
      scopedSlots: {
        'activator' (on) {
          return self.genInput(on)
        }
      },
      on: {
        'update:return-value': () => this.closeCalculator()
      }
    }, [
      this.genCalculator()
    ])
  }
})
