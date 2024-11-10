sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
  ],
  (Controller, JSONModel, ResourceModel) => {
    "use strict";

    return Controller.extend("ui5.crud.controller.Header", {
      onInit() {
        jQuery.sap.includeStyleSheet("css/header.css");
      },
     
      onButtonPress: function (oEvent) {
        var buttonId = oEvent.getSource().getId();
        var buttonName = buttonId.split("--")[1];
        const oRouter = this.getOwnerComponent().getRouter();
        // Now use the index to handle the functionality
        
        switch (buttonName) {
          case "button1":
            oRouter.navTo("dashboard");
            break;
          case "button2":
            oRouter.navTo("userdetails", {id: 123 });
            break;
          case "button3":
            // Functionality for Button 3
            console.log("Button 3 pressed");
            break;
          default:
            console.log("Unknown button pressed");
        }
      },


      onExit: function () {
        // Remove the page-specific CSS if necessary
        jQuery('link[href="css/header.css"]').remove();
      }



    });
  }
);
