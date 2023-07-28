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