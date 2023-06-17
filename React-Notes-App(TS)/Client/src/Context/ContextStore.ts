import React, { createContext } from "react";

const ContextStore = createContext<object | null | any>(null);
console.log(ContextStore)
export default ContextStore;