<template>
  <v-app>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">VUETIFY-NUMERIC demo page</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon large href="https://github.com/kolesnikovav/vuetify-numeric"
        >GitHub</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <h1>Vuetify-numeric demo page</h1>
        <v-row>
          <v-col cols="2">
            <v-text-field xs3 v-model="label" label="Label"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field xs3 v-model="hint" label="Hint"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field xs3 v-model="prefix" label="prefix"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select
              xs3
              :items="locales"
              v-model="locale"
              label="current locale"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-checkbox
              xs3
              v-model="useGrouping"
              label="group digits"
            ></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-text-field
              xs3
              v-model="precision"
              label="precision"
            ></v-text-field>
          </v-col>
        </v-row>
        <span>Input style</span>
        <v-card class="d-flex pa-2" outlined tile>
        <v-row>
          <v-switch v-model="fab" class="ma-2" label="fab"></v-switch>
          <v-switch v-model="outlined" class="ma-2" label="outlined"></v-switch>
          <v-switch v-model="rounded" class="ma-2" label="rounded"></v-switch>
          <v-switch v-model="text" class="ma-2" label="text"></v-switch>
          <v-switch
            v-model="clearable"
            class="ma-2"
            label="clearable"
          ></v-switch>
          <v-switch v-model="readonly" class="ma-2" label="readonly"></v-switch>
          <v-switch v-model="useCalculator" class="ma-2" label="useCalculator"></v-switch>
        </v-row>
        </v-card>
        <span>Custom calculator's style</span>
        <v-card class="d-flex pa-2" outlined tile>
          <v-row>
            <v-switch
              v-model="calcStyle.fab"
              class="ma-2"
              label="fab"
            ></v-switch>
            <v-switch
              v-model="calcStyle.tile"
              class="ma-2"
              label="tile"
            ></v-switch>
            <v-switch
              v-model="calcStyle.outlined"
              class="ma-2"
              label="outlined"
            ></v-switch>
            <v-switch
              v-model="calcStyle.rounded"
              class="ma-2"
              label="rounded"
            ></v-switch>
            <v-switch
              v-model="calcStyle.text"
              class="ma-2"
              label="text"
            ></v-switch>
            <v-switch
              v-model="calcStyle.large"
              class="ma-2"
              label="Large"
            ></v-switch>
            <v-switch
              v-model="calcStyle.small"
              class="ma-2"
              label="small"
            ></v-switch>
          </v-row>
        </v-card>

        <v-row>
          <v-col cols="4">
            <v-text-field
              xs2
              type="number"
              v-model.number="value"
              label="value external"
              outlined
              clearable
              hint="Simulate external value change"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              xs2
              type="number"
              v-model.number="min"
              label="Minimum"
              outlined
              clearable
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              xs2
              type="number"
              v-model.number="max"
              label="Maximum"
              outlined
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <p>v-numeric component example</p>
        <v-row>
          <v-col cols="12" sm="10" md="6">
        <v-numeric
          xs3
          label="calculator use custom style"
          :hint="hint"
          :placeholder="placeholder"
          :locale="locale"
          :prefix="prefix"
          :useGrouping="useGrouping"
          :precision="precision"
          :fab="fab"
          :outlined="outlined"
          :rounded="rounded"
          :text="text"
          :clearable="clearable"
          :readonly="readonly"
          :min="min"
          :max="max"
          :use-calculator = "useCalculator"
          :calcStyle="calcStyle"
          v-model="value"
        ></v-numeric>
          </v-col>
          <v-col cols="12" sm="10" md="6">
        <v-numeric
          xs3
          label="calculator use the same style as text input"
          :hint="hint"
          :placeholder="placeholder"
          :locale="locale"
          :prefix="prefix"
          :useGrouping="useGrouping"
          :precision="precision"
          :fab="fab"
          :outlined="outlined"
          :rounded="rounded"
          :text="text"
          :clearable="clearable"
          :readonly="readonly"
          :min="min"
          :max="max"
          v-model="value"
        ></v-numeric>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import VNumeric from './components/VNumeric/VNumeric'

export default Vue.extend({
  name: 'App',

  components: {
    VNumeric
  },

  data: () => ({
    label: 'My label',
    hint: 'My hint',
    clearable: false,
    placeholder: 'type your number here',
    dark: false,
    fab: false,
    outlined: true,
    rounded: false,
    text: false,
    numPrecision: 2,
    useGrouping: true,
    min: -10000,
    max: 25000,
    prefix: '$',
    precision: 2,
    locale: 'en-US',
    locales: ['en-US', 'ru-RU', 'zh-ZH'],
    readonly: false,
    value: 0,
    useCalculator: true,
    calcStyle: {
      fab: false,
      outlined: false,
      rounded: false,
      text: false,
      tile: false,
      large: false,
      small: false
    }
  })
})
</script>

<style >
.demo-content {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 200px;
}
</style>
