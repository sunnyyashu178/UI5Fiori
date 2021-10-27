sap.ui.define(["emc/hr/payroll/controller/baseController",
            "sap/ui/core/Fragment",
            "sap/ui/model/Filter",
            "sap/ui/model/FilterOperator",
            "sap/m/MessageBox",
            "sap/m/MessageToast",
            "sap/m/MessageStrip"], 
    function(Controller, Fragment, Filter, FilterOperator,MessageBox,MessageToast,MessageStrip) {
    'use strict';
    return Controller.extend("emc.hr.payroll.controller.View2",{
        onInit: function(){
 
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachPatternMatched(this.herculis,this);
            
        },

        onBack: function(){
            this.getView().getParent().to("idView1");
        },

        onLinkPress: function(oEvent){
            var sText = oEvent.getSource().getText();
            sText= 'https://google.com?q=' + sText;
            window.open(sText);
        },

        oSupplierPopup: null,
        onFilter: function(){
            if(!this.oSupplierPopup){
                var that = this;
                Fragment.load({
                name: "emc.hr.payroll.fragments.popup",
                type: "XML",
                id: "supplier",
                controller: this //controller access is provided to the popup
            })
            .then(function(oSupplier){
                that.oSupplierPopup = oSupplier;
                that.oSupplierPopup.setTitle("Select Supplier");
                //providing access of the immune system to parasite using WBC (who already have access to res.)
                that.getView().addDependent(that.oSupplierPopup);
                that.oSupplierPopup.bindAggregation("items",{
                    path: '/supplier',
                    template: new sap.m.DisplayListItem({
                        label: '{name}',
                        value: '{city}'
                    })
                })
                that.oSupplierPopup.open();
            });
            }
            else{
                this.oSupplierPopup.open();
            }

        },

        oCityPopup: null,
        selectedField: null,
        onF4Help: function(oEvent){
            //if oCityPopup is initial
            this.selectedField = oEvent.getSource();
            if(!this.oCityPopup){
                var that = this;
                Fragment.load({
                    name: "emc.hr.payroll.fragments.popup",
                    type: "XML",
                    id: "Cities",
                    controller: this
                })
                .then(function(oPopup){
                    that.oCityPopup = oPopup;
                    //change the title
                    that.getView().addDependent(that.oCityPopup);
                    that.oCityPopup.setTitle("Select City");
                    that.oCityPopup.bindAggregation("items",{
                        path: '/cities',
                        template: new sap.m.DisplayListItem({
                            label: '{name}',
                            value: '{famousFor}'
                        })
                    });
                    that.oCityPopup.setMultiSelect(false);
                    that.oCityPopup.open();
                });
            }
            else{
                this.oCityPopup.open();
            }

        },

        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();

            if(sId.indexOf("Cities") !== -1){
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sText = oSelectedItem.getLabel();
                this.selectedField.setValue(sText);
            }

            else{

               var oTable = this.getView().byId("idTable");
               var oSelectedItems= oEvent.getParameter("selectedItems");
               var aFilters = [];
               for (let index = 0; index < oSelectedItems.length; index++) {
                   const element = oSelectedItems[index];
                   const sText = element.getLabel();
                   aFilters.push(new Filter('name', FilterOperator.EQ, sText));
               }
               var oFilter = new Filter({
                   filters: aFilters,
                   and: false
               });
               oTable.getBinding("items").filter(oFilter);

            }
            

        },

        onSearchPopup: function(oEvent){
            var sVal = oEvent.getParameter("value");
            var oBinding = oEvent.getParameter("itemsBinding");
            var oFilter = new Filter("name", FilterOperator.Contains, sVal);
            oBinding.filter(oFilter);

        },

        handleConfirm: function(status){
            if(status === "OK"){
                MessageToast.show(this.readMessage("XMSG_ORDREL","90099"))
            }
        },

        onOrder: function(params){
            MessageBox.confirm(this.readMessage("XMSG_CONFIRM"),{
                title: 'Confirmation',
                onClose: this.handleConfirm.bind(this)
            })

        },

        herculis: function(oEvent){
            var sPath = this.extractPath(oEvent);
            this.getView().bindElement({
                path: sPath,
                parameters: {
                    expand: 'To_Supplier'
                }
            });

        }
    });
});