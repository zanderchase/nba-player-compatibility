function load_players() { 
  console.log('dropdowns');
  let dropdown = document.getElementById('locality-dropdown');
  dropdown.length = 0;
  let dropdown2 = document.getElementById('locality-dropdown2');
  dropdown2.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose Player 1';
  let defaultOption2 = document.createElement('option');
  defaultOption2.text = 'Choose Player 2';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  dropdown2.add(defaultOption2);
  dropdown2.selectedIndex = 0;

  const url = 'player_info.json';

  const request = new XMLHttpRequest();
  request.open('GET', url, true);

  var player_data = {}

  request.onload = function() {
    if (request.status === 200) {

      player_data = JSON.parse(request.responseText);
      let option;
      let option2;

      for (let i = 0; i < player_data.length; i++) {
        option = document.createElement('option');
        option.text = player_data[i].name;
        option.value = player_data[i].id;
        dropdown.add(option);

        option2 = document.createElement('option');
        option2.text = player_data[i].name;
        option2.value = player_data[i].id;
        dropdown2.add(option2);
      }
      console.log('donezos');
      (function() {  
            $(".chosen").chosen();
          })();
      return true;
     } else {
       console.log('fail');
       return false;
      // Reached the server, but it returned an error
    }   
  }

  request.onerror = function() {
    console.error('An error occurred fetching the JSON from ' + url);
  };
  console.log('send');
  request.send();
  console.log('end');
}
