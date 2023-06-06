<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Isoho
 * 
 * @property int $isoho_id
 * @property string $detail
 *
 * @package App\Models
 */
class Isoho extends Model
{
	protected $table = 'isoho';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'isoho_id' => 'int'
	];

	protected $fillable = [
		'isoho_id',
		'detail'
	];
}
