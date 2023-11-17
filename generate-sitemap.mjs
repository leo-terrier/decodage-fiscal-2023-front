import { writeFileSync, readdirSync, statSync } from 'fs'
import path from 'path'
import prettier from 'prettier'
const generate = async () => {
    const findPagesParentPaths = (dir) =>
        readdirSync(dir).flatMap((file) =>
            statSync(path.join(dir, file)).isDirectory()
                ? findPagesParentPaths(path.join(dir, file))
                : file === 'page.tsx'
                ? [dir]
                : []
        )

    const pagesParentPath = findPagesParentPaths('app')

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pagesParentPath
            .map((currentPath) => {
                const path = currentPath.replace('app', '')
                return `
              <url>
                  <loc>${`https://decodage-fiscal.fr${path}`}</loc>
              </url>
            `
            })
            .join('')}
    </urlset>
    `
    const formatted = await prettier.format(sitemap, {
        parser: 'html'
    })
    writeFileSync('public/sitemap.xml', formatted)
}

generate()
