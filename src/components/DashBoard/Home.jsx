import { useContext } from "react";
import { AuthContext } from "contexts";
import StopWatch from "./StopWatch";

const Home = () => {
    const userContext = useContext(AuthContext);
    const { user } = userContext;

    return (
        <div className="relative flex flex-col items-center font-primary">
            <h1 className="pt-8 text-3xl font-bold text-center font-primary">
                Welcome {user.displayName}
            </h1>

            <StopWatch />
        </div>
    );
};

export default Home;