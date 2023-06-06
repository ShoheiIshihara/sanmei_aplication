<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class IndividualPsychology
 * 
 * @property int $individual_psychology_id
 * @property string $animal
 * @property string $male
 * @property string $female
 *
 * @package App\Models
 */
class IndividualPsychology extends Model
{
	protected $table = 'individual_psychology';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'individual_psychology_id' => 'int'
	];

	protected $fillable = [
		'individual_psychology_id',
		'animal',
		'male',
		'female'
	];
}
