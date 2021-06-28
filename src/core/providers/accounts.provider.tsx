import React, { Context, useEffect, useState } from 'react';
import { map } from 'rxjs/operators';
import type { KeyringPair$Meta } from '@polkadot/keyring/types';
import type { KeypairType } from '@polkadot/util-crypto/types';
import type { SubjectInfo } from '@polkadot/ui-keyring/observable/types';
import { accounts as accountsObservable } from '@polkadot/ui-keyring/observable/accounts';
import keyring from '@polkadot/ui-keyring';

interface AccountJson extends KeyringPair$Meta {
  address: string;
  genesisHash?: string | null;
  isExternal?: boolean;
  isHardware?: boolean;
  isHidden?: boolean;
  name?: string;
  parentAddress?: string;
  suri?: string;
  type?: KeypairType;
  whenCreated?: number;
}

export type AccountInfo = AccountJson & { mnemonic: string };
interface AccountsContextProps {
  accounts: AccountInfo[];
}

export const AccountsContext: Context<AccountsContextProps> = React.createContext({}as unknown as AccountsContextProps);

function transformAccounts (accounts: SubjectInfo): AccountJson[] {
  return Object.values(accounts).map(({ json: { address, meta }, type }): AccountJson => ({
    address,
    ...meta,
    type
  }));
}

export const AccountsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    // const { connected$ } = useContext(BusContext);
    const [ accounts, setAccounts ] = useState<AccountInfo[]>([]);
    const [ signal, updateSignal ] = useState(0);
    
    // useEffect(() => {
    //   const sub = connected$.pipe(
    //     filter(c => !!c),
    //     skip(1),
    //   ).subscribe(() => updateSignal(v => v + 1));
  
    //   return () => sub.unsubscribe();
    // }, [connected$]);
    
    useEffect(() => {
      keyring.loadAll({
        type: 'sr25519',
        isDevelopment: false,
      });

      const sub = accountsObservable.subject.pipe(
        map(accounts => transformAccounts(accounts)),
        map(accounts =>
          accounts.map(keyringAccount => ({
            ...keyringAccount,
            balance: '0',
            mnemonic: localStorage.getItem(`mnemonic${keyringAccount.address}`) || '',
          }))
        ),
      ).subscribe((accounts) => {
        setAccounts(accounts);
        console.log('Stored Accounts:', accounts);
      }, e => console.log('eee', e));
  
      return () => sub.unsubscribe();
    }, [signal]);

    return <AccountsContext.Provider value={{
      accounts,
    }}>{children}</AccountsContext.Provider>;
  }
);
