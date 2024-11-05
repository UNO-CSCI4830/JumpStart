import React from "react";
import {useState} from "react";
import {advicePosts} from "../utils/advicePosts";
import {resourcePosts} from "../utils/resourcePosts";

import AdviceCard from "./AdviceCard";


export default function HomePage() {
  const advice = advicePosts[0];
  const resource = resourcePosts[0];
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is where you can find the latest updates and information.</p>
	  <div>
	  	<h3>Advice Data</h3>
		<AdviceCard {...advice} />
		{/* TODO: 
		  * Okay... but now how do I save updated values back to advicePosts[0]? 
		  * I can't pass the new value from AdviceCard back here, so either
		  * 	- I pass the whole datastructure/class/whatever the fuck it is TO the component
		  * 	- I make the incrament here
		  */}
	  </div>
	  <div>
	  	<h3>Resource Data</h3>
		 <p> 
	  		Category Value: {resource.category} <br />
	  		Title Value: {resource.title} <br />
	  		Description Value: {resource.description} <br />
	  		link Value: {resource.link} <br />
		 </p> 
	  </div>
    </div>
  );
}
