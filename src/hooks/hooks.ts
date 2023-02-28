import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../reducers';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch