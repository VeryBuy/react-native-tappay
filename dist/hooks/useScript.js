import { useEffect, useState } from 'react';
const cachedScripts = [];
const SCRIPT_CHECK_TIMEOUT = 10000;
const SCRIPT_CHECK_INTERVAL = 300;
export default function useScript(src, id, checker) {
    // Keeping track of script loaded and error state
    const [state, setState] = useState({
        loaded: false,
        error: false,
    });
    useEffect(() => {
        let script = null;
        let timeout = null;
        const clearDelay = () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };
        const setDelay = handler => {
            clearDelay();
            timeout = setTimeout(handler, SCRIPT_CHECK_INTERVAL);
        };
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
            if (index >= 0)
                cachedScripts.splice(index, 1);
            if (script) {
                script.remove();
            }
            setState({
                loaded: true,
                error: true,
            });
        };
        const waitForScript = () => {
            const start = Date.now();
            function handler(resolve, reject) {
                if (typeof checker !== 'function') {
                    resolve();
                    return;
                }
                if (checker()) {
                    resolve();
                }
                else if (Date.now() - start >= SCRIPT_CHECK_TIMEOUT) {
                    reject(new Error('timeout'));
                }
                else {
                    setDelay(() => handler(resolve, reject));
                }
            }
            return new Promise(handler);
        };
        const handleLoad = () => {
            waitForScript().then(onScriptLoad).catch(onScriptError);
        };
        // If cachedScripts array already includes src that means another instance ...
        // ... of this hook already loaded this script, so no need to load again.
        if (cachedScripts.includes(src)) {
            handleLoad();
        }
        else {
            cachedScripts.push(src);
            // Create script
            script = document.createElement('script');
            script.src = src;
            script.async = true;
            if (id) {
                script.id = id;
            }
            script.addEventListener('load', handleLoad);
            script.addEventListener('error', onScriptError);
            // Add script to document body
            document.body.appendChild(script);
        }
        return () => {
            // Remove event listeners on cleanup
            if (script) {
                script.removeEventListener('load', handleLoad);
                script.removeEventListener('error', onScriptError);
            }
            clearDelay();
        };
    }, [checker, id, src]);
    return [state.loaded, state.error];
}
