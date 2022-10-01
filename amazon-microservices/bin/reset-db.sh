docker-compose exec products php artisan migrate:fresh
docker-compose exec ratings php artisan migrate:fresh
docker-compose exec warehouse php artisan migrate:fresh
docker-compose exec orders php artisan migrate:fresh
