const request = require('request');
const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=pune,in&mode=json&units=metric&cnt=1&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";


exports.weather = (req, res)=>{
    request(weatherUrl, (err,response,body) =>{
        if(err){
            console.log(err);
        } else {
           
            const result = JSON.parse(body);
            res.render("home",{result,title:'Weather'});
        }
    });
}

