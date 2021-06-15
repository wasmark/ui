import React, { Context, useCallback, useState } from 'react';

interface Endpoint {
  domain: string;
  connected: boolean;
  enabled: boolean;
}

interface EndpointsContextProps {
  endpoints: Endpoint[];
  setEndpoints: React.Dispatch<React.SetStateAction<Endpoint[]>>;
  add: (domain: string) => void;
  toggleChecked: (index: number) => void;
}

export const EndpointsContext: Context<EndpointsContextProps> = React.createContext({} as unknown as EndpointsContextProps);

export const EndpointsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [ endpoints, setEndpoints ] = useState<Endpoint[]>([]);

    const add = useCallback((domain: string) => {
      if (endpoints.find(e => e.domain === domain)) {
        return;
      }

      setEndpoints([...endpoints, {
        connected: false,
        enabled: false,
        domain,
      }])
    }, [setEndpoints, endpoints]);
  
    const toggleChecked = useCallback((index: number) => {
      // const index = endpoints.findIndex(endpoint => endpoint.domain === domain);
      const endpoint = endpoints[index];
  
      setEndpoints([
        ...endpoints.slice(0, index),
        {
          ...endpoint,
          enabled: !endpoint.enabled,
        },
        ...endpoints.slice(index + 1),
      ]);
    }, [setEndpoints, endpoints]);

    return <EndpointsContext.Provider value={{
      endpoints,
      setEndpoints,
      add,
      toggleChecked,
    }}>{children}</EndpointsContext.Provider>;
  }
);
