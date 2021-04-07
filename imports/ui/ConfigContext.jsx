import React from 'react';
// here we can initialise with any value we want.
export const ConfigContext = React.createContext();
export const ConfigProvider = ConfigContext.Provider;
export const ConfigConsumer = ConfigContext.Consumer;
export default ConfigContext;