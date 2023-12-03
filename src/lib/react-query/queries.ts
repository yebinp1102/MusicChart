import { NewUserType } from '@/types';
import {useMutation} from '@tanstack/react-query';
import { LoginAccount, createNewAccount } from '../appwrite/api';

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