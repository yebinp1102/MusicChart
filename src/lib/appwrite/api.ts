import { NewUserType } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export const createNewAccount = async (user: NewUserType) => {
  try{
    const response = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )

    return response;
  }catch(err){
    console.log(err);
    return err;
  }
}