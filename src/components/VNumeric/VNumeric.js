import { VAutocomplete, VSelect } from 'vuetify/lib'

export default VAutocomplete.extend({
  name: 'v-numeric',
  props: {
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    lenght: {
      type: Number,
      default: 10
    },
    precision: {
      type: Number,
      default: 0
    },
    ...VAutocomplete.options.props
  },
  computed: {
    classes () {
      if (this.autocomplete) {
        return Object.assign({}, VSelect.options.computed.classes.call(this), {
          'v-autocomplete': true,
          'v-autocomplete--is-selecting-index': this.selectedIndex > -1
        })
      } else {
        return Object.assign({}, VSelect.options.computed.classes.call(this), {})
      }
    }
  },
  methods: {
    genInput () {
      return this.autocomplete ? VAutocomplete.options.methods.genInput.call(this)
        : VSelect.options.methods.genInput.call(this)
    }
  }

})
