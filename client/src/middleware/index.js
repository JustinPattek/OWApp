import { GET_ITEMS } from '../actions/types';

export function listOrderMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === GET_ITEMS) {
        var orderNumber = 0;
        action.payload.forEach(function (element) {           
            element.order = orderNumber;
            element.id = orderNumber;
            orderNumber ++;
          });
      }
      return next(action);
    };
  };
};