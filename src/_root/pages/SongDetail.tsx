import { useGetSongDetail } from '@/lib/react-query/queries';
import React from 'react'
import { useParams } from 'react-router-dom'

const SongDetail = () => {
  const {id} = useParams();
  const {data: song, isPending: isGettingDetail} = useGetSongDetail(id);

  return (
    <div>SongDetail</div>
  )
}

export default SongDetail