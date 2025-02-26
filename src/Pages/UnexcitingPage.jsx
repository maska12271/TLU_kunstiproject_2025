import {useEffect} from "react";

function UnexcitingPage() {

    useEffect(() => {
        window.location.href = '/'
    }, []);
}

export default UnexcitingPage
