<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CalJudai
 * 
 * @property int $jukkan_id
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
class CalJudai extends Model
{
	protected $table = 'cal_judai';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'jukkan_id' => 'int',
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
		'jukkan_id',
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
