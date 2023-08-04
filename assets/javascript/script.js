$('#rangestart').calendar({
    type: 'date',
    endCalendar: $('#rangeend')
  });
  $('#rangeend').calendar({
    type: 'date',
    startCalendar: $('#rangestart')
  });

$('#pickDates').on('click', getParkCode);

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
//ref to camp details container
var campDetailsContainer = document.getElementById('camp-details-container');
// these containers are hidden unless 'I need help" checkbox is clicked
campDetailsContainer.style.display = 'none';
campContainer.style.display = 'none';

// --CAMPGROUND API PARAMETERS--
var campResultsLimit = 15;
// TO DO: Get park code from user response
var parkCode = '';
function getParkCode() {
  var parkName = document.getElementById("park-input").value;
  console.log(parkName);
  
  var parkCodeCall = 'https://developer.nps.gov/api/v1/parks?q=' + parkName + '&api_key=' + apiKey;
  console.log(parkCodeCall);
  fetch(parkCodeCall)
    .then(function (response) {
      if (!response.ok) {
        // TODO: we can't use alert windows. if something goes wrong with the call we need another way to display it.
        console.log('api error');
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      parkCode = data;
    });
};




function clearCampContent() {
  campList.innerHTML = '';
}

$(document).on('click', '.camp-button', function(event) {
  event.preventDefault();
  // ref to clicked arrow's sibling object
  var sibling = $(this).parent().siblings('.content');
   //console.log(sibling);

  // ref to clicked arrow's respective camp name
  var campName = sibling[0].innerHTML;
  // pass camp name to display camp details function
  getCampDetails(campName);
  // var textValue = $(this).siblings('.description').val();
  
});

// TODO: make function for displaying/hiding campground details div


// TODO : FUNCTION FOR DISPLAYING CAMPGROUND DETAILS
function getCampDetails(clickedCamp) {
  console.log('you clicked on this camp: ' + clickedCamp);
  campDetailsContainer.style.display = 'block';
  //clear camp details div
  // campDetailsContainer.innerHTML = '';

  var campDetailsCall = 'https://developer.nps.gov/api/v1/campgrounds?parkCode=' + parkCode + '&api_key=' + apiKey;
  fetch(campDetailsCall)
    .then(function (response) {
      if (!response.ok) {
        // TODO: we can't use alert windows. if something goes wrong with the call we need another way to display it.
        console.log('api error');
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);

      // conditional statement to find correct camp name in the data and display it
      for (let i = 0; i < data.data.length; i++) {
        // ref to the correct info for corresponding camp
        var campIndex = data.data[i].name;
        if (clickedCamp === campIndex) {
          console.log('this camp is a match for what you clicked: ' + data.data[i].name);

          //display the div when arrow is clicked
          campDetailsContainer.style.display = 'block';

          // --CAMP AMENITIES--
          // ref to amenities in the API object
          var amenities = data.data[i].amenities;
          // console.log(amenities);

          // trash notes
          var trashNotesEl = document.getElementById('trash-notes');
          var trashNotes = amenities.trashRecyclingCollection;
         
          if (trashNotes === '') {
            trashNotesEl.textContent = 'None';

          } else {
            trashNotesEl.textContent = trashNotes;
          }
          
          // toilets
          var toiletsEl = document.getElementById('toilet-notes');
          var toiletNotes = amenities.toilets[0];
          
          toiletsEl.textContent = toiletNotes;
          if (toiletsEl.textContent === '') {
            toiletsEl.textContent = 'None';
          }

          // cell reception
          var receptionEl = document.getElementById('reception-notes');
          var receptionNotes = amenities.cellPhoneReception;
          receptionEl.textContent = receptionNotes;
          if (receptionEl.textContent === '') {
            receptionEl.textContent = 'No information available';
          }
          // host availability
          var hostEl = document.getElementById('host-notes');
          var hostNotes = amenities.staffOrVolunteerHostOnSite;
          hostEl.textContent = hostNotes;
          if (hostEl.textContent === '') {
            hostEl.textContent = 'No information available';
          } 

          // --RESERVATION INFO--
          // var reservation =  data.data[i].

          // camp description
          var campDescriptionEl = document.getElementById('camp-info-text');
          var campNotes = data.data[i].description;
          campDescriptionEl.textContent = campNotes;
          if (campDescriptionEl.textContent === '') {
            campDescriptionEl.textContent = 'Sorry, no reservation information is available for this campsite.'
          }

          // camp name on details page
          var campNameSubHead = document.getElementById('camp-detail-name');
          var campTitle = data.data[i].name;
          campNameSubHead.textContent = campTitle;


          // reservation info text below description
          var campReservationInfoEl = document.getElementById('reservation-notes');
          var campResNotes = data.data[i].reservationInfo;
          campReservationInfoEl.textContent = campResNotes;
          //to do: if duplicate paragraph, make it disappear

          //how to reserve link 
          var campHowToResEl = document.getElementById('how-to-reserve');
          var howToResNotes = data.data[i].reservationUrl;
          campHowToResEl.textContent = howToResNotes;
          // to do: make link be hyperlink
          if (campHowToResEl.textContent === '') {
            campHowToResEl.textContent = 'No reservation URL available. Check the Reservation info above for details.'
          }
          campHowToResEl.style.padding = '10px';

          // regulations
          var campRegulationsEl = document.getElementById('camp-regulations-text');
          var regulationNotes = data.data[i].regulationsOverview;
          campRegulationsEl.textContent = regulationNotes;
          
          var campRegUrlEl = document.getElementById('regulations-url');
          var campRegUrl = data.data[i].regulationsurl;
          campRegUrlEl.textContent = campRegUrl;

          if (campRegulationsEl.textContent === '' && campRegUrlEl.textContent === ''){
            campRegulationsEl.textContent = 'No regulation information available.'
          }

        }
      }
    });

  // TO DO: set my campsite to local storage
  // localStorage.setItem(key, textValue);
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
  //console.log(data);
  //console.log(data.data[0].name); // good
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
    rightFloatDiv.className = 'right floated content camp-button';
    listItem.appendChild(rightFloatDiv);

    // button
    var makeDetailsBtn = document.createElement('button');
    makeDetailsBtn.className = 'ui icon button';
    rightFloatDiv.appendChild(makeDetailsBtn);

    // arrow 
    var makeDetailsArrow = document.createElement('i');
    makeDetailsArrow.className= 'right arrow icon';
    makeDetailsBtn.appendChild(makeDetailsArrow);

    
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
      campDetailsContainer.style.display = 'none';
  } else {
      // "I will find it on my own" checkbox is unchecked
      
  }
});
