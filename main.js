//create a variable with the url (API endpoint)
//http://api.nobelprize.org/v1/prize.json?year=1900&category=chemistry
let endpoint = 'http://api.nobelprize.org/v1/prize.json?';
let xhr;
let response;
let searchButton = document.getElementById("searchBtn");
//LISTEN TO THE SEARCH BUTTON
searchButton.addEventListener('click', search);
//PERFORM THE SEARCH
function search(){
    //CATCH USER INPUT
    // //1st WAY:
    // let inputs = document.getElementsByTagName('input');
    // console.log(inputs);
    // let category = inputs[0].value;
    // let year = inputs[1].value;
    //2nd WAY:
    let category = document.getElementsByTagName("input")['category'].value;
    let year = document.getElementsByTagName("input")['year'].value;

    let request = `${endpoint}category=${category}&year=${year}`;
    console.log(request);
    //CREATE THE XMLHTTP REQUEST OBJECT
    xhr = new XMLHttpRequest();
    //OPEN THE REQUEST
    xhr.open('GET', request, true);
    //SEND THE REQUEST
    xhr.send();
    //LISTEN TO READYSTATE AND CALL A FUNCTION TO PROCESS THE REQUEST
    xhr.onreadystatechange = processRequest;
}
//PROCESS THE SEARCH RESULTS
function processRequest(e){
    if (xhr.readyState == 4 && xhr.status == 200){
        console.log("OK");
        response = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.log(response);
        
        //DISPLAY THE SEARCH RESULTS
        let searchResults = document.getElementById('output');
        searchResults.innerHTML = "";
        searchResults.innerHTML += `<h3>
            Year: ${response.prizes[0].year}<br>
            Category: ${response.prizes[0].category}<br>
            </h3>`;
        let laureates = response.prizes[0].laureates;
        laureates.forEach(person => {
            searchResults.innerHTML += `<h4>
                Winner: ${person.firstname}${person.surname}<br>
                Motivation: ${person.motivation}
            </h4>`;
        });
        // for (let i = 0; i < laureates.length; i++) {
        //     let name = laureates[i].firstname;
        //     let surname = laureates[i].surname;
        //     let motivation = laureates[i].motivation;
        //     searchResults.innerHTML += `<h3>
        //     Winner: ${name}${surname}<br>
        //     Motivation: ${motivation}
        //     </h3>`;
        // }
    }else{
        searchResults.innerHTML = xhr.status;
    }
}
//END OF PROGRAM