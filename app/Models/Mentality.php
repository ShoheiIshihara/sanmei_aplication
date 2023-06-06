<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Mentality
 * 
 * @property int $mentality_id
 * @property string $mentality
 * @property string $detail
 *
 * @package App\Models
 */
class Mentality extends Model
{
	protected $table = 'mentality';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'mentality_id' => 'int'
	];

	protected $fillable = [
		'mentality_id',
		'mentality',
		'detail'
	];
}
