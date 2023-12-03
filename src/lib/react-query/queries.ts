import { NewUserType } from '@/types';
import {useMutation} from '@tanstack/react-query';
import { LoginAccount, Logout, createNewAccount } from '../appwrite/api';

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUserType) => createNewAccount(user)
  })
}

export const useLoginAccount = () => {
  return useMutation({
    mutationFn: (user: {email: string; password: string;}) =>  LoginAccount(user)
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: Logout,
  })
}