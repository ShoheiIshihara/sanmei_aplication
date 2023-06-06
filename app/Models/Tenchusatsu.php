<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Tenchusatsu
 * 
 * @property int $tenchusatsu_id
 * @property string $tenchusatsu
 * @property string $tenkan
 * @property string $chishi
 * @property string $tenchusatsu_detail
 *
 * @package App\Models
 */
class Tenchusatsu extends Model
{
	protected $table = 'tenchusatsu';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'tenchusatsu_id' => 'int'
	];

	protected $fillable = [
		'tenchusatsu_id',
		'tenchusatsu',
		'tenkan',
		'chishi',
		'tenchusatsu_detail'
	];
}
