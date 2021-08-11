const request=require('request')


const weatherstack=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=1a890d1033370e05b73d93999b2675ee&query='+encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'&units=m'

    request({url,json:true},(error,{body})=>{
        if(error)
        {   callback('Unable To Connect With Weather Servises!',undefined)  
        }
        else if(body.error)
        {   callback('Location Not Found!',undefined)         
        }
        else
        {   callback(undefined,body.current.weather_descriptions+' it is currently '+body.current.temperature +' degress out. it feels like '+ body.current.feelslike +' degress out. and its humidity is '+ body.current.humidity + '.')     
        }
    })
}
module.exports=weatherstack

// before it like this
// const url='http://api.weatherstack.com/current?access_key=1a890d1033370e05b73d93999b2675ee&query=37.8267,-122.4233&units=f'

// request({url:url,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable To Connect With Weather Servises!')
//     }
//     else if(response.body.error)
//     {
//         console.log('Location Not Found!')
//     }else
//     {
//         console.log(response.body.current.weather_descriptions+' it is currently '+response.body.current.temperature +' degress out. it feels like '+ response.body.current.feelslike +' degress out.')
//     }
// })