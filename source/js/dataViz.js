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
    customer = document.getElementById("customer").value
    viz.getWorkbook().getActiveSheet().getWorksheets()[0].applyFilterAsync("Household Key", customer, tableau.FilterUpdateType.REPLACE)
    viz.getWorkbook().getActiveSheet().getWorksheets()[1].applyFilterAsync("Household Key", customer, tableau.FilterUpdateType.REPLACE)
    viz.getWorkbook().getActiveSheet().getWorksheets()[2].applyFilterAsync("Household Key", customer, tableau.FilterUpdateType.REPLACE)
}

initializeSpendViz();

