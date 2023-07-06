import { useContext } from "react";
import { AuthContext } from "contexts";
import StopWatch from "./StopWatch";
import spinnerImage from "../../assets/load.gif";

const Home = () => {
    const userContext = useContext(AuthContext);
    const { user } = userContext;

    return (
        <div className="relative flex flex-col items-center font-primary">

            {user.displayName
                ? (
                    <>
                        <h1 className="pt-8 text-3xl font-bold text-center font-primary">
                            Welcome {user.displayName}
                        </h1>

                        <StopWatch />
                    </>
                )
                : (
                    <div className="flex items-center justify-center">
                        <img src={spinnerImage} alt="Loading" className="mt-16"/>
                    </div>
                )
            }

        </div>
    );
};

export default Home;