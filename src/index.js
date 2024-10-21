import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './MyCustom.css';
import App from './App';
import Todo from './TODO.js';
import Footer from './Footer.js';
import NavBar from './Header.js';
import reportWebVitals from './reportWebVitals';

/* Create root element that will render my JS modules in index.html */
const root = ReactDOM.createRoot(document.getElementById('root'));

/* Custom HTML element */
const myFirstElement = <h1>A demo element</h1>

/* Ayyy OOP! But in JS! */
class Guy {
    pfpURL = "%PUBLIC_URL%/images/and-den-im-GETTIN_MAD.png";
    constructor(name) {
        this.brand = name; /* Yes. Joe is a brand. */
    }
    name() {
        return "My name is " + this.brand;
    }
    pfp() {
        return this.pfpURL;
    }
}

// {joe.brand} is how I can insert JS data into HTML elements

const joe = new Guy("Joe"); /* JS class declaration. Nothing new */


/* Root nodes are HTML elements where I want to display the result */
root.render(myFirstElement); /* Rendering my custom HTML header. Under whatever name I like */ 
 /* Apparently I can't enter text into the element renders
 * notice: that the latest `root.render` call is what loads
 * also notice: HTML elements that are capitalized are React components
 */
root.render(
    <React.StrictMode>

        <body className="Global-Dark">

            <header>
                <NavBar />
            </header>

            <div className="buffer" />

            <App />

            <div className="buffer" />

            <footer>
                <Footer />
            </footer>

        </body>

    </React.StrictMode>
);

// ### TODO
// - Figure out how to include the JumpStart html
//   - Translate jumpstart1.html submission/search features into React components!

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




































