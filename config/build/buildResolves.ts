import webpack, { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolves(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true, // в приоритете абсолютные пути
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    };
}
