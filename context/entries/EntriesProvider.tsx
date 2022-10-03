import React, { FC, ReactNode, useEffect, useReducer } from 'react'

import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis/';

export interface EntriesState {
   entries: Entry[];
};

interface Props {
   children?: ReactNode,
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
   const { enqueueSnackbar } = useSnackbar();

   const addNewEntry = async (description: string) => {
      const { data } = await entriesApi.post<Entry>('/entries', { description })
      dispatch({type: '[Entry] - Add Entry', payload: data});
   };

   const updateEntry = async (entry: Entry, showSnack = false) => {
      try {
         const { _id, description, status } = entry;
         const { data } = await entriesApi.put(`/entries/${_id.toString()}`, { description, status });
         dispatch({ type: '[Entry] - Update Entry', payload: data});
         if (showSnack) {
            enqueueSnackbar('Entry updated.', {
               variant: 'success',
               autoHideDuration: 1500,
               anchorOrigin: {
                  horizontal: 'right',
                  vertical: 'top',
               },
            });
         }
      } catch (error) {
         console.log(error);
      } 
   }

   const refreshEntries = async () => {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      dispatch({type:'[Entry] - Refresh data', payload: data});
   };

   useEffect(() => {
      refreshEntries();
   }, [])

   return (
      <EntriesContext.Provider value={{
         ...state,

         // Methods
         addNewEntry,
         updateEntry,
   }}>
         { children }
      </EntriesContext.Provider>
   )
}