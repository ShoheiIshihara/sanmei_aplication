<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class IjouKanshi
 * 
 * @property int $ijou_kanshi_id
 * @property string $kanshi_id
 * @property string $ijou_kanshi
 * @property string $detail
 *
 * @package App\Models
 */
class IjouKanshi extends Model
{
	protected $table = 'ijou_kanshi';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'ijou_kanshi_id' => 'int'
	];

	protected $fillable = [
		'ijou_kanshi_id',
		'kanshi_id',
		'ijou_kanshi',
		'detail'
	];
}
