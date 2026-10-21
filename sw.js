const CACHE="codenova-pwa-v1";
const SHELL=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put("./index.html",res.clone()));return res}).catch(()=>caches.match(r).then(c=>c||caches.match("./index.html"))));return}e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(cache=>cache.put(r,res.clone()));return res}))) });
