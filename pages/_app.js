import "@ant-design/pro-components/dist/components.css";
import "@ant-design/pro-layout/dist/layout.css";
import { MantineProvider } from "@mantine/core";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import id from "antd/lib/locale/id_ID";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "semantic-ui-css/semantic.min.css";
import Loading from "../src/components/Loading";
import "./index.css";

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps }
}) {
    // useScrollRestoration(router);
    const [queryClient] = useState(() => new QueryClient());
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <SessionProvider
            basePath="/sapk/api/auth"
            baseUrl="/sapk"
            session={session}
        >
            <QueryClientProvider client={queryClient}>
                <ConfigProvider locale={id}>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            /** Put your mantine theme override here */
                            colorScheme: "light"
                        }}
                    >
                        <Hydrate state={pageProps?.dehydrateState}>
                            {Component.Auth ? (
                                <Auth
                                    roles={Component?.Auth?.roles}
                                    groups={Component?.Auth?.groups}
                                    isAdmin={Component?.Auth?.isAdmin}
                                >
                                    {getLayout(<Component {...pageProps} />)}
                                </Auth>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </Hydrate>
                    </MantineProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}

function Auth({ children, roles, groups, isAdmin }) {
    const { data, status } = useSession({
        required: true,
        onUnauthenticated: () => signIn()
    });

    const currentRole = data?.user?.role;
    const currentGroup = data?.user?.group;

    // just me for admin
    const currentUserId = data?.user?.id;

    if (status === "loading") {
        return <Loading />;
    }

    if (
        data?.user &&
        roles?.includes(currentRole) &&
        groups?.includes(currentGroup)
    ) {
        return children;
    } else if (currentUserId === "master|56543" && isAdmin === true) {
        return children;
    } else {
        return <div>404</div>;
    }
}
