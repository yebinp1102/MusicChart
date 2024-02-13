import { EditProfileType, NewSongType, NewUserType, UpdateSongType } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";

export const createNewAccount = async (user: NewUserType) => {
  try{
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);


    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  }catch(err){
    console.log(err);
    return err;
  }
}

export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
}) => {
  try{
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    )

    return newUser;
  }catch(err){
    console.log(err);
  }
}

export const LoginAccount = async(user: {email: string; password: string}) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;    
  } catch (err) {
    console.log(err)
  }
}

export const Logout = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (err) {
    console.log(err)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if(!currentUser) throw Error;

    return currentUser.documents[0]

  } catch (err) {
    console.log(err);
  }
}

export const createSong = async (song : NewSongType) => {
  try{

    // appwrite storage에 이미지 업로드
    const uploadedImgFile = await uploadFile(song.Imgfile[0]);
    if(!uploadedImgFile) throw Error;

    // storage에 오디오 파일 업로드
    const uploadedAudioFile = await uploadFile(song.audioFile[0]);
    if(!uploadedAudioFile) throw Error;

    // storage에 이미지를 저장하면서 생성한 고유 id값을 통해 저장된 이미지의 url을 참조
    // 이 url은 DB에 이미지를 저장할 때 필요함
    const imgFileUrl = getFilePreview(uploadedImgFile.$id);
    if(!imgFileUrl){
      await deleteFile(uploadedImgFile.$id);
      throw Error;
    }

    // 이미지와 같은 방식으로 오디오의 url 참조
    const audioFileUrl = getFilePreview(uploadedAudioFile.$id);
    if(!audioFileUrl){
      await deleteFile(uploadedAudioFile.$id);
      throw Error;
    }

    // DB에 곡 정보를 저장하기 전에 tags를 문자 -> 배열로 변경
    const tags = song.tags?.replace(/ /g, "").split(",") || [];

    // create song
    const newSong = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.songCollectionId,
      ID.unique(),
      {
        title: song.title,
        singer: song.singer,
        imageUrl: imgFileUrl,
        imageId: uploadedImgFile.$id,
        tags,
        audioId: uploadedAudioFile.$id,
        audioUrl: audioFileUrl,
      }
    )

    if(!newSong){
      await deleteFile(uploadedImgFile.$id);
      await deleteFile(uploadedAudioFile.$id);
      throw Error;
    }

    return newSong;
  }catch(err){
    console.log(err);
  }
}

export const editSong = async (song: UpdateSongType) => {
  const hasFileToEdit = song.Imgfile.length > 0;
  try{
    let image = {
      imageUrl: song.imageUrl,
      imageId: song.imageId
    }

    // upload new image to appwrite storage
    if(hasFileToEdit){
      const uploadedFile = await uploadFile(song.Imgfile[0]);
      if(!uploadedFile) throw Error;

      // get new image url from appwrite
      const fileUrl = getFilePreview(uploadedFile.$id);
      if(!fileUrl){
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id};
    }
    const tags = song.tags?.replace(/ /g, "").split(",") || [];
    
    const editedSong = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.songCollectionId,
      song.songId,
      {
        title: song.title,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        singer: song.singer,
        tags: tags,
      }
    )

    // faile to edit file
    if(!editedSong){
      if(hasFileToEdit) await deleteFile(image.imageId);
      throw Error;
    }

    // safely delete old image
    if(hasFileToEdit) await deleteFile(song.imageId);

    return editedSong;
  }catch(err){
    console.log(err);
  }
}

export const editProfile = async(user: EditProfileType) => {
  const hasProfileToEdit = user.ImgFile.length > 0;
  try{
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId ? user.imageId : null
    }

    // img를 수정한 경우 appwrite의 저장소에 이미지 업로드하기 위한 로직 수행
    if(hasProfileToEdit){
      const uploadedFile = await uploadFile(user.ImgFile[0]);
      if(!uploadedFile) throw Error;

      // 이미지의 url 할당 
      const fileUrl = getFilePreview(uploadedFile.$id);
      if(!fileUrl){
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
      console.log('image:', image);
    }

    const editedProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.id,
      {
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        name: user.name,
        email: user.email
      }
    )

    if(!editedProfile){
      if(hasProfileToEdit && image.imageId) await deleteFile(image.imageId);
      throw Error;
    }

    // 이전에 저장된 이미지는 저장소에서 삭제
    if(hasProfileToEdit && user.imageId) await deleteFile(user.imageId);
    return editedProfile
  }catch(err){
    console.log(err);
  }
}

export const uploadFile = async (file : File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile
  }catch(err){
    console.log(err)
  }
}

// image preview를 위해 file의 url을 반환하는 함수, 프로미스를 반환하지 않기 때문에 async 키워드 xxx
export const getFilePreview = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    )

    if(!fileUrl) throw Error;

    return fileUrl;
  }catch(err){
    console.log(err);
  }
}

export const deleteFile = async (fileId : string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
  }catch(err){
    console.log(err);
  }
}

export const getRecentSongs = async () => {
  try{
    const songs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.songCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(9)]
    )
    
    if(!songs) throw Error;

    return songs;
  }catch(err){
    console.log(err);
  }
}


export const getSongDetail = async (songId?: string) => {
  if(!songId) throw Error;
  try{
    const song = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.songCollectionId,
      songId
    );

    if(!song) throw Error;

    return song
  }catch(err){
    console.log(err);
  }
}

export const likeSong = async(songId: string, likesArray: string[]) => {
  try{
    const updatedSong = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.songCollectionId,
      songId,
      {
        likes: likesArray
      }
    );
    if(!updatedSong) throw Error;
    return updatedSong
  }catch(err){
    console.log(err);
  }
}

export const addToPlaylist = async (userId: string, songId:string) => {
  try{
    const updatedSong = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.playlistCollectionId,
      ID.unique(),
      {
        user: userId,
        song: songId
      }
    );
    if(!updatedSong) throw Error;
    return updatedSong;
  }catch(err){
    console.log(err);
  }
}

export const deleteAddedSong = async (songId: string) => {
  try{
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.playlistCollectionId,
      songId
    );
    if(!statusCode) throw Error;
    return {status: 'Success'};
  }catch(err){
    console.log(err);
  }
}

// 해당 page에 속하는 곡 정보만 fetch하는 API
export const getInfiniteSongs =async ({pageParam} : {pageParam: number}) => {

  // 불러올 곡의 정보는 한번에 9개씩이며, createdAt을 기준으로 내림차순으로 정렬
  const queries : any[] = [Query.orderDesc("$createdAt"), Query.limit(6)];

  // pagination을 위해 pageParam 값이 있는 경우, pageParam만큼 페이지를 skip
  if(pageParam) queries.push(Query.cursorAfter(pageParam.toString()));

  try{
    const songs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.songCollectionId,
      queries
    );

    if(!songs) throw Error;

    return songs;
  }catch(err){
    console.log(err);
  }
}

// search song API
export const searchSongs = async (searchTerm:string) => {
  try{

    // song의 title 일부가 searchTerm과 일치하는 모든 songs을 return하는 API
    const songs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.songCollectionId,
      [Query.search("title", searchTerm), Query.limit(5)]
    );

    // API를 성공적으로 받지 못하면 에러 throw, 성공적으로 응답받으면 곡정보 return
    if(!songs) throw Error;
    return songs;
  }catch(err){
    console.log(err);
  }
}


// 유저의 플레이리스트 목록 fetch
export const getMyPlaylist = async (userId: string) => {
  try{
    const playlist = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.playlistCollectionId,
      [Query.equal("user", userId)]
    )
    if(!playlist) throw Error;
    return playlist;
  }catch(err){
    console.log(err);
  }
}