sap.ui.define(["sap/ui/core/format/NumberFormat"], 
    function(NumberFormat) {
    'use strict';
    return {

       formatCurrency: function(amount,currency) { 
            var oFormat = NumberFormat.getCurrencyInstance();
            return oFormat.format(amount, currency);

        }

    }   
    
});