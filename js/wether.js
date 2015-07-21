function getWeatherData(lang, fnOK, fnError) {
    navigator.geolocation.getCurrentPosition(locSuccess, locError);

    function locSuccess(position) {
        // Check cache
        var cache = localStorage.weatherCache && JSON.parse(localStorage.weatherCache);
        var currDate = new Date();
        // If the cache is newer than 30 minutes, use the cache
        if(cache && cache.timestamp && cache.timestamp > currDate.getTime() - 30*60*1000){
            fnOK.call(this, cache.data);
        } else {
            $.getJSON(
                'http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' +
                position.coords.longitude + '&units=metric' + '&lang=' + lang + '&callback=?',
                function (response) {
                    // Store the cache
                    localStorage.weatherCache = JSON.stringify({
                        timestamp: (new Date()).getTime(),	// getTime() returns milliseconds
                        data: response
                    });
                    // Call the function again
                    locSuccess(position);
                }
            );
        }
    }

    function locError(error) {
        var message = 'Location error. ';
        switch(error.code) {
            case error.TIMEOUT:
                message += 'A timeout occured! Please try again!';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'We can\'t detect your location. Sorry!';
                break;
            case error.PERMISSION_DENIED:
                message += 'Please allow geolocation access for this to work.';
                break;
            case error.UNKNOWN_ERROR:
                message += 'An unknown error occured!';
                break;
        }
        fnError.call(this, message);
    }
}

$(function() {
   
    
   getWeatherData('uk', fnOK, fnErr);    
    
    function fnOK(data) {
        
        var offset = (new Date()).getTimezoneOffset()*60*1000;
        
        var localTime00 = new Date(data.list[0].dt*1000 - offset);
        var localTime00HumanLanguage = moment(localTime00).calendar();
        var localTime01 = new Date(data.list[1].dt*1000 - offset);
        var localTime01HumanLanguage = moment(localTime00).calendar();
        console.dir(data);
   $('#1name').html(data.city.name + ' ' + data.city.country); 
   $('#1day').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[0].main.temp)); 
   $('#1eve').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[3].main.temp)); 
   $('#1night').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[6].main.temp));
   $('#1i1').html('<img src="png/'+data.list[0].weather[0].icon+'.png">'); 
   $('#1i2').html('<img src="png/'+data.list[3].weather[0].icon+'.png">');
   $('#1i3').html('<img src="png/'+data.list[6].weather[0].icon+'.png">');
   $('#1t1').html(moment( data.list[0].dt_txt).calendar()); 
   $('#1t2').html(moment( data.list[3].dt_txt).calendar());
   $('#1t3').html(moment( data.list[6].dt_txt).calendar());
   $('#1h1').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[0].main.humidity));
   $('#1h2').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[3].main.humidity));
   $('#1h3').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[6].main.humidity));
   $('#1w1').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[0].wind.speed));
   $('#1w2').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[3].wind.speed));
   $('#1w3').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[6].wind.speed));
   $('#1p1').html('<i class="wi wi-thermometer"></i>' + data.list[0].main.pressure);
   $('#1p2').html('<i class="wi wi-thermometer"></i>' + data.list[3].main.pressure);
   $('#1p3').html('<i class="wi wi-thermometer"></i>' + data.list[6].main.pressure);
   ////////
   $('#2day').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[0].main.temp)); 
   $('#2eve').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[3].main.temp)); 
   $('#2night').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[6].main.temp));
   $('#2i1').html('<img src="png/'+data.list[9].weather[0].icon+'.png">'); 
   $('#2i2').html('<img src="png/'+data.list[12].weather[0].icon+'.png">');
   $('#2i3').html('<img src="png/'+data.list[15].weather[0].icon+'.png">');
   $('#2t1').html(moment( data.list[9].dt_txt).calendar()); 
   $('#2t2').html(moment( data.list[12].dt_txt).calendar());
   $('#2t3').html(moment( data.list[15].dt_txt).calendar());
   $('#2h1').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[9].main.humidity));
   $('#2h2').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[12].main.humidity));
   $('#2h3').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[15].main.humidity));
   $('#2w1').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[9].wind.speed));
   $('#2w2').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[12].wind.speed));
   $('#2w3').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[15].wind.speed));
   $('#2p1').html('<i class="wi wi-thermometer"></i>' + data.list[9].main.pressure);
   $('#2p2').html('<i class="wi wi-thermometer"></i>' + data.list[12].main.pressure);
   $('#2p3').html('<i class="wi wi-thermometer"></i>' + data.list[15].main.pressure);
   ////////
   $('#3day').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[18].main.temp)); 
   $('#3eve').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[21].main.temp)); 
   $('#3night').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[24].main.temp));
   $('#3i1').html('<img src="png/'+data.list[18].weather[0].icon+'.png">'); 
   $('#3i2').html('<img src="png/'+data.list[21].weather[0].icon+'.png">');
   $('#3i3').html('<img src="png/'+data.list[25].weather[0].icon+'.png">');
   $('#3t1').html(moment( data.list[18].dt_txt).calendar()); 
   $('#3t2').html(moment( data.list[21].dt_txt).calendar());
   $('#3t3').html(moment( data.list[25].dt_txt).calendar());
   $('#3h1').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[18].main.humidity));
   $('#3h2').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[21].main.humidity));
   $('#3h3').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[25].main.humidity));
   $('#3w1').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[18].wind.speed));
   $('#3w2').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[21].wind.speed));
   $('#3w3').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[25].wind.speed));
   $('#3p1').html('<i class="wi wi-thermometer"></i>' + data.list[18].main.pressure);
   $('#3p2').html('<i class="wi wi-thermometer"></i>' + data.list[21].main.pressure);
   $('#3p3').html('<i class="wi wi-thermometer"></i>' + data.list[25].main.pressure);
   //////////
   $('#4day').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[27].main.temp)); 
   $('#4eve').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[30].main.temp)); 
   $('#4night').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[33].main.temp));
   $('#4i1').html('<img src="png/'+data.list[27].weather[0].icon+'.png">'); 
   $('#4i2').html('<img src="png/'+data.list[30].weather[0].icon+'.png">');
   $('#4i3').html('<img src="png/'+data.list[33].weather[0].icon+'.png">');
   $('#4t1').html(moment( data.list[27].dt_txt).calendar()); 
   $('#4t2').html(moment( data.list[30].dt_txt).calendar());
   $('#4t3').html(moment( data.list[33].dt_txt).calendar());
   $('#4h1').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[18].main.humidity));
   $('#4h2').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[21].main.humidity));
   $('#4h3').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[25].main.humidity));
   $('#4w1').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[18].wind.speed));
   $('#4w2').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[21].wind.speed));
   $('#4w3').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[25].wind.speed));
   $('#4p1').html('<i class="wi wi-thermometer"></i>' + data.list[18].main.pressure);
   $('#4p2').html('<i class="wi wi-thermometer"></i>' + data.list[21].main.pressure);
   $('#4p3').html('<i class="wi wi-thermometer"></i>' + data.list[25].main.pressure);
    //////////
   $('#5day').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[27].main.temp)); 
   $('#5eve').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[30].main.temp)); 
   $('#5night').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[33].main.temp));
   $('#5i1').html('<img src="png/'+data.list[27].weather[0].icon+'.png">'); 
   $('#5i2').html('<img src="png/'+data.list[30].weather[0].icon+'.png">');
   $('#5i3').html('<img src="png/'+data.list[33].weather[0].icon+'.png">');
   $('#5t1').html(moment( data.list[27].dt_txt).calendar()); 
   $('#5t2').html(moment( data.list[30].dt_txt).calendar());
   $('#5t3').html(moment( data.list[33].dt_txt).calendar());
   $('#5h1').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[27].main.humidity));
   $('#5h2').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[30].main.humidity));
   $('#5h3').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[33].main.humidity));
   $('#5w1').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[27].wind.speed));
   $('#5w2').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[30].wind.speed));
   $('#5w3').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[33].wind.speed));
   $('#5p1').html('<i class="wi wi-thermometer"></i>' + data.list[27].main.pressure);
   $('#5p2').html('<i class="wi wi-thermometer"></i>' + data.list[30].main.pressure);
   $('#5p3').html('<i class="wi wi-thermometer"></i>' + data.list[32].main.pressure);
     //////////
   $('#6day').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[34].main.temp)); 
   $('#6eve').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[37].main.temp)); 
   $('#6night').html('<i class="wi wi-celsius"></i>' + Math.round(data.list[40].main.temp));
   $('#6i1').html('<img src="png/'+data.list[34].weather[0].icon+'.png">'); 
   $('#6i2').html('<img src="png/'+data.list[37].weather[0].icon+'.png">');
   $('#6i3').html('<img src="png/'+data.list[40].weather[0].icon+'.png">');
   $('#6t1').html(moment( data.list[34].dt_txt).calendar()); 
   $('#6t2').html(moment( data.list[37].dt_txt).calendar());
   $('#6t3').html(moment( data.list[40].dt_txt).calendar());
   $('#6h1').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[34].main.humidity));
   $('#6h2').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[37].main.humidity));
   $('#6h3').html('<i class="wi wi-sprinkles"></i>' + Math.round(data.list[40].main.humidity));
   $('#6w1').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[34].wind.speed));
   $('#6w2').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[37].wind.speed));
   $('#6w3').html('<i class="wi wi-strong-wind"></i>' + Math.round(data.list[40].wind.speed));
   $('#6p1').html('<i class="wi wi-thermometer"></i>' + data.list[34].main.pressure);
   $('#6p2').html('<i class="wi wi-thermometer"></i>' + data.list[37].main.pressure);
   $('#6p3').html('<i class="wi wi-thermometer"></i>' + data.list[40].main.pressure);
    }
    adw51b33gi
    function fnErr(msg) {
      console.error(msg);   
    }
});