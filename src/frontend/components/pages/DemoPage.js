import React from "react";
import {useState, useEffect} from "react";
import {advicePosts} from "../../utils/advicePosts";
import {resourcePosts} from "../../utils/resourcePosts";

import AdviceCard from "./../advice/AdviceCard";
import AdviceShareModal from "./../advice/AdviceShareModal";
import ResourceCard from "./../resources/ResourceCard";
import ResourceModal from "./../resources/ResourceModal";

import {AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios} from "react-axios";
import {create} from "axios";

/* TODO: 
 * - Spin up Node.js server that will handle React requests to MongoDB: https://www.mongodb.com/community/forums/t/use-mongodb-directly-from-react/238644
 *   - will handle our DB r/w commands, guessing Request/Get/Post type stuff to exchange data between Node and React
 * - Axios integration on React side
 */

/* =========== DEMO PAGE =========== */
export default function Windtunnel() {
  const advice = advicePosts[0];
  const resource = resourcePosts[0];
  const [submitAdvice, toggleSubmitAdvice] = useState(false);
  const [submitResource, toggleSubmitResource] = useState(false);
  const [message, setMessage] = useState(null);
  const [adviceMsg, setAdvice] = useState(null);
  const [resourceMsg, setResource] = useState(null);
  const [adminMsg, setLimbo] = useState(null);

  // FIXME: brokie :(
  useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch( err => 
                console.log(`Error contacting server/api...\n${err}`)
            );
        fetch("/admin")
            .then((res) => res.json())
            .then((data) => setLimbo(data.message))
            .catch( err => 
                console.log(`Error contacting server/admin...\n${err}`)
            );
        fetch("/advice")
            .then((res) => res.json())
            .then((data) => setAdvice(data.message))
            .catch( err => 
                console.log(`Error contacting server/advice...\n${err}`)
            );
        fetch("/resources")
            .then((res) => res.json())
            .then((data) => setResource(data.message))
            .catch( err => 
                console.log(`Error contacting server/resource...\n${err}`)
            );
  }, []);

  return (
    <div>
      <div>
      </div>
      <h1>### DEMO PAGE ###</h1>
      <p align='center'>My lil React playground.</p>

      <div>
        <h3>Trying fetch()...</h3>
        <p>{!message ? "Awaiting response..." : message}</p>
        <p>{!adminMsg ? "Awaiting response..." : adminMsg}</p>
        <p>{!resourceMsg ? "Awaiting response..." : resourceMsg}</p>
        <p>{!adviceMsg ? "Awaiting response..." : adviceMsg}</p>
      </div>

      <div>
        <Get url="/api">
            {(error, response, isLoading, makeRequest, axios) => {
          if(error) {
            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
          }
          else if(isLoading) {
            return (<div>Loading...</div>)
          }
          else if(response !== null) {
            return (<div>{response.data.message} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
        </Get>
      </div>

      {/* ADVICE */}
	  <div>
	  	<h3>Advice Data</h3>
        <button onClick={toggleSubmitAdvice}>Submit Advice</button>
		<AdviceCard {...advice} /> {/* I CLEARLY knew what this was, wtf */}
		{/* TODO: 
		  * Okay... but now how do I save updated values back to advicePosts[0]? 
		  * I can't pass the new value from AdviceCard back here, so either
		  * 	- I pass the whole datastructure/class/whatever the fuck it is TO the component
		  * 	- I make the incrament here
		  */}
      {submitAdvice && ( /* if True, open submit form. Resets to false when form
      is closed */
        <AdviceShareModal onClose={() => toggleSubmitAdvice(false)} />
      )}
	  </div>

      {/* RESOURCE */}

	  <div>
	  	<h3>Resource Data</h3>
        <button onClick={toggleSubmitResource}>Submit Resource</button>
        <ResourceCard key={resource.id} resource={resource} />
		 <p> 
	  		Category Value: {resource.category} <br />
	  		Title Value: {resource.title} <br />
	  		Description Value: {resource.description} <br />
	  		link Value: {resource.link} <br />
		 </p> 
	  </div>
    </div>
  );
};
