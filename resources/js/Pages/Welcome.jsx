import React from 'react';
import Modal from 'react-modal'
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {

    //modal
    const customStyles = {
        content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width :'80%'
        }
    };
  

    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#625254';
    }

    function closeModal(){
        setIsOpen(false);
        setEditMode_flg(false);
        setEditGender("1");
        setEditName("");
    }

    return (
        <>
            <Head title="Welcossse" />

            <div className="mx-auto h-screen box-border bg-white">
                <header className="  items-center sticky  border-b border-gray-100">
                            <div className="flex justify-between h-16">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <img src={'/images/logo-color.png'} />
                                    </Link>
                                </div>
                            
                                <div className="top-0 right-0 px-6 py-4 sm:block ">
                                <button variant="success" className="hidden sm:inline p-2 text-sea-pink-900 text-sm hover:text-ebb-700 hover:underline" onClick={openModal}> What's COMPASS</button>    
                                    {props.auth.user ? (
                                        <Link href={route('dashboard')} className="text-sm text-gray-900 dark:text-gray-500 underline">
                                            マイページへ
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={route('login')}
                                                className="sm:ml-7 py-2.5 px-6 rounded-lg text-sm font-bold  bg-sea-pink-100 text-sea-pink-700 hover:text-sea-pink-100 hover:bg-sea-pink-400 ">
                                                ログイン
                                            </Link>

                                            <Link
                                                href={route('register')}
                                                className="ml-7 py-2.5 px-6 rounded-lg text-sm font-bold text-white bg-sea-pink-500 hidden sm:inline hover:text-sea-pink-100 hover:bg-sea-pink-400">
                                                新規登録
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                </header>
                <div className="w-2/12 mx-auto mt-10">
                    <img className="mx-auto block w-3/4" src={'/images/hero-logo.png'} />
                </div>
                <div className="sm:items-center sm:pt-0 bg-white">
                    <div className="h-full sm:px-6 lg:px-8 text-center tracking-widest ">
                            <h1 className="text-4xl font-cormorant text-ebb-900 sm:text-8xl ">
                                COMPASS
                            </h1>

                        <p className=" text-sea-pink-900 tracking-widest">Find a Direction in Life</p>
                        {!props.auth.user ?(
                            
                        <div className="text-center h-full">
                            <div className="block mt-10 mb-10">
                                <button variant="success" className="sm:hidden m-2 text-sea-pink-900 text-sm hover:text-ebb-700 hover:underline" onClick={openModal}> What's COMPASS</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="IntroduceModal"
                                    >
                                    <div className='sm:m-5'>
                                    <button variant="success" className="px-3 py-2 absolute top-1 right-3" onClick={closeModal}>&#215;</button>
                                        <div className="mx-auto">
                                        <h2 ref={_subtitle => (subtitle = _subtitle)} className=" text-center text-gray-800 mx-2 my-2 text-xl ">What's COMPASS</h2>
                                            <p className="p-2 text-sm block mx-auto text-ebb-900 tracking-widest text-center">
                                                中国占星術と中国陰陽五行を土台とした運命学である算命学と<br/>
                                                四柱推命をイメージ心理学の手法を用いて体系化した個性心理学を用いて <br/>
                                                羅針盤のように人生の方向性（宿命）を示すことを目的とした<br/>
                                                鑑定サポートサイトです。<br/>
                                            </p>
                                            <p className="p-2 text-sm block mx-auto text-ebb-900 tracking-widest text-center">
                                                宿命は、あなたの要素の一部に過ぎません。<br />
                                                「運命」とは自身の生き方と自分の置かれた環境、宿命の相乗効果によって決まるものです。
                                            </p>
                                            
                                        </div>
                                        
                                    </div>
                                    <button variant="success" className="mx-auto block px-3 py-2 top-1 right-3 hover:underline" onClick={closeModal}>閉じる</button>
                                </Modal>
                            </div>
                            <div className='mb-10'>
                                <Link
                                    href={route('register')}
                                    className="py-3 px-20 text-xl rounded-lg  tracking-widest text-white bg-sea-pink-500 hover:text-sea-pink-100 hover:bg-sea-pink-400 ">
                                    新規登録
                                </Link>
                            </div>
                        </div>):""}
                        
                    </div>
                </div>
                <footer className='text-center text-xs block text-ebb-800 absolute w-full bottom-2'>&copy; 2023 COMPASS</footer>  
            </div>
            

        </>
    );
}


