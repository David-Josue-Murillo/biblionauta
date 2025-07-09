import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UserData } from '../mocks/profileData';

interface UserProfileState {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

type UserProfileAction =
  | { type: 'SET_USER'; payload: UserData }
  | { type: 'UPDATE_USER'; payload: Partial<UserData> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'CLEAR_ERROR' };

const initialState: UserProfileState = {
  user: null,
  isLoading: false,
  error: null,
  isEditing: false,
};

function userProfileReducer(state: UserProfileState, action: UserProfileAction): UserProfileState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'SET_EDITING':
      return {
        ...state,
        isEditing: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

interface UserProfileContextType {
  state: UserProfileState;
  dispatch: React.Dispatch<UserProfileAction>;
  updateUser: (updates: Partial<UserData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setEditing: (editing: boolean) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

interface UserProfileProviderProps {
  children: ReactNode;
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [state, dispatch] = useReducer(userProfileReducer, initialState);

  const updateUser = (updates: Partial<UserData>) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setEditing = (editing: boolean) => {
    dispatch({ type: 'SET_EDITING', payload: editing });
  };

  const value: UserProfileContextType = {
    state,
    dispatch,
    updateUser,
    setLoading,
    setError,
    clearError,
    setEditing,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
} 