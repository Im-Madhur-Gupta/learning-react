// Context - jaise agr dark mode dalna he website me to ye dark mode ka option nearly sare comp. ko affect karega. Similarly user ne agr login kiya to ye login credentials ek se zyada comp. use karenge. Is type ki cheezo ke liye jo kai sare comp. ko ek sath affect karte he unke liye Context use kiya jata he.
// Context ko zyada use ni karte, only where its req.

import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]);
// ["green",()=>{}] --> is the default value of ThemeContext, which we'll never call, only useful for typescript.
// I'll use hooks with context.
// Pehle mai App.js mai jakar sare comp. ko theme context provide kardunga.
// phir SearchParams (function comp) me jakar mai theme ko use karunga using a hook called useContext.
// phir Details (class comp) me jakar mai theme ko use karunga.

export default ThemeContext;
