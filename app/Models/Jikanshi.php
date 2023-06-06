<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Jikanshi
 * 
 * @property int $jikanshi_id
 * @property int $jikoku
 * @property int $1
 * @property int $2
 * @property int $3
 * @property int $4
 * @property int $5
 * @property int $6
 * @property int $7
 * @property int $8
 * @property int $9
 * @property int $10
 *
 * @package App\Models
 */
class Jikanshi extends Model
{
	protected $table = 'jikanshi';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'jikanshi_id' => 'int',
		'jikoku' => 'int',
		'int',
		'int',
		'int',
		'int',
		'int',
		'int',
		'int',
		'int',
		'int',
		'int'
	];

	protected $fillable = [
		'jikanshi_id',
		'jikoku',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10'
	];
}
