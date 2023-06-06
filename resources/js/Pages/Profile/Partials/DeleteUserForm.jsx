import React, { useRef, useState } from 'react';
import DangerButton from '@/Components/input/DangerButton';
import InputError from '@/Components/input/InputError';
import InputLabel from '@/Components/input/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/input/SecondaryButton';
import TextInput from '@/Components/input/TextInput';
import { useForm } from '@inertiajs/inertia-react';

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アカウント削除</h2>

                <p className="mt-1 text-sm text-gray-600">
                    アカウントを削除すると、全てのデータが完全に削除されます。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>アカウント削除</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        アカウントを削除しますか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        アカウントを削除すると全てのデータが完全に削除されます。
                        よろしければパスワードを入力してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel for="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            handleChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" processing={processing}>
                            アカウント削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
