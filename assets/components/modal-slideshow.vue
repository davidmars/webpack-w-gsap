<template>

  <div class="overlay"> <!-- START Modal -->

    <div id="button-close-vector" @click="$emit('close'), hideTab()">
      <div aria-hidden='true'>&times;</div>
    </div>

    <keep-alive>
      <component :is="getModal()">
        <!-- content set dynamically -->
      </component>
    </keep-alive>

  </div> <!-- END Modal -->

</template>

<script>

import { eventBus } from 'assets/main.js';

export default {

  components: {

  }, // END components
  props: [ 'imageSrc' ],// END props
  data() {
    return { 

    }; 
  }, // END data
  created() {

    var currentImageSrc = this.imageSrc;
    if (this.$root.debug) console.log( currentImageSrc + ' = currentImageSrc = this.imageSrc');

    if (this.$root.debug) console.log( this.imageSrc + ' = this.imageSrc modal-slideshow created');

  }, // END created
  methods: {
    
    getModal() {

      return require('assets/modals/' + this.imageSrc + '.vue');

    }, // END getModal

    hideTab() {
      var tabHidden = false;
      eventBus.$emit('tabVisibility', tabHidden);
    }, // END hideTab

  }, // END methods
  mounted() {

    // Using jquery for now

    // START GSAP Slideshow ====================================================

    // First the variables our app is going to use need to be declared

    //References to DOM elements
    var $window = $(window);
    var $document = $(document);
    //Only links that starts with #
    var $navButtons = $('.modal-nav-link').filter('[href^=\\#]');
    var $navGoPrev = $('.go-prev');
    var $navGoNext = $('.go-next');
    var $slidesContainer = $('.slides-container');
    var $slides = $('.slide');
    var $currentSlide = $slides.first();

    //Animating flag - is our app animating
    var isAnimating = false;

    //The height of the window
    var pageHeight = $window.innerHeight();

    //Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
    var keyCodes = {
      UP  : 38,
      DOWN: 40,
    };


      // Going to the first slide
    goToSlide($currentSlide);

    // Adding event listeners ====================================================

    $window.on('resize', onResize).resize();
    $window.on('mousewheel DOMMouseScroll', onMouseWheel);
    $document.on('keydown', onKeyDown);
    $navButtons.on('click', onNavButtonClick);
    $navGoPrev.on('click', goToPrevSlide);
    $navGoNext.on('click', goToNextSlide);

    // Internal functions ========================================================

    // When a button is clicked - first get the button href, and then slide to the container, if there's such a container
    function onNavButtonClick(event)
    {
      //The clicked button
      var $button = $(this);

      //The slide the button points to
      var $slide = $($button.attr('href'));

      //If the slide exists, we go to it
      if($slide.length)
      {
        goToSlide($slide);
        event.preventDefault();
      }
    } // END onNavButtonClick


    // onKeyDown ===========================================================
    // Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour
    // This way, if there's text input, the user is still able to fill it
    function onKeyDown(event)
    {

      var PRESSED_KEY = event.keyCode;

      if(PRESSED_KEY == keyCodes.UP || PRESSED_KEY == 37)
      {
        goToPrevSlide();
        event.preventDefault();
      }
      else if(PRESSED_KEY == keyCodes.DOWN || PRESSED_KEY == 39)
      {
        goToNextSlide();
        event.preventDefault();
      }

    } // END onKeyDown


    // onMouseWheel ===========================================================
    // When user scrolls with the mouse, we have to change slides
    function onMouseWheel(event)
    {
      //Normalize event wheel delta
      var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

      //If the user scrolled up, it goes to previous slide, otherwise - to next slide
      if(delta < -1)
      {
        goToNextSlide();
      }
      else if(delta > 1)
      {
        goToPrevSlide();
      }

      event.preventDefault();
    } // END onMouseWheel



    // goToPrevSlide ===========================================================
    // If there's a previous slide, slide to it
    function goToPrevSlide()
    {
      if($currentSlide.prev().length)
      {
        goToSlide($currentSlide.prev());
      }
    } // END goToPrevSlide


    // goToNextSlide ===========================================================
    // If there's a next slide, slide to it
    function goToNextSlide()
    {
      if($currentSlide.next().length)
      {
        goToSlide($currentSlide.next());
      }
    } // END goToNextSlide



    // goToSlide ===============================================================
    // Actual transition between slides
    function goToSlide($slide)
    {
      // If the slides are not changing and there's such a slide
      if(!isAnimating && $slide.length)
      {
        //setting animating flag to true
        isAnimating = true;
        $currentSlide = $slide;

        //Sliding to current slide
        TweenLite.to($slidesContainer, 1, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});

        //Animating menu items
        TweenLite.to($navButtons.filter('.active'), 0.5, {className: '-=active'});

        TweenLite.to($navButtons.filter('[href=\\#' + $currentSlide.attr('id') + ']'), 0.5, {className: '+=active'});

      }
    } // END goToSlide


    // onSlideChangeEnd ========================================================
    // Once the sliding is finished, we need to restore "isAnimating" flag.
    // You can also do other things in this function, such as changing page title
    function onSlideChangeEnd()
    {
      isAnimating = false;
    } // END onSlideChangeEnd

    // When user resize it's browser we need to know the new height, so we can properly align the current slide
    function onResize()
    {
      // eslint error 'event' defined but never used - function onResize(event)

      // This will give us the new height of the window
      var newPageHeight = $window.innerHeight();

      // If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
      if(pageHeight !== newPageHeight)
      {
        pageHeight = newPageHeight;

        //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
        TweenLite.set([$slidesContainer, $slides], {height: pageHeight + 'px'});

        //The current slide should be always on the top
        TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
      }

    } // END onResize

    // Apply click event to closeSectionModal
    $('#button-close-vector').on('click', function() {

      // Unbind the event handlers/listeners from the Modal/Ovrlay Function
      $window.off('resize', onResize).resize();
      $window.off('mousewheel DOMMouseScroll', onMouseWheel);
      $document.off('keydown', onKeyDown);
      $navButtons.off('click', onNavButtonClick);
      $navGoPrev.off('click', goToPrevSlide);
      $navGoNext.off('click', goToNextSlide);

    }); // END on click


  }, // END mounted
  ready: function() {
      

  }, // END ready

}; // END export default

</script>


<style scoped>


</style>