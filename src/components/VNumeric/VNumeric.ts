import Vue, { VNode } from 'vue'
import { VMenu, VTextField } from 'vuetify/lib'
import VCalculator from './VCalculator'
import VNumericInput from './VNumericInput'

interface PosMenuType {
  bottom: number;
  right: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VTextFieldProps = ((VTextField as any).options as any).props

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
      if (val) {
        if (this.computedPrecision > 0) {
          const p = Math.pow(10, this.computedPrecision)
          this.internalValue = Math.round(Number(val) * p) / p
        } else {
          this.internalValue = Math.round(Number(val))
        }
        this.$emit('input', this.internalValue)
      }
    },
    genCalculator (): VNode {
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
          isActive: this.isMenuActive
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
        props,
        slot: 'activator',
        on: {
          'activate-calculator': () => this.activateCalculator(),
          'change-value': (val: string|number|undefined) => this.changeValue(val),
          'resize-numeric-input': (rect: PosMenuType) => this.setMenuPosition(rect)
        }
      })
    }
  },
  render (): VNode {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return this.$createElement(VMenu, {
      props: {
        absolute: true,
        positionX: this.xMenuPos,
        positionY: this.yMenuPos,
        closeOnContentClick: false,
        value: this.isMenuActive,
        dark: this.$props.dark,
        dense: this.$props.dense,
        maxWidth: '288px',
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
