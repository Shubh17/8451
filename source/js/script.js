$(document).ready(function(){
    $("#submit").click(function(event){
        event.preventDefault(); 
        customerID = document.getElementById("inputContainer").value
        
        if (customerID >= 1 && customerID <= 2500) {
            window.location.href = "insights.html?" + customerID;
            //    console.log(customerID)
            //need to navigate to the other page from button
            $(window).click($());
            // var text = $("#inputContainer").val();
            // if (text=="yes") {
            // console.log(text)
            // }
        } else {
            alert("You have not entered a valid Customer ID.")
        }
    })
    
    $('#inputContainer').keypress(function(event){
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            $("#submit").click();
        }
    })
})