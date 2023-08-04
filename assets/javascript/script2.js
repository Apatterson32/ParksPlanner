$("#back-btn").on('click', function() {
    window.location.replace('./index.html');
})

function getMyCampSiteData () {

    var savedCampsiteData = JSON.parse(localStorage.getItem('My-Site'));
    
    console.log(savedCampsiteData);
   
    return savedCampsiteData
}

//  to do: get ref to camp name for above function

$('#view-my-site').on('click', getMyCampSiteData);