
import { FC, useEffect, useState } from "react";
import { AnimatedTextCharacter,Header } from "@components";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import { Paper } from "@mantine/core";
import axios from "axios";

const Home:FC = () => {
    const [ping, setPing] = useState("");


    const getPing = async() => {
        let res = await axios.get("/api/test");
        setPing(res.data.ping);
    }

    useEffect(() => {
        getPing();
    },[])
    return (
        <>  
            30 DAY DSA Challenge.
            {ping}
        </>
    )
}

export default Home;