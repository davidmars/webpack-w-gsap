<template>

  <nav class="corner-nav-small">
      
      <div id="name-and-tag-small">
        <p id="name-title">Hainis Art Direction</p>
        <p id="tagline">&thinsp;bad name. good work.</p>
      </div>

    <div class="inner-wrap-fixed-scroll">
      <div class="inner-wrap">
        <div class="small-nav-top-spacer"></div>

        <nav-button-small v-for="navigationButton in navigationButtons" v-bind:key="navigationButton.id" :id="navigationButton.id" :section="navigationButton.section"></nav-button-small>

        <div class="small-nav-bottom-spacer"></div>
      </div>
    </div>

  </nav>

</template>


<script>

import navButtonSmall from 'components/nav-button-small.vue';

export default {

  components: {
     
    navButtonSmall,

  }, // END components
  data() {
    return {

      navigationButtons: [ 

        {id: 'nav-print-small', section: 'PRINT' },
        {id: 'nav-video-small', section: 'VIDEO' },
        {id: 'nav-outdoor-small', section: 'OUTDOOR' },
        {id: 'nav-online-small', section: 'ONLINE' },

      ], // END navButtons

      id: '',
      section: '',

    }; // END return
  }, // END data

}; // END export default

</script>



<style scoped>

#hero-wrap,
.hero-image {
  display: none;
  background-image: none;
}



</style>