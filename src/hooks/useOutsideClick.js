import { useEffect, useRef } from "react";

  //To make the modal close when clicked outside
export function useOutsideClick( handler, listenCapturing = true) {
    const ref = useRef();

    useEffect(
        function () {
            function handleClick(e) {
                //current context is the element ref, if it is open, and the click event happens, it checks if its inside it, if not, it calls the function close()
                if (ref.current && !ref.current.contains(e.target)) {
                    handler();
                }
            }
            // Passing "true" as a third argument, makes the event go down to be handled in the capturing phase instead of the capturing phase,
            // making it dont execute until the modal until is open, this way we can avoid closing it at the same time that we open
            document.addEventListener("click", handleClick, listenCapturing);
            
            return () => document.removeEventListener("click", handleClick, listenCapturing);
        },
        [handler, listenCapturing]
    );

    return ref;
}
