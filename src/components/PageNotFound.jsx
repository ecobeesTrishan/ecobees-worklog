import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-[89vh] border border-gray-600 font-primary">
            <div className="relative w-full min-h-full isolate">
                <video
                    src="https://www.renuo.ch/images/404.mp4"
                    className="absolute inset-0 object-cover object-top w-full h-full -z-10 brightness-50"
                    autoPlay
                    muted
                    loop
                />

                <div className="flex flex-col items-center px-6 py-32 mx-auto text-center max-w-7xl sm:py-40 lg:px-8">
                    <p className="text-base font-semibold leading-8 text-white">
                        404
                    </p>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Page not found
                    </h1>

                    <p className="mt-4 text-base text-white/70 sm:mt-6">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>

                    <Link to="/">
                        <button className="mt-10 bg-[#fdb517] py-2 px-6 rounded-md text-sm font-semibold leading-7 text-black hover:bg-[#ecae1d] transition ease-in-out">
                            Back to home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;