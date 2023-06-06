<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiceUser
 * 
 * @property string $id
 * @property string $name
 * @property string $email
 * @property string $user_id
 * @property string $password
 * @property Carbon $registration_time
 * @property bool|null $account_enabled
 * @property Carbon|null $invalid_date
 *
 * @package App\Models
 */
class ServiceUser extends Model
{
	protected $table = 'service_users';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'account_enabled' => 'bool'
	];

	protected $dates = [
		'registration_time',
		'invalid_date'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'id',
		'name',
		'email',
		'user_id',
		'password',
		'registration_time',
		'account_enabled',
		'invalid_date'
	];
}
