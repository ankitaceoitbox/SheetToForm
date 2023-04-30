import { useContext } from "react";
import McqDataContext from "../../context/mcq.context";

export function ContextData() {
    const { allMcqDataContextAPI } = useContext(McqDataContext);
    return {
        allMcqDataContextAPI
    };
}