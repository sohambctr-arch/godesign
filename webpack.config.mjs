import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** @type {import('webpack').Configuration} */
export default {
  mode: "production",

  // ── Entry points ──────────────────────────────────────────────────────────
  // Two JS entry points (components + utils) and two CSS entry points.
  // Each becomes its own file in dist/.
  entry: {
    index:            "./src/index.ts",
    "utils/index":    "./src/utils/index.ts",
    "styles/theme":   "./styles/theme.css",
    "styles/globals": "./styles/globals.css",
  },

  // ── Output ────────────────────────────────────────────────────────────────
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    library: {
      type: "module",   // ESM output
    },
    clean: true,        // wipe dist/ before every build
  },

  // ── ESM output requires this ───────────────────────────────────────────────
  experiments: {
    outputModule: true,
  },

  // ── Externals ─────────────────────────────────────────────────────────────
  // Never bundle React or React DOM — consumer apps provide these.
  // react-aria-components is also external since Untitled UI uses it
  // and consumers will have it as a transitive dep.
  externals: {
    react:                    "react",
    "react-dom":              "react-dom",
    "react/jsx-runtime":      "react/jsx-runtime",
    "react-aria-components":  "react-aria-components",
  },

  // ── Module resolution ─────────────────────────────────────────────────────
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      // @/ maps to src/ — matches tsconfig paths
      "@": path.resolve("src"),
    },
  },

  // ── Loaders ───────────────────────────────────────────────────────────────
  module: {
    rules: [
      // TypeScript + TSX
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            // Use tsconfig.build.json for the build
            // (excludes stories and tests)
            configFile: "tsconfig.build.json",
            // Only transpile — type checking is done separately via pnpm tsc
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },

      // CSS — processed through PostCSS (Tailwind v4) then extracted
      // to separate .css files via MiniCssExtractPlugin.
      // This is the production-grade pipeline for @theme {} processing.
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // Don't process @import in CSS — PostCSS handles that
              import: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  // Tailwind v4 PostCSS plugin — processes @theme {},
                  // @layer, @custom-variant, and all Tailwind utilities
                  "@tailwindcss/postcss",
                ],
              },
            },
          },
        ],
      },
    ],
  },

  // ── Plugins ───────────────────────────────────────────────────────────────
  plugins: [
    new MiniCssExtractPlugin({
      // Emits styles/theme.css and styles/globals.css
      // matching the entry point names above
      filename: "[name].css",
    }),
  ],

  // ── Optimisation ──────────────────────────────────────────────────────────
  optimization: {
    // Do not create a separate runtime chunk for a library
    runtimeChunk: false,
    // Preserve named exports for tree-shaking in consumer apps
    usedExports: true,
  },

  // ── Source maps ───────────────────────────────────────────────────────────
  devtool: "source-map",
};