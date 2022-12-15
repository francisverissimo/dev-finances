import { User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadPhotoProfile(user: User, file: File) {
  const fileRef = ref(storage, `users_profile/${user.uid}.png`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}
