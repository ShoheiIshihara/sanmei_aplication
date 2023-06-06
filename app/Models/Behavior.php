<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Behavior
 * 
 * @property int $behavior_id
 * @property string $behavior
 * @property string $detail
 *
 * @package App\Models
 */
class Behavior extends Model
{
	protected $table = 'behavior';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'behavior_id' => 'int'
	];

	protected $fillable = [
		'behavior_id',
		'behavior',
		'detail'
	];
}
