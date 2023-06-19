import { useContext, useEffect, useState } from "react"
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { GoogleButton } from "react-google-button"
import { AuthContext } from "contexts"
import { useNavigate } from "react-router-dom"

const Signin = () => {
    const userContext = useContext(AuthContext)
    const { googleSignIn, user, domainError, eligibleDomain } = userContext
    const [isHidden, setIsHidden] = useState(false)

    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate("/")
        }
    }, [user])

    return (
        <div className="relative flex flex-col items-center">
            <div className={`absolute right-0 top-[-30px] p-4 rounded-md bg-yellow-50 animate-bounce ${isHidden ? "hidden" : null}`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-800">Download the PWA first before signing in to avoid unexpected circumstances.</p>
                    </div>
                    <div className="pl-3 ml-auto">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                onClick={() => setIsHidden(true)}
                                type="button"
                                className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                            >
                                <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="py-8 text-3xl font-bold text-center font-primary">
                Sign in
            </h1>

            <div className="max-w-[240px] m-auto">
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>

            {domainError
                &&
                <p className="my-6 font-bold font-primary text-rose-600">
                    Invalid email address, only email address with {eligibleDomain} domain can be registered.
                </p>
            }
        </div>
    )
}
export default Signin
