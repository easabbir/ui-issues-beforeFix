const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('node:path');
const DotenvWebpack = require('dotenv-webpack');
const webpack = require('webpack');
const Dotenv = require('dotenv');

const deps = require('./package.json').dependencies;

const printCompilationMessage = require('./compilation.config.js');

// Load environment variables from a specific directory
const mode = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), 'src/environments', `.env.${mode}`);
Dotenv.config({ path: envPath });

module.exports = (_, argv) => {
    const PORT = process.env.PORT || 3000;
    return {
        mode: mode,
        entry: './src/index.ts',
        output: {
            publicPath: `${process.env.REMOTE_BASE_URL}:${PORT}/`,
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@components': path.resolve(__dirname, './src/components'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@layouts': path.resolve(__dirname, './src/layouts'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@utils': path.resolve(__dirname, './src/utils'),
            },
        },

        devServer: {
            port: PORT,
            historyApiFallback: true,
            watchFiles: [path.resolve(__dirname, 'src')],
            onListening: (devServer) => {
                const port = devServer.server.address().port;

                printCompilationMessage('compiling', port);

                devServer.compiler.hooks.done.tap(
                    'OutputMessagePlugin',
                    (stats) => {
                        setImmediate(() => {
                            if (stats.hasErrors()) {
                                printCompilationMessage('failure', port);
                            } else {
                                printCompilationMessage('success', port);
                            }
                        });
                    }
                );
            },
        },

        module: {
            rules: [
                {
                    test: /\.m?js/,
                    type: 'javascript/auto',
                    resolve: {
                        fullySpecified: false,
                    },
                },
                {
                    test: /\.module\.(css|s[ac]ss)$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName:
                                        '[name]__[local]___[hash:base64:5]',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    exclude: /\.module\.(css|s[ac]ss)$/i, // Exclude CSS modules
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.json$/,
                    type: 'javascript/auto',
                    use: 'json-loader',
                },
            ],
        },

        plugins: [
            new ModuleFederationPlugin({
                name: 'offerwall',
                filename: 'remoteEntry.js',
                remotes: {},
                exposes: {
                    './Button': './src/components/button/Button',
                },
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: deps['react-dom'],
                    },
                },
            }),
            new HtmlWebPackPlugin({
                template: './src/index.html',
            }),
            new DotenvWebpack({
                path: envPath,
            }),
            new webpack.DefinePlugin({
                'process.env.MODE': JSON.stringify(mode),
            }),
        ],
    };
};
