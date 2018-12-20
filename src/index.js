//New object to store only the dog id. We store the dog id when we have access to the dog id
//from the renderSingleDog function. 
const state = {
    dogID: ""
}

const dogURL = 'http://localhost:3000/dogs'





document.addEventListener('DOMContentLoaded', () => {
    
    function dogFetching () {
        fetch(dogURL)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
        }

    //From the button having an input type submit
    //When you click submit, the event bubbles up from the button to the form
    //Event bubbling in action
    //We have the whole form from the event listener ie. all of the form's content
    const dogForm = document.querySelector('#dog-form')
    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        //e.target refers to the whole form where we have access to the name, breed and sex
        const inputName = e.target.querySelector('input[type=name]')
        const inputBreed = e.target.querySelector('input[type=breed]')
        const inputSex = e.target.querySelector('input[type=sex]')
        const inputID = state.dogID

        const dogData = {
            name: inputName.value,
            breed: inputBreed.value,
            sex: inputSex.value
        }

        //When we make a REQUEST, we MANUALLY change what WE REQUEST 
        //in this case, the method being PATCH and the BODY our dogDATA being stringified
        fetch(`${dogURL}/${inputID}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogData)
        }).then(response => response.json())
        .then(dogFetching)     


    })

    dogFetching()

 

    const tableForDogs = document.querySelector('#table-body')



const renderDogs = dogs => {
    const tableForDogs = document.querySelector('#table-body')
    tableForDogs.innerHTML = ""
    dogs.forEach(dog => {
        tableForDogs.appendChild(renderSingleDog(dog))
    })


}

//the dog here represents a single dog object containing all the dog information
const renderSingleDog = dog => {
    const dogRow = document.createElement('tr')
    dogRow.innerHTML = `
    <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit Dog</button></td>
    `
    //Each dog has its own button and you have access to it within the function.
    const button = dogRow.querySelector('button')
    
    const inputName = document.querySelector('input[type=name]')
    const inputBreed = document.querySelector('input[type=breed]')
    const inputSex = document.querySelector('input[type=sex]')
    
    
    //This is a closure
    //Because the function is within the function with the same parameter(object) of dog in this case,
    //The eventlistener still has access to the dog object because it is within the scope
    //It is inside of the function so is still still within scope
    button.addEventListener('click', () => {
        inputName.value = dog.name
        inputBreed.value = dog.breed
        inputSex.value = dog.sex
        state.dogID = dog.id
    })
    return dogRow
}

})