<template>
    <v-app-bar :style="{'display': 'flex', 'align-items': 'center'}">
        <v-app-bar-title>BD FMO</v-app-bar-title>
        <v-textarea v-if="hidden == false" label="Search" placeholder="Write the name of student" auto-grow variant="solo-inverted" rows="1" row-height="15"></v-textarea>
        <v-btn :style="{'margin-left': '10px'}" @click="search" icon="mdi-magnify"></v-btn>
        <v-btn icon="mdi-plus"></v-btn>
    </v-app-bar>
</template>
<script>
export default {
    name: 'AppBar',
    data: () => ({
        hidden: true
    }),
    methods: {
        search() {
            this.hidden = !this.hidden
        }
    }
}
</script>
<style scoped>
::v-deep .v-input__details{
    min-height: 0px !important;
    padding-top: 0px !important;
}
::v-deep .v-messages {
    min-height: 0px !important;
    min-width: 0px !important;
}
</style>