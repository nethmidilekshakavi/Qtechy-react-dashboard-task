import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const defaultState = {
    header: { title: "My Site", imageUrl: "" },
    nav: [
        { label: "Home", url: "#" },
        { label: "About", url: "#" },
        { label: "Contact", url: "#" }
    ],
    footer: { email: "hello@example.com", phone: "0123456789", address: "Somewhere" }
};

export const AppProvider = ({ children }) => {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem("components");
        return saved ? JSON.parse(saved) : defaultState;
    });

    useEffect(() => {
        localStorage.setItem("components", JSON.stringify(state));
    }, [state]);

    const update = (path, value) => {
        const copy = JSON.parse(JSON.stringify(state));
        const parts = path.split(".");
        let cur = copy;
        for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
        cur[parts.at(-1)] = value;
        setState(copy);
    };

    return (
        <AppContext.Provider value={{ state, update }}>
            {children}
        </AppContext.Provider>
    );
};
