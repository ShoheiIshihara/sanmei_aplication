<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class IndividualPsychologyOverview
 * 
 * @property int $id
 * @property string $detail
 * @property int $thinking_id
 * @property int $behavior_id
 * @property int $mentality_id
 *
 * @package App\Models
 */
class IndividualPsychologyOverview extends Model
{
	protected $table = 'individual_psychology_overview';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'thinking_id' => 'int',
		'behavior_id' => 'int',
		'mentality_id' => 'int'
	];

	protected $fillable = [
		'id',
		'detail',
		'thinking_id',
		'behavior_id',
		'mentality_id'
	];
}
