import { createContext } from "react";


const userContext=createContext(null);



const userProvider=({children}:{
    children: React.ReactNode;
})