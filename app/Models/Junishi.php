<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Junishi
 * 
 * @property int $junishi_id
 * @property string $chishi
 *
 * @package App\Models
 */
class Junishi extends Model
{
	protected $table = 'junishi';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'junishi_id' => 'int'
	];

	protected $fillable = [
		'junishi_id',
		'chishi'
	];
}
