import { combineReducers } from 'redux';
import { trainsReducer } from './trainsReducer';
import { store } from '../store/store';

const reducers = combineReducers({
trains: trainsReducer
});

export default reducers;
//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch