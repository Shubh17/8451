$(document).ready(function(){

$("#submit").click(function(event){            
    event.preventDefault(); 
    customerID = document.getElementById("inputContainer").value
    window.location.href = "insights.html?" + customerID;
//    console.log(customerID)
    //need to navigate to the other page from button
     $(window).click($());
// var text = $("#inputContainer").val();

// if (text=="yes") {
// console.log(text)
// }

})


})

