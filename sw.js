const CACHE_NAME = 'vocab-app-v1';
const urlsToCache = [
  './',
  './index.html',
  'https://dict.youdao.com/dictvoice?audio=test&type=2'
];

// 安装 Service Worker 并缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活并清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求，优先使用缓存
self.addEventListener('fetch', event => {
  // 不缓存有道词典音频等外部请求，只对同源资源使用缓存
  if (event.request.url.includes('dict.youdao.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 找到缓存返回缓存，否则网络请求
        if (response) {
          return response;
        }
        
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // 检查是否为有效响应
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // 缓存新资源
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // 离线时返回缓存的 index.html
        return caches.match('./index.html');
      })
  );
});
