Ext.define('Rd.view.dynamicClients.gridRealmsForDynamicClientOwner' ,{
    extend      :'Ext.grid.Panel',
    alias       : 'widget.gridRealmsForDynamicClientOwner',
    border      : false,
    requires    :   ['Rd.view.components.advCheckColumn'],
    realFlag    : false, 
    columns: [
        {xtype: 'rownumberer'},
        { text: i18n('sName'),    dataIndex: 'name',      tdCls: 'gridTree', flex: 1},
        {
            xtype: 'advCheckColumn',
            text: 'Include',
            dataIndex: 'selected',
            renderer: function(value, meta, record) {
                var cssPrefix = Ext.baseCSSPrefix,
                cls = [cssPrefix + 'grid-checkheader'],
                disabled = false;
                if (value && disabled) {
                    cls.push(cssPrefix + 'grid-checkheader-checked-disabled');
                } else if (value) {
                    cls.push(cssPrefix + 'grid-checkheader-checked');
                } else if (disabled) {
                    cls.push(cssPrefix + 'grid-checkheader-disabled');
                }
                return '<div class="' + cls.join(' ') + '">&#160;</div>';
            }
        }
    ],
    bbar: [
        {   xtype: 'component', itemId: 'count',   tpl:  i18n('sResult_count_{count}'),   style: 'margin-right:5px', cls: 'lblYfi'  }
    ],
    initComponent: function(){

        var me          = this;
        var urlUpdate   = '/cake2/rd_cake/realms/dummy_edit.json';

        if(me.realFlag){
            urlUpdate  = '/cake2/rd_cake/realms/update_dynamic_client_realm.json';
            me.tbar = [ 
                { xtype: 'button',  iconCls: 'b-reload', glyph: Rd.config.icnReload,   scale: 'large', itemId: 'reload',   tooltip:    i18n('sReload')},
                { xtype: 'tbseparator' },
                {xtype: 'checkboxfield',boxLabel  : i18n('sMake_available_to_sub_providers'), cls : 'lblRd',
                    itemId      : 'chkAvailSub',
                    name        : 'available_to_siblings',
                    inputValue  : true
                }       
            ];
        }else{
            me.tbar = [ 
                { xtype: 'button',  iconCls: 'b-reload',  glyph: Rd.config.icnReload,  scale: 'large', itemId: 'reload',   tooltip:    i18n('sReload')}      
            ];
        }
 
        //Create a store specific to this Owner
        me.store = Ext.create(Ext.data.Store,{
            model: 'Rd.model.mRealmForDynamicClientOwner',
            proxy: {
                type: 'ajax',
                format  : 'json',
                batchActions: true, 
                url   : '/cake2/rd_cake/realms/list_realms_for_dynamic_client_owner.json',
                reader: {
                    type: 'json',
                    rootProperty: 'items',
                    messageProperty: 'message'
                },
                api: {
                    update: urlUpdate
                }
            },
            listeners: {
                load: function(store, records, successful) {      
                    if(!successful){
                        Ext.ux.Toaster.msg(
                            i18n('sError_encountered'),
                            store.getProxy().getReader().rawData.message.message,
                            Ext.ux.Constants.clsWarn,
                            Ext.ux.Constants.msgWarn
                        );
                        //console.log(store.getProxy().getReader().rawData.message.message);
                    }else{
                        var count   = me.getStore().getTotalCount();
                        me.down('#count').update({count: count});
                    }  
                },
                update: function(store, records, success, options) {
                    store.sync({
                        success: function(batch,options){
                           
                        },
                        failure: function(batch,options){
                          
                        }
                    });
                },
                scope: this
            },
            autoLoad: false    
        });
        me.callParent(arguments);
    }
});
