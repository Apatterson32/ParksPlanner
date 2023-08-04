$("#back-btn").on('click', function() {
    window.location.replace('./index.html');
})

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