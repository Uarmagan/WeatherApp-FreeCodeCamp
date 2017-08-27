//global variables
var long, lat;
var tempLetter = 'C';
var today = new Date();
var time = function() {
  var hours = today.getHours();
  var minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

  if (hours < 12) {
    return hours + ":" + minutes + " AM";
  } else {
    if (hours >= 13) {
      return hours - 12 + ":" + minutes + " PM";
    } else {
      return hours + ":" + minutes + " PM";
    }
  }
}

$(document).ready(function() {
  //get the geolocation of user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      //call the function that uses the ajax call to get the data
      getWeather(long, lat);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
})


function getWeather(long, lat) {
  //function gets the latitude/longitude and inserts it into the url to get the appropriate data.
  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?lon=' + long + '&lat=' + lat
  }).done(function(data) {
    console.log(data);


    $('.picture').append($('<img>').attr('src', data.weather[0].icon).css({
      width: '10em',
      height: 'auto'
    }));

    $('#tempNum').text(Math.floor(data.main.temp) + String.fromCharCode(176));
    $('#tempUnit').text(tempLetter);


    $('.weather').append($('<p></p>').append(data.weather[0].description).css({
      'font-size': '3em'
    }));

    $('.weather').append($('<p></p>').append('In ' + data.name + ', ' + data.sys.country).css({
      'font-size': '1.5em',
      'margin-top': '.5em'
    }));

    $('.weather').append($('<p></p>').append(time).css({
      'font-size': '2em',
      'margin-top': '.5em'
    }));
  })
};
$('#changeIt').click(function() {
  let temp = Math.floor(parseInt($('#tempNum').text()));
  let unit = $('#tempUnit').text();

  $('#changeIt').text(unit);

  if (unit === 'C') {
    // C to F
    temp = ((temp * 9) / 5) + 32;
    $('#tempNum').text(Math.floor(temp) + String.fromCharCode(176));
    $('#tempUnit').text('F');
  }
  else {
    // F to C
    temp = ((temp - 32) * 5) / 9;
    $('#tempNum').text(Math.floor(temp) + String.fromCharCode(176));
    $('#tempUnit').text('C');
  }

});
