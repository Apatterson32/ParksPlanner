const apiKey = 'ebcf60ba77c2c60649057738c3342155';
const activities = JSON.parse(localStorage.getItem('activities'));
console.log(activities);
var headPhoto = document.getElementById('head-photo');
headPhoto.src = localStorage.getItem('Park-Photo-Url');
var startDate = new Date(localStorage.getItem('start'));
var endDate = new Date(localStorage.getItem('end'));


// Function that formats dates for dateArray in getDatesBetween
function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
  
    return `${month}/${day}/${year}`;
  }

// Initialize and store an array for user's chosen trip dates
function getDatesBetween(start, end) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(dateArray)
    return dateArray;
    };

// This code below will call for current weather data in Springdale Utah aka Zion
// TODO Create a button from index.html that takes the park chosen information to help populate correct location weather with openweathermap api

// City and country code for Springdale, Utah (us)
const city = localStorage.getItem('Park-City');
const state = localStorage.getItem('Park-State');
const countryCode = 'us';

    // URL for fetching weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;

    // Function to fetch weather data and update the HTML
    async function fetchWeather() {
        getDatesBetween(startDate, endDate);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            const cityName = data.name;
            const weatherDescription = data.weather[0].description;
            const temperatureFahrenheit = data.main.temp;
            
            const weatherInfo = `${cityName}: ${weatherDescription}. Temperature: ${temperatureFahrenheit}°F`;
            
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.textContent = weatherInfo;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    
const fetchButton = document.getElementById('fetch-button');

fetchButton.addEventListener('click', fetchWeather);

// Function to populate Things To Do list for park
window.onload = populateThingsToDo();

function populateThingsToDo() {
    var parkNameEl = document.getElementById('park-name');
    var parkDescriptionEl = document.getElementById('park-description');
    parkNameEl.innerText = localStorage.getItem('Park-Name') + ' National Park';
    parkDescriptionEl.innerText = localStorage.getItem('Park-Description');
    for (let i = 0; i < activities.length; i++) {
        var activitiesList = document.getElementById('activities-list');
        var newActivity = activities[i].name;
        var newItem = document.createElement("p");
        newItem.id = 'p' + i;
        newItem.classList.add('drag-item');
        newItem.draggable = true;
        newItem.setAttribute('ondragstart', 'dragstart_handler(event)');
        newItem.textContent = newActivity;
        activitiesList.appendChild(newItem);
    }
}

// Click and drag to drop function

// Event handler when item is dropped onto any target
function drop_handler(event, targetId) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const draggedItem = document.getElementById(data);
  const target = document.getElementById(targetId);

  // Create a new draggable item and append it to the target
  const newItem = document.createElement("p");
  newItem.textContent = draggedItem.textContent;
  newItem.draggable = true;
  newItem.classList.add("drag-item");
  newItem.ondragstart = dragstart_handler;
  newItem.onclick = function () {
    target.removeChild(newItem); // Removes the clicked item
  };
  target.appendChild(newItem);
}

// Event handler when item is dragged over the target
function dragover_handler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

// Event handler when dragging starts
function dragstart_handler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}


var myCampContentEl = document.getElementById('my-camp-content');

// var for if camp site data is visible
var myCampVisible = false; // not visible by default
function displayDetailsEl() {
    
    if (myCampVisible === true) {
        myCampContentEl.style.display = 'block'; 
        console.log('details on');
    } else {
        myCampContentEl.style.display = 'none';
        console.log('details off');
    }
}

window.onload = displayDetailsEl;

function getMyCampSiteData () {
    console.log('getMyCampSiteData is exe');
    var savedCampsiteData = JSON.parse(localStorage.getItem('My-Site'));
    
    console.log(savedCampsiteData);
    

    // toggle visibility when View My Site is clicked
    myCampVisible = !myCampVisible; 
    
    // generate info

    //trash
    var trashNotesEl = document.getElementById('trash-notes');
    var trashNotes = savedCampsiteData.amenities.trashRecyclingCollection;
    if (trashNotes === '') {
        trashNotesEl.textContent = 'None';

      } else {
        trashNotesEl.textContent = trashNotes;
      }
    
    // toilets
    var toiletsEl = document.getElementById('toilet-notes');
    var toiletNotes = savedCampsiteData.amenities.toilets[0];
    toiletsEl.textContent = toiletNotes;
    if (toiletsEl.textContent === '') {
            toiletsEl.textContent = 'None';
    }
    
    // cell reception
    var receptionEl = document.getElementById('reception-notes');
    var receptionNotes = savedCampsiteData.amenities.cellPhoneReception;
    receptionEl.textContent = receptionNotes;
    if (receptionEl.textContent === '') {
      receptionEl.textContent = 'No information available';
    }      

    // host availability
    var hostEl = document.getElementById('host-notes');
    var hostNotes = savedCampsiteData.amenities.staffOrVolunteerHostOnSite;
    hostEl.textContent = hostNotes;
    if (hostEl.textContent === '') {
      hostEl.textContent = 'No information available';
    } 

    // camp description
    var campDescriptionEl = document.getElementById('camp-info-text');
    var campNotes = savedCampsiteData.campDescription;
    campDescriptionEl.textContent = campNotes;
    if (campDescriptionEl.textContent === '') {
      campDescriptionEl.textContent = 'Sorry, no reservation information is available for this campsite.'
    }

    // camp name on details page
    var campNameSubHead = document.getElementById('camp-detail-name');
    var campTitle = savedCampsiteData.campTitle;
     campNameSubHead.textContent = campTitle;

    // reservation info text below description
    var campReservationInfoEl = document.getElementById('reservation-notes');
    var campResNotes = savedCampsiteData.campResNotes;
    campReservationInfoEl.textContent = campResNotes; 

    // regulations
    var campRegulationsEl = document.getElementById('camp-regulations-text');
    var regulationNotes = savedCampsiteData.regulationNotes;
    campRegulationsEl.textContent = regulationNotes;
    
    var campRegUrlEl = document.getElementById('regulations-url');
    var campRegUrl = savedCampsiteData.campRegUrl;
    campRegUrlEl.textContent = campRegUrl;
    if (campRegulationsEl.textContent === '' && campRegUrlEl.textContent === ''){
        campRegulationsEl.textContent = 'No regulation information available.'
    }


}

// event listener for 'view my site' button
$('#view-my-site').on('click', getMyCampSiteData);
$('#view-my-site').on('click', displayDetailsEl);