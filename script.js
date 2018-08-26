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
  },
  delayAnnounce: function(text, delay) {
    setTimeout(function() {
      alert(text);
    }, delay)
  }
}

new Vue({
  el: '#app',
  data: {
    health: {},
    gameOn: false,
    messages: [],
    usedSpecialAttack: false
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
    attack: function(myMaxDamage) {
      if (typeof(myMaxDamage) != 'number') {
        myMaxDamage = 10;
      }
      var myDamage = AppUtis.randNumber(myMaxDamage);
      var monsterDamage = AppUtis.randNumber(10);
      this.health.me -= monsterDamage;
      this.health.monster -= myDamage;
      this.broadcast({
        actionName: myMaxDamage == 20 ? 'Special Attack' : 'Attack',
        myAction: {
          text: 'Your attack damaged the monster by ' + myDamage,
          value: myDamage
        },
        monsterAction: {
          text: "The monster's attack damaged you by " + monsterDamage,
          value: monsterDamage
        }
      });
      this.checkFinish();
    },
    specialAttack: function() {
      this.attack(20);
      this.usedSpecialAttack = true;
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
    checkFinish: function() {
      if (this.health.me <= 0 || this.health.monster <= 0) {
        if (this.health.me <= 0 && this.health.monster <= 0) {
          AppUtis.delayAnnounce("It's a draw!", 300);
        } else {
          if (this.health.me <= 0) {
            AppUtis.delayAnnounce('You loose!', 300);
          }
          if (this.health.monster <= 0) {
            AppUtis.delayAnnounce('You win!', 300);
          }
        }

        var vueCxt = this;
        setTimeout(function() {
          vueCxt.gameOn = false;
        }, 300);
      }
    },
    startGame: function() {
      this.health = {
        me: 100,
        monster: 100
      };
      this.gameOn = true;
      this.usedSpecialAttack = false;
      this.messages = [];
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