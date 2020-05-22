# NGINX

```
location / {
        try_files $uri /index.html;
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        #try_files $uri $uri/ =404;
}

location /api  {
        proxy_pass    http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
}
```

# NODE (VERSION 12 LTS)

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# MONGO

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# REDIS

```
sudo apt update
sudo apt install redis-server
```

# COPY BUILD

```
sudo cp -a /projects/job-board-client/build/. /var/www/html/
```
