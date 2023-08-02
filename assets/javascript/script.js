$('#rangestart').calendar({
    type: 'date',
    endCalendar: $('#rangeend')
  });
  $('#rangeend').calendar({
    type: 'date',
    startCalendar: $('#rangestart')
  });

$('#pickDates').on('click', showDates);

function showDates() {
    var startDate = $('.start').val();
    var endDate = $('.end').val();
    console.log(startDate, endDate);
}

$(document).ready(function(){
  $('.ui.accordion').accordion();
});


// API Key
var apiKey = '9dNeLq2nvcwlctGtvDnExgSlMHam78mtKPhgrnn9';

// ref to the entire CAMPGROUND LIST container
var campContainer = document.getElementById('camp-container');
// ref to camp listing 
var campList = document.getElementById('camp-list');

// var for user checkbox: "do you have a campsite picked out yet?"
//var needCampHelp = 'false';

// --CAMPGROUND API PARAMETERS--
var campResultsLimit = 25;
// TO DO: Get park code from user response
//var parkName = document.getElementById("park-input").value;
var parkCode = 'care';


function clearCampContent() {
  campList.innerHTML = '';
}


// TODO : FUNCTION FOR DISPLAYING CAMPGROUND DETAILS
$('#camp-container').on('click', '.camp-details-btn', function(event) {
  event.preventDefault();
  getCampDetails($(this)); // perform function on clicked element
});

function getCampDetails(clickedElement){
  console.log(clickedElement);
}

function generateCampList(parkCode, apiKey) {
  // clear content if nes
  clearCampContent();
  

 var campCall = 'https://developer.nps.gov/api/v1/campgrounds?parkCode=' + parkCode + '&api_key=' + apiKey;
 //console.log(campCall);
 fetch(campCall)
 .then(function(response){
  if (!response.ok) {
    // TODO: we can't use alert windows. if something goes wrong with call we need another way to display it.
    console.log('api error');
  } else {
    return response.json();                       
  }
 })
 .then(function(data){
  console.log(data);
  console.log(data.data[0].name); // good
  // --CAMP LISTINGS--
  for (let i = 0; i < data.data.length; i++) {
    // div class .item
    var listItem = document.createElement('div');
    listItem.className = 'item';
    campList.appendChild(listItem);
    
    // div class .content CAMP NAME
    var listItemContent = document.createElement('div');
    listItemContent.className = 'left floated content mg-tp-sm';
    listItemContent.textContent = data.data[i].name ;
    listItem.appendChild(listItemContent);
    
    // bathroom


    //water

    // trash

    // div for CAMP DETAILS icon
    var rightFloatDiv = document.createElement('div');
    rightFloatDiv.className = 'right floated content';
    listItem.appendChild(rightFloatDiv);

    // arrow 
    var makeDetailsArrow = document.createElement('i');
    makeDetailsArrow.className= 'right arrow icon';
    rightFloatDiv.appendChild(makeDetailsArrow);

    // TO DO; REF TO FUNCTION TO GET DETAILS OF THAT CAMPGROUND WRAPPED IN ANCHOR EL APPENPED TO ARROW

    // TO DO: GET ANOCHOR TO EXECUTE FUNCT 
    var makeAnchorEl = document.createElement('a');
    makeAnchorEl.className = 'camp-details-btn';
   // makeAnchorEl.
    makeDetailsArrow.appendChild(makeAnchorEl);
    
  }
  
 })
}

// Check boxes that display/hide CAMPGROUND LIST div element
var findHelpCheckbox = document.getElementById('find-help');
var findOnMyOwnCheckbox = document.getElementById('find-on-my-own');

findHelpCheckbox.addEventListener('change', function (event) { // chat gpt assisted with these two event listeners
  if (event.target.checked) {
      // "I need help finding a campsite" checkbox is checked
      if (findOnMyOwnCheckbox.checked) {
          findOnMyOwnCheckbox.checked = false; // Uncheck the other checkbox
      }
      campContainer.style.display = 'block';
      generateCampList(parkCode, apiKey);
  } else {
      // "I need help finding a campsite" checkbox is unchecked
      
  }
});

findOnMyOwnCheckbox.addEventListener('change', function (event) {
  if (event.target.checked) {
      // "I will find it on my own" checkbox is checked
      if (findHelpCheckbox.checked) {
          findHelpCheckbox.checked = false; // Uncheck the other checkbox
      }
      campContainer.style.display = 'none';
  } else {
      // "I will find it on my own" checkbox is unchecked
      
  }
});
