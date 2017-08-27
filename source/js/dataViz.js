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