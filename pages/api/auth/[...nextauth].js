import NextAuth from "next-auth/next";
import prisma from "../../../lib/prisma";

const jsonwebtoken = require("jsonwebtoken");

const masterClientId = process.env.MASTER_ID;
const masterClientSecret = process.env.MASTER_SECRET;
const masterWellKnown = process.env.MASTER_WELLKNOWN;
const masterScope = process.env.MASTER_SCOPE;

const pttpkClientId = process.env.PTTPK_ID;
const pttpkClientSecret = process.env.PTTPK_SECRET;
const pttpkWellKnowon = process.env.PTTPK_WELLKNOWN;
const pttpkScope = process.env.PTTPK_SCOPE;

const pttpkFasilitatorClientId = process.env.PTTPKFASILITATOR_ID;
const pttpkFasilitatorClientSecret = process.env.PTTPKFASILITATOR_SECRET;
const pttpkFasilitatorWellKnown = process.env.PTTPKFASILITATOR_WELLKNOWN;
const pttpkFasilitatorScope = process.env.PTTPKFASILITATOR_SCOPE;

const masterFasilitatorClientId = process.env.MASTERFASILITATOR_ID;
const masterFasilitatorClientSecret = process.env.MASTERFASILITATOR_SECRET;
const masterFasilitatorWellKnown = process.env.MASTERFASILITATOR_WELLKNOWN;
const masterFasilitatorScope = process.env.MASTERFASILITATOR_SCOPE;

const upsert = async (currentUser) => {
    try {
        const [from, currentId] = currentUser?.id?.split("|");

        await prisma.users.upsert({
            where: {
                custom_id: currentUser?.id
            },
            create: {
                from,
                custom_id: currentUser?.id,
                group: currentUser?.group,
                role: currentUser?.role,
                image: currentUser?.image,
                id: currentId,
                username: currentUser?.name,
                employee_number: currentUser?.employee_number,
                email: currentUser?.email,
                birthdate: new Date(currentUser?.birthdate),
                last_login: new Date()
            },
            update: {
                from,
                custom_id: currentUser?.id,
                group: currentUser?.group,
                role: currentUser?.role,
                image: currentUser?.image,
                id: currentId,
                username: currentUser?.name,
                employee_number: currentUser?.employee_number,
                email: currentUser?.email,
                birthdate: new Date(currentUser?.birthdate),
                last_login: new Date()
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export default NextAuth({
    pages: {
        signIn: "/sapk/signin"
    },
    providers: [
        {
            name: "E-MASTER FASILITATOR",
            id: "master-fasilitator",
            type: "oauth",
            wellKnown: masterFasilitatorWellKnown,
            clientId: masterFasilitatorClientId,
            clientSecret: masterFasilitatorClientSecret,
            authorization: {
                params: {
                    scope: masterFasilitatorScope,
                    prompt: "login"
                }
            },
            httpOptions: {
                timeout: 10000
            },
            idToken: true,
            checks: ["pkce", "state"],
            profile: async (profile, token) => {
                const currentToken = token.id_token;
                const { role, group, employee_number } =
                    jsonwebtoken.decode(currentToken);

                const currentUser = {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    employee_number: employee_number || "",
                    birthdate: profile?.birthdate || null,
                    email: profile?.email || null,
                    role,
                    group
                };

                await upsert(currentUser);

                return currentUser;
            }
        }
    ],
    callbacks: {
        redirect: async (url, baseUrl) => {
            const urlCallback = `${url?.baseUrl}${process.env.BASE_PATH}`;
            return urlCallback;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.expires = token?.expires;

            // session.scope = token.scope;
            session.user.id = token.id;
            session.user.role = token?.role;
            session.user.group = token?.group;
            session.user.employee_number = token?.employee_number;

            const check = Date.now() < new Date(token?.expires * 1000);

            if (check) {
                return session;
            }
        },
        async jwt({ token, account, isNewUser, profile, user }) {
            if (account) {
                token.accessToken = account?.access_token;

                token.expires = profile.exp;
                token.id = account?.providerAccountId;
                token.role = profile?.role;
                token.group = profile?.group;
                token.employee_number = profile?.employee_number;
            }

            return token;
        }
    },
    theme: "light",
    secret: process.env.SECRET,
    jwt: {
        secret: process.env.SECRET
    }
});
