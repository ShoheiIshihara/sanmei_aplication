<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class AppraisedParson
 * 
 * @property int $appraised_parsons_id
 * @property string $appraised_parsons_name
 * @property int $birth_year
 * @property int $birth_month
 * @property int $birth_day
 * @property int $birth_hour
 * @property int $birth_minite
 * @property int $gender
 * @property int $user_id
 *
 * @package App\Models
 */
class AppraisedParson extends Model
{
	protected $table = 'appraised_parsons';
	protected $primaryKey = 'appraised_parsons_id';
	public $timestamps = false;

	protected $casts = [
		'birth_year' => 'int',
		'birth_month' => 'int',
		'birth_day' => 'int',
		'birth_hour' => 'int',
		'birth_minite' => 'int',
		'gender' => 'int',
		'user_id' => 'int'
	];

	protected $fillable = [
		'appraised_parsons_name',
		'birth_year',
		'birth_month',
		'birth_day',
		'birth_hour',
		'birth_minite',
		'gender',
		'user_id'
	];
}
