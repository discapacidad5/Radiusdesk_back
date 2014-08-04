Ext.define('Rd.view.meshes.gridMeshViewNodeDetails' ,{
    extend		:'Ext.grid.Panel',
    alias 		: 'widget.gridMeshViewNodeDetails',
    multiSelect	: true,
    stateful	: true,
    stateId		: 'StateGMVND',
    stateEvents:['groupclick','columnhide'],
    border		: false,
	requires    : [
		'Rd.view.components.ajaxToolbar',
        'Rd.store.sNodeDetails',
        'Rd.model.mNodeDetail'
    ],
    viewConfig	: {
        loadMask	:true
    },
    urlMenu		: '/cake2/rd_cake/meshes/menu_for_node_details_grid.json',
    bbar		: [
        {   xtype: 'component', itemId: 'count',   tpl: i18n('sResult_count_{count}'),   style: 'margin-right:5px', cls: 'lblYfi' }
    ],
    initComponent: function(){
        var me      = this;

        me.store    = Ext.create(Rd.store.sNodeDetails,{
            listeners	: {
                load	: function(store, records, successful) {
                    if(!successful){
                        Ext.ux.Toaster.msg(
                            i18n('sError_encountered'),
                            store.getProxy().getReader().rawData.message.message,
                            Ext.ux.Constants.clsWarn,
                            Ext.ux.Constants.msgWarn
                        );
                    }else{
                        var count   = me.getStore().getTotalCount();
                        me.down('#count').update({count: count});
                    }   
                },
                scope: this
            },
            autoLoad: false 
        });
        me.store.getProxy().setExtraParam('mesh_id',me.meshId);
       // me.store.load();
        me.tbar     = Ext.create('Rd.view.components.ajaxToolbar',{'url': me.urlMenu});
        me.columns  = [
            {xtype: 'rownumberer',stateId: 'StateGMVND1'},
            { text: i18n('sName'),              dataIndex: 'name',           tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND2'},
            { text: i18n('sDescription'),       dataIndex: 'description',    tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND3', hidden : true},
            { text: 'MAC_Address',       		dataIndex: 'mac',            tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND4'},
            { text: i18n('sHardware'),          dataIndex: 'hw_human',       tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND5', hidden : true},
            { text: i18n('sPower'),             dataIndex: 'power',          tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND6', hidden : true},
            { text: i18n('sIP_Address'),        dataIndex: 'ip',             tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND7'},
			{ text: 'Uptime',        	dataIndex: 'uptime',   		tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND9'},
			{ text: 'System time',      dataIndex: 'system_time',   tdCls: 'gridTree', flex: 1,stateId: 'StateGMVND10'},
			{ 
                text        : 'System load',   
                dataIndex   : 'mem_total',  
                tdCls       : 'gridTree', 
                flex        : 1,
                renderer    : function(value,metaData, record){
                	var mem_free 	= record.get('mem_free');
                    var load		= record.get('load_1')+" "+record.get('load_2')+" "+record.get('load_3');
					return Ext.ux.bytesToHuman(mem_free)+"/"+Ext.ux.bytesToHuman(value)+"<br>("+load+")";	             
                },stateId: 'StateGMVND10'
            },
           	{ 
                text    : 'Firmware',
                sortable: false,
                flex    : 1,  
                xtype   : 'templatecolumn', 
                tpl:    new Ext.XTemplate(
                            '<tpl if="Ext.isEmpty(release)"><div class=\"gridRealm noRight\">Not available</div></tpl>', 
                            '<tpl for="release">',     
                                "<tpl>{value}<br></tpl>",
                            '</tpl>'
                        ),
                dataIndex: 'release',stateId: 'StateGMVND11',
				hidden	: true
            }, 
            { 
                text    : 'Hardware',
                sortable: false,
                flex    : 1,  
                xtype   :  'templatecolumn', 
                tpl:    new Ext.XTemplate(
                            '<tpl if="Ext.isEmpty(cpu)"><div class=\"gridRealm noRight\">Not available</div></tpl>', 
                            '<tpl for="cpu">',     
                                "<tpl>{value}<br></tpl>",
                            '</tpl>'
                        ),
                dataIndex: 'cpu',stateId: 'StateGMVND12',
				hidden	: true
            },
			{ 
                text        : 'Last contact',   
                dataIndex   : 'state',  
                tdCls       : 'gridTree', 
                flex        : 1,
                renderer    : function(value,metaData, record){
                    if(value != 'never'){                    
                        var last_contact     = record.get('last_contact');
                        if(value == 'up'){
                            return "<div class=\"fieldGreen\">"+last_contact+"</div>";
                        }
                        if(value == 'down'){
                            return "<div class=\"fieldRed\">"+last_contact+"</div>";
                        }

                    }else{
                        return "<div class=\"fieldBlue\">Never</div>";
                    }              
                },stateId: 'StateGMVND12'
            }
        ];
        me.callParent(arguments);
    }
});
