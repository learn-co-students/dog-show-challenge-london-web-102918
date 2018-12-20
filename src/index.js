let inputNameEl
let inputBreedEl
let inputSexEl

document.addEventListener('DOMContentLoaded', () => {
    inputNameEl = document.querySelector('#inputname')
    inputBreedEl = document.querySelector('#inputbreed')
    inputSexEl = document.querySelector('#inputsex')
    getDogs()
})




function getDogs() {
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(data => renderDogs(data))
}

function renderDogs(dogs) {
    const tbodyEl = document.querySelector('#table-body')


    dogs.forEach(dog => {
        const trowEl = document.createElement('tr')

        trowEl.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
        `
        const buttonEl = trowEl.querySelector('button')

        buttonEl.addEventListener('click', () => handleEditClick(dog))
        tbodyEl.appendChild(trowEl)

    });
}

function handleEditClick(dog) {
    const submitEl = document.querySelector('#submitform')

    submitEl.addEventListener('click', (event) => handleSubmit(dog.id, event))

    inputNameEl.value = dog.name
    inputBreedEl.value = dog.breed
    inputSexEl.value = dog.sex
}

function handleSubmit(dogId, event) {

    let updateName = inputNameEl.value
    let updateBreed = inputBreedEl.value
    let updateSex = inputSexEl.value

    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: updateName,
            breed: updateBreed,
            sex: updateSex
        })
    })

}