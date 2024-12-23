FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer


COPY . .

RUN composer install

EXPOSE 8080

CMD bash -c "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8080"
