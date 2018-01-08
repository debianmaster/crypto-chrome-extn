
const requestConfig = {
  method: 'GET',
  mode: 'cors'
};

var app = new Vue({
  el: '#app',
  data() {
    return {
      coins: [],
      totalUSDBalance:0,
      qty:{
        "DCN":200000.00000000,
        "TRX":42399.86720300, 
        "XVG":23447.89800000, 
        "VOISE":1918.78531541, 
        "PAC":20863549.40119760,
        "MINT":0,
        "DOGE":85182.60146374,
        "RDD":47633.61019896,
        "KIN":3863398.244,
        "DOT":3550.77932768,
        "BTC":0.06786401,
        "MANA":0,
        "XLM":0.30268000,
        "XRP":26.32200000,
        "IOTA":0.24200000,
        "SC":0,
        "DENT":0,
        "ETH":3.75881222,
        "LINDS":132801.08410630
      }
    }
  },
  computed: {
    filterCoins: function() {
      var symbols = ["DCN","TRX", "XVG", "VOISE", "PAC", "MINT", "DOGE","RDD","KIN","DOT","BTC","MANA","XLM","XRP","IOTA","SC","DENT"];
      return this.coins.filter(function(coin){
        return symbols.indexOf(coin.symbol) > -1;
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
              var totalBalance=0;
              coins.map(function(coin,index){
                  coin['qty']=self.qty[coin.symbol];
                  coin['usdValue']=parseFloat(coin['qty']*coin.price_usd).toFixed(0);
                  if(!isNaN(coin['usdValue'])){
                  totalBalance+=parseFloat(coin['usdValue']);
                  coin.price_usd=parseFloat(coin.price_usd).toFixed(4);
                  }
              });
              self.coins = coins;
              self.totalUSDBalance=totalBalance;
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
  //app.fetchUpdates();
},60000)