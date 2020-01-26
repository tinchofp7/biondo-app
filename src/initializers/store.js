import { createStore, combineReducers } from 'redux';

const barberSelectReducer = (state={},action) => {
    switch (action.type) {
        case 'SET_BARBERO':
            return action.barberSelect
        default:
             return state;   
    }
}

const diaSelectReducer = (state= new Date(),action) => {
    switch (action.type) {
        case 'SET_DIA':
            return action.diaSelect
        default:
             return state;   
    }
}

const horaSelectReducer = (state="",action) => {
    switch (action.type) {
        case 'SET_HORA':
            return action.horaSelect
        default:
             return state;
    }
}


let rootReducer = combineReducers({
    barberSelect: barberSelectReducer,
    diaSelect: diaSelectReducer,
    horaSelect: horaSelectReducer    
});

export default createStore(rootReducer);
