
export default function ModalLayout({ children,title ,idName}) {

    return(
        <dialog id={idName} className="modal ">
            <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                <button htmlFor={idName} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                <div className='tracking-wide leading-relaxed'>                   
                    <h1 className="text-2xl font-bold text-center mb-[20px]  ">{title}</h1>

                    <div className="lg:mx-[50px] text-justify whitespace-pre-line">

                        { children }

                    </div>
                </div>
            </form>
        </dialog>
    )
    
}