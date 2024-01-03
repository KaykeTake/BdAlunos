<template>
  <v-app>
    <v-main>
      <AppBar/>
      <ShelfData/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import ShelfData from './components/ShelfData.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    ShelfData,

},

  data: () => ({
  }),
  methods:{
  },
}
</script>
<style>
*{
  margin:0;
}
</style>