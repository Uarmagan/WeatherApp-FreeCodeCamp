//global variables
var long, lat;
var isCel = true;
var temp;
var tempLetter = 'C';
var today = new Date();
var time = function() {
  if (today.getHours() < 12) {
    return today.getHours() + ":" + today.getMinutes() + " AM";
  } else {
    if (today.getHours() >= 13) {
      return today.getHours() - 12 + ":" + today.getMinutes() + " PM";
    } else {
      return today.getHours() + ":" + today.getMinutes() + " PM";
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

    temp = changeTemp(data.main.temp);
    $('.weather').append($('<p></p>').addClass('temp').append(temp + ' °' + tempLetter).css({
      'font-size': '3em'
    }));

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

    $('#changeIt').append(tempLetter);
  })
};

$('#changeIt').click(function() {
  $('.temp').html(changeTemp(temp) + ' °' + tempLetter);
});

function changeTemp(deg) {
    temp = Math.floor(((deg * 9) / 5) + 32);
  let temptemp = 0;
  if (isCel === true) {
    temptemp = Math.floor(((deg * 9) / 5) + 32);
    isCel = false;
    tempLetter = 'F';
  } else {
    temptemp = Math.floor(((deg - 32) * 5) / 9);
    isCel = true;
    tempLetter = 'C';
  }
  return temptemp;
}
