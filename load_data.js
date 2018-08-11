const request_pct = new XMLHttpRequest();
request_pct.open('GET', 'pct_coefs.json', true);

var pct_coefs = {}

request_pct.onload = function() {
  if (request_pct.status === 200) {

    pct_coefs = JSON.parse(request_pct.responseText);
   } else {
     console.log('fail');
    // Reached the server, but it returned an error
  }   
}

request_pct.onerror = function() {
  console.error('An error occurred fetching the JSON for pct coefs');
};

request_pct.send();

const request_loc = new XMLHttpRequest();
request_loc.open('GET', 'loc_coefs.json', true);

var loc_coefs = {}

request_loc.onload = function() {
  if (request_loc.status === 200) {

    loc_coefs = JSON.parse(request_loc.responseText);
   } else {
     console.log('fail');
    // Reached the server, but it returned an error
  }   
}

request_loc.onerror = function() {
  console.error('An error occurred fetching the JSON for loc coefs');
};

request_loc.send();