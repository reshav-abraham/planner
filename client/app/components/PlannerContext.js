import React from 'react';

export const PlannerContext = React.createContext();

export default ({ children }) => {
    const plannerViews = ['dashboard', 'plan'];
  
    const [planId, setPlanId] = React.useState([]); // keep state of the selected plan
    const [plannerView, setPlannerView] = React.useState('dashboard');

    const store = {
        planId: planId,
        plannerView: plannerView,
        setPlannerView: (view) => setPlannerView(view),
        setPlanId: (id) => setPlanId(id),
    }
  
    return <PlannerContext.Provider value={store}>{children}</PlannerContext.Provider>
  }