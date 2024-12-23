#!/bin/bash

echo "Waiting for database connection..."
until nc -z -v -w30 127.0.0.1 5432
do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

echo "Database is up. Running migrations and setup..."


php artisan migrate --force
php artisan key:generate
php artisan config:cache


php-fpm
