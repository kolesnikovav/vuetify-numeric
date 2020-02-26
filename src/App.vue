<template>
  <v-app>
    <v-content>
      <v-numeric
      :autocomplete = "true"
      ></v-numeric>
      <v-calculator
      :elevation="10"
      dark
      text
      ></v-calculator>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import VNumeric from './components/VNumeric'
import VCalculator from './components/VNumeric/VCalculator'

export default Vue.extend({
  name: 'App',

  components: {
    VNumeric,
    VCalculator
  },

  data: () => ({
    //
  })
})
</script>
