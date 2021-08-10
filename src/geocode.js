const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidXJ2aXNodmVrYXJpeWEiLCJhIjoiY2tyeGhpMnR3MHE4ejJwcHMwcjZ5NDd0OSJ9.DYUxCUD3r0eAzCzUH4IeRQ&limit=1'

    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect with weather servises!',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable find this location please try with another!',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode

// before it like this
// converting finding-name to letitude and longitude
// const gurl='https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoidXJ2aXNodmVrYXJpeWEiLCJhIjoiY2tyeGhpMnR3MHE4ejJwcHMwcjZ5NDd0OSJ9.DYUxCUD3r0eAzCzUH4IeRQ&limit=1'
// request({url:gurl,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable To Connect With Weather Servises!')
//     }
//     else if(response.body.features.length === 0){
//         console.log('Unable to find this location try another with location!')
//     }
//     else
//     {
//         const longitude=response.body.features[0].center[0]
//         const  latitude=response.body.features[0].center[1]
//         console.log('latitude is : '+latitude+' latitude is : '+longitude)
//     }
// })