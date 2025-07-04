import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Apple from 'next-auth/providers/apple';
import { ConnectDB } from '@/databases/connectDb';

ConnectDB();

export const NEXT_AUTH_CONFIG = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                mobileNo: { label: 'phone', type: 'number', placeholder: 'Enter your phone number.' },
            },
            async authorize(credentials) {
                return {
                    mobileNo: credentials.mobileNo,
                    id: "sdlsdlfewr324324"
                };
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Apple({
            clientId: process.env.AUTH_APPLE_ID,
            clientSecret: process.env.AUTH_APPLE_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }) => {
            // console.log("inside jwt......", user, token);
            if (user) {
                token.uid = user.id;
                token.mobileNo = user.mobileNo
            }
            return token;
        },
        session: async ({ session, token, user }) => {
            // console.log("this is the session.", session);
            if (session.user.email) {
                // const findUser = await axios.get('/')
            }
            if (session.user) {
                session.user.id = token.uid
                session.user.mobileNo = token.mobileNo
            }
            console.log("this is the session.", session);
            return session
        }
    },
    pages: {
        signIn: '/',
    }
}