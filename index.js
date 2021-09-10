/**
 * Document head.
 * @type {HTMLHeadElement}
 * @const
 */
const head = document.getElementsByTagName('head')[0];

/**
 * Includes one or more Script or CSS files into the document head.
 * @param {*} ...assets Assets references to include.
 * @return {Promise}
 * @async
 */
export default function includeWebAssets(...assets) {
    return new Promise((resolve) => {
        if (assets.length === 1) {
            let ref = assets[0], tag;
            switch (ref.type) {
                case 'text/javascript':
                    tag = document.createElement('script');
                    tag.type = 'text/javascript';
                    tag.src = ref.src;
                    tag.async = !!ref.async;
                    break;
                case 'text/css':
                    tag = document.createElement('link');
                    tag.type = 'text/css';
                    tag.rel = 'stylesheet';
                    tag.href = ref.href;
                    break;
                default:
                    console.warn(`Resource type (${ref.type}) not supported.`)
            }
            if (tag) {
                tag.onload = event => {
                    console.log(`[LOAD] ${event.target.href || event.target.src}`);
                    resolve();
                };
                head.appendChild(tag);
            }
        } else if (assets.length > 1) {
            Promise.all(assets.map(ref => includeWebAssets(ref))).then(resolve);
        }
    });
}
