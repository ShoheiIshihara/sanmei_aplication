import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import { useSelector } from "react-redux";

import Loading from '@/Components/Loading';
import Result from '@/Components/Result';
import SideMenu from '@/Components/SideMenu';

export default function Dashboard(props) {
    //初期設定
    const isLoading = useSelector(state => state.commonOption.isLoading);//Loadingflg

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={""}
        >
            <Head title="Dashboard" />

            <div>
                    {/* ドロワー */}
                    <div className="drawer lg:drawer-open w-full h-full">
                            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content flex flex-col items-center justify-center h-full">
                            
                                {/* Page content here */} 
                                <label htmlFor="my-drawer-2" className="btn btn-square drawer-button  lg:hidden fixed bottom-[20px] right-[20px] z-40">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                                <div className='w-full h-full'>
                                    <Result />
                                </div>
                            </div> 
                            <div className="drawer-side">
                                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 

                                <div className="menu w-100 h-full bg-ebb-400 ">
                                    {/* Sidebar content here */}
                                    <SideMenu props={props} />
                                </div>
                            
                            </div>
                    </div>
            </div>


        </AuthenticatedLayout>
    );
}
