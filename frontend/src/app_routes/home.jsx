import React from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";

const Home = () => {
    const user = useAuthUser();
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();

    return (
        <div>
            <h1>Welcome to my website!</h1>
            <button onClick={() => signOut()}>Sign Out</button>
            <p>Here you can find all sorts of cool stuff.</p>
        </div>
    );
};

export default Home;
