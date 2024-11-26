import React from "react";
import {useState, useEffect} from "react";
import {advicePosts} from "../../utils/advicePosts";
import {resourcePosts} from "../../utils/resourcePosts";
import {AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios} from "react-axios";
import {create} from "axios";
import AdviceCard from "../advice/AdviceCard";
import AdviceShareModal from "../advice/AdviceShareModal";
import ResourceCard from "../resources/ResourceCard";

/* TODO: 
 * - Axios integration on React side
 */

/* =========== DEMO PAGE =========== */
export default function Windtunnel() {
    var advicePosts;
    const resource = resourcePosts[0];
    const [submitAdvice, toggleSubmitAdvice] = useState(false);
    const [submitResource, toggleSubmitResource] = useState(false);

    const [message, setMessage] = useState(null);
    const [advice, setAdvice] = useState(null);
    const [resources, setResources] = useState(null);

    useEffect(() => {
        fetch("/api/advice")
            .then((res) => res.json())
            .then((data) => setAdvice(data.message))
            .catch( err => 
                console.log(`Error contacting server/advice...\n${err}`)
            );
    }, []);

    const axiosInstance = create({
        baseURL : '/api/',
        timeout : 2000
    });

    return (
        <div>
            <div>
            </div>
            <h1>### DEMO PAGE ###</h1>
            <p align='center'>My lil React playground.</p>

            {/* ADVICE */}
            <div>
                <h3>DEBUGGING ADVICE...</h3>
                <AxiosProvider instance={axiosInstance}>
                    <Get url="/advice">
                        {(error, response, isLoading, makeRequest, axios) => {
                            if(error) {
                                return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                            }
                            else if(isLoading) {
                                return (<div>Loading...</div>)
                            }
                            else if(response !== null) {
                                return (
                                    <div>
                                        {response.data.message} 
                                        <p>Number of posts retrieved: {response.data.payload.length}</p>
                                        {
                                            setAdvice(response.data.payload)

                                        }

                                        {console.log(advice[0])}
                                        <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button>
                                        <div> {/* React component goes here */}
                                            <h3>Advice Data</h3>
                                            <button onClick={toggleSubmitAdvice}>Submit Advice</button>
                                            <AdviceCard {...advice[0]} /> {/* I CLEARLY knew what this was, wtf */}
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
                                    </div>)
                            }
                            return (<div>Default message before request is made.</div>)
                        }}
                    </Get>
                </AxiosProvider>
            </div>


            {/* RESOURCE */}
            <div>
                <h3>DEBUGGING Resources...</h3>
                <AxiosProvider instance={axiosInstance}>
                    <Get url="/resources">
                        {(error, response, isLoading, makeRequest, axios) => {
                            if(error) {
                                return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                            }
                            else if(isLoading) {
                                return (<div>Loading...</div>)
                            }
                            else if(response !== null) {
                                return (
                                    <div>
                                        {response.data.message} 
                                        <p>Number of posts retrieved: {response.data.payload.length}</p>
                                        { setResources(response.data.payload) }

                                        <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button>

                                        <div> {/* React component goes here */}
                                            <h3>Resource Data</h3>
                                            <button onClick={toggleSubmitResource}>Submit Resource</button>
                                            <ResourceCard key={resources[0].id} resource={resources[0]} />
                                        </div>

                                    </div>)

                            }
                            return (<div>Default message before request is made.</div>)
                        }}
                    </Get>
                </AxiosProvider>
            </div>

        </div>
    );
};
