/* NOTE: Defining each Component with export to simulate in App.js */

/* Class component can be used to create custom React elements that inheriet 
 * the React Component interface and respective functions
 * Much more complex, but I think it'S worth exploring. TODO?
 *
 * Could be how we manage posts appearing for searches, with individual posts
 * their own class component
 * ...or just develop multiple functions with properties and classes for the data
 * FE post

 * class Item extends React.Component { /* For some reason, the React.Component
 * isn't recognized...
 *     render() {
 *         return <h3> I'm a class component!</h3>;
 *     }
 * }
*/

/* passing a component to a function as a "prop". Treated as arguments, 
 * but passed to the component as attributes
 * Think of them like HTML element attributes
 */
export function PropsToYou(props) {
    return <h3>I am the color <em style={{color: props.color}}>{props.color}</em> passed via properties!</h3>
}

/* I'm displayed if a button is clicked. Which one? Figure yout yourself ;) */
export function Confirmed() {
    return (
        <>
            <div className="Confirmed">
                <h2>You clicked the button!</h2>
            </div>
        </>
    )
}

/* I'm displayed waiting for the button is clicked. */
export function Waiting() {
    return (
        <>
            <p>waiting...</p>
        </>
    )
}

/*
 * NOTE:
 * - Hooks
 *   1. can ONLY be called in React function components
 *   2. can ONLY be called @ top level of said component
 *   3. can NOT be conditional
 */
