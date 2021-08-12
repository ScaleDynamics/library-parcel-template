
((root) => {
    
const defaultOptions = {
    env: 'auto',
    accessKey: 'undefined',
    emulator: {
        port: 3192,
        host: 'localhost',
    },
    engine: {
        url: 'https://cdn.scaledynamics.com/warp-engine',
    }
};

class Warper {
    constructor(clientOptions) {
        const warp = typeof self !== 'undefined' ? self.warp : global.warp;
        if (!(warp && warp.engine && warp.engine['4.0.13'])) {
            throw new Error(
                `Api 'microservice' requires @warpjs/engine version '4.0.13'`);
        }
        const stubFactory = warp.engine['4.0.13'].init({
                bid: String.fromCharCode(52,100,68,117,118,122,76,104,69,76,72,101,72,105,111,57,84,72,70,53,109,108,45,49),
                sbu: String.fromCharCode(96,124,116,120,115,50,47,39,118,58,46,105,112,97,46,123,124,105,114,106,97,123,101,38,123,107,97,100,101,108,121,102,97,101,105,107,115,38,99,103,101,39),
            },
            defaultOptions,
            clientOptions);

this.hello = stubFactory.getStub('hello');

        this.warp = {
                internal: stubFactory.internal,
                ping: stubFactory.getStub('warp.ping'),
            };
    }
}
Warper.default = Warper;
Warper.loadEngine = (options) => {
    if (typeof self === 'undefined' ||
        (self.warp && self.warp.engine && self.warp.engine['4.0.13'])) {
        return Promise.resolve();
    }
    const engineURLPrefix = defaultOptions.engine.url;
    const engineURL = engineURLPrefix + '/4.0.13/engine-web-prod.js';
    if (typeof window !== 'undefined') {
        return new Promise((resolve, reject) => {
                if (typeof window !== 'undefined') {
                    const script = window.document.createElement('script');
                    script.async = true;
                    script.src = engineURL;
                    script.type = "text/javascript";
                    script.onload = () => {
                        resolve();
                        script.remove();
                    };
                    script.onerror = () => {
                        reject(new Error(`Failed to load engine from '${engineURL}'`));
                        script.remove();
                    };
                    window.document.getElementsByTagName('head')[0].appendChild(script);
                }
            });
    } else {
        self.importScripts(engineURL);
        return Promise.resolve();
    }
};

    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = Warper;
    else if(typeof define === 'function' && define.amd)
        define([], function() { return Warper });
    else if(typeof exports === 'object')
        exports['microservice'] = Warper;
    else
        root['microservice'] = Warper;
    })(typeof self !== 'undefined' ? self : this);
