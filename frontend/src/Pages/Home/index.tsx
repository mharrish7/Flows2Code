
import { FC, useEffect, useState } from "react";
import {motion} from "framer-motion";
import axios from "axios";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home:FC = () => {
    const [ping, setPing] = useState("");
    const navigate = useNavigate();

    const getPing = async() => {
        let res = await axios.get("/api/test");
        setPing(res.data.ping);
    }

    useEffect(() => {
        getPing();
    },[])

    const text = "Flows".split("");
    const text2 = "2".split("");
    const text3 = "code".split("");
    return (
        <>  
            <motion.div className={styles.header}>
                <div style={{"textAlign" : 'center'}}>
                <motion.h1 > {text.map((el, i) => (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10,
          }}
          key={i}
        >
          {el}
        </motion.p>
      ))}
      {text2.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.5 + i / 10,
          }}
          key={i}
        >
          {el}
        </motion.span>
      ))}
      {text3.map((el, i) => (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 1 +  i / 10,
          }}
          key={i}
        >
          {el}
        </motion.p>
      ))}</motion.h1>
                <p>Convert your high-level design flow into code efficiently and quickly.</p>
                <button onClick={() => {navigate('/flow')}} className={styles.btn}>Start Now!</button>
                </div>
             </motion.div>
        </>
    )
}

export default Home;