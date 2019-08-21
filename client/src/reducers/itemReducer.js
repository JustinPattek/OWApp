import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    list: [],
    loading: false
};

const testlist = [
    {
      id: "0",
      order: 0
    },
    {
      id: "1",
      order: 1
    },
    {
      id: "2",
      order: 2
    },
    {
      id: "3",
      order: 3
    },
    {
      id: "4",
      order: 4
    }
  ];

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            console.log(action.payload);
            console.log(testlist);
            return {
                ...state,
                 list: action.payload,
                 loading: false
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }
}