// next.config.js
const withAntdLess = require("next-plugin-antd-less");

// production
const isProd = process.env.NODE_ENV === "production";

function getBasePath() {
    var basePath = "";

    if (isProd && process.env.BASE_PATH) {
        if (process.env.BASE_PATH.startsWith("/")) {
            basePath = process.env.BASE_PATH;
        } else {
            basePath = "/" + process.env.BASE_PATH;
        }
    }

    return basePath;
}

module.exports = withAntdLess({
    experimental: {},
    poweredByHeader: false,
    basePath: "/sapk",
    publicRuntimeConfig: {
        basePath: getBasePath()
    },
    modifyVars: { "@primary-color": "#2f54eb" }, // optional
    lessVarsFilePath: "./src/styles/variables.less", // optional
    lessVarsFilePathAppendToEndOfContent: false, // optional
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {
        // ...
        mode: "local",
        //     localIdentName: __DEV__ ? "[local]--[hash:base64:4]" : "[hash:base64:8]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
        exportLocalsConvention: "camelCase",
        exportOnlyLocals: false,
        // ...
        getLocalIdent: (context, localIdentName, localName, options) => {
            return "whatever_random_class_name";
        }
    },

    // for Next.js ONLY
    nextjs: {
        localIdentNameFollowDev: false // default false, for easy to debug on PROD mode
    },

    // Other Config Here...

    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
        if (isProd) {
            config.module.rules[3].oneOf.forEach((moduleLoader, i) => {
                Array.isArray(moduleLoader.use) &&
                    moduleLoader.use.forEach((l) => {
                        if (
                            l.loader.includes("\\css-loader") &&
                            !l.loader.includes("postcss-loader")
                        ) {
                            const { getLocalIdent, ...others } =
                                l.options.modules;

                            l.options = {
                                ...l.options,
                                modules: {
                                    ...others,
                                    localIdentName: "[hash:base64:6]"
                                }
                            };
                        }
                    });
            });
            return config;
        } else {
            return config;
        }
    }
});
