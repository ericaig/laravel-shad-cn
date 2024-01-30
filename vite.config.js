import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { homedir } from 'os'

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: 'resources/js/app.tsx',
//             refresh: true,
//         }),
//         react(),
//     ],
// });

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const host = new URL(env.APP_URL).host

    // const server = homedir ? detectServerConfig(host) : {}
    const server = detectServerConfig(host)

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/app.tsx'],
                refresh: true,
                // refresh: [
                //     'app/**/*.php',
                //     'resources/views/**',
                //     'lang/**',
                //     'routes/**',
                // ],
            }),
            react(),
        ],
        server,
    }
})

/**
 * https://freek.dev/2276-making-vite-and-valet-play-nice-together
 */
function detectServerConfig(host) {
    return {
        hmr: { host },
        host,
        https: {
            key: homedir + '/.config/valet/Certificates/' + host + '.key',
            cert: homedir + '/.config/valet/Certificates/' + host + '.crt'
        },
    }
}
