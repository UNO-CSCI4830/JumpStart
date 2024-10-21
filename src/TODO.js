import './MyCustom.css';
import {tasks} from './tasks.js'
/*
 * TODO:
 * - Build TODO Component
 * - Re-fromat what I have Into the following structure:
 *
 *     <Navigation /> 
 *     <TODO />
 *
 *     <App />
 *       <Intro /> 
 *       <Search />
 *       <Post />
 *       <Results />
 *
 *     <Footer />
 *       <AboutUs />
 *       <ContactUs />
 *
 * - Build Search and Post demo
 *   - Basically, whatever's entered gets re-printed to screen in Results component
 * - Figure out how to structure data that will be searched, related, and stored
 *   - SQL???
 *   - data.js??
 *
 * - What about a utils.js?
 *   - Guessing this is where I put my custom functions that are wholly Universal
 *
 */

// can display lists by using the map() function
function ItemList({things, emptyHeading}) {
    const count = things.length;
    let heading = emptyHeading;
    if (count > 0) {
        const noun = count > 1 ? 'Things:' : 'Thing:';
        heading = count + ' ' + noun;
    }
    /* Any arrow functions => {} REQUIRE a return statement, since it implies more than one line of code
    * Otherwise, one line is implicit and does not NEED a return
    *
    * how I can filter complex lists:
    *  list.filter(item => item.subItem == "match")
    *
    * - Must specify a unique key if I want to refer to elements
    *   - This benefits because orders of list, items to be listed, etc. is assumed random
    *   - keys must be unique, non-changing
    *   - key items aren't typically props. Must be passed as a seperate prop:
    *     <Profile key={id} userID={id} />
    *
    */
    return (
        <div>
            <h2>{heading}</h2>
            <ol>
                {things.map(thing => 
                    <li>{thing}</li>
                )}
            </ol>
        </div>
    );
}

export default function Todo() {
    const taskList = tasks.map(task =>
        <li>
            <b>//TODO: </b> {task.name}
            <p>{task.desc}</p>
        </li>
    )
    return (
        <>
            <div className="TODO">
                <h1>// TODO:</h1>
                <p> A small list of functional and UI stuff to get our website working</p>
                <ul>
                    {taskList}
                </ul>
            </div>
        </>
    )
}

