import VueRouter from 'vue-router';

let routes = [
  {
    path:      '/',
    props:     { id: 'section-home' },
    component: require('../sections/home.vue').default,

  },
  {
    path:      '/print',
    props:     { id: 'section-print' },
    component: require('../sections/section.vue').default,

  },
  {

    path:      '/video',
    props:     { id: 'section-video' },
    component: require('../sections/section.vue').default,

  },
  {

    path:      '/outdoor',
    props:     { id: 'section-outdoor' },
    component: require('../sections/section.vue').default,

  },
  {

    path:      '/online',
    props:     { id: 'section-online' },
    component: require('../sections/section.vue').default,

  },

];

export default new VueRouter({

  routes,

});
