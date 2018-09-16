import {
    APP_LOAD,
    CHANGE_ADVERTISER,
    CHANGE_TIMELINE
} from "../constants/actionTypes";

const defaultState = {
    appName: "Zeotap",
    appLoaded: false,
    advertiser: { key: -1, value: "Anonymus" },
    timeline: { key: -1, value: "all" }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                data: action.payload,
                appLoaded: true
            };
        case CHANGE_ADVERTISER:
            return {
                ...state,
                appLoaded: true,
                advertiser: { key: action.key, value: action.value }
            };
        case CHANGE_TIMELINE:
            return {
                ...state,
                appLoaded: true,
                timeline: { key: action.key, value: action.value }
            };
        default:
            return state;
    }
};
