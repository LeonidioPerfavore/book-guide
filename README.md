<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="200"></a></p>

## Technologies used:
### Back-end
____

1. Laravel
2. MySQL

### Front-end
____
1. React
2. axios
3. dotenv

### Requirements Back-end
____
1. Run the command in the directory where you want to clone the project:
   ```
   git clone https://github.com/LeonidioPerfavore/book-guide.git 
   ```

2. Create an .env.example file in the root directory and rename it to .env:
   ```
   cd book-guide
   cp .env.example .env
   ```
3. Add the URL to the APP_URL environment variable to run locally, you can leave the current one


## Installations Back-end via docker
Run commands:
1.
```
docker run --rm
-u "$(id -u):$(id -g)"
-v $(pwd):/opt
-w /opt
laravelsail/php80-composer:latest
composer install --ignore-platform-reqs
```

2.
```
./vendor/bin/sail up
```
3.
```
./vendor/bin/sail artisan key:generate
```
4.
```
./vendor/bin/sail artisan storage:link
```
5.
```
./vendor/bin/sail artisan migrate
```

## Installations Back-end via composer
1. Create mysql DB:
  ```
   CREATE DATABASE dbname;
   CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON dbname.* TO 'username'@'localhost';
   FLUSH PRIVILEGES;
  ```
2. Add variables to the env file to connect to the database

3.
  ```
   composer install
  ```
4.
  ```
   php artisan serve
  ```
5.
  ```
   php artisan key:generate
  ```
6.
  ```
   php artisan storage:link
  ```
7.
  ```
   php artisan migrate
  ```

### Requirements Front-end
1. In the external directory, change .env.example to .env and add the internal URL (APP_URL) to the REACT_APP_BACKEND_URL environment variable.
   ```
   cd spa/
   cp .env.example .env
   ```

## Installations Front-end

1. 
  ```
   npm install
  ```
2.
  ```
   npm start
  ```

PS: MySQL server must installed & running


