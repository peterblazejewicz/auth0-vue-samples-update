module.exports = {
    "ui": false,
    "files": [
      'index.html',
      'index.js',
      'style.css'
    ],
    "watchEvents": [
        "change"
    ],
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": true,
    "port": 3000,
    "ghostMode": false,
    "logPrefix": "VUE",
    "logFileChanges": true,
    "open": "local",
    "browser": "default",
    "reloadOnRestart": false,
    "notify": true,
    "reloadDelay": 0,
    "reloadDebounce": 0,
    "reloadThrottle": 0,
    "injectChanges": true,
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    },
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    }
};
