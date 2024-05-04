// // For Approach # 01 By using <form> tag  onsubmit approach.
// function todoDetail(event){
//     event.preventDefault();
//    let title = document.querySelector("#title");
//    let description = document.querySelector("#description"); 
//    console.log(title.value,description.value)
// }

// // For Approach # 03
// document.getElementById("addTodo").addEventListener("click",(e)=>{
//     e.preventDefault();
//        let title = document.querySelector("#title");
//        let description = document.querySelector("#description"); 
//        console.log(title.value,description.value)
// })
// ------------------We want our todo to not go anywhere after browser load that is why it is necessaryh to use window.onLoad -----------------
// 1) Use window.onload to to execute JavaScript only after the HTML has loaded
// 2) Onload is a built-in function that is triggered when a page has fully loaded. It is most commonly used to execute scripts that need to
//  access the DOM (Document Object Model).
window.onload = function(){
    // getValueFromLocalStorageAndSetIntoTodosArray();
    // showTodos();
    // checkTodosCount();
    // disableDeleteAllTodoButton()
    reRenderUi();
    console.log(todos.length);
    }
    
// ------------------------------------------------- For Approach # 02 onclick approach-------------------------------------------------------
// let todos = JSON.parse(localStorage.getItem("Todos")) || [];
// console.log(localStorage.getItem("Todos"),JSON.parse(localStorage.getItem("Todos")),todos);

//Todos get kar ky empty array my set karanay ky liye ham ny nichey aik function bana liya hay phelay ham uper wali approach use kar rhay thy
// lekin uss my 1 issue aa raha tha ky jab bhe my todo delete karta tha to woh page page sy ghaib nahe hota tha sirf page refresh karny ky baad hi 
// page sy delete todo jata tha to iss sab sy bachnay ky liye han ny nichey aik function bana liya hay (getValueFromLocalStorageAndSetIntoTodosArray())
let todos = []; 
let editTodoIndex;
let addTodoKey;
let showToastMessage = false;
let selectedTodosArray = [];
let title = document.querySelector("#title");
let description = document.querySelector("#description");

// // ------------------------------------Adding a new Todo to an todo object and then pushing it to Todos Array----------------------------------
function addTodo(){
    console.log(showToastMessage)
    if(editTodoIndex){
        console.log("edit todo",editTodoIndex)
        editTodoItem(editTodoIndex);
}

else{
    console.log("add todo",editTodoIndex)    
    let titleValue = title.value;
    let descriptionValue = description.value;
    if(!titleValue){
    alert("Adding Todos title is Mandatory!")
    return false
    }
  
    //  Here, we are checking if the title value is empty, it will not allow the user to create the todo.
// Approach # 01 (Noob appraoch)
//    if(titleValue === ""){
//     alert("Adding Todos title is Mandatory!")
//     return;
//    }

// Approach # 02 (Pro appraoch)
// if(!titleValue){ // not true then go inside block
//     alert("Adding Todos title is Mandatory!")
//     return;
// }
//  Creating object for todos
   let todo = {
    titleValue : titleValue,
    descriptionValue: descriptionValue, 
    // id: todos.length + 1 // poor way of making and id avoid this
    // id: Number((Math.random() * 1000).toFixed(0)) //better way to make id key
    id: new Date().getTime(), // best way to make id key.
    isCompleted : false
   }

todos.push(todo)
// console.log(todos, todo)
localStorage.setItem("Todos",JSON.stringify(todos)); //Todos is the key remember that
// console.log({titleValue,descriptionValue});
// showTodos()
// checkTodosCount()
// disableDeleteAllTodoButton()
showToastMessage = true;
reRenderUi();
console.log(showToastMessage)
toastMessage(showToastMessage)
document.querySelector("#title").value = ""
document.querySelector("#description").value = ""

}

//-------------------------------------------------------Taking Inputs from the USER.--------------------------------------------------------
// (Agar koi bhe falsy value ayi to yah code ko break hony sy bachaye ga or baki code ko fazool my execute nahe kareye ga ko uper hi code ki
//  execution rok dy ga). Iss cheez ko multiples methods sy kar skty han.
// --------------------------------------------------------------------------------------------------------------------------------------------
// Method # 01: (Here we are simply checking that if any of the input value is FALSE it will check in if case like ==> (!false) means true then
// it will go inside the if block and will return. Further code will not be executed. 
// execute) 
// let titleValue = document.querySelector("#titl").value; //id title hay titl nahe Here the output will be false phr if block my gy ga check 
// ho ga kuch aisy !false not false yani true of phr block ky andar jaa kar return hogy ga or agy code execute nahe hoga just (for checking learning purpose)
// let titleInput = document.querySelector("#title"); 
// let descriptionInput = document.querySelector("#description");
// if(!titleInput || !descriptionInput){
    // alert("There is a falsy value code will not work")
//     return
// }
// let titleValue = titleInput.value
// let descriptionValue = descriptionInput.value 
// --------------------------------------------------------------------------------------------------------------------------------------------
// Method # 02: (By using && operator so if there is any FALSE value on the left side it will return FALSE without checking the right value
// basically && says that both left side and right side values should be true if any of the value is FALSE it will return FALSE)
//    let titleInput = document.querySelector("#titl");
//    let titleValue =  titleInput && titleInput.value;
//    let descriptionInput = document.querySelector("#description")
//    let descriptionValue = descriptionInput &&  descriptionInput.value;
// //    console.log(titleInput,titleValue)
// if(!titleValue || !descriptionValue){
//     alert("There is a falsy value code will not work")
//     return
// }
// --------------------------------------------------------------------------------------------------------------------------------------------
// Method # 03: (By using optimal chaning method) One liner ES6 feature of (optimal chaining ?) (Best and the short way to avoid null and undefined values)
// let titleValue = document.querySelector("#titl")?.value; // for cheking falsy values (for checking learning purpose)
// let descriptionValue = document.querySelector("#descriptio")?.value // for cheking falsy values (for checking learning purpose)

// let titleValue = document.querySelector("#title")?.value;
// let descriptionValue = document.querySelector("#description")?.value
// console.log(titleValue,descriptionValue)
//     if(!titleValue){
//     alert("There is a falsy value code will not work")
//     return
//     }

}
// ----------------------------------------------------Showing Todo after creating its UI-----------------------------------------------------
// ${todo.isCompleted ? `<del><h4>${index + 1} ${todo.titleValue}</h4></del>` : `<h4>${index + 1} ${todo.titleValue}</h4>`}
function showTodos(filteredSelectTodoStatus){
    let ul = document.querySelector("#todo-list-container > ul"); 
    // ul ko empty string isi liye rakh raha hon taky har bari ul my jab li aye to phelay wala ul empty ho gy agar aisa nahe karo ga to jab 
    // bhe my new todo add karo ga to previous waly todo new waly todo ky sath copy bana kar anay lag gy ga iss sy hoga yah ky jab pehlay sy 
    // agar 1 todo ho ga or new todo create karny par sirf new wala todo ana chaihyee lekin 1 and 2 dono aik sath ayen gy isi trha jab 3rd todo
    // crate karo ga to 1st and 2nd todo 3rd ky sath ayen gy to iss sy bachnay ky liye har my ul ko empty kar dn ga jab bhe todo create hoga.
    ul.innerHTML = "" ;
    // console.log(ul);
    if(todos.length > 0 || filteredSelectTodoStatus?.length > 0){
    (filteredSelectTodoStatus || todos).forEach((todo,index) => {
    let li = document.createElement("li")
    
    li.classList.add("list-styling", "shadow", "bg-body-tertiary", "rounded")
    // ul.innerHTML = JSON.stringify(todo.titleValue)
    // ul.innerHTML = JSON.stringify(todo.descriptionValue)
    // console.log("title value: ", todo.titleValue)
    // console.log("Des value:", todo.descriptionValue)
    li.innerHTML =
    `
    <div class="d-flex justify-content-between align-items-center custom-dynamic-class"> 
    <div class="form-check d-flex justify-content-center align-items-center custom-dynamic-class-1">
    <div class="form-check">
    <input class="form-check-input p-2 mx-1" type="checkbox" onchange=selectTodos(${index},this) id="flexCheckDefault">
    </div>
    <h4 style = "${todo.isCompleted && "text-decoration: line-through"}" class=" check-width mx-1"> ${index + 1}) ${todo.titleValue}</h4>
    </div>
    <div class="button-icons custom-dynamic-class-2">
    <button class="btn btn-link me-2 btn-md ${todo.isCompleted ? "done" : "undone"}" onclick = markTodoAsDoneOrUndone(${index},this)> ${todo.isCompleted ? `<i style="color:green;" class="fa-regular fa-circle-check fa-xl"></i>` : `<i style="color: red" class="fa-solid fa-circle-xmark fa-xl"></i>`}</button>     
    <button class="btn btn-link me-2 btn-md" onclick = "deleteTodoItem(${index})"> <i style = "color: red" class="fa-sharp fa-solid fa-trash fa-xl"></i></button>
    <button class="btn btn-link me-2 btn-md" onclick="showModal(false,${index})"> <i class="fas fa-pen-to-square fa-xl"></i></button>
    </div>
    </div>
    <div class="custom-dynamic-class-3">
    ${todo.descriptionValue ? `<p class="check-width mx-4">Description: ${todo.descriptionValue}</p>` : ""}
    </div> `
    // Changing color dynamically which is also called conditional rendering
    // li.style.backgroundColor = todo.isCompleted ? "Green" : "yellow"
    // console.log(li)
    ul.appendChild(li)
    // style=${todo.isCompleted && "text-decoration: line-through;"}"
        // Styling for li 
        if (todo.isCompleted) {
            li.classList.remove('not-completed');
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
            li.classList.add('not-completed');
        }
 });
}

else{
     ul.innerHTML = `<h2 class="ul-message">No Todos Found <img src="./assests/happy.png" alt="" width="80px" height="80px"> </h2>`

//      `      
//      <div class="wrapper">
//      <div class="cube">
//        <h3>No todos found</h3>
//        <svg id="ant1" class="ants" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.39 53.12"><title>ant</title><path d="M539.22,398.8a20.17,20.17,0,0,0,3-10.91,14,14,0,0,1,6.22-12.12c.58-.41.56-1.79.6-2.74,0-.18-1-.44-1.53-.61a10.21,10.21,0,0,1-2.52-.74,3.21,3.21,0,0,0-3.17-.18,16.22,16.22,0,0,1-5,.34c-.4,0-.8-.54-1.2-.83l.17-.32c.3.09.6.16.89.27a4.36,4.36,0,0,0,4.08-.16c1.9-1.12,3.92-1.5,5.88.08a8.9,8.9,0,0,0,1.79.86c.43-2.45.07-4.19-1.94-5.61-1.13-.8-1.77-2.3-2.59-3.51a4.82,4.82,0,0,1-.58-1.2c-.89-2.69-3.22-3.93-5.38-5.33a8.47,8.47,0,0,1-.86-.64c-.09-.07-.11-.23-.32-.71.74.37,1.22.58,1.67.83,1.32.74,2.66,1.45,3.92,2.28a3.13,3.13,0,0,1,1,1.45,13.54,13.54,0,0,0,4.09,6l1.88-2.86c-2.65-.24-3.22-1.08-2.51-3.8.22-.86.56-1.68.91-2.71-1.3-.4-2.55-.85-3.83-1.17a3,3,0,0,1-2.21-1.94c-1-2.31-1.82-4.69-3.92-6.3-.13-.1-.11-.38.08-.83.42.31,1,.52,1.24.94,1,1.66,1.92,3.41,3,5.06a5.58,5.58,0,0,0,1.66,1.73,19.86,19.86,0,0,0,2.81,1.25c1,.44,2,.88,3.13.07a1.68,1.68,0,0,1,1.42-.13c1.29.57,2.27-.17,3.4-.52,2.45-.75,4.18-2,4.47-4.76a3.2,3.2,0,0,1,2.11-2.53,3.33,3.33,0,0,1-.26.82,9.36,9.36,0,0,0-2,5,1.67,1.67,0,0,1-1.59,1.65c-1.33.26-2.62.7-3.87,1a38.19,38.19,0,0,1,1.09,4c.36,2.31-.35,3.06-2.8,3l1.91,3a46.1,46.1,0,0,0,3-4.59c.74-1.48,1.2-2.93,3-3.58,1.38-.49,2.57-1.55,4.06-2.15a2.18,2.18,0,0,1-.39.65,8.37,8.37,0,0,1-1.66,1.13c-2.62,1.17-3.78,3.5-4.92,5.91a11.72,11.72,0,0,1-2.19,3.19c-2.42,2.44-2.18,2.73-2,5.77a7.21,7.21,0,0,0,1.52-.72c1.88-1.54,3.86-1.32,5.75-.2a4.4,4.4,0,0,0,4.45.1c.2-.09.41-.15.61-.22l.26.36c-.55.34-1.1,1-1.66,1-1.8,0-3.66.35-5.35-.72a2.33,2.33,0,0,0-1.56.07c-1.22.33-2.43.73-3.63,1.13a1.85,1.85,0,0,0-.86.47c-.28.35.41,3,.78,3.36.79.72,1.59,1.43,2.36,2.18,2.78,2.68,3.25,6.16,3.36,9.75a22.41,22.41,0,0,0,2.87,10.44,1.74,1.74,0,0,1-1.64-1.54c-.86-3.41-2.14-6.72-2.29-10.31-.14-3.25-.56-4.16-1.89-5.52a24.93,24.93,0,0,1-.17,4.45,12.52,12.52,0,0,1-1.68,4.17c-1.53,2.36-4.41,2.28-6-.05-1.85-2.67-2.05-5.66-1.53-8.76.06-.35.16-.69.25-1.07a6.81,6.81,0,0,0-2.94,5.69c-.17,3.81-1.31,7.38-2.26,11A2.54,2.54,0,0,1,539.22,398.8Z" transform="translate(-535.68 -345.68)"/></svg>
//        <svg id="ant2" class="ants" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.39 53.12"><title>ant</title><path d="M539.22,398.8a20.17,20.17,0,0,0,3-10.91,14,14,0,0,1,6.22-12.12c.58-.41.56-1.79.6-2.74,0-.18-1-.44-1.53-.61a10.21,10.21,0,0,1-2.52-.74,3.21,3.21,0,0,0-3.17-.18,16.22,16.22,0,0,1-5,.34c-.4,0-.8-.54-1.2-.83l.17-.32c.3.09.6.16.89.27a4.36,4.36,0,0,0,4.08-.16c1.9-1.12,3.92-1.5,5.88.08a8.9,8.9,0,0,0,1.79.86c.43-2.45.07-4.19-1.94-5.61-1.13-.8-1.77-2.3-2.59-3.51a4.82,4.82,0,0,1-.58-1.2c-.89-2.69-3.22-3.93-5.38-5.33a8.47,8.47,0,0,1-.86-.64c-.09-.07-.11-.23-.32-.71.74.37,1.22.58,1.67.83,1.32.74,2.66,1.45,3.92,2.28a3.13,3.13,0,0,1,1,1.45,13.54,13.54,0,0,0,4.09,6l1.88-2.86c-2.65-.24-3.22-1.08-2.51-3.8.22-.86.56-1.68.91-2.71-1.3-.4-2.55-.85-3.83-1.17a3,3,0,0,1-2.21-1.94c-1-2.31-1.82-4.69-3.92-6.3-.13-.1-.11-.38.08-.83.42.31,1,.52,1.24.94,1,1.66,1.92,3.41,3,5.06a5.58,5.58,0,0,0,1.66,1.73,19.86,19.86,0,0,0,2.81,1.25c1,.44,2,.88,3.13.07a1.68,1.68,0,0,1,1.42-.13c1.29.57,2.27-.17,3.4-.52,2.45-.75,4.18-2,4.47-4.76a3.2,3.2,0,0,1,2.11-2.53,3.33,3.33,0,0,1-.26.82,9.36,9.36,0,0,0-2,5,1.67,1.67,0,0,1-1.59,1.65c-1.33.26-2.62.7-3.87,1a38.19,38.19,0,0,1,1.09,4c.36,2.31-.35,3.06-2.8,3l1.91,3a46.1,46.1,0,0,0,3-4.59c.74-1.48,1.2-2.93,3-3.58,1.38-.49,2.57-1.55,4.06-2.15a2.18,2.18,0,0,1-.39.65,8.37,8.37,0,0,1-1.66,1.13c-2.62,1.17-3.78,3.5-4.92,5.91a11.72,11.72,0,0,1-2.19,3.19c-2.42,2.44-2.18,2.73-2,5.77a7.21,7.21,0,0,0,1.52-.72c1.88-1.54,3.86-1.32,5.75-.2a4.4,4.4,0,0,0,4.45.1c.2-.09.41-.15.61-.22l.26.36c-.55.34-1.1,1-1.66,1-1.8,0-3.66.35-5.35-.72a2.33,2.33,0,0,0-1.56.07c-1.22.33-2.43.73-3.63,1.13a1.85,1.85,0,0,0-.86.47c-.28.35.41,3,.78,3.36.79.72,1.59,1.43,2.36,2.18,2.78,2.68,3.25,6.16,3.36,9.75a22.41,22.41,0,0,0,2.87,10.44,1.74,1.74,0,0,1-1.64-1.54c-.86-3.41-2.14-6.72-2.29-10.31-.14-3.25-.56-4.16-1.89-5.52a24.93,24.93,0,0,1-.17,4.45,12.52,12.52,0,0,1-1.68,4.17c-1.53,2.36-4.41,2.28-6-.05-1.85-2.67-2.05-5.66-1.53-8.76.06-.35.16-.69.25-1.07a6.81,6.81,0,0,0-2.94,5.69c-.17,3.81-1.31,7.38-2.26,11A2.54,2.54,0,0,1,539.22,398.8Z" transform="translate(-535.68 -345.68)"/></svg>
//        <svg id="ant3" class="ants" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.39 53.12"><title>ant</title><path d="M539.22,398.8a20.17,20.17,0,0,0,3-10.91,14,14,0,0,1,6.22-12.12c.58-.41.56-1.79.6-2.74,0-.18-1-.44-1.53-.61a10.21,10.21,0,0,1-2.52-.74,3.21,3.21,0,0,0-3.17-.18,16.22,16.22,0,0,1-5,.34c-.4,0-.8-.54-1.2-.83l.17-.32c.3.09.6.16.89.27a4.36,4.36,0,0,0,4.08-.16c1.9-1.12,3.92-1.5,5.88.08a8.9,8.9,0,0,0,1.79.86c.43-2.45.07-4.19-1.94-5.61-1.13-.8-1.77-2.3-2.59-3.51a4.82,4.82,0,0,1-.58-1.2c-.89-2.69-3.22-3.93-5.38-5.33a8.47,8.47,0,0,1-.86-.64c-.09-.07-.11-.23-.32-.71.74.37,1.22.58,1.67.83,1.32.74,2.66,1.45,3.92,2.28a3.13,3.13,0,0,1,1,1.45,13.54,13.54,0,0,0,4.09,6l1.88-2.86c-2.65-.24-3.22-1.08-2.51-3.8.22-.86.56-1.68.91-2.71-1.3-.4-2.55-.85-3.83-1.17a3,3,0,0,1-2.21-1.94c-1-2.31-1.82-4.69-3.92-6.3-.13-.1-.11-.38.08-.83.42.31,1,.52,1.24.94,1,1.66,1.92,3.41,3,5.06a5.58,5.58,0,0,0,1.66,1.73,19.86,19.86,0,0,0,2.81,1.25c1,.44,2,.88,3.13.07a1.68,1.68,0,0,1,1.42-.13c1.29.57,2.27-.17,3.4-.52,2.45-.75,4.18-2,4.47-4.76a3.2,3.2,0,0,1,2.11-2.53,3.33,3.33,0,0,1-.26.82,9.36,9.36,0,0,0-2,5,1.67,1.67,0,0,1-1.59,1.65c-1.33.26-2.62.7-3.87,1a38.19,38.19,0,0,1,1.09,4c.36,2.31-.35,3.06-2.8,3l1.91,3a46.1,46.1,0,0,0,3-4.59c.74-1.48,1.2-2.93,3-3.58,1.38-.49,2.57-1.55,4.06-2.15a2.18,2.18,0,0,1-.39.65,8.37,8.37,0,0,1-1.66,1.13c-2.62,1.17-3.78,3.5-4.92,5.91a11.72,11.72,0,0,1-2.19,3.19c-2.42,2.44-2.18,2.73-2,5.77a7.21,7.21,0,0,0,1.52-.72c1.88-1.54,3.86-1.32,5.75-.2a4.4,4.4,0,0,0,4.45.1c.2-.09.41-.15.61-.22l.26.36c-.55.34-1.1,1-1.66,1-1.8,0-3.66.35-5.35-.72a2.33,2.33,0,0,0-1.56.07c-1.22.33-2.43.73-3.63,1.13a1.85,1.85,0,0,0-.86.47c-.28.35.41,3,.78,3.36.79.72,1.59,1.43,2.36,2.18,2.78,2.68,3.25,6.16,3.36,9.75a22.41,22.41,0,0,0,2.87,10.44,1.74,1.74,0,0,1-1.64-1.54c-.86-3.41-2.14-6.72-2.29-10.31-.14-3.25-.56-4.16-1.89-5.52a24.93,24.93,0,0,1-.17,4.45,12.52,12.52,0,0,1-1.68,4.17c-1.53,2.36-4.41,2.28-6-.05-1.85-2.67-2.05-5.66-1.53-8.76.06-.35.16-.69.25-1.07a6.81,6.81,0,0,0-2.94,5.69c-.17,3.81-1.31,7.38-2.26,11A2.54,2.54,0,0,1,539.22,398.8Z" transform="translate(-535.68 -345.68)"/></svg>
//        <svg id="ant4" class="ants" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.39 53.12"><title>ant</title><path d="M539.22,398.8a20.17,20.17,0,0,0,3-10.91,14,14,0,0,1,6.22-12.12c.58-.41.56-1.79.6-2.74,0-.18-1-.44-1.53-.61a10.21,10.21,0,0,1-2.52-.74,3.21,3.21,0,0,0-3.17-.18,16.22,16.22,0,0,1-5,.34c-.4,0-.8-.54-1.2-.83l.17-.32c.3.09.6.16.89.27a4.36,4.36,0,0,0,4.08-.16c1.9-1.12,3.92-1.5,5.88.08a8.9,8.9,0,0,0,1.79.86c.43-2.45.07-4.19-1.94-5.61-1.13-.8-1.77-2.3-2.59-3.51a4.82,4.82,0,0,1-.58-1.2c-.89-2.69-3.22-3.93-5.38-5.33a8.47,8.47,0,0,1-.86-.64c-.09-.07-.11-.23-.32-.71.74.37,1.22.58,1.67.83,1.32.74,2.66,1.45,3.92,2.28a3.13,3.13,0,0,1,1,1.45,13.54,13.54,0,0,0,4.09,6l1.88-2.86c-2.65-.24-3.22-1.08-2.51-3.8.22-.86.56-1.68.91-2.71-1.3-.4-2.55-.85-3.83-1.17a3,3,0,0,1-2.21-1.94c-1-2.31-1.82-4.69-3.92-6.3-.13-.1-.11-.38.08-.83.42.31,1,.52,1.24.94,1,1.66,1.92,3.41,3,5.06a5.58,5.58,0,0,0,1.66,1.73,19.86,19.86,0,0,0,2.81,1.25c1,.44,2,.88,3.13.07a1.68,1.68,0,0,1,1.42-.13c1.29.57,2.27-.17,3.4-.52,2.45-.75,4.18-2,4.47-4.76a3.2,3.2,0,0,1,2.11-2.53,3.33,3.33,0,0,1-.26.82,9.36,9.36,0,0,0-2,5,1.67,1.67,0,0,1-1.59,1.65c-1.33.26-2.62.7-3.87,1a38.19,38.19,0,0,1,1.09,4c.36,2.31-.35,3.06-2.8,3l1.91,3a46.1,46.1,0,0,0,3-4.59c.74-1.48,1.2-2.93,3-3.58,1.38-.49,2.57-1.55,4.06-2.15a2.18,2.18,0,0,1-.39.65,8.37,8.37,0,0,1-1.66,1.13c-2.62,1.17-3.78,3.5-4.92,5.91a11.72,11.72,0,0,1-2.19,3.19c-2.42,2.44-2.18,2.73-2,5.77a7.21,7.21,0,0,0,1.52-.72c1.88-1.54,3.86-1.32,5.75-.2a4.4,4.4,0,0,0,4.45.1c.2-.09.41-.15.61-.22l.26.36c-.55.34-1.1,1-1.66,1-1.8,0-3.66.35-5.35-.72a2.33,2.33,0,0,0-1.56.07c-1.22.33-2.43.73-3.63,1.13a1.85,1.85,0,0,0-.86.47c-.28.35.41,3,.78,3.36.79.72,1.59,1.43,2.36,2.18,2.78,2.68,3.25,6.16,3.36,9.75a22.41,22.41,0,0,0,2.87,10.44,1.74,1.74,0,0,1-1.64-1.54c-.86-3.41-2.14-6.72-2.29-10.31-.14-3.25-.56-4.16-1.89-5.52a24.93,24.93,0,0,1-.17,4.45,12.52,12.52,0,0,1-1.68,4.17c-1.53,2.36-4.41,2.28-6-.05-1.85-2.67-2.05-5.66-1.53-8.76.06-.35.16-.69.25-1.07a6.81,6.81,0,0,0-2.94,5.69c-.17,3.81-1.31,7.38-2.26,11A2.54,2.54,0,0,1,539.22,398.8Z" transform="translate(-535.68 -345.68)"/></svg>
//      </div>
//    </div>`
}
// disableDeleteAllTodoButton()
}

// -----------------------------------------------------------Function for Edit Todos--------------------------------------------------------
function showModal(addTodo,selectedIndex){
    console.log(addTodo,selectedIndex)
    if(addTodo){
        console.log("I am from Add todo")
        document.querySelector("#title").value = "";
        document.querySelector("#description").value = "";
        const replaceModalTitle = document.getElementById("exampleModalLabel");
        const replaceModalAddTodoButtonTitle = document.getElementById('replaceModalAddTodoButtonTitle');
        replaceModalTitle.textContent = "Add Todo"
        replaceModalAddTodoButtonTitle.textContent = "Add Todo"
        // addTodoKey = true
        editTodoIndex = false
        showToastMessage = false
    }
    else{
        console.log(addTodo)
        console.log("I am edit todo")
        console.log(todos[selectedIndex]["titleValue"]);
        console.log(todos[selectedIndex]["descriptionValue"]);
        document.querySelector("#title").value = todos[selectedIndex]["titleValue"];
        document.querySelector("#description").value = todos[selectedIndex]["descriptionValue"];
        const replaceModalTitle = document.getElementById("exampleModalLabel");
        replaceModalTitle.textContent = "Edit Todo"
        const replaceModalAddTodoButtonTitle = document.getElementById('replaceModalAddTodoButtonTitle');
        // console.log({replaceModalAddTodoButtonTitle});
        // replaceModalAddTodoButtonTitle.setAttribute("id","edit-todo-button-attribute");
        // console.log({replaceModalAddTodoButtonTitle});
        replaceModalAddTodoButtonTitle.textContent = "Edit Todo";
        // editTodoIndex = true;
        editTodoIndex = selectedIndex + 1; //1 isi liye kiya hay taky yah add todo ky andar if block my gy naa ky else block my kiu ky agar if my gy ga to edit todo ky function sy connect hogy ga agar else my gy ga to addtodo ka function sy connect hogy ga 
        console.log({editTodoIndex},{editTodoItem})

        // document.getElementById('edit-todo-button-attribute').addEventListener('click',()=>{
        //     console.log(titleValue,descriptionValue)
        //     console.log("I am Edit todo item: ",selectedIndex)
        //     console.log(todos[selectedIndex]["titleValue"])
        //     todos[selectedIndex]["titleValue"] = titleValue
        //     todos[selectedIndex]["descriptionValue"] = descriptionValue
        //     setTodosToLocalStorage(todos)
        //     reRenderUi() 
        //     const btn = document.getElementById('edit-todo-button-attribute');
        //     const attr = btn.getAttributeNode("id");
        //     console.log(btn,attr)
        //     btn.removeAttributeNode(attr);
        //     console.log(btn,attr)
        // })
    }
        const newModalValue = document.getElementById('add-todo-modal');
        const myModal = new bootstrap.Modal(newModalValue);
        myModal.show()
    }

    function editTodoItem(selectedIndex){
    let updateSelectedIndex = selectedIndex - 1;
    console.log("I am Edit todo item with old index value: ",selectedIndex)
    console.log("I am Edit todo item with updated index value: ",updateSelectedIndex)
    if(!title.value){
        alert("Title field cannot be left empty!")
        return
    }
    todos[updateSelectedIndex]["titleValue"] = title.value
    todos[updateSelectedIndex]["descriptionValue"] = description.value
    setTodosToLocalStorage(todos)
    reRenderUi()
    }

// --------------------------------------------------------Marking Todos as done or Undone---------------------------------------------------
// Approach # 02 (By using IsCompleted values of TODO. TODO is completed hay yani agar condition phelay sy true hay to IF block my jaa kar 
//  usy false kar ky localStorage my save karwa do or agar TODO is IScompleted FALSE hay to uss ko TRUE karwa do .  
// ki class set kar do)
// Tip: Yaad rahay mark as done yah phr mark as undone yah bhe ham condionally button ka name set karwain gy by using isCompleted key.
function markTodoAsDoneOrUndone(selectedIndex,elementValue){
// console.log({selectedIndex},{elementValue})
if(todos[selectedIndex]["isCompleted"]){
    todos[selectedIndex]["isCompleted"] = false;
  
}
else{
    todos[selectedIndex]["isCompleted"] = true;
    // elementValue.classList.remove('list-styling');
    // let li = document.getElementsByClassName('list-styling')
    // li.style.border = "3px solid green;"
    // console.log(elementValue)

}
localStorage.setItem("Todos", JSON.stringify(todos));
reRenderUi()
}

// Approach # 02 
// Tip: Yaad rahay mark as done yah phr mark as undone yah bhe ham condionally button ka name set karwain gy by using isCompleted key.
// Iss my sab sy phelay to ham iss ky button par 2 classes set karwaiyen gy dynamically iss trha ky agar TODO is completed hay to 'done' class
// set kar do agar TOOD complete nahe hay to 'undone' ki class set kar do uss ky baad baad ham IF block my check karein gy ky agar 'done' ki 
// class uss button par exist karti hay yah nahe agar True hay todos[selectedIndex]["isCompleted"] to false kara do or phr local storage my save 
// kara do or agar FALSE hy (todos[selectedIndex]["isCompleted"]) to isy true kara kar localStorage my save kara do phr UI ko rerender kara do 
// function markTodoAsDoneOrUndone(selectedIndex,elementValue){
//     console.log({selectedIndex},{elementValue})
//     if(elementValue.classList.contains('done')){
//     todos[selectedIndex]["isCompleted"] = false
//     }
//     else{
//         todos[selectedIndex]["isCompleted"] = true
//     }
//     setTodosToLocalStorage()
//     reRenderUi(false)
//     }

// --------------------------------------------------Function for Setting value to localStorage-----------------------------------------------
    function setTodosToLocalStorage(){
    localStorage.setItem("Todos", JSON.stringify(todos));
    }
// -----------------------------------------------------------Function for Edit Todos--------------------------------------------------------


// -----------------------------------------------------------Function for Select Options--------------------------------------------------------
// Yahaan my orignal array todos ki copy bana kar use karo ga kiu ky yahaan kuch iss trha ka issue aye ga ky agar jab my case 2 and case 3 my
// todos ko filter karwao ga orignal array par to un ki values overwrite ho jayen gi orignal array my ji ki wjah sy kuch iss kuch aa skty han 
// for example: agar my done waly todo mangwa raha hon case 2: my to todos ky andar done waly todos overwrite ho jayen gy orignal todos my ab 
// jab next case 3 my jab my undone waly todos mangwao ga to uss todos ky array my phely hi done waly dono overwrite ho chukay han to ab usy 
// undone waly todos nahe mil saken gy .
function selectTodoStatus(optionBox){
// const options = document.getElementById('option-selection');
// console.log(optionBox.value);
switch(+optionBox.value) {

    case 1:
    //   console.log("Orignal Todos:",todos)
    //   console.log("i am 1");
      const filteredAllTodos = todos.filter(todo=>{
        return todo;
      })
    //   console.log("All filtered todos", filteredAllTodos)
      reRenderUi(false,filteredAllTodos)
      break;

    case 2:
        // console.log("Orignal Todos:",todos)
        // console.log("i am 2");
        let filteredDoneTodos = todos.filter(todo=>{
            return todo["isCompleted"] === true
          })
    //   console.log("Only DONE filtered todos", filteredDoneTodos)
          reRenderUi(false,filteredDoneTodos)
        break;
        
    case 3:
        console.log("Orignal Todos:",todos)
        console.log("i am 3");
        let filteredUndoneTodos = todos.filter(todo=>{
            return todo["isCompleted"] === false
          })
    //   console.log("Only UNDONE filtered todos", filteredUndoneTodos)
        reRenderUi(false,filteredUndoneTodos)
    break;
    default:
      reRenderUi()
  }
}

// ----------------------------------------------------------Function for SORT TODOS----------------------------------------------------------
function sortTodos(sortedValue){
// console.log(sortedValue.value)
// console.log(todos)
switch(+sortedValue.value){
case 1:    
    const sortedfilteredInAscendingOrder = todos.sort((a,b) => a.titleValue.localeCompare(b.titleValue));
    // console.log(sortedfilteredInAscendingOrder)
    reRenderUi(false)
    break;

case 2:
    const sortedfilteredInDescendingOrder = todos.sort((a,b) => b.titleValue.localeCompare(a.titleValue));
    // console.log(sortedfilteredInDescendingOrder)
    reRenderUi(false)
    break;

default:
reRenderUi()
}
}
// -------------------------------------------------------Delete All todos on one click-------------------------------------------------------
function deleteAllTodos(){
    let confirmation = confirm("Are you sure to delete All Todos ?");
    console.log(todos.length)
    if(todos.length > 0 && confirmation){
    localStorage.removeItem("Todos")
    alert('All TODOS DELETED SUCESSFULLY')
    // Agar todos null/empty(falsy values han to uss my empty array set karwa do agar truthy values han to wohi rehnay do) yah kaam kar lo yah 
    // phr aik function bna lo jesy nichey banaya howa hay uss function ko yahaan laa kar call kar do
    // todos = localStorage.getItem("Todos",JSON.stringify(todos)) || [];
    // getValueFromLocalStorageAndSetIntoTodosArray();
    // showTodos()
    // checkTodosCount()
    reRenderUi();
    console.log(todos.length)
    console.log({todos})
    }
    else if(todos.length > 0 && !confirmation){
        alert("Deletion operation cancelled")
    }
    else{
        alert("Todos are already empty!")
    } 
}
// ********************************************************Disable Delete all todo button******************************************************
function disableDeleteAllTodoButton(){
    // console.log("iam form disaled button: ",todos.length)
    let button = document.querySelector('#btn-value')
    let buttonStateMobileResponsive = document.querySelector('#btn-value-mobile-responsive')
    if(todos.length > 0){
        button.disabled = false;
        buttonStateMobileResponsive.disabled = false;
        // let button = document.querySelector('#btn-value')
        // button.removeAttribute("disabled", "disabled");
        // console.log(btn);
    }
    else{
         button.disabled = true
         buttonStateMobileResponsive.disabled = true
        // let button = document.querySelector('#btn-value')
        // button.setAttribute("disabled", "disabled");
}
}

// ------------------------------------------------Function for Deleting only selected Todos------------------------------------------------
// Always remember: Jab bhe multiple select boxes use kar rahy ho or un ky select hony par kuch operation perform karwana ho to hamesha un ko
// this keyward ky through access karna kiu ky hamey har select box click hony par sirf usi respected select box ki value grab karni hoti hay 
// yani select box ky select or disselect hony par checked(TRUE) or unchecked(FALSE) chaihyee hota hay agar isi kaam ko id selector ky through
//  karen gy to woh kuch issues dy skta hay jesa ky agar aik select box ko select karein gy to true ho jata hay or jab disselect karty han to
//  false ho jata hay lekin jab new select box par jaa kar usy select karo ga tab bhe yah false dekhaye ga or jab disselect karo ga tab bhe
//  false dekhaye ga yani agar 1 bar value select box ki false hogaye to woh dobara true nahe ho saky gi agar id selector ky through karein 
// gy to best appraoch for select box is to use THIS keyward yani this keyward ky through select box ki value grab karo bss

// let buttonStateMobile = document.getElementById('button-state-mobile-responsive')
function showDeleteSelectedTodoButton(){
    let buttonState = document.getElementById('button-state');
    let buttonStateMobileResponsive = document.getElementById('button-state-mobile-responsive');
    console.log("I am delete selected todo");
    if(selectedTodosArray.length > 0){
        buttonState.style.display = "block";
        buttonState.innerHTML = `Delete Selected Todos (${selectedTodosArray.length})`
        buttonStateMobileResponsive.style.display = "block"
        buttonStateMobileResponsive.innerHTML = `Delete Selected Todos (${selectedTodosArray.length})`
        console.log(selectedTodosArray,selectedTodosArray.length)
    }
    else{
        buttonState.style.display = "none";
        buttonStateMobileResponsive.style.display = "none";

        // buttonState.innerHTML = `Delete Selected Todos (${selectedTodosArray.length})`
        // console.log(selectedTodosArray.length)
    }
}

function selectTodos(selectedIndex,selectBox){
    // console.log(selectBox.checked);
    if(selectBox.checked){
        console.log("Is checked", selectedIndex)    
        todos.find((todo,index)=>{
                    if(selectedIndex === index){
                        // selectedTodosArray.push(todo)
                        // console.log(index,todo)
                        // console.log(todo.id)
            // Delete selected todos by index no
                        selectedTodosArray.push(index)
            // Delete selected todos by UNIQUE ID of every todo
                        // selectedTodosArray.push(todo.id)
                        console.log(selectedTodosArray)
                        return todo
                    }
                })
               
            }
            else{
                console.log("selected index: ",selectedIndex)
                let index = selectedTodosArray.indexOf(selectedIndex);
                if (index !== -1) {
                    selectedTodosArray.splice(index, 1);
                }
                // selectedTodosArray.splice(selectedIndex,1)

                // selectedTodosArray.find((todoId,index,array)=>{
                // if(selectedIndex === index){
                // console.log({index},{selectedIndex})
                // selectedTodosArray.splice(selectedIndex,1)
                // }
                // // else if(selectedIndex > selectedTodosArray.length){
                // // console.log("NOW POP WILL WORK")
                // //     selectedTodosArray.pop()
                // // }   
                // })
            }
            
            console.log(selectedTodosArray)
            showDeleteSelectedTodoButton()
            
 }

// This function deleted selected todos is linked to select todos function. Selected todos can be deleted by passing id or index number with
// the same approach  
function deleteSelectedTodos(){
    console.log("I am form delete selected todo button before deletation: ",todos, selectedTodosArray)
    let answer = confirm("Are you sure to delete the selected Todos ?")
    if(answer && selectedTodosArray.length > 0){

//Approach # 01(FOR NOOB) (Agar selectedTodosArray ki sari ids my sy koi aik id bhe match kar jati hay todo ki id sy to woh hamey nahe chaihyee
//  yani return false kar do yani else block my chala gy ga false hony ki wjah sy or jo match nahe karti woh hamey else block my mil gy gi)
    // let myArray = todos.filter(todo => {
    //     // console.log(selectedTodosArray.includes(todo.id));
    //     if(selectedTodosArray.includes(todo.id) === true){
    //         // console.log("I am true",todo)
    //         return false 
    //     }
    //     else{ 
    //         // console.log("I am false",todo)
    //         return true
    //     }
    // })
//Approach # 02 (PRO APPROACH) Selected todos can be deleted by passing ids or index 
    let remainingTodosAfterSelectedDeletation = todos.filter((todo,index) => {

    // Delete selected todos by index no
    console.log(selectedTodosArray.includes(index))
    if(!selectedTodosArray.includes(index)){
        console.log("I am true",todo)
        return true
    }
    alert("Selected Todos Deleted Successfully.")
    return false;
    // Delete selected todos by unique todo id
    // console.log(selectedTodosArray.includes(todo.id));
    // if(!selectedTodosArray.includes(todo.id)){
    //     console.log("I am true",todo)
    //     return true
    // }
    // return false;
}) 
// reRenderUi(true)
    console.log("I am form delete selected todo button after deletation: ",remainingTodosAfterSelectedDeletation, selectedTodosArray)
    selectedTodosArray = [...remainingTodosAfterSelectedDeletation];
    localStorage.setItem("Todos", JSON.stringify(remainingTodosAfterSelectedDeletation))
    selectedTodosArray.length = 0;
}
    else{
        alert("Deletation operation cancelled");
    }
    
    reRenderUi(true)
    showDeleteSelectedTodoButton()
}
// --------------------------------------Getting value from local storage and setting into Todos array---------------------------------------
// Here, we are getting Todos from local storage after deletation of all todos we are checking that if todos array in a local storage is empty
// that it means it has a falsy(Null) values to uss my empty array set karwa do or agar Todos ko delete nahe kiya jo local Storage my paray thy 
// to phelay un ko get kar ky parse karo or phr Todos array my set kara do.
function getValueFromLocalStorageAndSetIntoTodosArray(){
    let todosFromLocalStorage = localStorage.getItem("Todos",JSON.stringify(todos));
    // console.log({todosFromLocalStorage})
    // if(localStorage.getItem("Todos")){
    //     todos = JSON.parse(localStorage.getItem("Todos"))
    // }
    // else{
    //     todos = []; 
    // }
    // console.log("Before getting from local storage TODO was: ",{todos})
    todos = todosFromLocalStorage ? JSON.parse(todosFromLocalStorage) : [];
    // console.log("After getting from LOCAL STORAGE TODO is:",{todos})
}
// --------------------------------------Checking todos count after any addition or deletation of todo----------------------------------------
function checkTodosCount(){
    let counter = document.querySelector("#todo-counter");
    let counterForMobile = document.querySelector("#todo-counter-for-mobile-responsive")
//   For Web Application
    counter.innerHTML = `Todos count: ${todos.length}`
// For Mobile Application
counterForMobile.innerHTML = `Todos count: ${todos.length}`
     
}
// -----------------------------------------------------------------Updating UI---------------------------------------------------------------
// Here we are refactoring code jahaan jahaan function ki calling repeat ho rahi the uss ka ham ny alag sy aik function bana kar sab ko uss
// my call kar diya hay. 
function reRenderUi(gettingValue = true, filteredSelectTodoStatus){
    // console.log(gettingValue)
    if(gettingValue){
        getValueFromLocalStorageAndSetIntoTodosArray();
    }
    // console.log("Filtered value from select option: ",filteredSelectTodoStatus)
showTodos(filteredSelectTodoStatus);
showDeleteSelectedTodoButton()
checkTodosCount();
disableDeleteAllTodoButton()
}
//-------------------------------------------------------------- Delete Todo Item-------------------------------------------------------------
// Approach # 01 (By using id and filter method)
// function deleteTodoItem(id){
//     console.log(id)
//     todos = (todos.filter((todo)=>{
//         if(todo.id !== id){
//         console.log(todo)
//         return todo
//     }
//     }))
//     localStorage.setItem("Todos",JSON.stringify(todos))
//     console.log(todos)
//     reRenderUi();
// }

// Approach # 02 (By using index and splice method)
function deleteTodoItem(index){
    const confirmation = confirm(`Are you sure to delete the Todo item ${index + 1} ?`)
    if(confirmation){
    console.log(index)
    todos.splice(index,1)
    localStorage.setItem("Todos",JSON.stringify(todos));
    reRenderUi();
    }
    else{
        alert(`Todo item ${index + 1} deletation cancelled !`);
    }
}

// --------------------------------------------The advance, quick and mostly used (SEARCH) todo approach----------------------------------------
// ********************Approach # 01 (By using onKeyup method as before we use onclick method)**************************
function searchTodoItems(event){
    event.preventDefault();
    // -----------For mobile reponsiveness------------
    let todoItemsForMobileResponsive = document.querySelector('#search-todo-mobile-responsive').value.toLowerCase()
    // console.log(todoItemsForMobileResponsive)
    // -----------For web without reponsive------------
    let todoItems = document.querySelector('#search-todo').value.toLowerCase();
    // console.log(todoItems);
    // let todoItems = document.querySelector('#search-todo-responsive').value.toLowerCase()
    // console.log(todoItems)
    if(todoItems || todoItemsForMobileResponsive){
    // console.log("i am from search: ",todoItems);
    let filteredItems = todos.filter(todo =>{
        let title = todo.titleValue.toLowerCase().includes(todoItems || todoItemsForMobileResponsive);
        let discription = todo.descriptionValue.toLowerCase().includes(todoItems || todoItemsForMobileResponsive);
         // console.log(title,discription) // will return true or false because includes return true or false
    if(title || discription){
    // console.log(title)
    // console.log(discription);
     return true
    }
    return false
    });
    todos = filteredItems;
    // console.log(todos,filteredItems)
    reRenderUi(false)
    }
    else{
    reRenderUi()
    }
}

// ***********************Approach # 02 (By using addeventlistner method as before we use onclick method)****************************
     // -----------For mobile reponsiveness------------

// document.querySelector('#search-todo-responsive').addEventListener("input", function(){
// let todoItems = document.querySelector('#search-todo-responsive').value.toLowerCase()

    // -----------For web without reponsive------------
//     document.querySelector('#search-todo').addEventListener("input", function(){
//     let todoItems = document.querySelector('#search-todo').value.toLowerCase()
//     console.log(todoItems)
//     if(todoItems){
//     console.log("i am from search: ",todoItems);
//     todos = todos.filter(todo =>{
//         let title = todo.titleValue.toLowerCase().includes(todoItems);
//         let discription = todo.descriptionValue.toLowerCase().includes(todoItems);
//     if(title || discription){
//      return true
//     }
//     return false
//     });
//     // todos = filteredItems; 
//     console.log(todos)
//     reRenderUi(false)
//     }
//     else{
//     reRenderUi()
//     }
// })
// ---------------------------------------------------------OLD SCHOOL SEARCH APPROACH-------------------------------------------------------
// Approach # 03 (By using onclick method) Not good approach
// function searchTodoItems(event){
    // let todoItems = document.querySelector('#search-todo')
//     event.preventDefault();
//     let todoItems = document.querySelector('#search-todo').value
//     console.log(todoItems)
//     if(todoItems){
//     console.log("i am from search: ",todoItems);
//     todos = todos.filter(todo =>{
//         if(todo.titleValue[0] == todoItems[0] || todo.descriptionValue[0] == todoItems[0] ){
//            return todo
//         }
//     });
//     // todos = filteredItems;
//     // console.log({todos})
//     // let filteredItems = todos;
//     // console.log({filteredItems},{todos})
//     // localStorage.setItem("Todos", JSON.stringify(filteredItems));
//     reRenderUi(false)
//     // showTodos();
//     // getValueFromLocalStorageAndSetIntoTodosArray(false);
// }
// // else{
// //     console.log(todoItems);
// // }
// }

function toastMessage(showToastMessage){
    // const replaceModalAddTodoButtonTitle = document.getElementById('replaceModalAddTodoButtonTitle');
if(showToastMessage){
    const toastTrigger = document.getElementById('replaceModalAddTodoButtonTitle')
    const toastLiveExample = document.getElementById('liveToast')
    console.log(showToastMessage)
    console.log("triggered")
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })

}
console.log(showToastMessage)
}
