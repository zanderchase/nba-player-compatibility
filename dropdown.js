//let dropdown = document.getElementById('locality-dropdown');
let dropdown = document.getElementById('myDropdown');
//dropdown.length = 0;

//let defaultOption = document.createElement('option');
//defaultOption.text = 'Choose Player 1';

//let defaultOption2 = document.createElement('option');
//defaultOption2.text = 'Choose Player 2';

//dropdown.add(defaultOption);
//dropdown.selectedIndex = 0;
//dropdown2.add(defaultOption2);
//dropdown2.selectedIndex = 0;

const url = 'player_info.json';

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    let option;
    for (let i = 0; i < data.length; i++) {
      a = document.createElement('a');
      a.text = data[i].name;
      a.value = data[i].id;
      dropdown.add(a);
      //dropdown2.add(option);
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

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
