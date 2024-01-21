import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useAddToPlaylist, useDeleteAddedSong, useGetCurrentUser } from '@/lib/react-query/queries';
import { Models } from 'appwrite';
import Loader from './Loader';
import { useToast } from '../ui/use-toast';

type Props = {
  song : Models.Document,
  userId: string,
  page: string,
}

const AddPlaylistBtn = ({song, userId, page} : Props) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const {data: currentUser} = useGetCurrentUser();
  const {mutate: addSongToPlaylist, isPending: isAddingSongToPlaylist} = useAddToPlaylist();
  const {mutate: deleteSongFromPlaylist, isPending : isDeletingSongFormPlaylist} = useDeleteAddedSong()
  const {toast} = useToast();

  const addedSongRecord = currentUser?.playlist.find(
    (record: Models.Document) => record.song.$id === song.$id
  )

  useEffect(() => {
    setIsAdded(!!addedSongRecord)
  },[currentUser]);

  const handleAddPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if(addedSongRecord){
      setIsAdded(false);
      toast({title: "플레이리스트에서 제거 되었습니다."});
      return deleteSongFromPlaylist(addedSongRecord.$id);
    }

    addSongToPlaylist({userId: userId, songId: song.$id});
    setIsAdded(true);
    toast({title: `플레이리스트에 추가 되었습니다.`});
  }

  return (
    <Button
      variant={page==='detail' ? "outline" : "default"}
      className={`${page === 'detail' ? "shad-button_primary_outline lg:py-4 lg:px-6 py-3 px-5 font-thin" : "p-0"}`}
      onClick={(e) => handleAddPlaylist(e)}
    >
      {page === 'detail' ? (
        <>
          {isAddingSongToPlaylist || isDeletingSongFormPlaylist ? <Loader /> : (
              <img 
                src={`${addedSongRecord ? "/assets/icons/excludeList.svg" : "/assets/icons/addList.svg"}`}
                width={20}
                height={20}
              />
          )}
          <p>{isAdded ? "플레이리스트에서 빼기" : "플레이리스트에 추가"}</p> 
        </>
      ): (
        <>
          {isAddingSongToPlaylist || isDeletingSongFormPlaylist ? <Loader /> : (
            <img 
              src="/assets/icons/close.svg"
              width={20}
              height={20}
            />
            )}
        </>
      )}

  </Button>
  )
}

export default AddPlaylistBtn