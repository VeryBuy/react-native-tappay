import { useEffect, useState } from "react";

const cachedScripts: string[] = [];

const SCRIPT_CHECK_TIMEOUT = 10000;
const SCRIPT_CHECK_INTERVAL = 300;

export default function useScript(
  src: string,
  id?: string,
  checker?: () => boolean
) {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false,
        });
      } else {
        cachedScripts.push(src);

        // Create script
        const script = document.createElement("script");

        script.src = src;
        script.async = true;
        if (id) {
          script.id = id;
        }

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false,
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);

          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          setState({
            loaded: true,
            error: true,
          });
        };

        const waitForScript = () => {
          const start = Date.now();

          function handler(resolve: Function, reject: (err: Error) => void) {
            if (typeof checker !== "function") {
              resolve();

              return;
            }

            if (checker()) {
              resolve();
            } else if (Date.now() - start >= SCRIPT_CHECK_TIMEOUT) {
              reject(new Error("timeout"));
            } else {
              setTimeout(() => handler(resolve, reject), SCRIPT_CHECK_INTERVAL);
            }
          }

          return new Promise<void>(handler);
        };

        const handleLoad = () => {
          waitForScript().then(onScriptLoad).catch(onScriptError);
        };

        script.addEventListener("load", handleLoad);
        script.addEventListener("error", onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener("load", handleLoad);
          script.removeEventListener("error", onScriptError);
        };
      }
    },
    [] // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
}
