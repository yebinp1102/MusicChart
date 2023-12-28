import { useLikeSong } from '@/lib/react-query/queries';
import { Models } from 'appwrite'
import React, { useState } from 'react'

type Props = {
  song: Models.Document,
  userId: string,
}

const Likes = ({song, userId}: Props) => {
  console.log(song, userId);
  const likesList = song.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);
  const {mutate: likeSong} = useLikeSong();
  
  const checkIsLiked = () => {
    return likes.includes(userId);
  }

  const handleLikeSong = (e: React.MouseEvent) => {
    e.stopPropagation(); // stop bubbling 
    let likesArray = [...likes]; 

    // 이미 곡에 like한 상태인지 확인. 그렇다면 like 취소
    if(likesArray.includes(userId)){
      likesArray = likesArray.filter(id => id !== userId);
    }else{
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likeSong({songId: song.$id, likesArray});
  }

  return (
    <div className='pl-2 flex items-center hover:cursor-pointer'>
      <img 
        src={`${checkIsLiked() ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}` }
        alt="like"
        width={24}
        height={24}
        onClick={(e) => handleLikeSong(e)}
      />
      <p className='text-light-3 ml-2'>{likes.length} 명이 이 곡을 좋아합니다.</p>
    </div>
  )
}

export default Likes