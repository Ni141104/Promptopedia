import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

const handler=NextAuth(
    {
        providers: [
            GoogleProvider({
              clientId: process.env.GOOGLE_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET
            })
          ],
          callbacks:
          {

            async session({session})
            {
              // store the user id from MongoDB to session
              // To store the data of the user which is currently online
              const sessionUser=await User.findOne({
                      email:session.user.email
              })
  
              session.user.id=sessionUser._id.toString();
              return session; 
            },
            async signIn({ account, profile, user, credentials })
            {
              
              //Here it is serverless so whenever we sign in , it will then connect to database otherwise not
              try {
                  await connectToDB(); 
  
                  //check if user is already exists
                  const userExists=await User.findOne({
                      email:profile.email
                  });
  
                  //if not ,create a new user
                  if(!userExists)
                      {
                          await User.create(
                              {
                                  email:profile.email,
                                  username: profile.name.replace(" ","").toLowerCase(),
                                  image:profile.picture
                              }
                          )
                      }
  
                      return true;
  
              } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
              }
            }
          }
    }
)

export { handler as GET,handler as POST}