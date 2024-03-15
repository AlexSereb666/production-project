import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true, // автоматически открывает страницу в браузере с нашим приложением
        // при обновлении возвращается на ту страницу на которой и было открыто
        historyApiFallback: true,
        hot: true,
    };
}
