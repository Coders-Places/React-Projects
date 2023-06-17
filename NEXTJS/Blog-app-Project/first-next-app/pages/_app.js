import "../styles/globals.css";

// if you want to upload Style-sheet just like normal-html-file, then import here, and it'll be available everywhere in the project
import "../styles/bodyStyle.css"; // importing Global-CSS
import Nav from "./components/Nav";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Nav />
    <Component {...pageProps} />
  </>
);

export default MyApp;


// Array.from([1, 2, 4], (elem) => { return (elem * 2) });    ->  result: [2, 4, 8] (all the items are multiplied by '2')

// Array.from("BetterThanMe");      ->  result: [ "B", "e", "t", "t", "e", "r", "T", "h", "a", "n", "M", "e"] (It Works Just-Like The ".split()" [Method])


// Array.from({length: 3});         -> result: [undefined, undefined, undefined]

// Array.from(length: 3, () => 34)  -> result: [34, 34, 34]

// Array.from({length: 3}, (elem)=> {return 2})     -> result: [2, 2, 2]




