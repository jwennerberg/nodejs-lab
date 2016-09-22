// require the dependencies we installed
var app = require('express')();
var responseTime = require('response-time')
var redis = require('redis');
var randomstring = require("randomstring");

var redis_port = (process.env.REDIS_PORT || 6379);
var redis_host = (process.env.REDIS_HOST || "redis");

// create a new redis client and connect to our local redis instance
var client = redis.createClient(redis_port, redis_host);

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

app.set('port', (process.env.PORT || 5000));
// set up the response-time middleware
app.use(responseTime());

app.get('/api/:nodekey', function(req, res) {
  var nodekey = req.params.nodekey;

  client.get(nodekey, function(error, result) {
      if (result) {
        // the result exists in our cache - return it to our user immediately
        res.send({ "value": result, "source": "redis cache" });
      } else {
        client.setex(nodekey, randomstring.generate(), genValue);
        res.send({ "value": genValue, "source": "Generated" });
      }
  });
});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});
