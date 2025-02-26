import config from "../../Config.js";
import {Link} from "react-router-dom";
import '/src/CSSFiles/Alert.scss'
import {useState} from "react";

function Alert({status, message}) {
    const [closed, setClosed] = useState(false)

    function closeAlert() {
        setClosed(true)
        setTimeout(() => {
            // setShowAddProjectModal(false)
        }, "300");
    }

    return (
        <div className={`alert ${status} ${closed && "closed"}`} onClick={() => closeAlert()}>
            {status}
            {message}
        </div>
    )
}

export default Alert
