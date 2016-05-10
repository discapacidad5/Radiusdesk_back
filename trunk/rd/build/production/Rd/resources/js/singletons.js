function i18n(b,a){return Local.getLocalizedString(b,a)}Local={languageCode:"ja",languageCodeDefault:"en",charset:"utf-8",languages:[],getLocalizedString:function(b,a){if(!this.localizedStrings[b]){return"Not Defined"}return(this.formatString(this.localizedStrings[b],a))},formatString:function(b,a){var d=b;if(a){var c=Ext.Object.getKeys(a);Ext.Array.forEach(c,function(e){d=d.replace("{"+e+"}",a[e])})}return d},localizedStrings:{spclCountry:"United Kingdom",spclLanguage:"English",sUsername:"Username",sPassword:"Password",sEnter_username:"Enter username",sEnter_password:"Enter password",sOK:"OK",sAuthenticate_please:"Authenticate please",sChanging_language_please_wait:" Changing language, please wait",sNew_language_selected:"New language selected",sChoose_a_language:"Choose a language",sAbout:"About",sFailure:"Failure",sReload:"Reload",sAdd:"Add",sDelete:"Delete",sEdit:"Edit",sCopy:"Copy",sEdit_meta_info:"Edit meta-info",sAdd_comment:"Add comment",sKey:"Key",sComment:"Comment",sEnglish_use_as_reference:"English (use as reference)",sTranslated:"Translated",sJavascript_Phrases:"Javascript Phrases",sPHP_Phrases:"PHP Phrases","sResult_count_{count}":"There are {count} items",sConnecting:"Connecting",sAction:"Action",sSelection:"Selection",sLogout:"Logout",sSettings:"Settings",sTile:"Tile",sCascade:"Cascade",sRestore:"Restore",sMinimize:"Minimize",sMaximize:"Maximize",sClose:"Close",sMenu:"Menu",si18n_Manager:"i18n Manager",sGet_Help:"Get Help",sTranslation_management:"Translation management",sOnline_help_for_Translation_Manager:"Online help for Translation Manager",sSelect_a_country:"Select a country",sYou_are_required_to_select_a_country:" You are required to select a country",sCountry_added:"Country added",sNew_country_added_fine:"New country added fine",sSending_the_info:"Sending the info",sCountry:"Country",sLanguage:"Language",sCopy_phrases_from_language:"Copy phrases from language",sLanguage_of_country:"Language of country",sAdd_Key:"Add Key",sSupply_the_following_detail_please:"Supply the following detail please",sKey_name:"Key name",sSpecify_a_valid_name_for_the_key:"Specify a valid name for the key",sNext:"Next",sChoose_a_key:"Choose a key",sDelete_country:"Delete country",sSelect_the_country_to_delete_fs_Make_sure_you_know_what_you_are_doing:"Select the country to delete. Make sure you know what you are doing.",sEdit_Countries:"Edit Countries",sSelect_a_country_to_edit:"Select a country to edit",sCountry_name:"Country name",sSpecify_a_valid_name_please:"Specify a valid name please",sISO_code:"ISO code",seg_ZA_or_DE:"eg ZA or DE",sSpecify_a_valid_iso_country_code:"Specify a valid iso country code",sFlag_icon:"Flag icon",sSelect_Icon:"Select icon",sPrev:"Previous",sChoose_a_country:"Choose a country",sAdd_Language:"Add Language",sSelect_an_existing_country_to_add_a_language_to_fs:"Select an existing country to add a language to.",sAlternatively_choose_to_create_a_new_country_fs:"Alternatively choose to create a new country.",sCreate_new_country:"Create new country",seg_pt_or_de:"eg pt or de",sSpecify_a_valid_iso_language_code:"Specify a valid iso language code",sEdit_Key:"Edit Key",sSelect_a_key_to_edit:"Select a key to edit",sChoose_an_existing_language_to_copy_the_phrases_from:"Choose an existing language to copy",sAvailable_languages:"Available languages",sDelete_language:"Delete language",sSelect_the_language_to_delete_fs:"Select the language to delete.",sMake_sure_you_know_what_you_are_doing_fs:"Make sure you know what you are doing.",sEdit_Languages:"Edit Languages",sSelect_a_language_to_edit:"Select a language to edit",sAdd_Msgid:"Add Msgid",sMsgid:"Msgid",sMsgstr:"Msgstr",sOptional_Comment:"Optional Comment",sRemove_existing_comments:"Remove existing comments",sAdd_comment_to_msgid:"Add comment to msgid",sCopy_from_another_language:"Copy from another language",sMaintain_existing_translations:"Maintain existing translations",sEdit_Msgid:"Edit Msgid",sPrevious_value:"Previous value",sSpecify_Meta_data:"Specify Meta data",sEnter:"Enter",sSource:"Source",sDestination:"Destination",sSelect_something:"Select something",sSelect_something_to_work_on:"Select something to work on",sConfirm:"Confirm",sAre_you_sure_you_want_to_do_that_qm:"Are you sure you want to do that?",sItem_added:"Item added",sNew_item_added_fine:"New item added fine",sUpdated_database:"Updated database",sDatabase_has_been_updated:"Database has been updated",sSelect_one_only:"Select one only",sSelection_limited_to_one:"Selection limited to one",sAccess_Providers:"Access Providers",sLogged_in_user:"Logged in user",sSelect_an_owner:"Select an owner",sFirst_select_an_Access_Provider_who_will_be_the_owner:"First select an Access Provider who will be the owner",sNew_item_created:"New item created",sItem_created_fine:"Item created fine",sSelect_an_item:"Select an item",sFirst_select_an_item:"First select an item",sItem_updated:"Item updated",sItem_updated_fine:"Item updated fine",sItem_deleted:"Item deleted",sItem_deleted_fine:"Item deleted fine",sProblems_deleting_item:"Problems deleting item",sSelect_a_node:"Select a node",sFirst_select_a_node_to_expand:"First select a node to expand",sRight_Changed:"Right Changed",sProblems_changing_right:"Problems changing right",sThere_were_some_problems_experienced_during_changing_of_the_right:"There were some problems experienced during changing of the right",sSelect_one_or_more:"Select one or more",sSelect_one_or_more_columns_please:"Select one or more columns please",sLimit_the_selection:"Limit the selection",sRights_manager:"Rights manager",sRights_management:"Rights management",sAccess_Controll_Objects:"Access Controll Objects",sAccess_Provider_Rights:"Access Provider Rights",sPermanent_User_Rights:"Permanent User Rights",sFirst_select_a_node_of_the_tree_under_which_to_add_an_ACO_entry:"First select a node of the tree under which to add an ACO entry",sRoot_node_selected:"Root node selected",sYou_can_not_edit_the_root_node:"You can not edit the root node",sError_encountered:"Error encountered",sExpand:"Expand",sName:"Name",sAccess_control_objects_br_ACOs_br:"Access control objects (ACOs)",sAllow:"Allow",sAdd_ACO_object:"Add ACO object",sParent_node:"Parent node",sAlias:"Alias",sOptional_Description:"Optional Description",sSave:"Save",sEdit_ACO_object:"Edit ACO object",sEnter_a_value:"Enter a value",sDefault_Access_Provider_Rights:"Default Access Provider Rights",sProblems_updating_the_database:"Problems updating the database",sDatabase_could_not_be_updated:"Database could not be updated",sRecord_all_acivity:"Record all acivity",sOwner:"Owner",sActivate:"Activate",sOptional_info:"Optional info",sSurname:"Surname",sPhone:"Phone",s_email:"email",sAddress:"Address",sMonitor:"Monitor",sYes:"Yes",sNo:"No",sExisting_Notes:"Existing Notes",sActive:"Active",sNotes:"Notes",sCreate:"Create",sRealm:"Realm",sRead:"Read",sUpdate:"Update",sUpdated_right:"Updated right",sRight_has_been_updated:"Right has been updated",sProblems_updating_the_right:"Problems updating the right",sRight_could_not_be_updated:"Right could not be updated",sRights:"Rights",sActivity:"Activity",sRealms:"Realms",sDetail:"Detail",sAccess_Provider_hierarchy:"Access Provider hierarchy",sNew_Access_Provider:"New Access Provider",sSelect_the_Parent_Access_provider:"Select the Parent Access provider",sNAS_Device_manager:"NAS Device manager",sNAS_devices:"NAS devices",sSelect_at_least_one_realm:"Select at least one realm",sSelect_one_or_more_realms:"Select one or more realms",sFirst_select_an_item_to_tag:"First select an item to tag",sSelect_a_tag:"Select a tag ",sSelect_a_tag_please:"Select a tag please",sTags_modified:"Tags modified",sTags_modified_fine:"Tags modified fine",sOff:"Off",sPing:"Ping",sHeartbeat:"Heartbeat",sMonitor_method:"Monitor method",sRequired_info:"Required info",sIP_Address:"IP Address",sSupply_a_value:"Supply a value",sSecret:"Secret",sType:"Type",sPorts:"Ports",sCommunity:"Community",sServer:"Server",sDescription:"Description",sMonitor_settings:"Monitor settings",sHeartbeat_is_dead_after:"Heartbeat is dead after",sHeartbeat_id:"Heartbeat ID",sPing_interval:"Ping interval",sLongitude:"Longitude",sLatitude:"Latitude",sDispaly_on_public_maps:"Display on public maps",sRecord_authentication_requests:"Record authentication requests",sAuto_close_stale_sessions:"Auto close stale sessions",sAuto_close_activation_time:"Auto close activation time",sAvailable_to_sub_providers:"Available to sub-providers",sConnection_type:"Connection type",sMake_available_to_sub_providers:"Make available to sub-providers",sMake_available_to_any_realm:"Make available to any realm",sAdd_NAS_device:"Add NAS device",sSelect_the_device_owner:"Select the device owner",sChoose_a_connection_type:"Choose a connection type",sCredentials_for_OpenVPN_tunnel:"Credentials for OpenVPN tunnel",sUnique_AVP_combination:"Unique AVP combination",sAttribute:"Attribute",sValue:"Value",sValue_to_identify_the_NAS_with:"Value to identify the NAS with",sSupply_the_following:"Supply the following",sConnection:"Connection",sAdd_or_remove_tags:"Add or remove tags",sSelect_an_action_and_a_tag:"Select an action and a tag",sEnhancements:"Enhancements",sMaps_info:"Maps info",sNote:"Note",sCSV_export:"CSV export",sSelect_columns_to_include_in_CSV_list:"Select columns to include in CSV list",sColumns:"Columns",sOnline_help:"Online help",sNote_management:"Note management",sAdd_Note:"Add Note",sSelect_the_owner:"Select the owner",sTags:"Tags",sTag:"Tag",sRealms_manager:"Realm manager",sFirst_select_an_item_to_delete:"First select an item to delete",sContact_detail:"Contact detail",sFax:"Fax",sURL:"URL",sStreet_Number:"Street Number",sStreet:"Street",sTown_fs_Suburb:"Town / Suburb",sCity:"City",sLocation:"Location",sCell:"Cell",sLogo:"Logo",sAdd_realm:"Add realm",sSelect_an_owner_for_the_realm:"Select an owner for the realm",sTags_manager:"Tags manager",sNAS_device_tags:"NAS device tags",sNew_tag_for_NAS_devices:"New tag for NAS devices",sSelect_the_tag_owner:"Select the tag owner",sAlso_show_to_sub_providers:"Also show to sub providers",sEdit_tag_for_NAS_device:"Edit tag for NAS device",sProfile_component_manager:"Profile component manager",sNew_profile_component:"New profile component",sSelect_the_component_owner:"Select the component owner",sComponents:"Components",sVendor:"Vendor",sCheck_attribute_count:"Check attribute count",sReply_attribute_count:"Reply attribute count",sAttribute_name:"Attribute name",sReplace_this_value:"Replace this value",sUnits:"Units",sCheck:"Check",sReply:"Reply",sProfiles_manager:"Profiles manager",sProfiles:"Profiles",sOperator:"Operator",sSelect_a_vendor:"Select a vendor",sSelect_an_attribute:"Select an attribute",sRemove:"Remove",sAdd_or_remove_components:"Add or remove components",sEdit_profile:"Edit profile",sSelect_an_action:"Select an action",sProfile_component:"Profile component",sPriority:"Priority",sProfiles_modified:"Profiles modified",sProfiles_modified_fine:"Profiles_modified_fine",sProfile_components:"Profile components",sAdd_component:"Add component",sRemove_component:"Remove component",sMake_private:"Make private",sSelect_a_component_to_add_or_remove:"Select a component to add or remove",sPermanent_Users:"Permanent Users",sNew_permanent_user:"New permanent user",sBasic_info:"Basic info",sProfile:"Profile",sCap_type:"Cap type",sPersonal_info:"Personal info",sActivate_and_Expire:"Activate and Expire",sAlways_active:"Always active",sFrom:"From",sTo:"To",sTracking:"Tracking",sRADIUS_authentication:"RADIUS authentication",sRADIUS_accounting:"RADIUS accounting",sHard:"Hard",sSoft:"Soft",sAuth_type:"Auth type",sBYOD_manager:"BYOD manager",sVouchers:"Vouchers",sActivity_monitor:"Activity monitor",sRegistered_devices:"Registered devices",sUnclaimed_devices:"Unclaimed devices",sMAC_address:"MAC Address",sAuthentication_data:"Authentication data",sAccounting_data:"Accounting data","tpl_In_{in}_Out_{out}_Total_{total}":"In {in} Out {out} Total {total}",sNAS_port_id:"NAS port id",sNAS_port_type:"NAS port type",sStart_time:"Start time",sStop_time:"Stop time",sFreeRADIUS_info:"FreeRADIUS info",sDevices:"Devices",sPrivate_attributes:"Private attributes",sLast_accept_time:"Last accept time",sLast_accept_nas:"Last accept nas",sLast_reject_time:"Last reject time",sLast_reject_nas:"Last reject nas",sLast_reject_message:"Last reject message",sNew_device:"New device",sEnable_fs_Disable:" Enable / Disable",sEnable:"Enable",sDisable:"Disable",sFirst_select_an_item_to_modify:"First select an item to modify",sItems_modified:"Items modified",sItems_modified_fine:"Items modified fine",sEnd_date_wrong:"End date wrong",sThe_end_date_should_be_after_the_start_date:"The end date should be after the start_date",sStart_date_wrong:"Start date wrong",sThe_start_date_should_be_before_the_end_date:"The start date should be before the end date",sChange_password_for:"Change password",sChange_password:"Change password",sWalpaper_changed:"Wallpaper changed",sWalpaper_changed_fine:"Wallpaper changed fine",sGroupname:"Groupname",sNAS_IP_Address:"NAS IP Address",sSession_time:"Session time",sAccount_authentic:"Account authentic",sConnect_info_start:"Connect info start",sConnect_info_stop:"Connect info stop",sData_in:"Data in",sData_out:"Data out",sCalled_station_id:"Called station id",sCalling_station_id_MAC:"Calling station id (MAC)",sTerminate_cause:"Terminate cause",sService_type:"Service type",sFramed_protocol:"Framed protocol",sFramed_ipaddress:"Framed IP Address",sAcct_start_delay:"Acct start delay",sAcct_stop_delay:"Acct stop delay",sX_Ascend_session_svr_key:"X Ascend session svr key",sNasname:"Nasname",sDate:"Date",sReload_every:"Reload every",s30_seconds:"30 seconds",s1_minute:"1 minute",s5_minutes:"5 minutes",sStop_auto_reload:"Stop auto reload",sWallpaper:"Wallpaper",sAcct_session_id:"Acct session id",sAcct_unique_id:"Acct unique id",sUser_type:"User type",sOpenVPN:"OpenVPN",sSet_by_server:"Set by server",sNAS:"NAS",sOpenVPN_credentials:"OpenVPN credentials",sDynamic_AVP_detail:"Dynamic AVP detail",sExample:"Example",sPPTP_credentials:"PPTP credentials",sPPTP:"PPTP",sIgnore_accounting_requests:"Ignore accounting requests",sGoogle_Maps:"Google Maps",sDevice_info:"Device info",sCancel:"Cancel",sAction_required:"Action required",sNew_position:"New position",sSimply_drag_a_marker_to_a_different_postition_and_click_the_delete_button_in_the_info_window:"Simply drag a marker to a different postition and click the delete button in the info window",sDelete_a_marker:"Delete a marker",sEdit_a_marker:"Edit a marker",sSimply_drag_a_marker_to_a_different_postition_and_click_the_save_button_in_the_info_window:"Simply drag a marker to a different postition and click the save button in the info window",sAdd_a_marker:"Add a marker",sSelect_a_NAS_device:"Select a NAS device",sCurrent_state:"Current state",sUp:"Up",sDown:"Down",sUnknown:"Unknown",sStatus:"Status",sPreferences:"Preferences",sHybrid:"Hybrid",sRoadmap:"Roadmap",sSatellite:"Satellite",sTerrain:"Terrain",sSnapshot:"Snapshot",sPasswords_does_not_match:"Passwords does not match",sState:"State",sDuration:"Duration",sStarted:"Started",sEnded:"Ended",sCurrent_logo:"Current logo",sSelect_an_image:"Select an image",sNew_logo:"New logo",sLogfile_viewer:"Logfile viewer",sDebug_output:"Debug output",sClear_screen:"Clear screen",sStop_FreeRADIUS:"Stop FreeRADIUS",sStart_FreeRADIUS:"Start FreeRADIUS",sStart_fs_Stop:" Start / Stop FreeRADIUS",sReceiving_new_logfile_data:"Receiving new logfile data",sAwaiting_new_logfile_data:"Awaiting new logfile data",sAdd_debug_time:"Add debug time",sStart_debug:"Start debug",sStop_debug:"Stop debug",sFilters:"Filters",sAny_NAS_device:"Any NAS device",sAny_user:"Any user",sRADIUS_client:"RADIUS client",sAuthentication:"Authentication",sAccounting:"Accounting",sPermanent_user:"Permanent user",sDevice:"Device",sRequest_type:"Request type",sDynamic_login_pages:"Dynamic login pages",sAdd_dynamic_page:"Add dynamic page",sSelect_an_owner_for_the_login_page:"Select an owner for the login page",sPhotos:"Photos",sAdd_photo:"Add photo",sTitle:"Title",sPhoto:"Photo",sEdit_photo:"Edit photo",sOptional_photo:"Optional photo",sOwn_pages:"Own pages",sDynamic_keys:"Dynamic keys",sContent:"Content",sEdit_dynamic_pair:"Edit dynamic pair",sEdit_own_page:"Edit own page",sAdd_dynamic_pair:"Add dynamic pair",sAdd_own_page:"Add own page",sNo_images_available:"No images available",sUpdated_item:"Updated item",sItem_has_been_updated:"Item has been updated",sProblems_updating_the_item:"Problems updating item",sItem_could_not_be_updated:"Item could not be updated","sA_Modern_Webtop_front-end_to_FreeRADIUS":"A Modern Webtop front-end to FreeRADIUS",sAbout_RADIUSdesk:"About RADIUSdesk","sNAS-Identifier":"NAS-Identifier",sCommand:"Command",sCreated:"Created",sModified:"Modified",sAdd_a_command:"Add a command",sAwaiting:"Awaiting",sFetched:"Fetched",sNew_voucher:"New voucher",sPrecede_string:"Precede string",sHow_many_qm:"How many?",sBatch_name:"Batch name",sActivate_upon_first_login:"Activate upon first login",sDays_available_after_first_login:"Days available after first login",sNever_expire:"Never expire",sExpire:"Expire",sPassword_length:"Password length",sBatch:"Batch",sNew:"New",sUsed:"Used",sDepleted:"Depleted",sExpired:"Expired",s_br_Single_voucher_br:"(Single voucher)",sTime_used:"Time used (%)",sData_used:"Data used (%)",sCap_type_for_data:"Cap type for data",sCap_type_for_time:"Cap type for time",sVoucher:"Voucher",sOutput_format:"Output format",sGenerate_pdf:"Generate PDF",sOnly_selected_items:"Only selected items",sOnly_selected:"Only Selected",sNothing_to_export:"Nothing to export",sList_is_empty:"List is empty",sVoucher_export_to_pdf:"Voucher export to pdf",sNAS_Identifier:"NAS Identifier",sPassword_manager:"Password manager",sEncryption:"Encryption",sConnects_with:"Connects with",sHardware_model:"Hardware model",sStatic_entry_points:"Static entry points",sStatic_exit_points:"Static exit points",sWEP:"WEP",sWPA_Personal:"WPA Personal",sWPA2_Personal:"WPA2 Personal",sWPA_Enterprise:"WPA Enterprise",sWPA2_Enterprise:"WPA2 Enterprise",sHidden:"Hidden",sClient_isolation:"Client isolation",sApply_to_all_nodes:"Apply to all nodes",sNone:"None",sSSID:"SSID",sBSSID:"BSSID",sNode_count:"Node count",sNodes_up:"Nodes up",sNodes_down:"Nodes down",sNo_one:"No one",sAuto_detect:"Auto detect",sHardware:"Hardware",sPower:"Power",sStatic_entries:"Static entries",sStatic_exits:"Static exits",sAP_isolation:"AP isolation",sBridge_Loop_Avoidance:"Bridge Loop Avoidance",sAggregation:"Aggregation",sBonding:"Bonding",sFragmentation:"Fragmentation",sOGM_interval_br_ms_br:"OGM interval (ms)",sGateway_switching:"Gateway switching",sHeartbeat_interval:"Heartbeat interval",s5G_Channel:"5G Channel",s2_pt_4G_Channel:"2.4G Channel",sRADIUS_server:"RADIUS server",sShared_secret:"Shared secret",sNew_mesh_exit_point:"New mesh exit point",sEthernet_bridge:"Ethernet bridge",sTagged_Ethernet_bridge:"Tagged Ethernet bridge",sNAT_plus_DHCP:"NAT+DHCP",sCaptive_Portal:"Captive Portal",sSpecify_exit_point_type:"Specify exit point type",sExit_point_type:"Exit point type",sCommon_settings:"Common settings",sVLAN_number:"VLAN number",sCaptive_Portal_settings:"Captive Portal settings",sRADIUS_server1:" RADIUS server1",sRADIUS_server2:"RADIUS server2",sRADIUS_secret:"RADIUS secret",sRADIUS_NASID:"RADIUS NASID",sUAM_URL:"UAM URL",sUAM_Secret:"UAM Secret",sWalled_garden:"Walled garden",sSwap_octets:"Swap octets",sMAC_authentication:"MAC authentication",sNew_mesh_node:"New mesh node",sTX_Power_br_percent_br:"TX Power (%)",sNew_mesh:"New mesh",sEntry_points:"Entry points",sMesh_settings:"Mesh settings",sExit_points:"Exit points","Node settings":"Node settings",sNodes:"Nodes",sMap:"Map",sEdit_mesh_entry_point:"Edit mesh entry point",sEdit_mesh_exit_point:"Edit mesh exit point",sMESHdesk_overview:"MESHdesk overview",sNew_mesh_entry_point_added:"New mesh entry point added",sNew_mesh_enty_point_created_fine:"New mesh enty point created fine",sItem_added_fine:"Item added fine",sNo_entry_points_defined:"No entry points defined",sDefine_some_entry_points_first:"Define some entry points first",sPassword_changed:"Password changed",sPassword_changed_fine:"Password changed fine",sFetched_password:"Fetched password",sPassword_fetched_for_selected_user:"Password fetched for selected user",sRight_to_left:"Right to left",sHome:"Home",s_br_select_user_first_br:"(select_user_first)",sCurrent_password:"Current password",sNew_password:"New password",sNode_settings:"Node settings",sT_and_C:"T&C",sCompulsory:"Compulsory",sRequest:"Request",sRequest_Attributes:"Request Attributes",sReply_Attributes:"Reply Attributes",sClients:"Clients",sModules:"Modules",sGeneral:"General",sUptime:"Uptime",sVersion:"Version",sUsage_graphs:"Usage graphs",sDaily:"Daily",sWeekly:"Weekly",sMonthly:"Monthly",sDay:"sDay",sApply_power_to_all_nodes:"Apply power to all nodes",sAccess_Point_Management:"Access Point Management",sOverview:"Overview",sAttached_Devices:"Attached Devices",sDetached_Devices:"Detached Devices",sSelect_an_item_on_which_to_execute_the_command:"Select an item on which to execute the command",sFirst_select_an_item_to_restart:"First select an item to restart",sCommand_queued:"Command queued",sCommand_queued_for_execution:"Command queued for execution",sFirst_select_an_Access_Provider_who_will_be_the_owner:"First select an Access Provider who will be the owner",sSelect:"Select",sAccess_Point_Profiles:"Access Point Profiles",sRadio_one:"Radio One",sRadio_zero:"Radio Zero",sTwo_point_four_gig:"2.4G",sFive_gig:"5G",sGateway:"Gateway",sWait_time_for_DHCP_IP:"Wait time for DHCP IP",sUse_previous_settings_when_DHCP_fails:"Use previous settings when DHCP fails",sBasic:"Basic",sProxy:"Proxy",sCoova_specific:"Coova specific",sUpstream_proxy:"Upstream proxy",sUpstream_port:"Upstream port",sAuth_name:"Auth name",sAuth_password:"Auth password",sOptional_config_items:"Optional config items",sLast_contact:"Last contact",sFrom_IP:"From IP",sSSID_to_Device:"SSID to Device",sUsers_Connected:"Users Connected",sData_Usage:"Data Usage",sConnected_to_Exit:"Connected to Exit"}};