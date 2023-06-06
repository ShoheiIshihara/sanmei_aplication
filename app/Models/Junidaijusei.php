<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Junidaijusei
 * 
 * @property int $junidaijusei_id
 * @property string $junidaijusei
 * @property int $point
 * @property string $detail
 *
 * @package App\Models
 */
class Junidaijusei extends Model
{
	protected $table = 'junidaijusei';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'junidaijusei_id' => 'int',
		'point' => 'int'
	];

	protected $fillable = [
		'junidaijusei_id',
		'junidaijusei',
		'point',
		'detail'
	];
}
