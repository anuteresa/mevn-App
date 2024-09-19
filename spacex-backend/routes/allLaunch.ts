import { Request, Response } from "express";
import axios from 'axios';

module.exports = async function (req: Request, res: Response) {

    try {
        const api_url = 'https://api.spacexdata.com/v4/launches/query';
        const req_query = {
            query: {},
            options: {
                select: [
                    "flight_number",
                    "name",
                    "date_utc"
                ],
                limit: 30,
                sort: {
                    date_utc: "desc"
                }
            }
        };

        const launches = await axios.post(api_url, req_query, { headers: { 'Content-type': 'application/json' } });
        res.status(200).send(launches.data.docs);
        console.log(launches)
    }
    catch (err) {
        res.status(500).json({message: "Error connecting  to spacex api"});
    }


}