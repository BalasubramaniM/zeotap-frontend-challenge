import NProgress from "nprogress";
import { ASYNC_START, ASYNC_END } from "./constants/actionTypes";

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        NProgress.start();
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
            res => {
                const currentState = store.getState();
                if (
                    !skipTracking &&
                    currentState.viewChangeCounter !== currentView
                ) {
                    return;
                }
                console.log("RESULT", res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
                NProgress.done();
            },
            error => {
                const currentState = store.getState();
                if (
                    !skipTracking &&
                    currentState.viewChangeCounter !== currentView
                ) {
                    return;
                }
                console.log("ERROR", error);
                action.error = true;
                action.payload = error.response.body;
                if (!action.skipTracking) {
                    store.dispatch({
                        type: ASYNC_END,
                        promise: action.payload
                    });
                }
                store.dispatch(action);
                NProgress.done();
            }
        );

        return;
    }

    next(action);
};

function isPromise(v) {
    return v && typeof v.then === "function";
}

export { promiseMiddleware };
