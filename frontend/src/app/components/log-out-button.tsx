"use client"

import { logOut } from "../../../actions/log-out"

 const LogOutButton= ()=> {
    return(
        <button onClick={()=>logOut()}>
            log out
        </button>
    )
}

export default LogOutButton