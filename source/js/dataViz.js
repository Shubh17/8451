var customerID = window.location.href.split('?')[1];
document.getElementById("headerText").innerHTML = "<br>Welcome to the Kroger Customer Portal!&nbsp&nbsp&nbsp<br>Customer ID: " + customerID + "&nbsp&nbsp&nbsp";

function initializeSpendViz() {
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

