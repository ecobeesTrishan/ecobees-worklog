import { useContext, useEffect } from "react"
import { GoogleButton } from "react-google-button"
import { AuthContext } from "contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const Signin = () => {
    const userContext = useContext(AuthContext)
    const { googleSignIn, user, domainError, eligibleDomain } = userContext
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
            navigate("/info")
        }
    }, [user])

    return (
        <div className="flex flex-col items-center">
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
