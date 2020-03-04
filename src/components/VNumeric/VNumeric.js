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
    ...VTextField.options.props
  },
  computed: {
    computedPrecision () {
      return Number(this.precision)
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
        this.internalValue = Number(newVal)
      }
    }
  },
  methods: {
    activateCalculator () {
      this.isMenuActive = true
    },
    closeCalculator (val) {
      this.isMenuActive = false
      this.changeValue(val)
    },
    changeValue (val) {
      if (val) {
        this.internalValue = Number(val)
        this.$emit('input', this.internalValue)
      }
    },
    genCalculator () {
      return this.$createElement(VCalculator, {
        props: {
          initialValue: this.internalValue,
          locale: this.locale,
          useGrouping: this.useGrouping,
          negativeTextColor: this.negativeTextColor,
          precision: this.computedPrecision,
          elevation: this.elevation,
          fab: this.fab,
          outlined: this.outlined,
          rounded: this.rounded,
          text: this.text,
          dark: this.dark,
          dense: this.dense,
          isActive: this.isMenuActive
        },
        on: {
          'return-value': (val) => this.closeCalculator(val)
        }
      })
    },
    setMenuPosition (rect) {
      this.yMenuPos = rect.bottom
      this.xMenuPos = rect.right - 288
    },
    genInput () {
      const props = Object.assign({}, this.$props)
      props.value = this.internalValue
      props.precision = this.computedPrecision
      return this.$createElement(VNumericInput, {
        props,
        slot: 'activator',
        on: {
          'activate-calculator': () => this.activateCalculator(),
          'change-value': (val) => this.changeValue(val),
          'resize-numeric-input': (rect) => this.setMenuPosition(rect)
        }
      })
    }
  },
  render () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return this.$createElement(VMenu, {
      props: {
        absolute: true,
        positionX: this.xMenuPos,
        positionY: this.yMenuPos,
        closeOnContentClick: false,
        value: this.isMenuActive,
        dark: this.dark,
        dense: this.dense,
        maxWidth: '288px',
        right: true
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
