$(document).ready(function(){

$("#submit").click(function(event){            
    event.preventDefault(); 

    window.location.href = "insights.html";

    //need to navigate to the other page from button
    $(window).click();    
})



})