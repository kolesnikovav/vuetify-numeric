import { VTextField, VBtn, VRow, VSheet } from 'vuetify/lib'
import mixins from 'vuetify/lib/util/mixins'
import Colorable from 'vuetify/lib/mixins/colorable'
import Themeable from 'vuetify/lib/mixins/themeable'

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-calculator',
  props: {
    elevation: {
      type: Number,
      default: 0
    },
    dark: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    useGrouping: {
      type: Boolean,
      default: true
    }

  },
  computed: {
    numberFormatter () {
      return new Intl.NumberFormat('en-US', {
        useGrouping: this.useGrouping
      })
    },
    resultNumber () {
      return this.numberFormatter.format(this.value)
    }
  },
  data: () => ({
    value: '0',
    operand: 0,
    operation: undefined
  }),
  methods: {
    getOperation (simbol) {
      if (simbol === '+') return (a, b) => { return Number(a) + Number(b) }
      else if (simbol === '-') return (a, b) => { return Number(a) - Number(b) }
      else if (simbol === '*') return (a, b) => { return Number(a) * Number(b) }
      else if (simbol === '÷') return (a, b) => { return Number(a) / Number(b) }
      else if (simbol === '%') return (a, b) => { return (Number(a) / 100) * Number(b) }
    },
    changeValue (newVal) {
      let v
      if (newVal.key) {
        v = newVal.key
      } else {
        v = newVal
      }
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00'].includes(v)) {
        if (this.value === '0') this.value = v
        else this.value += v
      } else if (v === 'Backspace' || v === '←') {
        if (this.value.length === 2 && this.value.startsWith('-')) {
          this.value = '0'
        } else {
          this.value = this.value.length <= 1 ? '0' : this.value.substring(0, this.value.length - 1)
        }
      } else if (v.toUpperCase() === 'C') {
        this.value = '0'
        this.operation = undefined
        this.operand = 0
      } else if (v === ',' || v === '.') {
        if (this.value.indexOf('.') === -1) {
          this.value += '.'
        }
      } else if (v === '±') {
        if (this.value.toString().startsWith('-')) this.value = this.value.toString().substring(1, this.value.length)
        else this.value = '-' + this.value
      } else if (v === '1/x') {
        if (this.value !== '0') this.value = 1 / Number.parseFloat(this.value)
      } else if (['+', '-', '*', '÷', '%'].includes(v)) {
        this.calculate()
        this.operation = this.getOperation(v)
        this.operand = this.value
        this.value = '0'
      } else if (['=', 'Enter', 'OK'].includes(v)) {
        this.calculate()
        this.operation = undefined
        this.operand = 0
      } else if (v === 'CE') {
        this.value = '0'
      }
    },
    calculate () {
      if (this.value && this.operand && this.operation) {
        const res = this.operation(this.operand, this.value)
        this.value = res.toString()
      }
    },
    genNumberButton (numberValue) {
      return this.$createElement(VBtn, {
        style: {
          'padding-left': '0px',
          'padding-right': '0px',
          'max-width': '48px',
          'min-width': '48px'
        },
        props: {
          fab: this.fab,
          outlined: this.outlined,
          rounded: this.rounded
        },
        domProps: {
          innerHTML: numberValue
        },
        on: {
          click: () => this.changeValue(numberValue)
        }
      })
    },
    genActionsButton (actValue) {
      return this.$createElement(VBtn, {
        style: {
          'padding-left': '0px',
          'padding-right': '0px',
          'max-width': '48px',
          'min-width': '48px'
        },
        domProps: {
          innerHTML: actValue
        },
        on: {
          click: () => this.changeValue(actValue)
        }
      })
    },
    genRow (content) {
      const rowContent = []
      const actButtons = ['+', '±', 'C', '-', '%', 'CE', '*', '1/x', '←', '.', '÷', '=', 'OK']
      content.map(v => {
        if (actButtons.includes(v)) {
          rowContent.push(this.genActionsButton(v))
        } else {
          rowContent.push(this.genNumberButton(v))
        }
      })
      return this.$createElement(VRow, {
        style: {
          'margin-left': '0px',
          'margin-right': '0px'
        }
      }, rowContent)
    },
    genResult () {
      return this.$createElement(VTextField, {
        props: {
          outlined: true,
          reverse: true,
          readonly: true,
          value: this.resultNumber
        },
        style: {
          padding: '12px'
        }
      })
    }
  },
  created () {
    document.addEventListener('keydown', this.changeValue)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.changeValue)
  },
  render () {
    const layer1 = this.genRow(['7', '8', '9', '+', '±', 'C'])
    const layer2 = this.genRow(['4', '5', '6', '-', '%', 'CE'])
    const layer3 = this.genRow(['1', '2', '3', '*', '1/x', '←'])
    const layer4 = this.genRow(['0', '00', '.', '÷', '=', 'OK'])
    const content = []
    content.push(this.genResult())
    content.push(layer1, layer2, layer3, layer4)
    return this.$createElement(VSheet, {
      props: {
        maxWidth: '288px',
        elevation: this.elevation,
        dark: this.dark
      }
    }, content)
  }

})
