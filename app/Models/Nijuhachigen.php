<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Nijuhachigen
 * 
 * @property int $kanshi_id
 * @property int $shogen
 * @property int $chugen
 * @property int $hongen
 * @property int $shogen_date
 * @property int $chugen_date
 *
 * @package App\Models
 */
class Nijuhachigen extends Model
{
	protected $table = 'nijuhachigen';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'kanshi_id' => 'int',
		'shogen' => 'int',
		'chugen' => 'int',
		'hongen' => 'int',
		'shogen_date' => 'int',
		'chugen_date' => 'int'
	];

	protected $fillable = [
		'kanshi_id',
		'shogen',
		'chugen',
		'hongen',
		'shogen_date',
		'chugen_date'
	];
}
