<template>
  <v-app>
    <v-main>
      <AppBar />
      <ShelfData />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import ShelfData from './components/ShelfData.vue';
import { ipcRenderer } from 'electron';


export default {
  name: 'App',

  components: {
    AppBar,
    ShelfData,

  },

  data: () => ({
  }),
  methods: {
  },
  mounted() {
    ipcRenderer.send('getALL')
    ipcRenderer.on('sendAll', (event, data) => {
      this.$store.dispatch('getAllStudents', data)
    })
  }
}
</script>
<style>
* {
  margin: 0;
}
</style>