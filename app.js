//  initially we need to fetch all the users details , so we have used below api 
const APIURL="https://api.github.com/users/"; 

const main =document.querySelector("#main"); // to add the deatils in the card , u can see main is ID

// search  in the search_bar based on id , BUT WHEN THERE IS NO-FOCUS ON THE SEARCH-BAR ,  THEN ALSO IT 
// SHOULD-WORK , SO MAKE IT GLOBAL 
const searchBox=document.querySelector("#search"); 

// it is arrow function , Async function
const getUser= async (username) => {
    // we want the function to wait here untill we get the  desired-response 
    const response = await fetch(APIURL + username); 
    
    /* google : promise in javascript means 
    What is a Promise in JavaScript and when to use it?
    In JavaScript, a promise is a placeholder (proxy) for the value of an ongoing operation. You typically use a promise to manage situations where you must wait for the outcome of an operation.
    */

    // wait till we get response for data , and then convert it into json format  , untill then dont execute 
    // next-line
    const data = await response.json(); 
    
    // console.log(data); // it gives object ==> all_details  , WE WANT HIS DATA TO BE SHOWN ON SCREEN  
    
    // now i want that when i search only , then i WANT THAT CARD-TO-APPEAR, SO I NEED HTML-FORMAT , i am making DYNAMIC-HTML , 

    // avatar_url : is the key or link for the image of the github_repo (of specific person's image )
    const card = `
    <div class="card">
        <div>
        <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
        </div>
        
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p> 

            <ul class="info">
                <li>${data.followers}<strong>Followers</strong></li>
                <li>${data.following}<strong>Following</strong></li>
                <li>${data.public_repos}<strong>Repos</strong></li>
            </ul>
                
                <div id="repos">
                   
                </div>
            </div>
    </div>       
    `
    main.innerHTML=card;  // so when we give user , input ==> it should show his details using html on screen 
    
    // cuz i want to display everything about git-hub-user only when i search ( not by-default (init) )
    getRepos(username) ; 
}

// now i want to PRINT all-repos of that specific github-account to search , directly on the screen  , u can 
// click on any-repo , and visit the html-page , I CAN-ACCESS EACH DETAIL , of that GIT-HUB - ACCOUNT, 

// this is also a async function
const getRepos = async(username) => {
    // now we want to add all repos in to the ( div#id=repos )
    const repos=document.querySelector("#repos");

    // check url section => add this "/repos" with url and search in google  -> to fetch all the repos 
    // (means=> every single detail)
    const response = await fetch(APIURL + username + "/repos"); 
    
    const data = await response.json(); // wait till we get response for data , and then convert it into json file , , untill then dont execute next-line
    
    // console.log(data); // it gives object ==> all_details  , WE WANT HIS DATA TO BE SHOWN ON SCREEN  
    
    // now i want to loop till Everything in data 
    data.forEach(
        (item) => {
        // console.log(item); // i will get each element details 
        const elem=document.createElement("a") // a is anchor tag <a>
        elem.classList.add("repo") ; // to add a class repo from the classlist 
        
        // item.html_url ==> catching each item and adding it to <a> or anchor tag , (as repo in Github , 
        // each as a url ) , and helps to visit them as-well 
        elem.href = item.html_url;  
        
        elem.innerText = item.name; //to write a text 
        
        elem.target="_blank" // to open in next-page , next-tab , for each-detail
        repos.appendChild(elem); // to append each-element as a children
    });
}

// initial-call ==> init-call
getUser("taylorotwell")

// all-time , we done from init method , we want user to search , and then give the git-hub account
// arrow-function
const formSubmit=()=> {
    if(searchBox.value !="") {
        // we are passing name , when i press Enter , details should-come , (it takes some-time) to load  
        getUser(searchBox.value); 
        // , now i need to delete that text from search-bar also
        searchBox.value="";
    }
    
    return false ; // so when form is submitted , web-page should not be submitted 
}

// when i type-user-name , and take my-mouse somewhere also , then i press-enter , still also i want a response ,
// so i need to look for "focusout" event to handle
searchBox.addEventListener(
    "focusout" , 
    function() {
        formSubmit();
    }
);
