import firebase from "firebase";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { auth } from "../services/firebase";



type AuthContextType = {
    user: UserType | undefined;
    signWithGoogle: () => Promise<void>;
  }
  
  type UserType = {
    id: string,
    name: string,
    avatar: string
  }

  type AuthContextProviderProps = {
    children: ReactNode;
  }

  export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<UserType>();

  useEffect(() => { //fica monitorando pra ver se já tem um login prefeito(pra quando dar F5 por exemplo)
    const unsubscribe =  auth.onAuthStateChanged(user =>{ 
       if(user){
         const { displayName, photoURL, uid } = user
 
         if(!photoURL || !displayName){
           throw new Error('Missing information from Goole account.');
         }  
 
         setUser({
           id: uid,
           name: displayName,
           avatar: photoURL
         })
       }
     }) 
 
     return () => { unsubscribe()}; //obrigação de fechar esse listener
   
   },[])

   async function signWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

      if(result.user){
        const { displayName, photoURL, uid } = result.user

        if(!photoURL || !displayName){
          throw new Error('Missing information from Goole account.');
        }  

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL

        })
      }
    }







    return (
        <AuthContext.Provider value={{user, signWithGoogle}}>

            {props.children}

        </AuthContext.Provider>

    );
}