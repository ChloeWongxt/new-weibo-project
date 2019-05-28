<template>
    <div>
    <v-footer  height="100%" width="100%">
        <v-card flat tile class="white text-xs-center" style="padding-top: 10px">
            <v-card-text class=" pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
                &copy;2019 — <strong>Chloe</strong>
            </v-card-text>
        </v-card>
    </v-footer>
    </div>
</template>

<script>
export default {
    name:'Footer',
    data() {
        return{
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram'
            ]
        }
    }
}
</script>
<style scoped>

</style>