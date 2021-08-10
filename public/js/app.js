
// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //prevent default load event 
    e.preventDefault()
    messageOne.textContent = 'loadding...'
    messageTwo.textContent=''
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                // console.log(data.forcast);
                messageOne.textContent = data.forcast
                // console.log(data.location)
                messageTwo.textContent = data.location
            }
        })
    })
})

