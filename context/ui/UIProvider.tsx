import React, { FC, ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './';

export interface UIState {
   sidemenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;
};

interface Props {
   children?: ReactNode,
}

const UI_INITIAL_STATE: UIState = {
   sidemenuOpen: false,
   isAddingEntry: false,
   isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const openSidebar = () => {
      dispatch({ type: '[UI] - Open Sidebear'});
   }

   const closeSidebar = () => {
      dispatch({ type: '[UI] - Close Sidebear' });
   }

   const setIsAddingEntry = (isAddingEntry: boolean) => {
      dispatch({ type: '[UI] - Change Adding Entry', payload: {
         ...state,
         isAddingEntry,
      }});
   };

   const startDragging = () => {
      dispatch({ type: '[UI] - Start Dragging'});
   };

   const endDragging = () => {
      dispatch({ type: '[UI] - End Dragging'});
   };

   return (
      <UIContext.Provider value={{
         ...state,

         // Methods
         openSidebar,
         closeSidebar,
         setIsAddingEntry,

         startDragging,
         endDragging,
   }}>
         { children }
      </UIContext.Provider>
   )
}