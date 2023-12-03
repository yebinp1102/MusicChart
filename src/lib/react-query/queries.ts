import { NewUserType } from '@/types';
import {useMutation} from '@tanstack/react-query';
import { createNewAccount } from '../appwrite/api';

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUserType) => createNewAccount(user)
  })
}