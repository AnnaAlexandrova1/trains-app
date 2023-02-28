import { Action, ActionType } from "../actions/actions"

export interface Comment {
    name: number,
    description: string
}

interface State {
    trains: Comment[],
    loading: boolean,
    error: string | null 
}

const initialState:State = {
    trains: [],
    loading: false,
    error: null
}

export const trainsReducer = (state = initialState, action:Action) => {
    switch (action.type) {
        case ActionType.GET_POST_COMMENTS_PENDING:
            return {
                ...state,
                loading: true,
            }
        case ActionType.GET_POST_COMMENTS_SUCCESS:
            return {
                ...state,
                trains: action.payload,
                loading: false,
            }
        case ActionType.GET_POST_COMMENTS_FAIL:
            return {
               ...state,
                error: action.payload, 
            }
        default: 
            return state
    }
}

