# vuetify-numeric
Numeric input components for use with [vuetifyjs](https://vuetifyjs.com).

This component is in progress

## Features
 - Built-in calculator
 - Smart numeric input
 - Locale support number format
 - Adjustable text color
 - Groupping digits
 - Right number alignement
 - Vuetify [VTextField](https://vuetifyjs.com/en/components/text-fields) compatible

## Demo & Playground
See [Live demo ](https://kolesnikovav.github.io/vuetify-numeric/).

## The v-numeric component
The component extends the Vuetify `v-text-field` component.

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
