// Define initial state
const initialState = {
  itinerary: Array(3).fill(Array(7).fill(null))
};
// Define reducer for itinerary 1
export const itinerary1Reducer = (state = initialState.itinerary[0], action) => {
  switch (action.type) {
    case "COLLECT_IDS":
      const { ids } = action.payload;
      return state.map((item, index) =>
        ids.includes(index) ? item.id : item
      );
    default:
      return state;
  }
};

// Define reducer for itinerary 2
export const itinerary2Reducer = (state = initialState.itinerary[1], action) => {
  switch (action.type) {
    case "COLLECT_IDS":
      const { ids } = action.payload;
      return state.map((item, index) =>
        ids.includes(index) ? item.id : item
      );
    default:
      return state;
  }
};

// Define reducer for itinerary 3
export const itinerary3Reducer = (state = initialState.itinerary[2], action) => {
  switch (action.type) {
    case "COLLECT_IDS":
      const { ids } = action.payload;
      return state.map((item, index) =>
        ids.includes(index) ? item.id : item
      );
    default:
      return state;
  }
};

export default{
  itinerary1Reducer,
  itinerary2Reducer,
  itinerary3Reducer
};