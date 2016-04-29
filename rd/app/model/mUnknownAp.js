Ext.define('Rd.model.mUnknownAp', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',                   type: 'int'     },
         {name: 'mac',                  type: 'string'  },
         {name: 'vendor',         	    type: 'string'  },
		 {name: 'from_ip',         	    type: 'string'  },
		 {name: 'vendor',         	    type: 'string'  },
		 {name: 'last_contact',    	    type: 'date',       dateFormat: 'Y-m-d H:i:s'   },
		 {name: 'last_contact_from_ip', type: 'string' },
		 'last_contact_human',
		 'new_server',
         'new_server_status'
        ]
});
