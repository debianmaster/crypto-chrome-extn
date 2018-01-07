
const requestConfig = {
  method: 'GET',
  mode: 'cors'
};

var app = new Vue({
  el: '#app',
  data() {
    return {
      coins: []
    }
  },
  computed: {
    filterCoins: function() {
      var symbols = ["DCN","TRX", "XVG", "VOISE", "PAC", "MINT", "DOGE","RDD","KIN","DOT","VOISE","BTC","MANA","XLM","XRP","IOTA","SC","DENT"];
      return this.coins.filter(function(coin){
        return symbols.indexOf(coin.symbol) > -1 
      });
    }
  },
  methods: {
    fetchUpdates: function() {
    var url = "https://api.coinmarketcap.com/v1/ticker/";
      var self = this;
      fetch(url, requestConfig)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
            response.json().then(function(coins) {
              self.coins = coins;
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }
  }
});
app.fetchUpdates();
setInterval(function(){
  //console.log('test')
  app.fetchUpdates();
},60000)