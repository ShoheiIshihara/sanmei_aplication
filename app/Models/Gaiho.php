<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Gaiho
 * 
 * @property int $gaiho
 * @property string $houkou
 * @property string $gozou_notice
 * @property string $gozou_oshirase
 * @property string $roppu
 * @property string $roppu_notice
 *
 * @package App\Models
 */
class Gaiho extends Model
{
	protected $table = 'gaiho';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'gaiho' => 'int'
	];

	protected $fillable = [
		'gaiho',
		'houkou',
		'gozou_notice',
		'gozou_oshirase',
		'roppu',
		'roppu_notice'
	];
}
