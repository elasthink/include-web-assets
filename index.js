/**
 * Document Head.
 * @type {HTMLHeadElement}
 * @const
 */
const head = document.getElementsByTagName('head')[0];

/**
 * Import one or more Script or CSS files into the document head.
 * @param {*} ...assets Assets references to import.
 * @return {Promise}
 * @async
 */
export default function includeWebAssets(...assets) {
    return new Promise((resolve, reject) => {
        if (assets.length > 1) {
            for (let ass of assets) {
                Promise.all(file.map(f => includeWebAssets(ass))).then(resolve);
            }
        } else {
            let tag;
            switch (file.type) {
                case 'text/javascript':
                    tag = document.createElement('script');
                    tag.type = 'text/javascript';
                    tag.src = file.src;
                    tag.async = !!file.async;
                    break;
                case 'text/css':
                    tag = document.createElement('link');
                    tag.type = 'text/css';
                    tag.rel = 'stylesheet';
                    tag.href = file.href;
                    break;
                default:
                    console.warn(`Resource type (${file.type}) not supported.`)
            }
            if (tag) {
                tag.onload = event => {
                    console.log(`[LOAD] ${event.target.href || event.target.src}`);
                    resolve();
                };
                head.appendChild(tag);
            }
        }
    });
}
