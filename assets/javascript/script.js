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


// API Key
var apiKey = '9dNeLq2nvcwlctGtvDnExgSlMHam78mtKPhgrnn9';

// var for user checkbox: "do you have a campsite picked out yet?"
//var needCampHelp = 'false';

// --CAMPGROUND API PARAMETERS--
var campResultsLimit = 25;
// TO DO: Get park code from user response
var parkCode = 'care';


// TO DO: add conditional statement based on checkbox for camp help

function campSelect() {
  // TO DO: clear form content before generating list

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
 })
}

// TODO: remove this function call for user checkbox choice.
campSelect();