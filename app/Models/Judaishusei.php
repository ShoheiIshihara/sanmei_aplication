<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Judaishusei
 * 
 * @property int $judaishusei_id
 * @property string $judaishusei
 * @property string $detail
 *
 * @package App\Models
 */
class Judaishusei extends Model
{
	protected $table = 'judaishusei';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'judaishusei_id' => 'int'
	];

	protected $fillable = [
		'judaishusei_id',
		'judaishusei',
		'detail'
	];
}
