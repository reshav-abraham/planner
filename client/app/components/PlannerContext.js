import React from 'react';

export const PlannerContext = React.createContext({'selectedPlan':''});

export default ({ children }) => {
    const teamMembersNames = ['John', 'Mary', 'Jason', 'David']
  
    const [sharing, setSharing] = React.useState([])
    const [help, setHelp] = React.useState([])
    const [pairing, setPairing] = React.useState(teamMembersNames)
  
    const store = {
      sharing: [sharing, setSharing],
      help: [help, setHelp],
      pairing: [pairing, setPairing],
    }
  
    return <PlannerContext.Provider value={store}>{children}</PlannerContext.Provider>
  }