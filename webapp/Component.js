sap.ui.define(["sap/ui/core/UIComponent"],
     function(UIComponent) {
    'use strict';
    return UIComponent.extend("emc.hr.payroll.Component",{
        metadata: {
            manifest: "json"
        },
        init: function(){
            //this line will call the base class constructor
            UIComponent.prototype.init.apply(this);
            var oRouter = this.getRouter();
            oRouter.initialize();
        },

        // createContent: function(){


            

            // var oView= sap.ui.view({
            //     viewName: "emc.hr.payroll.view.App",
            //     id: "idAppView",
            //     type:'XML'
            // });

            // var oView1 = sap.ui.view({
            //     viewName: "emc.hr.payroll.view.View1",
            //     id: "idView1",
            //     type: "XML"
            // });

            //  var oView2 = sap.ui.view({
            //     viewName: "emc.hr.payroll.view.View2",
            //     id: "idView2",
            //     type: "XML"
            // });

            // var oAppCon = oView.byId("appCon");
            // oAppCon.addMasterPage(oView1).addDetailPage(oView2);
            // return oView;


        // }
    });
    
});