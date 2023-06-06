<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Rail
 * 
 * @property int $rail_id
 * @property string $rail
 * @property string $keyword
 * @property string $detail
 *
 * @package App\Models
 */
class Rail extends Model
{
	protected $table = 'rail';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'rail_id' => 'int'
	];

	protected $fillable = [
		'rail_id',
		'rail',
		'keyword',
		'detail'
	];
}
