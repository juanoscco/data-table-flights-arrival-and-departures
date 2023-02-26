import axios from "axios";
import envConfig from "../config/env.config";

interface Props {
    type: string,
    iataCode: string
}

export function apiAviationEdge (props: Props)  {
    return axios
        .get(`https://aviation-edge.com/v2/public/timetable?key=${envConfig.secretKey}&iataCode=${props.iataCode}&type=${props.type}`)
}