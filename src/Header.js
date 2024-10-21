import './MyCustom.css';
import './App.css';
import {Button} from './utils.js';

/*
 * TODO:
 * - Button function!
 *   - That button should change what Components are displayed in App!
 *
 * NOTE:
 * - How about the title option?
 * - Button layout is NOT ideal
 */

export default function NavBar() {
    /* Utilizes arrow function to demo button event handling. Wanna update it to
    update other Components... */
    const toggle = (a) => {
        alert(a);
    }

    // Displays a navbar for the webapp
    return (
        <>
            <div>
                <nav className="AppNav">
                    <div className="NavLink">
                        <a 
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button>Learn React</button> 
                        </a>
                        <a
                            href="https://www.w3schools.com/REACT/react_getstarted.asp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button>W3 schools</button> 
                        </a>

                        <button onClick={(event) => toggle("You clicked me!")}>Click me!</button>
                        <Button prompt="I'm a button :)" />
                    </div>
                </nav>
            </div>
        </>
    )
}
