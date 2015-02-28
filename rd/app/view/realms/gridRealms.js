Ext.define('Rd.view.realms.gridRealms' ,{
    extend      :'Ext.grid.Panel',
    alias       : 'widget.gridRealms',
    multiSelect : true,
    store       : 'sRealms',
    stateful    : true,
    stateId     : 'StateGridRealms',
    stateEvents :['groupclick','columnhide'],
    border      : false,
    requires    : [
        'Rd.view.components.ajaxToolbar'
    ],
    urlMenu     : '/cake2/rd_cake/realms/menu_for_grid.json',
    viewConfig: {
        loadMask:true
    },
    bbar        : [
        {   xtype: 'component', itemId: 'count',   tpl: i18n('sResult_count_{count}'),   style: 'margin-right:5px', cls: 'lblYfi'  }
    ],
    initComponent: function(){
        var me      = this;
        var filters = {
            ftype   : 'filters',
            encode  : true, 
            local   : false
        };
        me.tbar     = Ext.create('Rd.view.components.ajaxToolbar',{'url': me.urlMenu});
        me.features = [filters];

        me.columns  = [
            {xtype: 'rownumberer',stateId: 'StateGridRealms1'},
            { text: i18n('sOwner'),    dataIndex: 'owner',     tdCls: 'gridTree', flex: 1, filter: {type: 'string'},stateId: 'StateGridRealms2'},
            { text: i18n('sName'),     dataIndex: 'name',      tdCls: 'gridTree', flex: 1, filter: {type: 'string'},stateId: 'StateGridRealms3'},
            { text: i18n('sPhone'),    dataIndex: 'phone',     tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridRealms4'},
            { text: i18n('sFax'),      dataIndex: 'fax',       tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridRealms5'},
            { text: i18n('sCell'),     dataIndex: 'cell',      tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridRealms6'},
            { text: i18n('s_email'),   dataIndex: 'email',     tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridRealms7'},
            { text: i18n('sURL'),      dataIndex: 'url',       tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridRealms8'},
			{ text: 'Twitter',      dataIndex: 'twitter',      tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGR9'},
			{ text: 'Facebook', 	dataIndex: 'facebook',     tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGR10'},
			{ text: 'Youtube', 		dataIndex: 'youtube',      tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGR11'},
			{ text: 'Google+', 		dataIndex: 'google_plus',  	tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGR12'},
			{ text: 'LinkedIn', 	dataIndex: 'linkedin', 		tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGR13'},
			{ text: 'T&C Title', 	dataIndex: 't_c_title', 	tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGR14'},
			{ text: 'T&C Content', 	dataIndex: 't_c_content', 	tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGR15'},
            { 
                text:   i18n('sAvailable_to_sub_providers'),
                flex: 1,  
                xtype:  'templatecolumn', 
                tpl:    new Ext.XTemplate(
                            "<tpl if='available_to_siblings == true'><div class=\"fieldGreen\">"+i18n('sYes')+"</div></tpl>",
                            "<tpl if='available_to_siblings == false'><div class=\"fieldRed\">"+i18n('sNo')+"</div></tpl>"
                        ),
                dataIndex: 'available_to_siblings',
                    filter  : {
                        type: 'boolean'    
                },stateId: 'StateGridRealms9'
            },
            { 
                text    : i18n('sNotes'),
                sortable: false,
                width   : 130,
                xtype   : 'templatecolumn', 
                tpl     : new Ext.XTemplate(
                                "<tpl if='notes == true'><div class=\"note\">"+i18n("sExisting_Notes")+"</div></tpl>"
                ),
                dataIndex: 'notes',stateId: 'StateGridRealms10'
            }
        ];

        //Create a mask and assign is as a property to the window
        me.mask = new Ext.LoadMask(me, {msg: i18n('sConnecting')+" ...."});   
        me.callParent(arguments);
    }
});
