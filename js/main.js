//global variables
var long, lat;
var isCel = false;
var tempLetter;

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
      width: '9em',
      height: 'auto'
    }));

    $('.weather').append($('<p></p>').append(data.weather[0].description + ' & ' + changeTemp(data.main.temp)+ ' °' + tempLetter).css({
      'font-size': '2em',
      'margin-bottom': '0'
    }));

    $('.weather').append($('<p></p>').append('In ' + data.name + ', ' + data.sys.country).css({
      'font-size': '1em',
      'margin': '0'
    }));
  })
};

function changeTemp(deg) {
  if (isCel = true) {
    temp = Math.floor(((deg * 9) / 5) + 32);
    isCel = false
    tempLetter = 'F'
  } else {
    temp = Math.floor(((deg - 32) * 5) / 9);
    isCel = true;
    tempLetter = 'C'
  }
  return temp;
}
