sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel"],(e,o,s)=>{"use strict";return e.extend("ui5.crud.controller.Header",{onInit(){jQuery.sap.includeStyleSheet("css/header.css")},onButtonPress:function(e){var o=e.getSource().getId();var s=o.split("--")[1];const t=this.getOwnerComponent().getRouter();switch(s){case"button1":t.navTo("dashboard");break;case"button2":t.navTo("userdetails",{id:123});break;case"button3":console.log("Button 3 pressed");break;default:console.log("Unknown button pressed")}},onExit:function(){jQuery('link[href="css/header.css"]').remove()}})});
//# sourceMappingURL=Header.controller.js.map