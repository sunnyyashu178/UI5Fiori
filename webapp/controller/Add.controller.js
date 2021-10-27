sap.ui.define(['sap/ui/core/mvc/Controller',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"], 
    function(Controller,MessageBox,MessageToast,JSONModel) {
    'use strict';

    return Controller.extend("emc.hr.payroll.controller.Add",{

        onInit: function(){
            this.oModel = new JSONModel();
            this.oModel.setData({
                "productData": {
                    "PRODUCT_ID" : "",
                    "TYPE_CODE" : "PR",
                    "CATEGORY" : "Notebooks",
                    "NAME" : "<enter name>",
                    "DESCRIPTION" : "<Enter Desc.>",
                    "SUPPLIER_ID" : "0100000051",
                    "SUPPLIER_NAME" : "TECUM",
                    "TAX_TARIF_CODE" : "1 ",
                    "PRICE" : "0",
                    "CURRENCY_CODE" : "USD",
                    "DIM_UNIT" : "CM"
                }
            });
            this.getView().setModel(this.oModel,"viewModel");


        },
        onSave: function(){
            var payLoad = this.oModel.getProperty("/productData");
            var oDataModel = this.getView().getModel();
            oDataModel.create("/ProductSet",payLoad,{
                success: function(data){
                    MessageBox.show("The product was created successfully!")

                },
                error: function(oError){

                    MessageBox.error("An internal Error occured");
                }
            })
        },

        onClear: function(){
            var payload = this.oModel.getProperty("/productData");
            payload.PRODUCT_ID = "";
            payload.SUPPLIER_ID = "";
            payload.PRICE = "";
            payload.CURRENCY_CODE = "USD";
            payload.NAME = "";
            payload.DESCRIPTION = "";
            this.oModel.setProperty("/productData",payload);

        },

        onDelete: function(oEvent){
            var that = this;
            var oDataModel = this.getView().getModel();
            oDataModel.remove("/ProductSet('" + this.getView().byId("name").getValue() + "')",{
                success: function(){
                    that.getView().byId("clear").firePress();
                    MessageToast.show("Product is now deleted");
                }
            })
        },

        onEnter: function(oEvent){
            var that = this;
            var sText = oEvent.getSource().getValue();
            var oDataModel = this.getView().getModel();
            oDataModel.read("/ProductSet('" + sText + "')",{
                success: function(data){
                    that.oModel.setProperty("/productData", data);
                },
                error: function(oError){
                     MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                }
            });

        },

        onMostExp: function(){
            var that = this;
            var oDataModel = this.getView().getModel();
            oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                    "I_CATEGORY" : "Servers"
                },
                success: function(data){
                    that.oModel.setProperty("/productData",data);
                }
            });

        }
    

    })
    
});