Ext.define('Rd.view.components.cmbSsid', {
    extend          : 'Ext.form.ComboBox',
    alias           : 'widget.cmbSsid',
    fieldLabel      : 'SSIDs',
    labelSeparator  : '',
    forceSelection  : true,
    queryMode       : 'remote',
    valueField      : 'id',
    displayField    : 'name',
    typeAhead       : true,
    allowBlank      : false,
	multiSelect		: true,
    mode            : 'local',
    name            : 'ssid_list[]',
    labelClsExtra   : 'lblRd',
    extraParam      : false,
    initComponent   : function() {
        var me= this;
        var s = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        proxy: {
                type    : 'ajax',
                format  : 'json',
                batchActions: true, 
                url     : '/cake2/rd_cake/ssids/index_ap.json',
                reader: {
                    type            : 'json',
                    root            : 'items',
                    messageProperty : 'message'
                }
            },
            autoLoad    : false
        });

        if(me.extraParam){
        	s.getProxy().setExtraParam('ap_id',me.extraParam);
        }
        me.store = s;
        this.callParent(arguments);
    }
});
