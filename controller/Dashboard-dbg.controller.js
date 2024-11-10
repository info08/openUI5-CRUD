sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "ui5/crud/customcontrols/CustomDataTable",
     "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
     "ui5/crud/services/ApiService"
  ],
  (Controller, JSONModel, ResourceModel ,CustomDataTable,Filter,FilterOperator,ApiService) => {
    "use strict";

    return Controller.extend("ui5.crud.controller.Dashboard", {
      onInit() {
        
        //    var oTable = this.byId("table");
        //    var aData = [
        //     { name: "John", age: 25, country: "USA" ,id:1 },
        //     { name: "Anna", age: 28, country: "Canada" ,id:2},
        //     { name: "James", age: 32, country: "UK" ,id:3}
        //    ];

        //     var aColumns = [
        //         { label: "Title", property: "title" },
        //         { label: "Body", property: "body" },
        //         { label: "Action", property: "action" }
        //     ];

        //      oTable.createColumns(aColumns);
        //      oTable.setData(aData);  
            
            let This=this;
            var oConfigModel = new JSONModel();
            oConfigModel.loadData("./services/config.json");
            oConfigModel.attachRequestCompleted(function () {
                var sBaseURL = oConfigModel.getProperty("/baseURL");
                var sGetUsersEndpoint = oConfigModel.getProperty("/endpoints/getUsers");
                // Use the baseURL and endpoint
                var sURL = sBaseURL + sGetUsersEndpoint;
                ApiService.makeAPICall(sURL)
                .then(function (oData) {
                    console.log(oData)
                    var oModel = new JSONModel();
                    let data=[];
                    for(let i=0; i<2; i++){
                        data.push(oData[i])
                    }
                    oModel.setData({ data:data });
                    // Set the model to the view
                    This.getView().setModel(oModel);
                 }.bind(this))
                 .catch(function (oError) {
                     console.error("API call failed", oError);
                 });
            });

            
      },

      onSearch: function (oEvent) {
        var oTable = this.byId("table");
        var sQuery = oEvent.getParameter("newValue");
        var oFilter = null;
        if (sQuery && sQuery.length > 0) {
           oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
        }
        var oBinding = oTable.getBinding("rows");
        if (oBinding) {
            oBinding.filter(oFilter ? [oFilter] : []);  // Apply the filter or clear it
        } else {
            console.error("Table row binding is not available.");
        }

      }

    });
  }
);
