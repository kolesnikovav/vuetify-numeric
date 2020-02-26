import { VTextField, VBtn, VCard, VRow, VSheet } from 'vuetify/lib'
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
    }

  },
  computed: {

  },
  data: () => ({
    value: '0'
  }),
  methods: {
    changeValue (newVal) {
      if (this.value === '0') this.value = newVal
      else this.value += newVal
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
          value: this.value
        },
        style: {
          padding: '12px'
        }
      })
    }
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
