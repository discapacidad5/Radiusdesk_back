Ext.define('Rd.model.mDynamicClient', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',           type: 'int'     },
         {name: 'name',         type: 'string'  },
         {name: 'owner',        type: 'string'  }, 
         {name: 'nasidentifier',type: 'string'  },
         {name: 'calledstationid',type: 'string'  },
         {name: 'last_contact',    	type: 'date',      dateFormat: 'Y-m-d H:i:s'   },
         {name: 'last_contact_ip',  type: 'string'  },
         'last_contact_human',
         {name: 'timezone',  type: 'string'  },
         {name: 'monitor',  type: 'string'  },
         {name: 'session_auto_close',  type: 'bool'  },
         {name: 'session_dead_time',  type: 'int'  },
         {name: 'available_to_siblings',  type: 'bool'  },
         {name: 'active',  type: 'bool'  },
         {name: 'on_public_maps',  type: 'bool'  },
         'lat',
         'lon',
         {name: 'user_id',           type: 'int'     },
         'country_code',
         'country_name',
         'city',
         'postal_code',
         {name: 'update',       type: 'bool'},
         {name: 'delete',       type: 'bool'}
        ]
});
