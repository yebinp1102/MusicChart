import { NewSongType, NewUserType } from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { LoginAccount, Logout, createNewAccount, createSong, getRecentSongs, getSongDetail } from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';

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


// ============================================================
// SONG QUERIES
// ============================================================

export const useCreateSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (song: NewSongType) => createSong(song),

    // 곡 정보 생성에 성공하면 home 페이지로 라우팅 되는 이후 동작을 예측해서 미리 home 페이지에 전시할 곡 리스트를 서버에서 fetch
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_SONGS],
      })
    }
  })
}

export const useGetRecentSongs = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_SONGS],
    queryFn: getRecentSongs
  })
}

export const useGetSongDetail = (songId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SONG_DETAIL, songId],
    queryFn: () => getSongDetail(songId),
    enabled: !!songId
  });
}