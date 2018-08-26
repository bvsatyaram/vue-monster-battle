var AppUtis = {
  randNumber: function(max) {
    return Math.floor(Math.random() * max) + 1;
  },
  normalizeNumber: function(num, min, max) {
    if (num < min) {
      num = min;
    } else if (num > max) {
      num = max;
    }

    return num;
  }
}

new Vue({
  el: '#app',
  data: {
    health: {},
    gameOn: false,
    messages: []
  },
  computed: {
    normalizedHealth: function() {
      this.health.me = AppUtis.normalizeNumber(this.health.me, 0, 100);
      this.health.monster = AppUtis.normalizeNumber(this.health.monster, 0, 100);
      return {
        me:  this.health.me,
        monster: this.health.monster
      }
    }
  },
  methods: {
    attack: function() {
      var myDamage = AppUtis.randNumber(10);
      var monsterDamage = AppUtis.randNumber(10);
      this.health.me -= monsterDamage;
      this.health.monster -= myDamage;
      this.broadcast({
        actionName: 'Attack',
        myAction: {
          text: 'Your attack damaged the monster by ' + myDamage,
          value: myDamage
        },
        monsterAction: {
          text: "The monster's attack damaged you by " + monsterDamage,
          value: monsterDamage
        }
      });
    },
    heal: function() {
      var myHeal = AppUtis.randNumber(20);
      var monsterDamage = AppUtis.randNumber(10);
      this.health.me = this.health.me + myHeal - monsterDamage;
      this.broadcast({
        actionName: 'Heal',
        myAction: {
          text: 'You healed your health by ' + myHeal,
          value: myHeal
        },
        monsterAction: {
          text: "The monster's attack damaged you by " + monsterDamage,
          value: monsterDamage
        }
      });
    },
    startGame: function() {
      this.health = {
        me: 100,
        monster: 100
      };
      this.gameOn = true;
    },
    endGame: function() {
      this.gameOn = false;
    },
    healthBarClasses: function(health) {
      var classes = ['progress-bar'];
      var contextualClasses = ['bg-danger', 'bg-warning', 'bg-info' ,'bg-success'];
      if (health == 100) {
        health = 99;
      }
      classes.push(contextualClasses[Math.floor(health / 25)]);
      return classes;
    },
    healthBarStyles: function(health) {
      return {
        width: health + '%'
      };
    },
    broadcast: function(message) {
      this.messages.unshift({
        actionName: message.actionName,
        myAction: message.myAction,
        monsterAction: message.monsterAction
      });
    },
    messageClass: function(actionName) {
      actionName = actionName.toLowerCase().replace(' ', '');
      return {
        attack: 'table-primary',
        specialattack: 'table-info',
        heal: 'table-success'
      }[actionName];
    }
  }
})