<?php

// src/Model/Table/NotesTable.php

namespace App\Model\Table;
use Cake\ORM\Table;

class NotesTable extends Table
{
    public function initialize(array $config){  
        $this->addBehavior('Timestamp');       
        $this->belongsTo('Users');     
        $this->hasMany('UserNotes',['dependent' => true]);
        $this->hasMany('TagNotes',['dependent' => true]);
        $this->hasMany('RealmNotes',['dependent' => true]);
        $this->hasMany('DynamicDetailNotes',['dependent' => true]);
        $this->hasMany('ProfileNotes',['dependent' => true]);       
    }
      
}
