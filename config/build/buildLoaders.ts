import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BuildOptions } from './types/config'

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    // для работы со стилями //
    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
                modules: {
                    auto: (resPath: string) => Boolean(resPath.includes('.module.')), // чтобы генерить названия классов только для module
                    localIdentName: isDev 
                        ? '[path][name]__[local]--[hash:base64:5]' 
                        : '[hash:base64:8]'
                },
            }
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
    }

    // Если не используем тайпскрипт - нужен babel-loader //
    const typescriptLoader = {
        test: /\.tsx?$/, // регулярка по которой мы находим файлы, которые необходимо пропустить через лоудер //
        use: 'ts-loader', // loader, который для этих файлов необходимо использовать //
        exclude: /node_modules/, // исключаем то, что обрабатывать не нужно //
    }

    return [
        typescriptLoader,
        cssLoader,
    ]
}
