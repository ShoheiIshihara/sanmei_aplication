<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Rhythm
 * 
 * @property int $rhythm_id
 * @property string $rhythm
 * @property string $detail
 *
 * @package App\Models
 */
class Rhythm extends Model
{
	protected $table = 'rhythm';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'rhythm_id' => 'int'
	];

	protected $fillable = [
		'rhythm_id',
		'rhythm',
		'detail'
	];
}
