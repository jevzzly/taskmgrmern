import React from 'react'
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice';
import { toast } from 'sonner';
import ModalWrapper from './ModalWrapper';
import Textbox from './Textbox';
import { useForm } from 'react-hook-form';
import { DialogTitle } from '@headlessui/react';
import Loading from './Loading';
import Button from './Button';

const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Пароли не совпадают")
            return;
        }
        try {
            const result = await changeUserPassword(data).unwrap();
            toast.success("Пароль изменён")

            setTimeout(() => {
                setOpen(false);
            }, 1500)
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.message);

        }
    }

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <DialogTitle
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'>
                        Сменить пароль
                    </DialogTitle>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Введите новый пароль'
                            type='password'
                            name='password'
                            label='Новый пароль'
                            className='w-full rounded'
                            register={register("password", {
                                required: "Необходимо ввести новый пароль",
                            })}
                            error={errors.password ? errors.password.message : ""}
                        />
                        <Textbox
                            placeholder='Введите повторно'
                            type='password'
                            name='cpass'
                            label='Подтвердите пароль'
                            className='w-full rounded'
                            register={register("cpass", {
                                required: "Необходимо подтвердить новый пароль",
                            })}
                            error={errors.cpass ? errors.cpass.message : ""}
                        />
                    </div>

                    {isLoading ? (
                        <div className='py-5'>
                            <Loading />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <Button
                                label='Создать'
                                type='submit'
                                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                            />
                            <button
                                type='button'
                                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                                onClick={() => setOpen(false)}
                            >Закрыть</button>
                        </div>
                    )}
                </form>
            </ModalWrapper>
        </>
    );
}

export default ChangePassword
