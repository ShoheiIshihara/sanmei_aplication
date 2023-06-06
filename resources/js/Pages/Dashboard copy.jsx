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

            <div className="sm:flex text-ebb-900 bg-ebb-50  h-screen  w-screen">
           
                {/* サイドバー */}
                <SideMenu props={props} />

                {/* //ここからリザルト画面 */}
                <Result />
               
            </div>
        </AuthenticatedLayout>
    );
}
