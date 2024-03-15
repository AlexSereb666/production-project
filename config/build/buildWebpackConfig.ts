import path from 'path';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolves } from './buildResolves';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        // mode может быть development либо production, первый для разработки,
        // второй для случая когда мы уже публикуем приложение,
        // Webpack собирает приложение в более сжатом виде, удаляет комменты и тд.
        // уменьшает размер приложение одним словом //
        // это называется минификация //
        mode,
        // entry - стартовая точка приложения //
        // можно указывать несколько энтри-поинтов если такие существуют //
        /* пример
            entry: {
                RANDOM: path.resolve(__dirname, 'src', 'index.js'),
            },
        */
        entry: paths.entry,
        // output - куда и как мы будем делать сборку нашего приложения //
        output: {
            // в квадратных скобках указываем динамические названия сборки //
            // [contenthash] - решение проблемы кеширования, //
            // чтобы пользователю всегда отдавалась актуальная версия сборки //
            // [contenthash] - генерирует уникальные идентификаторы //
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true, // автоподчистка файлов сборок
        },
        // Добавление плагинов //
        plugins: buildPlugins(options),
        module: {
            // rules - здесь мы конфигурируем loader, файлы, которые выходят за рамки JS //
            // т.е. это png. jpeg, ts, gif, css и т.д. //
            rules: buildLoaders(options),
        },
        resolve: buildResolves(options),
        // когда вебпак собирает приложение, все файлы js собираются в один файл //
        // и отследить ошибку в данной ситуации сложно, для этого и нужен devtool //
        // поэтому вебпак делает карты исходного кода, по которым мы можем четко по //
        // стектрейсу увидеть где, в какой функции, файле произошла ошибка //
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
