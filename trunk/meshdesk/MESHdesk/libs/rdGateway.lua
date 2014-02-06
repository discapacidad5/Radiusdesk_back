require( "class" )

-------------------------------------------------------------------------------
-- Gateway
-------------------------------------------------------------------------------
class "rdGateway"

--Init function for object
function rdGateway:rdGateway()
	local uci 	= require("uci")
	self.version 	= "1.0.0"
	self.x		= uci.cursor(nil,'/var/state')
	self.conf_zone  = 'one' -- network interface 'one' is the admin interface
end
        
function rdGateway:getVersion()
	return self.version
end
 
function rdGateway:enable(exPoints)
	exPoints = exPoints or {}
	self:disable()	--Clean up any left overs
	self:__fwGwEnable()
	self:__dhcpGwEnable()
	self:__addExPoints(exPoints)
end     

function rdGateway:disable()
	self:__fwGwDisable()
	self:__dhcpGwDisable()
end

--[[--
=========================================
========= Private methods =============== 
=========================================
--]]--

function rdGateway.__addExPoints(self,exPoints)

	for k,v in pairs(exPoints)do 
		print(v) 
		self:__dhcpGwEnable(v)
		self:__fwGwEnable(v)
	end
end

function rdGateway.__dhcpGwEnable(self,network,start,limit)

	--Some sane defaults
	network 	= network or self.conf_zone
	start 		= start or  10
	limit		= limit or 150
	
	self.x.set('dhcp','lan','ignore',1)
	self.x.set('dhcp',network,'dhcp')
	self.x.set('dhcp',network,'interface', network)
	self.x.set('dhcp',network,'start', start)
	self.x.set('dhcp',network,'limit', limit)
	self.x.set('dhcp',network,'leasetime','12h')
	self.x.commit('dhcp')
end

function rdGateway.__dhcpGwDisable(self)
	self.x.delete('dhcp','lan','ignore')
	self.x.delete('dhcp',self.conf_zone)
	--Remove any previous NAT points (if there were any) the will start with ex_
	self.x.foreach('dhcp','dhcp', 
		function(a)
			--print(a['.name'])
			--Check the name--
			if(string.find(a['.name'],"ex_"))then
				self.x.delete('dhcp',a['.name'])
			end
 		end)
	
	self.x.commit('dhcp')
end

function rdGateway.__fwGwEnable(self,network)
	print("Enable gateway on firewall")
	
	--Some sane defaults
	network 	= network or self.conf_zone
	
	local no_config_zone = true
	
	self.x.foreach('firewall', 'zone',
		function(a)
			-- Add masq option to LAN --
			if(a['name'] == 'lan')then
				self.x.set('firewall',a['.name'],'masq',1)
				self.x.set('firewall',a['.name'],'mtu_fix',1)
			end
			
			-- Check if 'meshdesk_config' zone is present
			if(a['name'] == network)then
				no_config_zone = false
			end
		end)
		
	--If config zone not present / add it
	if(no_config_zone)then
		local zone_name = self.x.add('firewall','zone')
		self.x.set('firewall',zone_name,'name',		network)	
		self.x.set('firewall',zone_name,'network',	network)	
		self.x.set('firewall',zone_name,'INPUT',	'ACCEPT')	
		self.x.set('firewall',zone_name,'OUTPUT',	'ACCEPT')	
		self.x.set('firewall',zone_name,'FORWARD',	'ACCEPT')	
		self.x.set('firewall',zone_name,'conntrack',	'1')	
	end
	
	-- Add the SNAT rules
	local no_redir = true
	self.x.foreach('firewall', 'redirect',
		function(a)
			if(a.src == network)then
				no_redir = false
			end
		end)
	if(no_redir)then
		local r = self.x.add('firewall','redirect')
		self.x.set('firewall',r, 'src',network)
		self.x.set('firewall',r, 'dst','lan')
		self.x.set('firewall',r, 'target','SNAT')
	end
	
	-- Add the forwarding entry
	local no_forwarding = true
	self.x.foreach('firewall','forwarding',
		function(a)
			if(a.src == network)then
				no_forwarding = false
			end
		end)
	if(no_forwarding)then
		local f = self.x.add('firewall', 'forwarding')
		self.x.set('firewall',f,'src',network)
		self.x.set('firewall',f,'dst','lan')
	end
	self.x.commit('firewall')
end

function rdGateway.__fwGwDisable(self)
	print("Disable gateway on firewall")
	
	-- Take care of the Zones --
	self.x.foreach('firewall', 'zone',
		function(a)
			if(a['name'] == 'lan')then
				self.x.delete('firewall',a['.name'],'masq')
				self.x.delete('firewall',a['.name'],'mtu_fix')
			end
			if((a['name'] == self.conf_zone) or (string.find(a['name'],"ex_")))then
				local z_name = a['.name']
				self.x.delete('firewall',z_name)
			end
		end)
	
	-- Remove the SNAT rules --
	self.x.foreach('firewall', 'redirect',
		function(a)
			if((a.src == self.conf_zone) or (string.find(a.src, "ex_")))then
				local r_zone = a['.name']
				self.x.delete('firewall',r_zone)
			end
		end)
	
	-- Remove the forwarding entry --
	self.x.foreach('firewall', 'forwarding',
		function(a)
			if((a.src == self.conf_zone) or (string.find(a.src,"ex_")))then
				local fwd_name	  = a['.name']
				self.x.delete('firewall',fwd_name)
			end
		end)
			
	self.x.commit('firewall')
		
end
