// We need this to build our post string
var querystring = require('querystring');
var https = require('https');

var data = {"action":"feedPet","signature":"720661163a161a3bbe5c1ecb8f513056","id":2,"params":{"revision":"44","user":"761982030492442","foods":[{"food":1,"pet":1},{"food":1,"pet":2},{"food":1,"pet":3},{"food":1,"pet":4},{"food":1,"pet":5},{"food":1,"pet":6}]}};

var query_data = {
    query: '{"action":"feedPet","signature":"720661163a161a3bbe5c1ecb8f513056","id":2,"params":{"revision":"44","user":"761982030492442","foods":[{"food":1,"pet":1},{"food":1,"pet":2},{"food":1,"pet":3},{"food":1,"pet":4},{"food":1,"pet":5},{"food":1,"pet":6}]}}'
  };


var sentCount = 0;


function PostCode() {
  // Build the post string from an object
  var post_data = querystring.stringify(query_data);

  // An object of options to indicate where to post to
  var post_options = {
      host: 'imabigfanof.criminalcasegame.com',
      port: '443',
      path: '/bridge.php',
      method: 'POST',
      headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
          'X-Requested-With': 'ShockwaveFlash/20.0.0.306',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('error', console.error);
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          console.log('sent count: ' + (++sentCount));

          if (sentCount >= 700) {
            console.log('completted');
            process.exit();
          }
      });
  });

  post_req.on('error', console.error);

  // post the data
  post_req.write(post_data);
  post_req.end();
}


var TARGET_SECOND = 330 * 1000; // 320 sec = 5m 30 s
var ONCE_TICK = 30 * 1000;

var TARGET_TICK = TARGET_SECOND / ONCE_TICK;

var ticker = 0;

function tick() {
    if (ticker === 0) {
        //$('#submit-request').click();
        PostCode();
        ticker = TARGET_TICK;
        console.log('request sent!');
    } else {;
        console.log('tick ' + ticker);
    }
    ticker--;
}

tick();
setInterval(tick, ONCE_TICK);
