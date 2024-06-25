import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard2 from "./dashboard2";

let Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem("token")) {
           
            navigate("/login", { replace: true })
        }

        else if(localStorage.getItem("userType")=="type-2"){
            navigate("/Dashboard2", { replace: true })
        }

    }, [])

    return (
        <>
            <h1 className="bg-slate-800 py-1 text-slate-100 text-2xl text-center font-semibold">Welcome to Dashboard 1</h1>
            <div className="flex flex-row">
                <div className="w-[200px] bg-slate-100 h-screen p-2"><button className="bg-cyan-700 w-full rounded-md text-slate-100" onClick={() => { localStorage.clear("token"); window.location.reload() }}>Logout</button>
                </div>
                <div className="p-6 w-full ">
                   <h1 className="text-3xl font-semibold text-slate-900 text-center">Hi' {localStorage.getItem("user")}</h1>
                </div>
            </div>
        </>
    )

}



export default Dashboard