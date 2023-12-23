module.exports = {
    themeConfig: {
        logo: '/img/Cloudflare-logo-transparent-v-rgb_thumbnail.webp',
        smoothScroll: true,
        repo: "renfei/cloudflared.cn",
        repoLabel: '查看源码',
        editLinks: true,
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: '上次更新',
        docsDir: "packages/docs/docs",
        nav: [
            {text: '首页', link: '/'},
            {
                text: '英文原文',
                link: 'https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/',
                target: '_blank'
            },
            {text: '关于', link: '/about'},
        ],
        sidebar: {
            "/": [{
                title: 'Cloudflare Tunnel',
                collapsable: true,
                children: ['', {
                    title: '开始使用',
                    collapsable: true,
                    children: [
                        'get-started/',
                        'get-started/create-remote-tunnel/',
                        'get-started/create-local-tunnel/',
                        'get-started/tunnel-useful-terms/'
                    ]
                }, 'about']
            }]
        },
        algolia: {
            apiKey: '<API_KEY>',
            indexName: '<INDEX_NAME>',
            appId: 'BH4D9OD16A'
        },
    },
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Cloudflare Tunnel 中文文档',
            description: 'Cloudflare Tunnel Client 中文文档',
        }
    }
}
