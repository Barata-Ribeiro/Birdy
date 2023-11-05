import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./configureStore";

/**
 * Hook for accessing the redux dispatch function in the component
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Hook for accessing the redux store state in the component
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
