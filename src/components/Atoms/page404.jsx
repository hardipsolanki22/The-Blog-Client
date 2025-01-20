import React from "react";
import { Link } from 'react-router-dom'

import image404 from '../../assets/404 attractive best user experience image.png'
import { useTheme } from "../Contexts/theme";

function Page404() {

    const {themeMode} = useTheme()

    return (
        <div className={`sm:col-span-11 md:col-span-6  ${themeMode ? 'dark' : 'light'}
        sm:no-scrollbar sm:overflow-y-auto flex flex-col gap-4 justify-center 
            items-center min-h-screen bg-gray-100 p-4`}>
            <div className="w-full max-w-md">
                <img
                    src={image404}
                    alt="404 Error"
                    className="w-full h-auto rounded-md"
                />
            </div>
            <div className="text-center">
                <p className="text-xl font-semibold text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
                <Link to={'/'} className="text-blue-500 hover:text-blue-700 font-medium">
                    Go back
                </Link>
            </div>
        </div>
    )
}

export default Page404
