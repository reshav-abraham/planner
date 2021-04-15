import React from 'react';

export const PlannerContext = React.createContext();

function countReducer(state, action) {
    switch (action.type) {
      case 'increment': {
        return {count: state.count + 1}
      }
      case 'decrement': {
        return {count: state.count - 1}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

function PlannerProvider({children}) {
    const [state, dispatch] = React.useReducer(countReducer, {count: 0})
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, dispatch}
    return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
}

export default PlannerProvider;