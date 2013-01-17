Ext.define('Rd.store.sAccessProviders', {
    extend: 'Ext.data.TreeStore',
    model: 'Rd.model.mAccessProvider',
    proxy: {
            type: 'ajax',
            format  : 'json',
            batchActions: true, 
            'url'   : '/cake2/rd_cake/access_providers/index_tree.json',
            reader: {
                type: 'json',
                root: 'items',
                messageProperty: 'message'
            }
            simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
    },
    root: {username: 'Logged in user',leaf: false, id:'0', iconCls: 'admin', expanded: false,monitor: 'na', active: 'na'},
    listeners: {
        load: function( store, records, a,successful,b) {
            if(!successful){
                Ext.ux.Toaster.msg(
                        'Error encountered',
                        store.getProxy().getReader().rawData.message.message,
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
                );
            }  
        },
        scope: this
    },
    autoLoad: true,
});
