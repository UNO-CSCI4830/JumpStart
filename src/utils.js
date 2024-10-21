export function Button(props) {
    /* passing a component to a function as a "prop". Treated as arguments, 
     * but passed to the component as attributes
     * Think of them like HTML element attributes
     */
    
    return(
        <>
            <button>{props.prompt}</button>
        </>
    )
}
