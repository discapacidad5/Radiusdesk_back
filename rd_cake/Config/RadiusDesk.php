<?php
//The groups that is defined 
$config['group']['admin']   = 'Administrators';     //Has all the rights
$config['group']['ap']      = 'Access Providers';   //Has selected right
$config['group']['user']    = 'Permanent Users';              //Has very limited rights

$config['language']['default']    = '4_4';     //This is the id 4 of Languages and id 4 of countries (GB_en)

$config['commands']['msgcat'] = '/usr/bin/msgcat';

//Define the connection types and if they are active or not
$config['conn_type'][0]     = array('name' => __('Direct (Fixed IP)'),  'id' => 'direct',   'active' => true);
$config['conn_type'][1]     = array('name' => __('OpenVPN'),            'id' => 'openvpn',  'active' => false);
$config['conn_type'][2]     = array('name' => __('PPTP'),               'id' => 'pptp',     'active' => false);
$config['conn_type'][3]     = array('name' => __('Dynamic Client'),     'id' => 'dynamic',  'active' => true);

//Define the location of ccd (client config directory)
//FIXME This value does not get read by the OpenvpnClients Model - investigate
$config['openvpn']['ccd_dir_location']  = '/etc/openvpn/ccd/';
$config['openvpn']['ip_half']           = '10.8.';

//Define pptp specific settings
$config['pptp']['start_ip']                        = '10.20.30.2';
$config['pptp']['server_ip']                       = '10.20.30.1';
$config['pptp']['chap_secrets']                    = '/etc/ppp/chap-secrets';

//Define dynamic specific settings
$config['dynamic']['start_ip']                     = '10.120.0.1'; //Make this a Class B subnet (64000) which will never include a value also specified for a FIXED client

//Dictionary files to include for profiles...
$config['freeradius']['path_to_dictionary_files']   = '/usr/local/share/freeradius/';
$config['freeradius']['main_dictionary_file']       = '/usr/local/etc/raddb/dictionary';
$config['freeradius']['radclient']                  = '/usr/local/bin/radclient';


//Define the configured dynamic attributes
$config['dynamic_attributes'][0]     = array('name' => 'Called-Station-Id',  'id' => 'Called-Station-Id',   'active' => true);
$config['dynamic_attributes'][1]     = array('name' => 'Mikrotik-Realm',     'id' => 'Mikrotik-Realm',      'active' => true);
$config['dynamic_attributes'][2]     = array('name' => 'NAS-Identifier',     'id' => 'NAS-Identifier',      'active' => true);

//Define nas types
$config['nas_types'][0]     = array('name' => 'Other',                  'id' => 'other',                    'active' => true);
$config['nas_types'][1]     = array('name' => 'CoovaChilli',            'id' => 'CoovaChilli',              'active' => true);
$config['nas_types'][2]     = array('name' => 'CoovaChilli-Heartbeat',  'id' => 'CoovaChilli-Heartbeat',    'active' => true);
$config['nas_types'][3]     = array('name' => 'Mikrotik',               'id' => 'Mikrotik',                 'active' => true);
$config['nas_types'][3]     = array('name' => 'Mikrotik-Heartbeat',     'id' => 'Mikrotik-Heartbeat',       'active' => true);

//Define Voucher format types
$config['voucher_formats'][0]     = array('name' => 'Generic A4',               'id' => 'a4',               'active' => true);
$config['voucher_formats'][1]     = array('name' => 'Generic A4 Page/Voucher',  'id' => 'a4_page',          'active' => true);
$config['voucher_formats'][2]     = array('name' => 'Avery 5160',               'id' => '5160',             'active' => true);
$config['voucher_formats'][3]     = array('name' => 'Avery 5161',               'id' => '5161',             'active' => true);
$config['voucher_formats'][4]     = array('name' => 'Avery 5162',               'id' => '5162',             'active' => true);
$config['voucher_formats'][5]     = array('name' => 'Avery 5163',               'id' => '5163',             'active' => true);
$config['voucher_formats'][6]     = array('name' => 'Avery 5164',               'id' => '5164',             'active' => false); //gives trouble
$config['voucher_formats'][7]     = array('name' => 'Avery 8600',               'id' => '8600',             'active' => true); 
$config['voucher_formats'][8]     = array('name' => 'Avery L7160',              'id' => 'L7160',            'active' => true); 
$config['voucher_formats'][9]     = array('name' => 'Avery L7161',              'id' => 'L7161',            'active' => true); 
$config['voucher_formats'][10]     = array('name' => 'Avery L7163',              'id' => 'L7163',            'active' => true); 



//FIXME To incorporate
$config['paths']['wallpaper_location']  = "/rd/resources/images/wallpapers/";

$config['paths']['dynamic_photos']      = "/cake2/rd_cake/webroot/img/dynamic_photos/";   
$config['paths']['dynamic_detail_icon'] = "/cake2/rd_cake/webroot/img/dynamic_details/";

//Define default settings for the users:
$config['user_settings']['wallpaper']       = "9.jpg";
$config['user_settings']['map']['type']     = "ROADMAP";
$config['user_settings']['map']['zoom']     = 18;
$config['user_settings']['map']['lng']      = -71.0955740216735;
$config['user_settings']['map']['lat']      = 42.3379770178396;

//The location of the mobile and desktop login pages for CoovaChilli
$config['CoovaDynamicLogin']['mobile']      = '/rd_login_pages/mobile/CoovaChilli/index.html';
$config['CoovaDynamicLogin']['desktop']     = '/rd_login_pages/desktop/CoovaChilli/build/CoovaLogin/production/index.html';

//The location of the mobile and desktop login pages for Mikrotik
$config['MikrotikDynamicLogin']['mobile']   = '/rd_login_pages/mobile/Mikrotik/index.html';
$config['MikrotikDynamicLogin']['desktop']  = '/rd_login_pages/desktop/Mikrotik/build/MikrotikLogin/production/index.html';


//===== MESHdesk ======
//== Encryption types ==
//Define the encryption types and if they are active or not
$config['encryption'][0]     = array('name' => __('None'),              'id' => 'none',     'active' => true);
$config['encryption'][1]     = array('name' => __('WEP'),               'id' => 'wep',      'active' => true);
$config['encryption'][2]     = array('name' => __('WPA Personal'),      'id' => 'psk',      'active' => true);
$config['encryption'][3]     = array('name' => __('WPA2 Personal'),     'id' => 'psk2',     'active' => true);
$config['encryption'][4]     = array('name' => __('WPA Enterprise'),    'id' => 'wpa',      'active' => true);
$config['encryption'][5]     = array('name' => __('WPA2 Enterprise'),   'id' => 'wpa2',     'active' => true);

//== Default mesh settings ==
//Define default settings for the mesh which can be overwritten
$config['mesh_settings']['ap']  = false; //AP Isolation
$config['mesh_settings']['bl']  = false; //Bridge loop avoidence
$config['mesh_settings']['ag']  = true;  //Aggregation
$config['mesh_settings']['b']   = false; //Bonding
$config['mesh_settings']['f']   = true;  //Fragmentation
$config['mesh_settings']['it']  = 1000; //OGM Interval
$config['mesh_settings']['gateway_switching'] = 20; //Client Gateway switching 

//== Node start ip for defined mesh ==
$config['mesh_node']['start_ip']    = '10.5.5.1';

//== Default node settings ==
$config['common_node_settings']['password']  = 'verysecure'; //Root password on nodes
$config['common_node_settings']['power']     = 100; //% of tx power to use on devices
$config['common_node_settings']['all_power'] = true; //Apply this power to all devices?
$config['common_node_settings']['two_chan']  = 6; //% Channel to use on 2.4G wifi
$config['common_node_settings']['five_chan'] = 44; //% Channel to use on 5G wifi
$config['common_node_settings']['heartbeat_interval']  = 60; //Send a heartbeat pulse through every interval seconds
$config['common_node_settings']['heartbeat_dead_after'] = 300; //Mark a device as dead if we have not had heartbeats in this time
 

//== Device types for MESHdesk ==
$config['hardware'][0]      = array('name' => __('Dragino MS14'),   'id'    => 'dragino2',       'active'    => true);
$config['hardware'][1]      = array('name' => __('OpenMesh OM2P'),  'id'    => 'om2p' ,          'active'    => true);
$config['hardware'][2]      = array('name' => __('PicoStation2'),   'id'    => 'picostation2',   'active'    => true);

//== MESHdesk SSID/BSSID
$config['MEHSdesk']['bssid'] = "02:CA:FE:CA:00:00"; //This will be the first one; subsequent ones will be incremented 

//=== EXPERIMENTAL STUFF =====
//Show experimental menus
$config['experimental']['active']                   = false;

//IP Settings
$config['experimental']['defaults']['ip_mask']      = '255.255.255.0';
$config['experimental']['defaults']['ip_dns_1']     = '192.168.99.99';
$config['experimental']['defaults']['ip_dns_2']     = '192.168.99.100';
$config['experimental']['defaults']['ip_dns_2']     = '192.168.99.100';

//Wifi Settings
$config['experimental']['defaults']['wifi_active']  = true;
$config['experimental']['defaults']['channel']      = 1;
$config['experimental']['defaults']['power']        = 10;
$config['experimental']['defaults']['distance']     = 30;


$config['experimental']['defaults']['ssid_secure']  = 'RD Wireless';
$config['experimental']['defaults']['radius']       = '192.168.99.99';
$config['experimental']['defaults']['secret']       = 'testing123';

$config['experimental']['defaults']['ssid_open']    = 'RD Guest';

//OpenVPN Settings
$config['experimental']['defaults']['vpn_server']   = '192.168.99.99';

$config['experimental']['openvpn']['start_ip']      = '10.8.1.2';
$config['experimental']['openvpn']['ca']            = '-----BEGIN CERTIFICATE-----
MIIDYDCCAsmgAwIBAgIJAK+7qcW3f0W6MA0GCSqGSIb3DQEBBQUAMH4xCzAJBgNV
BAYTAlpBMRAwDgYDVQQIEwdHYXV0ZW5nMREwDwYDVQQHEwhQcmV0b3JpYTEMMAoG
A1UEChMDWUZpMRMwEQYDVQQDEwpPcGVuVlBOLUNBMScwJQYJKoZIhvcNAQkBFhhk
aXJrdmFuZGVyd2FsdEBnbWFpbC5jb20wHhcNMTMwNDE1MDgxOTM1WhcNMjMwNDEz
MDgxOTM1WjB+MQswCQYDVQQGEwJaQTEQMA4GA1UECBMHR2F1dGVuZzERMA8GA1UE
BxMIUHJldG9yaWExDDAKBgNVBAoTA1lGaTETMBEGA1UEAxMKT3BlblZQTi1DQTEn
MCUGCSqGSIb3DQEJARYYZGlya3ZhbmRlcndhbHRAZ21haWwuY29tMIGfMA0GCSqG
SIb3DQEBAQUAA4GNADCBiQKBgQDmfB1FBrjuB5xRYJGjr8fCgoxY9M99nPzMcnBQ
tFnkc7TjsoPfDTAOgecpmwfPrfxjBvi9Vae+TwiiwiLLMCewvXP47vySRhXIRUVL
OvEcgapdIGbl26JaHyUrjbsAdrc/Fp5OTmjU5EZ/BciheZJr+ZLUWg/5bkDtI3rH
g+moPQIDAQABo4HlMIHiMB0GA1UdDgQWBBTf/iG94D0pd+3z5RURkZ+43j43LDCB
sgYDVR0jBIGqMIGngBTf/iG94D0pd+3z5RURkZ+43j43LKGBg6SBgDB+MQswCQYD
VQQGEwJaQTEQMA4GA1UECBMHR2F1dGVuZzERMA8GA1UEBxMIUHJldG9yaWExDDAK
BgNVBAoTA1lGaTETMBEGA1UEAxMKT3BlblZQTi1DQTEnMCUGCSqGSIb3DQEJARYY
ZGlya3ZhbmRlcndhbHRAZ21haWwuY29tggkAr7upxbd/RbowDAYDVR0TBAUwAwEB
/zANBgkqhkiG9w0BAQUFAAOBgQCLiXXSKSPIAkMVwFq935zb8RIoEu6fVbo9nbwN
fVIBgZIqpSZT59Ueef/l5zcTabRH7cIZGe6RqBK17I2nSr4s5+Ut4lgdvu7xe3g8
t72pyVfDVfHr1sSMRGSjVt1SPI13uz3a6hzFVFxBoHWdyhXoGmvidNIm09hwPsJN
S6UMIw==
-----END CERTIFICATE-----
';
$config['experimental']['openvpn']['mask']          = '255.255.0.0';
$config['experimental']['openvpn']['broadcast']     = '10.8.255.255';

$config['experimental']['eduroam']['radius_server'] = '192.168.10.20';
$config['experimental']['eduroam']['radius_secret'] = 'eduroam';

$config['experimental']['snmp']['ro']               = 'public';
$config['experimental']['snmp']['rw']               = 'private';
$config['experimental']['snmp']['contact']          = 'radiusdesk@gmail.com';

?>
