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
// while (myCampVisible === false) {
//     myCampContentEl.style.display = 'none';
//     console.log('details off')
// }
function getMyCampSiteData () {
    console.log('getMyCampSiteData is exe');
    var savedCampsiteData = JSON.parse(localStorage.getItem('My-Site'));
    
    console.log(savedCampsiteData);
    

    // toggle visibility when View My Site is clicked
    myCampVisible = !myCampVisible; 
    
    // return savedCampsiteData
}

// event listener for 'view my site' button
$('#view-my-site').on('click', getMyCampSiteData);
$('#view-my-site').on('click', displayDetailsEl);