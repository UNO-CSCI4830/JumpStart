import './App.css'
import './MyCustom.css';

/* This element uses JSX as page formatting (But how is it different than HTML doe?) */
function AboutPage() {
    return (
        <>
            <div className="Author-Bits">
                <h1>About me!</h1>
                <p>
                    My name is Seth and I have no React experience lol<br/>
                    Let me insert this custom React element here to play around
                    with React stuff.<br/>
                    I'm declared in <code>src/App.js</code> and called as an 
                    element in <code>App()</code>
                </p>
            </div>
        </>
    )
}

export default function Footer() {
    return (
        <>
            <section>
                <AboutPage />
            </section>
        </>
    )
}
