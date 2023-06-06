<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Jukkan
 * 
 * @property int $jukkan_id
 * @property string $tenkan
 *
 * @package App\Models
 */
class Jukkan extends Model
{
	protected $table = 'jukkan';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'jukkan_id' => 'int'
	];

	protected $fillable = [
		'jukkan_id',
		'tenkan'
	];
}
