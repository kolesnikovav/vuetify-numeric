import Vue, { VNode } from 'vue'
import { VTextFieldA, VBtnA, VRowA, VSheetA } from '../../shims-vuetify'

type operationType = ((a: number|string, b: number| string) => number)|undefined

export default Vue.extend({
  name: 'v-calculator',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
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
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    precision: {
      type: Number,
      default: 0
    },
    initialValue: {
      type: Number,
      default: 0
    },
    negativeTextColor: {
      type: String,
      default: 'red'
    },
    calcStyle: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    numberFormatter (): Intl.NumberFormat {
      return new Intl.NumberFormat(this.locale, {
        useGrouping: this.useGrouping
      })
    },
    resultNumber (): string {
      return this.numberFormatter.format(Number(this.value))
    },
    computedColor (): string| undefined {
      if (Number(this.$data.value) < 0 && this.negativeTextColor) {
        return this.negativeTextColor
      } else return undefined
    },
    computedOutlined (): boolean {
      if (!this.calcStyle) return this.outlined
      if (this.calcStyle.outlined === undefined) return this.outlined
      return this.calcStyle.outlined
    },
    computedRounded (): boolean {
      if (!this.calcStyle) return this.rounded
      if (this.calcStyle.rounded === undefined) return this.rounded
      return this.calcStyle.rounded
    },
    computedText (): boolean {
      if (!this.calcStyle) return this.text
      if (this.calcStyle.text === undefined) return this.text
      return this.calcStyle.text
    },
    computedTile (): boolean {
      if (!this.calcStyle) return false
      return (this.calcStyle.tile === undefined) ? false : this.calcStyle.tile
    },
    computedLarge (): boolean {
      if (!this.calcStyle) return false
      return (this.calcStyle.large === undefined) ? false : this.calcStyle.large
    },
    computedSmall (): boolean {
      if (!this.calcStyle) return false
      return (this.calcStyle.small === undefined) ? false : this.calcStyle.small
    },
    textOperand (): string {
      if (!this.operand) return ''
      return (this.operand === 0) ? '' : this.operand.toString()
    }
    // computed
    // fab: (this.calcStyle && this.calcStyle.fab) ? this.calcStyle.fab : this.fab,
    // outlined: (this.calcStyle && this.calcStyle.outlined) ? this.calcStyle.outlined : this.outlined,
    // rounded: (this.calcStyle && this.calcStyle.rounded) ? this.calcStyle.rounded : this.rounded,
    // text: (this.calcStyle && this.calcStyle.text) ? this.calcStyle.text : this.text
  },
  data: () => ({
    value: '0',
    operand: 0,
    operation: undefined as operationType
  }),
  watch: {
    initialValue: {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.value = newVal.toString()
        }
      }
    },
    computedColor (newVal) {
      const input = this.genResultInput()
      if (input) {
        input.style.color = newVal || null
      }
    }
  },
  methods: {
    reset (): void {
      this.value = '0'
      this.operation = undefined
      this.operand = 0
    },
    genResultInput (): HTMLInputElement| undefined {
      const inputs = (this.$refs.calcResult as Vue).$el.getElementsByTagName('input')
      if (inputs && inputs.length > 0) {
        return inputs[0]
      }
    },
    getOperation (simbol: string): operationType {
      if (simbol === '+') return (a: number|string, b: number|string) => { return Number(a) + Number(b) }
      else if (simbol === '-') return (a: number|string, b: number|string) => { return Number(a) - Number(b) }
      else if (simbol === '*') return (a: number|string, b: number|string) => { return Number(a) * Number(b) }
      else if (simbol === '÷' || simbol === '/') return (a: number|string, b: number|string) => { return Number(a) / Number(b) }
      else if (simbol === '%') return (a: number|string, b: number|string) => { return (Number(a) / 100) * Number(b) }
    },
    changeValue (newVal: KeyboardEvent| string) {
      if (!this.isActive) return
      let v: string
      if (newVal instanceof KeyboardEvent) {
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
        this.reset()
      } else if (v === ',' || v === '.') {
        if (this.value.indexOf('.') === -1) {
          this.value += '.'
        }
      } else if (v === '±') {
        if (this.value.toString().startsWith('-')) this.value = this.value.toString().substring(1, this.value.length)
        else this.value = '-' + this.value
      } else if (v === '1/x') {
        if (this.value !== '0') this.value = (1 / Number.parseFloat(this.value)).toString()
      } else if (['+', '-', '*', '÷', '/', '%'].includes(v)) {
        this.calculate()
        this.operation = this.getOperation(v)
        this.operand = Number(this.value)
        this.value = '0'
      } else if (['=', 'Enter', 'OK'].includes(v)) {
        this.calculate()
        this.operation = undefined
        this.operand = 0
        if (v === 'Enter' || v === 'OK') this.returnValue()
      } else if (v === 'CE') {
        this.value = '0'
      } else if (v === 'Escape') {
        this.reset()
        this.$emit('return-value', undefined)
      } else if (v === 'Delete') {
        this.reset()
      }
    },
    returnValue (): void {
      this.$emit('return-value', this.value)
      this.reset()
    },
    calculate (): void {
      if (this.value && this.operand && this.operation) {
        const res = this.operation(this.operand, this.value)
        this.value = res.toString()
      }
    },
    // genTextOperand (): VNode {
    //   return this.$createElement('div', {
    //     style: {
    //       textAlign: 'right'
    //     },
    //     props: {
    //       value: this.textOperand,
    //       disabled: true,
    //       dense: true
    //     }
    //   })
    // },
    genNumberButton (numberValue: string): VNode {
      return this.$createElement(VBtnA, {
        style: {
          'padding-left': '0px',
          'padding-right': '0px',
          'max-width': '48px',
          'min-width': '48px'
        },
        props: {
          fab: (this.calcStyle && this.calcStyle.fab) ? this.calcStyle.fab : this.fab,
          outlined: this.computedOutlined,
          rounded: this.computedRounded,
          text: this.computedText,
          tile: this.computedTile,
          large: this.computedLarge,
          small: this.computedSmall
        },
        domProps: {
          innerHTML: numberValue
        },
        on: {
          click: () => this.changeValue(numberValue)
        }
      })
    },
    genActionsButton (actValue: string): VNode {
      return this.$createElement(VBtnA, {
        style: {
          'padding-left': '0px',
          'padding-right': '0px',
          'max-width': '48px',
          'min-width': '48px'
        },
        props: {
          fab: (this.calcStyle && this.calcStyle.fab) ? this.calcStyle.fab : this.fab,
          outlined: this.computedOutlined,
          rounded: this.computedRounded,
          text: this.computedText,
          tile: this.computedTile,
          large: this.computedLarge,
          small: this.computedSmall
        },
        domProps: {
          innerHTML: actValue
        },
        on: {
          click: () => this.changeValue(actValue)
        }
      })
    },
    genRow (content: string[]): VNode|VNode[] {
      const rowContent: VNode[] = []
      // const actButtons = ['+', '±', 'C', '-', '%', 'CE', '*', '1/x', '←', '.', '÷', '=', 'OK']
      const actButtons = ['+', '\u00B1', 'C', '-', '%', 'CE', '*', '1/x', '\u2190', '.', '\u00F7', '=', 'OK']
      content.map(v => {
        if (actButtons.includes(v)) {
          rowContent.push(this.genActionsButton(v))
        } else {
          rowContent.push(this.genNumberButton(v))
        }
      })
      return this.$createElement(VRowA, {
        style: {
          'margin-left': '0px',
          'margin-right': '0px'
        }
      }, rowContent)
    },
    genResult (): VNode {
      return this.$createElement(VTextFieldA, {
        ref: 'calcResult',
        props: {
          outlined: true,
          reverse: true,
          readonly: true,
          value: this.resultNumber,
          autofocus: true,
          hint: this.textOperand,
          persistentHint: true
        },
        style: {
          padding: '12px',
          'font-size': '24px'
        }
      })
    }
  },
  mounted () {
    document.addEventListener('keydown', this.changeValue)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.changeValue)
  },
  render (): VNode {
    const layer1 = this.genRow(['7', '8', '9', '+', '\u00B1', 'C'])
    const layer2 = this.genRow(['4', '5', '6', '-', '%', 'CE'])
    const layer3 = this.genRow(['1', '2', '3', '*', '1/x', '\u2190'])
    const layer4 = this.genRow(['0', '00', '.', '\u00F7', '=', 'OK'])
    const content = []
    content.push(this.genResult())
    content.push(layer1, layer2, layer3, layer4)
    return this.$createElement(VSheetA, {
      attrs: {
        tabindex: 0
      },
      props: {
        maxWidth: '288px',
        elevation: this.elevation,
        dark: this.dark
      }
    }, content)
  }

})
