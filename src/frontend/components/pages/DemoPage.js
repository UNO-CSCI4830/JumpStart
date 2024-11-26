import React from "react";
import {useState, useEffect} from "react";
import {advicePosts} from "../../utils/advicePosts";
import {resourcePosts} from "../../utils/resourcePosts";

import AdviceCard from "./../advice/AdviceCard";
import AdviceShareModal from "./../advice/AdviceShareModal";
import ResourceCard from "./../resources/ResourceCard";
import ResourceModal from "./../resources/ResourceModal";

import {AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios} from "react-axios";
import {post, get} from "axios";

/* TODO: 
 * - Spin up Node.js server that will handle React requests to MongoDB: https://www.mongodb.com/community/forums/t/use-mongodb-directly-from-react/238644
 *   - will handle our DB r/w commands, guessing Request/Get/Post type stuff to exchange data between Node and React
 * - Axios integration on React side
 */

/* =========== DEMO PAGE =========== */
export default function Windtunnel() {
    
    const [submitAdvice, toggleSubmitAdvice] = useState(false);
    const [submitResource, toggleSubmitResource] = useState(false);

    const [message, setMessage] = useState(null);
    const [advice, setAdvice] = useState(null);
    const [resources, setResources] = useState(null);
    const [data, setData] = useState(null);

    async function add(api, data) { // TODO: Implement!
        if (data !== null) {
            await post("/api/advice", { /* Axios POST */
                payload: data
            })
            .then((res) => console.log(res))
            .catch(err =>
                console.log(`Error sending data to advice server...\n${err}`)
            );
        }
    }

    async function queryAdvice() {
        await get("/api/advice") /* Axios GET */
            .then((res) => {
                setMessage(res.data.message);
                setAdvice(res.data.payload);
            }).catch( err => 
                console.log(`Error contacting server/advice...\n${err}`)
            );

    }
    async function queryResources() {
        await get("/api/resources") /* Axios GET */
            .then((res) => {
                setMessage(res.data.message);
                setResources(res.data.payload);
            }).catch( err => 
                console.log(`Error contacting server/resources...\n${err}`)
            );

    }
    useEffect(() => {
        // I ping the server twice because why not :)
        queryAdvice();
        queryResources();

        add("/api/advice", data); // TODO: Implement!
        add("/api/resources", data); // TODO: Implement!
        add("/api/admin", data); // TODO: Implement!
    }, []);

    return (
        <div>
            <div>
            </div>
            <h1>### DEMO PAGE ###</h1>
            <p align='center'>My lil React playground.</p>

            {/* ADVICE */}
            <div>
                <h3>DEBUGGING ADVICE...</h3>
                <p>{!message ? "Awaiting response from advice..." : message}</p>
            </div>

            <div> {/* React component goes here */}
                <h3>Advice Data</h3>
                { (advice !== null && (<AdviceCard {...advice[0]} /> )) || <div><h4>Nothing to show...</h4></div>}
                <button onClick={toggleSubmitAdvice}>Submit Advice</button>
                {/* TODO: 
                  * Okay... but now how do I save updated values back to advicePosts[0]? 
                  * I can't pass the new value from AdviceCard back here, so either
                  * 	- I pass the whole datastructure/class/whatever the fuck it is TO the component
                  * 	- I make the incrament here
                  */}
                {submitAdvice && ( /* if True, open submit form. Resets to false when form is closed */
                    <AdviceShareModal onClose={() => toggleSubmitAdvice(false)} />
                )}
            </div>

            {/* RESOURCE */}
            <div>
                <h3>DEBUGGING Resources...</h3>
            </div>
            <div> {/* React component goes here */}
                <h3>Resource Data</h3>
                { (resources !== null && (
                    <ResourceCard key={resources[1].id} resource={resources[1]} />)
                    || <div><h4>Nothing to show...</h4></div>
                )}
                <button onClick={toggleSubmitResource}>Submit Resource</button>
            </div>

        </div>
    );
};
