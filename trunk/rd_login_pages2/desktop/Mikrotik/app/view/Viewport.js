Ext.define('Mikrotik.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.vp',
    initComponent: function() {
        this.callParent(arguments);
    },
    layout: 'fit'
});
