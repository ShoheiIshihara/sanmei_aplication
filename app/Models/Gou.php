<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Gou
 * 
 * @property int $gou_id
 * @property string $gou
 * @property string $detail
 *
 * @package App\Models
 */
class Gou extends Model
{
	protected $table = 'gou';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'gou_id' => 'int'
	];

	protected $fillable = [
		'gou_id',
		'gou',
		'detail'
	];
}
