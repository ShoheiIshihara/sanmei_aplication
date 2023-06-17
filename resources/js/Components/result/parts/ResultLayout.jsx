
export default function ResultLayout({ children,title }) {

    return(
        <div className="h-[80%] md:h-[100%]" >
            <hr className="mt-4 border-sea-pink-400 " />
            <h1 className="text-2xl py-2 text-center border-sea-pink-400 w-full border-l-8 border-r-8 sm:border-r-0 sm:pl-2 sm:text-left font-medium ">{title}　鑑定結果</h1>
            <hr className="mb-2 border-sea-pink-400" />
            <div className=' h-[80%] border rounded-xl overflow-y-scroll'>
                { children }
            </div>
        </div>

        
    )
}