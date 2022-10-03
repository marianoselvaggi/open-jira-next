import { UIState } from './';

type UIActionType = 
  | { type: '[UI] - Open Sidebear' }
  | { type: '[UI] - Close Sidebear' }
  | { type: '[UI] - Change Adding Entry' , payload: UIState}
  | { type: '[UI] - Start Dragging' }
  | { type: '[UI] - End Dragging' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
   switch (action.type) {
      case '[UI] - Open Sidebear':
         return {
            ...state,
            sidemenuOpen: true,
         }
      case '[UI] - Close Sidebear':
         return {
            ...state,
            sidemenuOpen: false,
         }
      case '[UI] - Change Adding Entry':
         return {
            ...state,
            isAddingEntry: action.payload.isAddingEntry,
         }
      case '[UI] - Start Dragging':
         return {
            ...state,
            isDragging: true,
         }
      case '[UI] - End Dragging':
         return {
            ...state,
            isDragging: false,
         }
     default:
        return state;
   }
};