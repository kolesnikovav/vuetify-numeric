import Vue, { VNode } from 'vue'
import { VTextFieldA } from '../../shims-vuetify'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTextFieldProps = ((VTextFieldA as any).options as any).props

export default Vue.extend({
  name: 'v-numeric-input',
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
    calcIcon: {
      type: String,
      default: 'mdi-calculator'
    },
    ...VTextFieldProps
  },
  data: () => ({
    internalValue: 0,
    fractDigitsEdited: false,
    fractPart: '0',
    isFocused: false
  }),
  computed: {
    numberFormatter (): Intl.NumberFormat {
      return new Intl.NumberFormat(this.$props.locale, {
        useGrouping: this.$props.useGrouping,
        minimumFractionDigits: this.$props.precision
      })
    },
    computedValue (): string {
      if (this.internalValue) {
        return (this.$props.prefix ? this.$props.prefix : '') + this.numberFormatter.format(this.internalValue)
      }
      return (this.$props.prefix ? this.$props.prefix : '') + this.numberFormatter.format(0)
    },
    computedColor (): string | undefined {
      if (this.internalValue < 0 && this.$props.negativeTextColor) {
        return this.$props.negativeTextColor
      } else return this.$props.color
    }
  },
  watch: {
    value (val) {
      this.$data.internalValue = val
    },
    internalValue (val) {
      this.$emit('change-value', val)
    },
    computedColor (newVal) {
      const input = this.genTextInput()
      if (input) {
        input.style.color = newVal || null
      }
    }
  },
  methods: {
    genTextInput () {
      const inputs = this.$el.getElementsByTagName('input')
      if (inputs && inputs.length > 0) {
        return inputs[0]
      }
    },
    clearValue () {
      this.internalValue = 1
      this.fractPart = '0'
      this.fractDigitsEdited = false
      this.$nextTick(() => {
        if (this.$data.value) {
          this.internalValue = this.$data.value
        } else {
          this.internalValue = 0
        }
      })
    },
    activateCalculator () {
      if (!this.$props.readonly) {
        this.$emit('activate-calculator', this.internalValue)
      }
    },
    keyProcess (keyEvent: KeyboardEvent) {
      if (!this.isFocused) return
      if (this.$props.readonly) {
        keyEvent.preventDefault()
        keyEvent.stopPropagation()
        return
      }
      if (keyEvent.key !== 'ArrowLeft' && keyEvent.key !== 'ArrowRight') {
        keyEvent.preventDefault()
      }
      keyEvent.stopPropagation()
      if (keyEvent.key === 'Enter') {
        this.updateDimensions()
        this.activateCalculator()
        return
      } else if (keyEvent.key === 'Delete') {
        this.clearValue()
        return
      }
      const numericButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      let strVal = Math.trunc(this.internalValue).toString()
      if (numericButtons.includes(keyEvent.key)) {
        if (this.fractDigitsEdited) {
          if (this.fractPart === '0' && keyEvent.key !== '0') {
            this.fractPart = keyEvent.key
          } else if (this.fractPart !== '0') {
            this.fractPart += keyEvent.key.toString()
          }
        } else {
          if (strVal === '0' && keyEvent.key !== '0') {
            strVal = keyEvent.key
          } else if (strVal !== '0') {
            strVal += keyEvent.key
          }
        }
      } else if (keyEvent.key === '-') {
        if (strVal.startsWith('-')) strVal = strVal.replace('-', '')
        else strVal = '-' + strVal
      } else if (keyEvent.key === 'Backspace') {
        if (this.fractDigitsEdited) {
          this.fractPart = this.fractPart.length <= 1 ? '0' : this.fractPart.substring(0, this.fractPart.length - 1)
        } else {
          if (strVal.length === 2 && strVal.startsWith('-')) {
            strVal = '0'
          } else {
            strVal = strVal.length <= 1 ? '0' : strVal.substring(0, strVal.length - 1)
          }
        }
      } else if ([',', '.'].includes(keyEvent.key)) {
        if (this.$props.precision > 0) {
          this.fractDigitsEdited = !this.fractDigitsEdited
        }
      }
      if (this.$props.precision > 0) {
        strVal = strVal + '.' + this.fractPart
      }
      let result = Number(strVal)
      if (this.$props.precision > 0) {
        const p = Math.pow(10, this.$props.precision)
        result = Math.round(Number(result) * p) / p
      }
      result = result = Math.max(Math.min(this.$props.max, result), this.$props.min)
      this.internalValue = result
    },
    updateDimensions () {
      const rect = this.$el.getBoundingClientRect()
      this.$emit('resize-numeric-input', {
        bottom: rect.bottom,
        right: rect.right
      })
    },
    setFocus (val: boolean) {
      this.isFocused = val
    }
  },
  mounted () {
    const input = this.genTextInput()
    if (input) {
      input.setAttribute('type', 'text')
      input.style.textAlign = 'right'
    }
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('load', this.updateDimensions)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('load', this.updateDimensions)
  },
  render (): VNode {
    const currentProps = Object.assign({}, this.$props)
    currentProps.value = this.computedValue
    if (currentProps.prefix) {
      currentProps.prefix = undefined
    }
    currentProps.appendIcon = this.$props.calcIcon
    return this.$createElement(VTextFieldA, {
      domProps: {
        value: this.internalValue
      },
      props: currentProps,
      on: {
        keydown: this.keyProcess,
        focus: () => this.setFocus(true),
        blur: () => this.setFocus(false),
        'click:clear': this.clearValue,
        'click:append': () => {
          this.updateDimensions()
          this.activateCalculator()
        },
        input: (val: string) => { this.internalValue = Number(val) }
      }
    })
  }
})
