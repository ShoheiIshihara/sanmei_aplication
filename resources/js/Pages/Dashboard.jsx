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
            <div className={isLoading ? "" : "hidden"}>
                <div className=" z-50  w-screen h-full bg-ebb-700 bg-opacity-30 absolute">
                    <div  className="relative top-1/3 left-1/2"><Loading type="spin" color="gray"/></div>
                </div>
            </div>
           <div>
                <div className="drawer lg:drawer-open w-full h-screen">
                    <input id="sidemenu-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center h-full">
                        {/* Page content here */} 
                        <label htmlFor="sidemenu-drawer" className="btn  drawer-button  lg:hidden fixed bottom-[20px] right-[20px] z-40">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            <span>鑑定者選択</span>
                        </label>
                        <div className='w-full h-screen'>
                            <Result />
                        </div>
                    </div> 
                    {/* ドロワー */}
                    <div className="drawer-side">
                        <label htmlFor="sidemenu-drawer" className="drawer-overlay"></label> 
                        <div className="menu w-100 h-screen bg-ebb-400 ">
                            {/* Sidebar content here */}
                            <SideMenu props={props} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
