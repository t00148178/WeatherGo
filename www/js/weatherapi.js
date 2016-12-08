
var apiKey = 'sW1JuVn3rTgLiaBfh9JY0rDcsSrqepdm';
var defaultLat = 40.730610;
var defaultLng = -73.935242;

//ajax
//  http://www.w3schools.com/jquery/ajax_ajax.asp



function getLocationId(lat, long) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback", jsonpCallback: "callback",
        url: "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=sW1JuVn3rTgLiaBfh9JY0rDcsSrqepdm&q=" + lat + "%2C" +  long   ,
        cache: false,
        success: function (data) {

            //testing output data
            //console.log(data.Key) //output data key to console
            //alert(data.Key);      //output data key to arelr window

            var locationId = data.Key;
            getWeather(locationId);
            $('#location_name').text(data.LocalizedName);
            $('#latitude').text(lat.toFixed(2));
            $('#longitude').text(long.toFixed(2));
        }
    });

}



function getWeather(locationId){

    var language = 'en-us', details = false, metric = true;

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback", jsonpCallback: "callback",
        url: "http://dataservice.accuweather.com/forecasts/v1/daily/1day/"+locationId+"?apikey=" + apiKey + "&language=" + language + "&details="+details+"&metric=" + metric,
        cache: false,
        success: function (data) {

            //console.log(data);
            //alert(data);

            $('#from_date').text(data.Headline.EffectiveDate.substring(0, data.Headline.EffectiveDate.indexOf('T')));
            $('#to_date').text(data.Headline.EndDate.substring(0, data.Headline.EndDate.indexOf('T')));
            $('#day_description').text(data.DailyForecasts[0].Day.IconPhrase);
            $('#night_description').text(data.DailyForecasts[0].Night.IconPhrase);
            $('#min_temperature').text(data.DailyForecasts[0].Temperature.Minimum.Value + 'c');
            $('#max_temperature').text(data.DailyForecasts[0].Temperature.Maximum.Value + 'c');
        }
    }); 
}





