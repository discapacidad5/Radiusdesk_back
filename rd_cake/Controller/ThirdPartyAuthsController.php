<?php
App::uses('AppController', 'Controller');


class ThirdPartyAuthsController extends AppController {

	//------------------------------------------------------------------------------------
	//--This is the place where we will redirect a user to after they authenticated fine-- 
	//--using an OAuth service------------------------------------------------------------
	//------------------------------------------------------------------------------------
	public function opauth_complete() {

		//During initial authentication we set a session variable which we can then use again here to redirect the user back to their login page
		$qs = CakeSession::read('rd.qs');	

		//Build the URL	
		$query = $this->_queryToArray($qs);
		$new_query_string = "";
		$following = false;

		$wanted_query_items = array();
		foreach(array_keys($query) as $k){
			//We don't care for :protocol/hostname pathaname and q
			if(($k != 'protocol')&&($k != 'hostname')&&($k != 'pathname')&&($k != 'q')){ 
				if($following){
					$new_query_string = $new_query_string."&".$k."=".$query["$k"];
				}else{ //First time
					$new_query_string = $new_query_string."?".$k."=".$query["$k"];
				}
				$following = true;

				$wanted_query_items["$k"] = $query["$k"];
			}
		}

		//If the person authenticated fine ($this-data[validated] ==1) then we can search for it among the vouchers or users
		if($this->data['validated'] ==1){

			$conditions = array("OR" =>array());
      
		    foreach(array_keys($wanted_query_items) as $key){
		        array_push($conditions["OR"],
		            array("DynamicPair.name" => $key, "DynamicPair.value" =>  $wanted_query_items[$key])
		        ); //OR query all the keys
		    }

			$this->DynamicDetail= ClassRegistry::init('DynamicDetail');
		    $this->DynamicDetail->DynamicPair->contain(
				array('DynamicDetail' => array('DynamicDetailSocialLogin'))
			);

		    $q_r = $this->DynamicDetail->DynamicPair->find('first', 
		        array('conditions' => $conditions, 'order' => 'DynamicPair.priority DESC')); //Return the one with the highest priority
			//print_r($q_r);

			//Loop through all the DynamicDetailSocialLogin entries and see if one compares with 
			//$this->data[auth][provider]
			$social_login_info = array();
			foreach($q_r['DynamicDetail']['DynamicDetailSocialLogin'] as $i){
				if($i['name'] == $this->data['auth']['provider']){
					$social_login_info = $i;
					break; //No need to go on
				}
			}

			if(array_key_exists('type',$social_login_info)){ 
				//There was a hit now we need to check if there are either a Voucher or Permanent User
				//With extra_name = $this->data['auth']['provider'] and extra_value = ($social_login_info['dynamic_detail_id']."_".
				//$this->data['auth']['uid']
				$extra_name 	= $this->data['auth']['provider'];
				$dd_id			= $social_login_info['dynamic_detail_id'];
				$extra_value	= $dd_id."_".$this->data['auth']['uid'];
				$type			= $social_login_info['type'];

				if($type == 'voucher'){
					$this->Voucher = ClassRegistry::init('Voucher');
					$q_voucher =  $this->Voucher->find('first', 
						array('conditions' => array('Voucher.extra_name' => $extra_name,'Voucher.extra_value'=> $extra_value)));
					if(!$q_voucher){
						$social_login_info['extra_name'] 	= $extra_name;
						$social_login_info['extra_value'] 	= $extra_value;
						$social_login_info['user_id'] 		= intval($q_r['DynamicDetail']['user_id']);
						$this->_addVoucher($social_login_info);
					}
				}

				if($type == 'user'){
					$this->PermanentUser = ClassRegistry::init('PermanentUser');
					$q_user =  $this->PermanentUser->find('first', 
						array('conditions' => array('PermanentUser.extra_name' => $extra_name,'PermanentUser.extra_value'=> $extra_value)));
					if(!$q_user){
						$social_login_info['extra_name'] 	= $extra_name;
						$social_login_info['extra_value'] 	= $extra_value;
						$social_login_info['user_id'] 		= intval($q_r['DynamicDetail']['user_id']);
						//Some personal info
						$social_login_info['name'] 		    = $this->data['auth']['info']['first_name'];
						$social_login_info['surname'] 		= $this->data['auth']['info']['last_name'];

						$this->_addPermanentUser($social_login_info);
					}
				}
			}
		}

		$new_query_string=$new_query_string."&sl_type=$type&sl_value=$extra_value"."&sl_name=$extra_name";

		print_r($new_query_string);

		//$redirect_url = urldecode($query['protocol']).urldecode($query['hostname']).urldecode($query['pathname']).urldecode($new_query_string);
		$redirect_url = 'http://'.urldecode($query['hostname']).urldecode($query['pathname']).urldecode($new_query_string);
//		print($redirect_url);
		$this->redirect("$redirect_url");
//		print_r($this->data);
	}

	public function info_for(){
		
		$this->set(array(
	            'data'         => array('username' => 'rviljoen','password' => 'rviljoen'),
        	    'success'       => true,
            	    '_serialize'    => array('data','success')
        	));


	}

	private function _queryToArray($qry){

		//Take the query string and make in an Array

		$result = array();
		//string must contain at least one = and cannot be in first position
		if(strpos($qry,'=')) {

		if(strpos($qry,'?')!==false) {
		$q = parse_url($qry);
		$qry = $q['query'];
		}
		}else {
			return false;
		}
		foreach (explode('&', $qry) as $couple) {
			list ($key, $val) = explode('=', $couple);
			$result[$key] = $val;
		}
		return empty($result) ? false : $result;
	}

	private function _addVoucher($i){

		$url = 'http://127.0.0.1/cake2/rd_cake/vouchers/add.json';
		$this->User 	= ClassRegistry::init('User');
		$this->User->contain();
		$q_r			= $this->User->find('first',array('conditions' => array('User.username' => 'root')));
		$root_token 	= $q_r['User']['token'];

		$postData = array(
			'extra_name'	=>	$i['extra_name'],
			'extra_value'	=>  $i['extra_value'],	
			'never_expire'	=>	'never_expire',
			'profile_id'	=>  intval($i['profile_id']),
			'quantity'		=>	1,
			'realm_id'		=>	intval($i['realm_id']),
			'sel_language'	=>	'4_4',
			'token'			=> 	$root_token,
			'user_id'		=>	intval($i['user_id'])
        );

		// Setup cURL
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
         
            CURLOPT_POST            => TRUE,
            CURLOPT_RETURNTRANSFER  => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_POSTFIELDS => json_encode($postData)
        ));
        // Send the request
        $response = curl_exec($ch);
	}

	private function _addPermanentUser($i){

		$url = 'http://127.0.0.1/cake2/rd_cake/permanent_users/add.json';
		$this->User 	= ClassRegistry::init('User');
		$this->User->contain();
		$q_r			= $this->User->find('first',array('conditions' => array('User.username' => 'root')));
		$root_token 	= $q_r['User']['token'];

		$password		= $this->_generatePassword();

		$postData = array(
			'active'			=> 'active',
			'always_active'		=> 'always_active',
			'extra_name'		=> $i['extra_name'],
			'extra_value'		=> $i['extra_value'],
			'language'			=> '4_4',
			'password'			=> $password,
			'profile_id'		=> intval($i['profile_id']),
			'realm_id'			=> intval($i['realm_id']),
			'sel_language'		=> '4_4',
			'token'				=> $root_token,
			'user_id'			=> intval($i['user_id']),
			'username'			=> $i['extra_value'],
			'name'				=> $i['name'],
			'surname'			=> $i['surname']
        );

		// Setup cURL
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
         
            CURLOPT_POST            => TRUE,
            CURLOPT_RETURNTRANSFER  => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_POSTFIELDS => json_encode($postData)
        ));
        // Send the request
        $response = curl_exec($ch);
	}

	private function _generatePassword ($length = 8){

        // start with a blank password
        $password = "";
        // define possible characters
       // $possible = "!#$%^&*()+=?0123456789bBcCdDfFgGhHjJkmnNpPqQrRstTvwxyz";
        $possible = "0123456789bBcCdDfFgGhHjJkmnNpPqQrRstTvwxyz";
        // set up a counter
        $i = 0; 
        // add random characters to $password until $length is reached
        while ($i < $length) { 

            // pick a random character from the possible ones
            $char = substr($possible, mt_rand(0, strlen($possible)-1), 1);
            // we don't want this character if it's already in the password
            if (!strstr($password, $char)) { 
                $password .= $char;
                $i++;
            }
        }
        // done!
        return $password;
    }


}
