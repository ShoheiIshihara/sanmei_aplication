<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Setsuiribi
 * 
 * @property int $seireki
 * @property int $2
 * @property int $3
 * @property int $4
 * @property int $5
 * @property int $6
 * @property int $7
 * @property int $8
 * @property int $9
 * @property int $10
 * @property int $11
 * @property int $12
 * @property int $1
 *
 * @package App\Models
 */
class Setsuiribi extends Model
{
	protected $table = 'setsuiribi';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'seireki' => 'int',
		'int',
		'int',
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
		'seireki',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'1'
	];
}
