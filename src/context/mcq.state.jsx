import React, { useEffect, useState } from "react";
import { getMcqData } from "../services/mcqDataFetch";
import McqDataContext from "./mcq.context";

const MCQDataState = (props) => {
    const [allMcqDataContextAPI, setAllMcqDataContextAPI] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await getMcqData();
                setAllMcqDataContextAPI(response);
            } catch (error) {
                console.error("Error : ", error);
            }
        })()
    }, []);

    return (
        <McqDataContext.Provider value={{ allMcqDataContextAPI }}>
            {props.children}
        </McqDataContext.Provider>
    );
}

export default MCQDataState;
