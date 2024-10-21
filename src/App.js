import logo from './images/uno_O.png';
import batarong from './images/batarong.gif';
import Todo from './TODO.js';
import Search from './Search.js';
import Post from './Post.js';
import './App.css';
import './MyCustom.css';
import {Confirmed, Waiting, PropsToYou} from './101.js'

/* Me playing around with a react elemnt */

let isClicked = false; /* Globally declaring boolean so all functions can view it */
/* FIX: Button feature STILL DOESNT WORK */


/* my contents changed if a button is clicked */
function ConditionalTest() {
    /* But I can also use the ? operator inside JSX elements too */
    return (
        <div>
            {isClicked ? (
                <Confirmed />
            ) : (
                    <Waiting />
                )
            }
        </div>
    )
}

function App() {
    /* Cannot define components inside other components */
    let content;

   // Using an arrow function to handle a React event that is clicking a button
    const toggle = (a) => {
        alert(a);
        if (isClicked) {
            isClicked = false;
        } else {
            isClicked = true;
        }
    }

    /* I can use conditionals to load different elements! */
    if (isClicked) {
        content = <Confirmed />
    } else {
        content = <Waiting />
    }

    return (
        <div className="App">

            <body className="AppContent">
                <img src={logo} className="App-logo" alt="logo" />

                <div className="buffer"/>

                <h1>Welcome to JumpStart!</h1>

                <p>
                    It does nothing right now. Enjoy this spinning icon!
                </p>

                <div className="buffer"/>

                <Todo />

                <div className="buffer"/>

                <Search />

                <Post />
                
                <div className="buffer"/>
                <div className="buffer"/>

                <h1>DEMONSTRATIONS</h1>

                <PropsToYou color="blue" />

                <p>Here's me demoing a conditional by using a JS insert and logical AND. I guess it prints the output of isClicked when not displaying <code>Confirmed</code>.</p>
                <div>
                    {isClicked && <Confirmed />}
                </div>

                <p>And here's me using element <code>ConditionalTest</code> to show off ternary operators</p>
                <ConditionalTest />

                <p>And here's using a variable <code>content</code> assigned to an element based on a conditional defined earlier.</p>

                {content}

                <p>All of thse examples suck and are buggy. The first one does actually toggle, but then breaks after reloading the page</p>
            </body>
        </div>
    );
}

// I can only call functions declared here IN here. If I try importing any outside the one function designated to be exported, it treats that as if I just call the exported function again.
export default App; /* Only ONE can be exported as DEFAULT. I can export MULTIPLE (see utils.js)*/




























