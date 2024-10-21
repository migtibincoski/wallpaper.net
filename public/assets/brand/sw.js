elf.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());