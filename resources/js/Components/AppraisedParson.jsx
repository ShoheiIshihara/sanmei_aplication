import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/input/InputError';
import InputLabel from '@/Components/input/InputLabel';
import PrimaryButton from '@/Components/input/PrimaryButton';
import TextInput from '@/Components/input/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';


export default function AppraisedParson() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        birth_year: '',
        birth_month: '',
        birth_day: '',
        birth_hour: '',
        birth_minite: '',
        gender: '',
        group: '',
    });

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route('register'));
    // };

    return (

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="氏名" />

                    <TextInput
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>



                <div className="mt-4">
                    <InputLabel forInput="password" value="パスワード" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="パスワード（確認用）" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        登録済みの方はこちら
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        アカウント作成
                    </PrimaryButton>
                </div>
            </form>
    );
}
