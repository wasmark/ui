import { Abi } from '@polkadot/api-contract';
import React, { Context, useCallback, useState } from 'react';

export interface Code {
  name: string;
  abi: Abi;
}

interface UploadedContractsContextProps {
  codes: Code[];
  save: (code: Code) => void;
}

export const UploadedContractsContext: Context<UploadedContractsContextProps> = React.createContext({} as unknown as UploadedContractsContextProps);

export const UploadedContractsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [ codes, setCodes ] = useState<Code[]>([]);

    const save = useCallback((code: Code) => {
      console.log('save', code)
      setCodes(codes => {
        if (codes.find(item => item.name === code.name)) {
          return codes;
        }
        
        return [...codes, code];
      })
    }, []);

    
    const remove = useCallback((name: string) => {

    }, []);
    
    return <UploadedContractsContext.Provider value={{
      codes,
      save,
    }}>{children}</UploadedContractsContext.Provider>;
  }
);
