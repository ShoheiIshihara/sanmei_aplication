<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Thinking
 * 
 * @property int $thinking_id
 * @property string $thinking
 * @property string $detail
 *
 * @package App\Models
 */
class Thinking extends Model
{
	protected $table = 'thinking';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'thinking_id' => 'int'
	];

	protected $fillable = [
		'thinking_id',
		'thinking',
		'detail'
	];
}
