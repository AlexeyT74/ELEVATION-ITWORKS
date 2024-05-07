import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Home(){
    const location = useLocation();
    const [name, setName] = useState('Guest');

    useEffect(() => {
      if (location.state) {
        setName(location.state.userName);
      }
    }, [location?.state?.userName]);

    return <h1>Welcome home, {name}!</h1>
}

export default Home;