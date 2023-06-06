<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Kanshi
 * 
 * @property int $kanshi_id
 * @property string $kanshi
 * @property int $tenkan
 * @property int $chishi
 * @property int $tenchusatsu
 * @property string $explanation
 * @property string $detail
 * @property string $gou_id
 * @property string $ijou_id
 * @property string $nickname
 *
 * @package App\Models
 */
class Kanshi extends Model
{
	protected $table = 'kanshi';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'kanshi_id' => 'int',
		'tenkan' => 'int',
		'chishi' => 'int',
		'tenchusatsu' => 'int'
	];

	protected $fillable = [
		'kanshi_id',
		'kanshi',
		'tenkan',
		'chishi',
		'tenchusatsu',
		'explanation',
		'detail',
		'gou_id',
		'ijou_id',
		'nickname'
	];
}
