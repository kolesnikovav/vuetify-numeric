import Vue from 'vue'
import { VTextField, VMenu, VBtn, VIcon } from 'vuetify/lib'

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
    hideSpinButtons: {
      type: Boolean,
      default: true
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
  data: () => ({
    internalValue: 0
  }),
  computed: {
    numberFormatter () {
      return new Intl.NumberFormat(this.locale, {
        useGrouping: this.useGrouping,
        minimumFractionDigits: this.precision
      })
    },
    computedValue () {
      if (this.internalValue) {
        return (this.prefix ? this.prefix : '') + this.numberFormatter.format(this.internalValue)
      }
      return (this.prefix ? this.prefix : '') + this.numberFormatter.format(0)
    },
    computedColor () {
      if (this.internalValue < 0 && this.negativeTextColor) {
        return this.negativeTextColor
      } else return this.color
    }
  },
  watch: {
    value (val) {
      this.internalValue = val
    },
    computedColor (newVal) {
      const inputs = this.$el.getElementsByTagName('input')
      if (inputs && inputs.length > 0) {
        const inputEl = inputs[0]
        inputEl.style.color = newVal || null
      }
    }
  },
  methods: {
    genIcon () {
      return this.$createElement(VIcon, {
      }, ['mdi-calculator'])
    },
    genActivator (listeners) {
      return this.$createElement(VBtn, {
        props: {
          icon: true
        },
        slot: 'activator',
        on: {
          click: (e) => {
            e.stopPropagation()
            this.isMenuActive = !this.isMenuActive
          },
          listeners
        }
      }, [
        this.genIcon()
      ])
    },
    genMenu () {
      const genActivator = this.genActivator
      return this.$createElement(VMenu, {
        slot: 'append',
        scopedSlots: {
          'activator' (on) {
            return genActivator(on)
          }
        }
      })
    },
    clearValue () {
      this.internalValue = 1
      this.$nextTick(() => {
        if (this.value) {
          this.internalValue = this.value
        } else {
          this.internalValue = 0
        }
      })
    },
    keyProcess (keyEvent) {
      if (keyEvent.key !== 'ArrowLeft' && keyEvent.key !== 'ArrowRight') {
        keyEvent.preventDefault()
      }
      keyEvent.stopPropagation()
      const numericButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      let strVal = this.internalValue.toString()
      if (numericButtons.includes(keyEvent.key)) {
        if (strVal === '0' && keyEvent.key !== '0') {
          strVal = keyEvent.key
        } else if (strVal !== '0') {
          strVal += keyEvent.key
        }
      } else if (keyEvent.key === '-') {
        if (strVal.startsWith('-')) strVal = strVal.replace('-', '')
        else strVal = '-' + strVal
      } else if (keyEvent.key === 'Backspace') {
        if (strVal.length === 2 && strVal.startsWith('-')) {
          strVal = '0'
        } else {
          strVal = strVal.length <= 1 ? '0' : strVal.substring(0, strVal.length - 1)
        }
      } else if ([',', '.'].includes(keyEvent.key)) {
        if (!strVal.contains('.')) {
          strVal = strVal + '.0'
        }
      }
      this.internalValue = Number(strVal)
    }
  },
  mounted () {
    const inputs = this.$el.getElementsByTagName('input')
    if (inputs && inputs.length > 0) {
      const inputEl = inputs[0]
      inputEl.setAttribute('type', 'text')
      inputEl.style.textAlign = 'right'
    }
  },
  render () {
    const currentProps = Object.assign({}, this.$props)
    currentProps.value = this.computedValue
    if (currentProps.prefix) {
      currentProps.prefix = undefined
    }
    const v = this.$createElement(VTextField, {
      props: currentProps,
      on: {
        keydown: this.keyProcess,
        'click:clear': this.clearValue
      }
    }, [this.genMenu()])
    return v
  }
})
