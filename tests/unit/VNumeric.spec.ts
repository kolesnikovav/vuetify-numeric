// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// Utilities
import {
  mount
} from '@vue/test-utils'
// component to be tested
import VNumeric from '@/components/VNumeric/VNumeric'

Vue.use(Vuetify)

const vuetify = new Vuetify({})

const value = 1258
const precision = 2
const prefix = '$'

describe('VNumeric.js', () => {
  it('renders', () => {
    const wrapper = mount(VNumeric, {
      vuetify,
      propsData: {
        value,
        useGrouping: true,
        precision,
        prefix
      }
    })
    // wrapper.nextTick()
    // const input = wrapper.element.getElementsByTagName('input')[0]
    // console.log(input)
    // // expect(input.innerText).toMatch('$1,258.00')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
