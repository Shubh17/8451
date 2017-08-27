var customerID = window.location.href.split('?')[1];
document.getElementById("headerText").innerHTML = "Welcome to the Kroger Customer Portal!<br>Customer ID: " + customerID + "<br><button id='logout'>LOG OUT</button>";

function initializeSpendViz() {
    $("#vizTab").click();
    var placeholderDiv = document.getElementById("tableauSpendViz")
    var url = "https://public.tableau.com/views/spend_viz1_blank/PurchaseAnalysis?:embed=y&:display_count=no&:showVizHome=no";
    var options = {
        width: 1050,
        height: 750,
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function() {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
            filterSpendViz();
        }
    };
    viz = new tableau.Viz(placeholderDiv, url, options)
}

function filterSpendViz() {
    viz.getWorkbook().getActiveSheet().getWorksheets()[0].applyFilterAsync("Household Key", customerID, tableau.FilterUpdateType.REPLACE)
    viz.getWorkbook().getActiveSheet().getWorksheets()[1].applyFilterAsync("Household Key", customerID, tableau.FilterUpdateType.REPLACE)
    viz.getWorkbook().getActiveSheet().getWorksheets()[2].applyFilterAsync("Household Key", customerID, tableau.FilterUpdateType.REPLACE)
}

initializeSpendViz();


function initializeCouponViz() {
    var placeholderDiv = document.getElementById("tableauCouponViz")
    var url = "https://public.tableau.com/views/coupon_analysis/CouponSavings?:embed=y&:display_count=no&:showVizHome=no";
    var options = {
        width: 1050,
        height: 750,
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function() {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
            filterCouponViz();
        }
    };
    viz = new tableau.Viz(placeholderDiv, url, options)
}

function filterCouponViz() {
    viz.getWorkbook().getActiveSheet().getWorksheets()[0].applyFilterAsync("Household Key", customerID, tableau.FilterUpdateType.REPLACE)
    viz.getWorkbook().getActiveSheet().getWorksheets()[1].applyFilterAsync("Household Key", customerID, tableau.FilterUpdateType.REPLACE)
}

//initializeCouponViz();

function initializeProductViz() {
    var placeholderDiv = document.getElementById("tableauProductViz")
    var url = "https://public.tableau.com/views/productsuggestions/Products?:embed=y&:display_count=no&:showVizHome=no";
    var options = {
        width: 350,
        height: 350,
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function() {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
            filterProductViz();
        }
    };
    viz = new tableau.Viz(placeholderDiv, url, options)
}

function filterProductViz() {
    viz.getWorkbook().getActiveSheet().applyFilterAsync("Commodity Desc", category, tableau.FilterUpdateType.REPLACE)
}

$(document).ready(function(){
    $("#logout").click(function(event){
        window.location.href = "index.html";
            //    console.log(customerID)
            //need to navigate to the other page from button
            $(window).click($());
            // var text = $("#inputContainer").val();
            // if (text=="yes") {
            // console.log(text)
            // }
        })
})



var table;
var data;
var frequentlyBought = [];
var categories = [];
var selection;
var products = ['wine','cheese','italian bread','wipes']

setTimeout(function(){
    console.log("Inside function")
    worksheet = viz.getWorkbook().getActiveSheet().getWorksheets()[2]
    console.log("Worksheet: " + worksheet)
    worksheet.getSummaryDataAsync().then(function(t){
        table = t;
        data = JSON.stringify(table.getData())
        console.log("Get summary Data: " + worksheet.getSummaryDataAsync())
        console.log("table.getData: " + table.getData())
    })
    console.log("Got summary data: " + data)
    
    setTimeout(function() {
        parsed = JSON.parse(data)
        console.log("Parsed: " + parsed);
        for (var i=0; i<10; i++) {
            frequentlyBought.push(parsed[i][1].value)
        }
        console.log("FREQUENTLY BOUGHT: " + frequentlyBought)
        
        for (var i=0; i<10; i++) {
            categories.push(parsed[i][0].value)
        }
        console.log("CATEGORIES: " + categories)
        var options;
        for (var j=0;j<10;j++) {
            options += "<option value='"+frequentlyBought[j]+"'>"+frequentlyBought[j]+"</option>"
        }
        document.getElementById("frequent").innerHTML = "<select id='selection'><option value='' disabled='disabled' selected='selected'>Select an item</option>"+options+"</select>"
        document.getElementById("openModal").onclick = function(){
            selection = document.getElementById('selection').value;
            category = categories[frequentlyBought.indexOf(selection)];
            document.getElementById("id01").innerHTML = "<br>Items we carry similar to " + selection + ":<br><br><div id='tableauProductViz' align='center'></div>";
            initializeProductViz();
        }
    },500)
},8000)
