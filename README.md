# vuetify-numeric
Numeric input components for use with [vuetifyjs](https://vuetifyjs.com).

<p align="left">
  <a href="https://travis-ci.org/kolesnikovav/vuetify-numeric/master">
    <img alt="Travis (.org) branch" src="https://img.shields.io/travis/kolesnikovav/vuetify-numeric/master?logo=travis">
  </a>
  <a href="https://www.npmjs.com/package/vuetify-numeric">
    <img alt="npm" src="https://img.shields.io/npm/v/vuetify-numeric?color=blue&logo=npm">
  </a>
  <a href="https://www.npmjs.com/package/vuetify-numeric">
    <img alt="npm" src="https://img.shields.io/npm/dm/vuetify-numeric?logo=npm">
  </a>
</p>

## Features
 - Built-in calculator
 - Smart numeric input
 - Locale support number format
 - Adjustable text color
 - Groupping digits
 - Right number alignement
 - Show prefix (currency ...) near your number
 - No thirdpatry solutions is used
 - Vuetify [VTextField](https://vuetifyjs.com/en/components/text-fields) compatible

 ## Keyboard shortcuts
| Key | Action |
| ---- | -------- |
| Enter | Activate calculator or calculate your expression and close the calculator |
| Delete | Reset calculator |
| . or , | Swich your input between integer and fraction part of number |
| - | Change your input number sign |

## Demo & Playground
See [Live demo ](https://kolesnikovav.github.io/vuetify-numeric/).

## The v-numeric component
The component extends the Vuetify `v-text-field` component.

## How to use

Install the package:
```
yarn add vuetify-numeric
```

Add the package to your app entry point:
```
import VNumeric from 'vuetify-numeric/vuetify-numeric.umd.min'
```

Or (in develop case)
```
import VNumeric from 'vuetify-numeric/vuetify-numeric.umd'
```
Than, register this plugin
```
Vue.use(VNumeric)
```
Once the plugin has been installed, you can now use the `v-numeric` component in your templates.
Use `v-model` to bind to the value.
```
<template>
	<v-numeric text outlined v-model="amount"></v-numeric>
</template>

<script>
export default {
	data() {
		return {
			amount: 0,
		};
	},
};
</script>
```

### Props:

| Prop | description | type | default |
| ---- | ---- | ------- | --- |
| min | Sets minimum value | Number | - Number.MAX (infinity) |
| max | Sets maximum value | Number | Number.MAX (infinity)|
| length | Sets maximum number of digits | Number | 10 |
| precision | Number of digits after decimal point | Number | 0 |
| negativeTextColor | Text color when number is negative | String | red |
| locale | Current locale | String | en-US |
| useGrouping | use grouping digits | Boolean | true |
| elevation | Sets the calculator elevation | Number | 10 |
| fab | FAB-kind calculator's button | Boolean | false |
| text | use transparent background in calculator | Boolean | false |

Anover props are derived from [v-text-field](https://vuetifyjs.com/en/components/text-fields) component

### Events:

`@input`: Emitted when value is changed after user input.
