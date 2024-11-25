// import React from "react";
// import {useState} from "react";
// import {advicePosts} from "../../utils/advicePosts";
// import {resourcePosts} from "../../utils/resourcePosts";

// import AdviceCard from "./../advice/AdviceCard";
// import AdviceShareModal from "./../advice/AdviceShareModal";
// import ResourceCard from "./../resources/ResourceCard";
// import ResourceModal from "./../resources/ResourceModal";

// import{MongoClient, ObjectId} from "mongodb";

// /* =========== DEMO PAGE =========== */

// async function readDB(){
// };
// async function writeDB(){

// };

// // class Database {
// //     uri = "mongodb://localhost:27017/";
// //     constructor() {
// //         this.client = new MongoClient(this.uri);
// //     }

// //     connect() {
// //         try {
// //             console.log("Attempting to connect to DB...");
// //             this.client.connect();
// //             console.log("Connection accepted.");
// //         } catch (e) {
// //             console.error(`An error occured when connecting to DB: ${e}`);
// //         }
// //     }

// //     close() {
// //         try {
// //             this.client.close()
// //         } catch(e) {
// //             console.error(`An error occured while closing connection: ${e}`);
// //         }
// //     }

// //     load() {}
// //     query() {}
// //     add(){}
// //     del(){}
// // }

// export default function Windtunnel() {
//   const advice = advicePosts[0];
//   const resource = resourcePosts[0];
//   const [submitAdvice, toggleSubmitAdvice] = useState(false);
//   const [submitResource, toggleSubmitResource] = useState(false);

//   //   /* DB instances */
//   // const resourceDB = new Database();
//   // const adviceDB = new Database();
//   // const limbo = new Database();
//   return (
//     <div>
//       <h1>### DEMO PAGE ###</h1>
//       <p align='center'>My lil React playground.</p>

//       {/* ADVICE */}

// 	  <div>
// 	  	<h3>Advice Data</h3>
//         <button onClick={toggleSubmitAdvice}>Submit Advice</button>
// 		<AdviceCard {...advice} /> {/* I CLEARLY knew what this was, wtf */}
// 		{/* TODO:
// 		  * Okay... but now how do I save updated values back to advicePosts[0]?
// 		  * I can't pass the new value from AdviceCard back here, so either
// 		  * 	- I pass the whole datastructure/class/whatever the fuck it is TO the component
// 		  * 	- I make the incrament here
// 		  */}
//       {submitAdvice && ( /* if True, open submit form. Resets to false when form
//       is closed */
//         <AdviceShareModal onClose={() => toggleSubmitAdvice(false)} />
//       )}
// 	  </div>

//       {/* RESOURCE */}

// 	  <div>
// 	  	<h3>Resource Data</h3>
//         <button onClick={toggleSubmitResource}>Submit Resource</button>
//         <ResourceCard key={resource.id} resource={resource} />
// 		 <p>
// 	  		Category Value: {resource.category} <br />
// 	  		Title Value: {resource.title} <br />
// 	  		Description Value: {resource.description} <br />
// 	  		link Value: {resource.link} <br />
// 		 </p>
// 	  </div>
//     </div>
//   );
// };
