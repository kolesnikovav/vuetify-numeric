/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue, { VueConstructor } from 'vue'

import {
  VTextField, VBtn, VRow, VSheet, VMenu, VIcon
} from 'vuetify/lib'

function VueComponent (component: any|undefined, name: string): VueConstructor<Vue> {
  if (component) return component as VueConstructor<Vue>
  return (Vue as any).options.components[name] as VueConstructor<Vue>
}

let VTextFieldC
let VBtnC
let VRowC
let VSheetC
let VMenuC
let VIconC

try {
  VBtnC = VBtn
  VMenuC = VMenu
  VTextFieldC = VTextField
  VRowC = VRow
  VSheetC = VSheet
  VIconC = VIcon
} catch (error) {
  VBtnC = undefined
  VMenuC = undefined
  VTextFieldC = undefined
  VRowC = undefined
  VSheetC = undefined
  VIconC = undefined
}

export const VBtnA = VueComponent(VBtnC, 'VBtn')
export const VMenuA = VueComponent(VMenuC, 'VMenu')
export const VTextFieldA = VueComponent(VTextFieldC, 'VTextField')
export const VRowA = VueComponent(VRowC, 'VRow')
export const VSheetA = VueComponent(VSheetC, 'VSheet')
export const VIconA = VueComponent(VIconC, 'VIcon')
