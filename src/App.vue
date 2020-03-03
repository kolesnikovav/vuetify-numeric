<template>
  <v-app class="demo-content">
    <h1>Vuetify-numeric demo page</h1>
    <v-content>
      <v-numeric-input
      :prefix = "prefix"
      :useGrouping = "useGrouping"
      :precision = "numPrecision"
      clearable
      :autocomplete = "true"
      ></v-numeric-input>
      <p>VCalculator example</p>
      <v-row>
        <v-col>
      <v-calculator
      :elevation="10"
      :dark = "dark"
      :fab = "fab"
      :outlined = "outlined"
      :rounded = "rounded"
      :text = "text"
      ></v-calculator>
        </v-col>
        <v-col>
          <v-switch v-model="fab" class="ma-2" label="fab"></v-switch>
          <v-switch v-model="outlined" class="ma-2" label="outlined"></v-switch>
          <v-switch v-model="rounded" class="ma-2" label="rounded"></v-switch>
          <v-switch v-model="text" class="ma-2" label="text"></v-switch>
          <v-switch v-model="useGrouping" class="ma-2" label="useGrouping"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import VNumericInput from './components/VNumeric'
import VCalculator from './components/VNumeric/VCalculator'

export default Vue.extend({
  name: 'App',

  components: {
    VNumericInput,
    VCalculator
  },

  data: () => ({
    dark: false,
    fab: false,
    outlined: false,
    rounded: false,
    text: false,
    numPrecision: 2,
    useGrouping: false,
    prefix: '$'
  })
})
</script>

<style >
   .demo-content {
     display: flex;
     align-content: center;
     justify-content: center;
     padding: 200px
   }

</style>
