var AppUtis = {
  randNumber: function(max) {
    return Math.floor(Math.random() * max) + 1;
  }
}

new Vue({
  el: '#app',
  data: {
    health: {
      me: 100,
      monster: 100
    }
  },
  methods: {
    attack: function() {
      this.health.me -= AppUtis.randNumber(10);
      this.health.monster -= AppUtis.randNumber(10);
    }
  }
})