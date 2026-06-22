/* ============================================================
   SPLASH ANIMATION — React Implementation
   Extracted from ashutoshhathidara.com / masterPortfolio

   FILES NEEDED:
     Splash.js       ← the page component (this file)
     Splash.css      ← screen grow/shrink animation
     LoaderLogo.js   ← the SVG logo with self-drawing strokes
     LoaderLogo.css  ← (trivial, just sets .raw_logo dimensions)

   HOW IT WORKS:
     1.  Splash mounts → starts a 5500 ms timer
     2.  .screen div animates: circle → full screen → circle  (5.5 s)
     3.  SVG inside draws itself via stroke-dashoffset animation
     4.  After 5500 ms, state.redirect → true → <Redirect to="/home" />
   ============================================================ */


/* ──────────────────────────────────────────────────────────────
   Splash.css
   ──────────────────────────────────────────────────────────── */
/*
.logo_wrapper {
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
}

.screen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen {
  overflow: hidden;
  border-radius: 100%;
  animation: grow 5.5s forwards;
}

@keyframes grow {
  0%   { transform: scale(0); }
  10%  { transform: scale(1); border-radius: 0%; height: 100%; width: 100%; }
  90%  { transform: scale(1); border-radius: 0%; height: 100%; width: 100%; }
  100% { transform: scale(0); transform-origin: 50% 50%; border-radius: 100%; }
}

#logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
*/


/* ──────────────────────────────────────────────────────────────
   Splash.js
   ──────────────────────────────────────────────────────────── */
/*
import React, { Component } from "react";
import "./Splash.css";
import { Redirect } from "react-router-dom";
import LoaderLogo from "../../components/Loader/LoaderLogo.js";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" style={{ backgroundColor: props.theme.splashBg }}>
        <LoaderLogo id="logo" theme={props.theme} />
      </div>
    </div>
  );
}

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  componentDidMount() {
    // After 5.5 s (= the CSS animation duration), redirect to home
    this.id = setTimeout(() => this.setState({ redirect: true }), 5500);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect
      ? <Redirect to="/home" />
      : <AnimatedSplash theme={this.props.theme} />;
  }
}

export default Splash;
*/


/* ──────────────────────────────────────────────────────────────
   Main.js  — how Splash is wired into routing
   (Only the relevant route is shown)
   ──────────────────────────────────────────────────────────── */
/*
import { settings } from "../portfolio.js";

// In portfolio.js:
//   const settings = { isSplash: true };   ← set false to skip splash

<Route
  path="/"
  exact
  render={(props) =>
    settings.isSplash
      ? <Splash {...props} theme={this.props.theme} />
      : <Home  {...props} theme={this.props.theme} />
  }
/>
*/


/* ──────────────────────────────────────────────────────────────
   LoaderLogo.js — the SVG with self-drawing animation
   ──────────────────────────────────────────────────────────── */
/*
import React from "react";
import "./LoaderLogo.css";

class LogoLoader extends React.Component {
  render() {
    const theme = this.props.theme;
    return (
      <svg
        className="raw_logo"
        width="50%"
        height="40%"
        viewBox="0 0 440 305"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        // ── HEXAGON OUTLINES ──────────────────────────────────────
        // Both drawn over 4 s starting at 0.5 s using CSS class .myHexagon

        <path
          className="myHexagon"
          d="M293.545 167.405 ... Z"        // outer hexagon path data
          stroke={theme.body}
          strokeWidth="4"
        />
        <path
          className="myHexagon"
          d="M147.455 73.5953 ... Z"        // inner hexagon path data
          stroke={theme.body}
          strokeWidth="4"
        />

        // ── INITIALS "AH" ──────────────────────────────────────────
        // Visible from the start (opacity managed by .letter CSS class)

        <path className="letter" d="M217.945 123.968 ... Z"   // "A"
          stroke={theme.body} strokeWidth="3" />
        <path className="letter" d="M217.153 158 ... Z"        // "H"
          stroke={theme.body} strokeWidth="3" />

        // ── SIGNATURE (handwritten name) ──────────────────────────
        // 15 path segments, each drawn sequentially via .signature1–15

        <mask id="path-5-inside-1" fill={theme.body}>
          // ... all 15 signature fill paths ...
        </mask>
        <path className="signature1"  stroke={theme.body} strokeWidth="6"
              mask="url(#path-5-inside-1)" d="...signature letter 1..." />
        // ... signature2 through signature15 ...

        // ── ANIMATION CSS (embedded in the SVG) ───────────────────
        <defs>
          <style>{`
            @keyframes dash { to { stroke-dashoffset: 0; } }

            // Hexagons draw over 4 s
            .myHexagon {
              stroke-dasharray: 800;
              stroke-dashoffset: 800;
              animation: dash 4s linear forwards 0.5s;
            }

            // Letters are not animated (shown as-is)
            .letter { opacity: 0; }

            // Signature: 15 segments, each 1 s long, staggered by 0.2 s
            .signature1, .signature2, ... .signature15 {
              stroke-dasharray: 800;
              stroke-dashoffset: 800;
            }
            .signature1  { animation: dash 1s linear forwards 0.5s; }
            .signature2  { animation: dash 1s linear forwards 0.7s; }
            .signature3  { animation: dash 1s linear forwards 0.9s; }
            // ... continues to .signature15 at delay 3.3s
          `}</style>
        </defs>

      </svg>
    );
  }
}

export default LogoLoader;
*/


/* ──────────────────────────────────────────────────────────────
   CUSTOMISATION GUIDE
   ──────────────────────────────────────────────────────────── */
/*
  ┌──────────────────────────────────────────────────────────┐
  │  What to change                How to change it          │
  ├──────────────────────────────────────────────────────────┤
  │  Background colour             .screen { background: … } │
  │                                or theme.splashBg in      │
  │                                your theme.js file        │
  ├──────────────────────────────────────────────────────────┤
  │  Stroke / logo colour          stroke={theme.body}       │
  │                                change theme.body in      │
  │                                theme.js (e.g. "#fff")    │
  ├──────────────────────────────────────────────────────────┤
  │  Logo shape                    Replace the <path d="…">  │
  │                                elements inside the SVG   │
  │                                viewBox="0 0 440 305"     │
  ├──────────────────────────────────────────────────────────┤
  │  Signature / name              Replace the 15 signature  │
  │                                paths + the <mask> with   │
  │                                paths of YOUR name.       │
  │                                Tool: Inkscape or         │
  │                                Google Font → SVG Path    │
  ├──────────────────────────────────────────────────────────┤
  │  Animation speed               Change "5.5s" in both:   │
  │                                  @keyframes grow (CSS)   │
  │                                  setTimeout (JS/React)   │
  ├──────────────────────────────────────────────────────────┤
  │  Number of signature segments  Add/remove .signatureN    │
  │                                paths and matching CSS    │
  │                                rules; keep stagger 0.2s  │
  ├──────────────────────────────────────────────────────────┤
  │  Disable splash                Set isSplash: false in   │
  │                                portfolio.js / settings  │
  └──────────────────────────────────────────────────────────┘
*/
