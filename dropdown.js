let dropdown = document.getElementById('locality-dropdown');
let dropdown2 = document.getElementById('locality-dropdown2');
dropdown.length = 0;
dropdown2.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Player';

let defaultOption2 = document.createElement('option2');
defaultOption2.text = 'Choose Player';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;
dropdown2.add(defaultOption2);
dropdown2.selectedIndex = 0;

const url = 'player_info.json';

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    let option;
    let option2;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].id;
      dropdown.add(option);
      dropdown2.add(option);
      option2 = document.createElement('option2');
      option2.text = data[i].name;
      option2.value = data[i].id;
      dropdown.add(option2);
      dropdown2.add(option2);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}

request.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};

request.send();

action_function = function() {
    var newaction = this.value;
    console.log(newaction);
};
