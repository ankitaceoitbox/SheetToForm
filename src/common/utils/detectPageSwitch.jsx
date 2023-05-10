import React, { useEffect } from "react";

function DetectPageSwitch() {
    useEffect(() => {
        let observer;

        const handleVisibilityChange = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("Page is visible");
                } else {
                    console.log("Page is hidden");
                }
            });
        };

        observer = new IntersectionObserver(handleVisibilityChange, {
            threshold: 0.5,
        });

        observer.observe(document.querySelector("#root"));

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div id="root">
            <h1>Hello World</h1>
        </div>
    );
}

export default DetectPageSwitch;
