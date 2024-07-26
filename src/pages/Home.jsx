import { useContext } from "react";
import AuthContext from "../context/AuthProvider.jsx";
import useRefreshToken from "../hooks/useRefreshToken.js";

const Home = () => {
    const { auth } = useContext(AuthContext);
    const refresh = useRefreshToken();

    const testRefresh = async () => {
        const response = await refresh();
        console.log(response);
    }
    return (
        <div>
            <button onClick={() => {console.log(auth)}}>Show auth</button>
            <button onClick={() => testRefresh()}>Test Refresh Token</button>
        </div>
    );
    
}

export default Home;