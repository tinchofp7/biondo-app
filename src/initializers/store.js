import { createStore, combineReducers } from 'redux';

const barberSelectReducer = (state={},action) => {
    switch (action.type) {
        case 'SET_BARBERO':
            return action.barberSelect
        default:
             return state;   
    }
}

const dateSelectReducer = (state= new Date(),action) => {
    switch (action.type) {
        case 'SET_DATE':
            return action.dateSelect
        default:
             return state;   
    }
}


let rootReducer = combineReducers({
    barberSelect: barberSelectReducer,
    dateSelect: dateSelectReducer
});

export default createStore(rootReducer);
