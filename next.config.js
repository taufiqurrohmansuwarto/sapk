// next.config.js
const withAntdLess = require("next-plugin-antd-less");

// production
const isProd = process.env.NODE_ENV === "production";

function getBasePath() {
    var basePath = "";

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    if (isProd && process.env.BASE_PATH) {
        if (process.env.BASE_PATH.startsWith("/")) {
            basePath = process.env.BASE_PATH;
        } else {
            basePath = "/" + process.env.BASE_PATH;
        }
    }

    return basePath;
}

const hashOnlyIdent = (context, _, exportName) =>
    loaderUtils
        .getHashDigest(
            Buffer.from(
                `filePath:${path
                    .relative(context.rootContext, context.resourcePath)
                    .replace(/\\+/g, "/")}#className:${exportName}`
            ),
            "md4",
            "base64",
            6
        )
        .replace(/^(-?\d|--)/, "_$1");

module.exports = withAntdLess({
    poweredByHeader: false,
    basePath: "/sapk",
    images: {
        domains: ["master.bkd.jatimprov.go.id", "siasn.bkd.jatimprov.go.id"],
        formats: ["image/webp"]
    },
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
        const rules = config.module.rules
            .find((rule) => typeof rule.oneOf === "object")
            .oneOf.filter((rule) => Array.isArray(rule.use));

        if (isProd)
            rules.forEach((rule) => {
                rule.use.forEach((moduleLoader) => {
                    if (
                        moduleLoader.loader?.includes("css-loader") &&
                        !moduleLoader.loader?.includes("postcss-loader")
                    )
                        moduleLoader.options.modules.getLocalIdent =
                            hashOnlyIdent;

                    // earlier below statements were sufficient:
                    // delete moduleLoader.options.modules.getLocalIdent;
                    // moduleLoader.options.modules.localIdentName = '[hash:base64:6]';
                });
            });

        return config;
    }
});
