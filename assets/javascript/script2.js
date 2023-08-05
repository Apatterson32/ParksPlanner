$("#back-btn").on('click', function() {
    window.location.replace('./index.html');
})

// This code below will call for current weather data in Springdale Utah aka Zion
// TODO Create a button from index.html that takes the park chosen information to help populate correct location weather with openweathermap api
const apiKey = 'ebcf60ba77c2c60649057738c3342155';

    // URL for fetching weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Springdale,us&appid=${apiKey}&units=metric`;

    // Function to fetch weather data and update the HTML
    async function fetchWeather() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            
            const weatherInfo = `${weatherDescription}. Temperature: ${temperature}°C`;
            
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.textContent = weatherInfo;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    
const fetchButton = document.getElementById('fetch-button');
fetchButton.addEventListener('click', fetchWeather);

// Click and drag to drop function
function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.p1);
}

  window.addEventListener("DOMContentLoaded", () => {
    // Get the element by id
    const element = document.getElementById("p1");
    // Add the ondragstart event listener
    element.addEventListener("dragstart", dragstart_handler);
  });

  function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  function drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
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
