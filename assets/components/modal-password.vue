<template>

  <transition name="fade">
  <div v-if="showPasswordModal" class='password-modal'>

    <form id='password-form' class='log-in-form'>

      <label class="password-title">Password<input type='text' name='password' placeholder='Password' v-model="password"></label>

      <label class='password-response'><transition name="fade-response" @after-enter="showMessage = false"><span v-if="showMessage">{{ message }}</span></transition></label>

      <p><input @click.prevent="passwordSubmit()" id='submit-button' type='submit' class='button expanded'></p>

      <p><a @click="showMessage = false, password = '', hideTab(), showPasswordModal = false" type='cancel' class='button expanded cancel-me'>Cancel</a></p>
    </form>
  </div>
  </transition>

</template>


<script>

import { eventBus } from 'assets/main.js';

export default {

  props: [ 'id', 'alt', 'client', 'sector', 'lockit' ], // END props
  data() {
    return {

      showPasswordModal: false,
      showMessage: false,
      message: '',
      password: '',
      selectResponse: [
        'No soup for you!', 
        'I\'m a Toys\'R\'Us Kid too!', 
        'These aren\'t the droids you\'re looking for... Move along.', 
        'Hhhhhmmmm Salty!',
        'Again? Really?!',
        'Shall we play a game?',
        'Great googly moogly Batman!',
        'Dammit Jim I\'m a Doctor!',
        'A mind is a terrible thing to waste.',
        'Reach out and touch someone.',
        'Help! I\'ve fallen and can\'t get up.',
        'When will there be a sidekick uprising?',
        'Help me Obi-Wan Kenobi, you\'re my only hope.',
        'Just do it!',
        'Think Different.',
        'Enjoy the ride.',
        'Isn\'t that special.',
        'Meteor S**t!',
        'To infinity and beyond!',
        'Wrecked \'em? Damn near killed \'em!',
        'I am afraid I can\'t do that Dave.',
        'This sucks worse than that time I went to that museum.',
        'I owe it all to little chocolate donuts.',
        'I need more cowbell!',
        'One tube is all you need.',
        'My brother might be coming the other way!',
        'Thank you for taking Johnny Cab.',
      ], // END selectResponse
    };
  }, // END data
  computed: {


  }, // END computed
  created() {

    eventBus.$on('passwordStatus', (showPasswordModal) => {
          
      this.showPasswordModal = showPasswordModal;
      return this.showPasswordModal;

    }); // END eventBus


  }, // END created
  methods: {

    hideTab() {
      var tabHidden = false;
      eventBus.$emit('tabVisibility', tabHidden);
    },

    passwordSubmit() {

      var password = this.password; 

      if (password == 'BigPharma') {

        // then animate the modal
        if (this.$root.debug) console.log('Correct password entered');
        this.hideTab();
          
        this.password = '';
        return this.password;

      } else {
        if (this.$root.debug) console.log('Wrong password entered');

        this.showMessage = true;

        this.password = '';

        this.message = this.selectResponse[Math.floor(Math.random() * this.selectResponse.length)];

        if (this.$root.debug) console.log(this.message + ' = currentResponse');
            
        return this.message, this.password, this.showMessage;

      } // END IF ELSE

    }, // END passwordSubmit

  }, // END methods
  destroyed() {
        
    // turn off binding to prevent multiple instances
    this.$off('passwordStatus');
    this.$off('tabVisibility');


  }, // END destroyed
    

}; // END export default

</script>



<style scoped>

  /* fade in or out overlay */

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity .35s ease;
  }

  .fade-enter-to {
    /* Vue JS Default is opacity: 1; */
  }

  .fade-leave {
    /* Vue JS Default is opacity: 1; */
  }

  .fade-leave-active {
    transition: opacity .35s ease;
  }

  .fade-leave-to {
    opacity: 0;
  }


  /* fade the wrong password response text */
  
  .fade-response-enter {
    opacity: 0;
  }

  .fade-response-enter-active {
    transition: opacity 1.75s ease;
  }

  .fade-response-enter-to {
    /* Vue JS Default is opacity: 1; */
  }

  .fade-response-leave {
    /* Vue JS Default is opacity: 1; */
  }

  .fade-response-leave-active {
    transition: opacity 1.75s ease;
  }

  .fade-response-leave-to {
    opacity: 0;
  }


</style>