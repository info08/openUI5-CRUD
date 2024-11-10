sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/table/Table",
    "sap/ui/table/Column",
    "sap/m/Text",
    "sap/m/ColumnListItem",
    "sap/ui/model/json/JSONModel",
  ],
  function (Control, Table, Column, Text, JSONModel) {
    "use strict";

    return Control.extend("ui5.crud.customcontrols.CustomDataTable", {
      metadata: {
        properties: {
          data: { type: "object", defaultValue: null }, // Binding the data
        },
      },
     
      init: function () {
        this._sGlobalText = 5;
        this._oTable = new Table({
          //selectionMode: "Single",
        });
      },

      renderer: function (oRM, oControl) {
        oRM.write("<div>");
        oRM.renderControl(oControl._oTable);
        oRM.write("</div>");
      },

      setData: function (aData) {
        console.log(aData);
        // Transform data using map to add a custom button
        var transformedData = aData.map(function (item) {
          return {
            ...item, // Keep existing data
            buttonText1: "Edit",  // Text for the first button
            buttonText2: "Delete",  // Text for the second button
            onClick1: function() {
                alert("Button 1 clicked for "); // Action for the first button
            },
            onClick2: function() {
                alert("Button 2 clicked for "); // Action for the second button
            }
          };
        });

        // Create a new JSON model and set the transformed data
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({ rows: transformedData }); // Wrap data in { rows: transformedData }

        // Set the model to the table
        this._oTable.setModel(oModel);

        // Create columns for the table
        var oColumn1 = new sap.ui.table.Column({
          label: new sap.m.Text({ text: "Title" }),
          template: new sap.m.Text({ text: "{name}" }),
        });

        var oColumn2 = new sap.ui.table.Column({
          label: new sap.m.Text({ text: "Body" }),
          template: new sap.m.Text({ text: "{age}" }),
        });

        var oColumn3 = new sap.ui.table.Column({
            label: new sap.m.Text({ text: "Action" }),
            template: new sap.m.HBox({
                items: [
                    new sap.m.Button({
                        text: "{buttonText1}",
                        press: "{onClick1}" // Bind the first button's press event to onClick1
                    }),
                    new sap.m.Button({
                        text: "{buttonText2}",
                        press: "{onClick2}" // Bind the second button's press event to onClick2
                    })
                ]
            })
        });

       
        this._oTable.setVisibleRowCount(aData.length);
        this._oTable.addColumn(oColumn1);
        this._oTable.addColumn(oColumn2);
        this._oTable.addColumn(oColumn3);

        // Bind rows to the 'rows' path in the model
        this._oTable.bindRows("/rows");
      },

      createColumns: function (columns) {
        // columns.forEach(function (col) {
        //   this._oTable.addColumn(
        //     new Column({
        //       label: new Text({ text: col.label }),
        //       template: new Text({ text: "{ " + col.property + " }" }),
        //     })
        //   );
        // }, this);
      },
    });
  }
);
