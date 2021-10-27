sap.ui.define(["emc/hr/payroll/controller/baseController",
             "sap/ui/model/Filter",
            "sap/ui/model/FilterOperator"],
     function(Controller,Filter,FilterOperator) {
    'use strict';
    return Controller.extend("emc.hr.payroll.controller.View1",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachPatternMatched(this.herculis,this);
        },

        
        herculis: function(oEvent){
            var sPath = this.extractPath(oEvent);
            var oList = this.getView().byId("idLst");
            var element = {};
            if(oList.getItems().length > 0){
                for (let i = 0; i < oList.getItems().length; i++) {
                    element = oList.getItems()[i];
                    if (element.getBindingContextPath() === sPath){
                        oList.setSelectedItem(element);
                        break;
                    }
                    
                }
            }

        },


        onNext: function(){
            var oAppCon = this.getView().getParent();
            oAppCon.to("idView2");
        },
        // onItemClick: function(){
        //     this.onNext();
        // }

        onSearch: function(oEvent){
            var sSearch = oEvent.getParameter("query");
            if(sSearch === "" || sSearch === undefined){
                sSearch = oEvent.getParameter("newValue");
            }
            var oFilter = new Filter("CATEGORY",FilterOperator.Contains,sSearch);
            // var oFilter2 = new Filter("taste",FilterOperator.Contains,sSearch);
            // var aFilter = [oFilter,oFilter2];
            // var oMaster = new Filter({
            //     filters: aFilter,
            //     and: false
            // });
            var oList = this.getView().byId("idLst");
            oList.getBinding("items").filter(oFilter);
        },

        onFruitSelect: function(oEvent){
            //Step 1: Get the router object
            //this.Router
            //Step 2: Trigger the ROute
            var oSelectedItem = oEvent.getParameter("listItem");
            this.oRouter.navTo("detail",{
                fruitId: oSelectedItem.getBindingContextPath().split("/")[1]                
            });

        },

        onDelete: function(oEvent){
            var oSelected = oEvent.getParameter("listItem");
            var oList = oEvent.getSource();
            oList.removeItem(oSelected);
        },

        onNavNext:function(oEvent){
            this.onNext();
        },

        onDeleteItems: function(oEvent){
            var oList = this.getView().byId('idLst');
            var oSelectedItems = oList.getSelectedItems();
            oSelectedItems.forEach(item => {
                oList.removeItem(item);
            });

        },

        onAdd: function(){
            this.oRouter.navTo("add");

        }

        
    });
    
});