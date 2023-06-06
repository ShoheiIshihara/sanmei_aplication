import { Children } from "react";

export default function ResultContetBox ({title,content,subcontent,detail, children}) {

    return (
        <div className="whitespace-pre-wrap text-justify pt-5 sm:p-3 sm:pr-0">
            <h2 className="font-medium pl-2">{title} : 
                <span className="text-lg">{content}</span>
                <span className="ml-4">{subcontent}</span>
            </h2>
            <hr  className=" border-yellow-300 mb-2"/>
            <p className="sm:mx-4  text-sm leading-6">{detail}</p>
            {children}
        </div>

    )
}