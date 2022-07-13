import Vue, { VNode } from 'vue'
import { VMenuA, VTextFieldA } from '../../shims-vuetify'
import VCalculator from './VCalculator'
import VNumericInput from './VNumericInput'

interface PosMenuType {
  bottom: number;
  right: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTextFieldProps = ((VTextFieldA as any).options as any).props

export default Vue.extend({
  name: 'v-numeric',
  props: {
    calcNoTabindex: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: -Number.MAX_VALUE
    },
    max: {
      type: Number,
      default: Number.MAX_VALUE
    },
    length: {
      type: Number,
      default: 10
    },
    precision: {
      type: [Number, String],
      default: 0
    },
    negativeTextColor: {
      type: String,
      default: 'red'
    },
    openKey: {
      type: String,
      default: 'Enter'
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
    /* customizing calculator */
    elevation: {
      type: Number,
      default: 0
    },
    fab: {
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
    calcIcon: {
      type: String,
      default: 'mdi-calculator'
    },
    useCalculator: {
      type: Boolean,
      default: true
    },
    calcStyle: {
      type: Object,
      default: undefined
    },
    ...VTextFieldProps
  },
  computed: {
    computedPrecision (): number {
      return Number(this.$props.precision)
    }
  },
  data: () => ({
    internalValue: 0,
    isMenuActive: false,
    xMenuPos: 0,
    yMenuPos: 0
  }),
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler (newVal) {
        this.$data.internalValue = Number(newVal)
      }
    }
  },
  methods: {
    activateCalculator () {
      this.isMenuActive = true
    },
    closeCalculator (val: string|number|undefined) {
      this.isMenuActive = false
      this.changeValue(val)
    },
    changeValue (val: string|number|undefined) {
      let result: number
      if (val) {
        if (this.computedPrecision > 0) {
          const p = Math.pow(10, this.computedPrecision)
          result = Math.round(Number(val) * p) / p
        } else {
          result = Math.round(Number(val))
        }
        result = Math.max(Math.min(this.$props.max, result), this.$props.min)
        this.internalValue = result
        this.$emit('input', this.internalValue)
      } else if (val === 0) {
        this.internalValue = 0
        this.$emit('input', this.internalValue)
      }
    },
    genCalculator (): VNode|undefined {
      if (!this.$props.useCalculator) return undefined
      return this.$createElement(VCalculator, {
        props: {
          initialValue: this.internalValue,
          locale: this.$props.locale,
          useGrouping: this.$props.useGrouping,
          negativeTextColor: this.$props.negativeTextColor,
          precision: this.computedPrecision,
          elevation: this.$props.elevation,
          fab: this.$props.fab,
          outlined: this.$props.outlined,
          rounded: this.$props.rounded,
          text: this.$props.text,
          dark: this.$props.dark,
          dense: this.$props.dense,
          isActive: this.isMenuActive,
          calcStyle: this.$props.calcStyle
        },
        on: {
          'return-value': (val: string|number|undefined) => this.closeCalculator(val)
        }
      })
    },
    setMenuPosition (rect: PosMenuType) {
      this.$data.yMenuPos = rect.bottom
      this.$data.xMenuPos = rect.right - 288
    },
    genInput (): VNode {
      const props = Object.assign({}, this.$props)
      props.value = this.internalValue
      props.precision = this.computedPrecision
      return this.$createElement(VNumericInput, {
        domProps: {
          value: this.internalValue
        },
        props,
        slot: 'activator',
        on: {
          'activate-calculator': () => {
            this.activateCalculator()
          },
          'change-value': (val: string|number|undefined) => this.changeValue(val),
          'resize-numeric-input': (rect: PosMenuType) => this.setMenuPosition(rect),
          input: (val: string|number) => { this.internalValue = Number(val) },
          change: (val: string) => this.$emit('change', val)
        }
      })
    },
    computedWidth (): string {
      if (!this.$props.calcStyle) return '288px'
      return (this.$props.calcStyle.width === undefined) ? '288px' : this.$props.calcStyle.width
    },
    computedHeight (): string {
      if (!this.$props.calcStyle) return '246px'
      return (this.$props.calcStyle.height === undefined) ? '246px' : this.$props.calcStyle.height
    }
  },
  render (): VNode {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return this.$createElement(VMenuA, {
      props: {
        absolute: true,
        positionX: this.xMenuPos,
        positionY: this.yMenuPos,
        closeOnContentClick: false,
        value: this.isMenuActive,
        dark: this.$props.dark,
        dense: this.$props.dense,
        width: this.computedWidth,
        maxWidth: this.computedWidth(),
        height: this.computedHeight,
        right: true
      },
      scopedSlots: {
        'activator' () {
          return self.genInput()
        }
      },
      on: {
        'update:return-value': (val: string|number|undefined) => this.closeCalculator(val)
      }
    }, [
      this.genCalculator()
    ])
  }
})
