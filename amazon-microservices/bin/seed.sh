#!/bin/sh
# -------- Categories --------
echo -e "Seeding categories..."
curl -X POST http://proxy/api/v1/categories \
   -H 'Content-Type: application/json' \
   -d '{"name": "Books"}'

curl -X POST http://proxy/api/v1/categories \
   -H 'Content-Type: application/json' \
   -d '{"name": "Laptops"}'

curl -X POST http://proxy/api/v1/categories \
   -H 'Content-Type: application/json' \
   -d '{"name": "Monitors"}'
echo -e "Seeding categories DONE"
# -------- End of Categories --------

# -------- Products --------
echo -e "Seeding products..."
curl -X POST http://proxy/api/v1/products \
   -H 'Content-Type: application/json' \
   -d '{"categoryId": 1, "name": "Microservices With Laravel", "price": 37, "description": "Quisque sit amet malesuada est, et bibendum quam. Nulla facilisi. Proin fringilla urna ut diam scelerisque, in gravida purus suscipit. Suspendisse at mi eu ex faucibus feugiat ut vitae felis. Donec odio nibh, cursus eu tortor vitae, consectetur porttitor enim. Ut non aliquet dui. Curabitur sapien leo, gravida et neque a, suscipit efficitur urna. Integer lacinia dolor sit amet ipsum accumsan scelerisque. Aenean placerat mollis finibus. Cras sodales dolor vel molestie malesuada. Donec aliquet justo sit amet nisl lacinia porta. Donec in magna porta, accumsan purus nec, pharetra ante. Praesent mollis nulla at ipsum scelerisque sodales."}'
  
curl -X POST http://proxy/api/v1/products \
   -H 'Content-Type: application/json' \
   -d '{"categoryId": 1, "name": "Domain-Driven Design With Laravel", "price": 37, "description": "Quisque sit amet malesuada est, et bibendum quam. Nulla facilisi. Proin fringilla urna ut diam scelerisque, in gravida purus suscipit. Suspendisse at mi eu ex faucibus feugiat ut vitae felis. Donec odio nibh, cursus eu tortor vitae, consectetur porttitor enim. Ut non aliquet dui. Curabitur sapien leo, gravida et neque a, suscipit efficitur urna. Integer lacinia dolor sit amet ipsum accumsan scelerisque. Aenean placerat mollis finibus. Cras sodales dolor vel molestie malesuada. Donec aliquet justo sit amet nisl lacinia porta. Donec in magna porta, accumsan purus nec, pharetra ante. Praesent mollis nulla at ipsum scelerisque sodales."}'

curl -X POST http://proxy/api/v1/products \
   -H 'Content-Type: application/json' \
   -d '{"categoryId": 2, "name": "Macbook Pro", "price": 990, "description": "Quisque sit amet malesuada est, et bibendum quam. Nulla facilisi. Proin fringilla urna ut diam scelerisque, in gravida purus suscipit. Suspendisse at mi eu ex faucibus feugiat ut vitae felis. Donec odio nibh, cursus eu tortor vitae, consectetur porttitor enim. Ut non aliquet dui. Curabitur sapien leo, gravida et neque a, suscipit efficitur urna. Integer lacinia dolor sit amet ipsum accumsan scelerisque. Aenean placerat mollis finibus. Cras sodales dolor vel molestie malesuada. Donec aliquet justo sit amet nisl lacinia porta. Donec in magna porta, accumsan purus nec, pharetra ante. Praesent mollis nulla at ipsum scelerisque sodales."}'

curl -X POST http://proxy/api/v1/products \
   -H 'Content-Type: application/json' \
   -d '{"categoryId": 3, "name": "LG Monitor", "price": 390, "description": "Quisque sit amet malesuada est, et bibendum quam. Nulla facilisi. Proin fringilla urna ut diam scelerisque, in gravida purus suscipit. Suspendisse at mi eu ex faucibus feugiat ut vitae felis. Donec odio nibh, cursus eu tortor vitae, consectetur porttitor enim. Ut non aliquet dui. Curabitur sapien leo, gravida et neque a, suscipit efficitur urna. Integer lacinia dolor sit amet ipsum accumsan scelerisque. Aenean placerat mollis finibus. Cras sodales dolor vel molestie malesuada. Donec aliquet justo sit amet nisl lacinia porta. Donec in magna porta, accumsan purus nec, pharetra ante. Praesent mollis nulla at ipsum scelerisque sodales."}'

echo -e "\nWaiting for consumers to process..."
sleep 15
echo -e "\n\nSeeding products DONE"
# -------- End of Products --------

# -------- Warehouses --------
echo -e "\nSeeding warehouses..."
curl -X POST http://proxy/api/v1/warehouses \
   -H 'Content-Type: application/json' \
   -d '{"name": "Warehouse #1"}'

curl -X POST http://proxy/api/v1/warehouses \
   -H 'Content-Type: application/json' \
   -d '{"name": "Warehouse #2"}'
echo -e "\nSeeding warehouses DONE"
# -------- End of Warehouses --------

# -------- Inventories --------
echo -e "\nSeeding inventories..."
curl -X POST http://proxy/api/v1/inventory \
   -H 'Content-Type: application/json' \
   -d '{"productId": 1, "warehouseId": 1, "quantity": 10}'

curl -X POST http://proxy/api/v1/inventory \
   -H 'Content-Type: application/json' \
   -d '{"productId": 2, "warehouseId": 1, "quantity": 10}'

curl -X POST http://proxy/api/v1/inventory \
   -H 'Content-Type: application/json' \
   -d '{"productId": 3, "warehouseId": 2, "quantity": 10}'

curl -X POST http://proxy/api/v1/inventory \
   -H 'Content-Type: application/json' \
   -d '{"productId": 4, "warehouseId": 2, "quantity": 10}'
echo -e "\nWaiting for consumers to process..."
sleep 15
echo -e "\nSeeding inventories DONE"
# -------- End of Inventories --------

# -------- Ratings --------
echo -e "\nSeeding ratings"
curl -X POST http://proxy/api/v1/products/1/ratings \
   -H 'Content-Type: application/json' \
   -d '{"rating": 5, "comment": "Morbi volutpat pharetra nibh, in aliquet leo malesuada nec. Maecenas enim neque, scelerisque nec pretium quis, elementum ut magna. Suspendisse pharetra velit vitae rhoncus porttitor. Aliquam eu semper purus, vitae facilisis ligula. Nam scelerisque massa sed urna fringilla iaculis."}'

curl -X POST http://proxy/api/v1/products/1/ratings \
   -H 'Content-Type: application/json' \
   -d '{"rating": 4, "comment": "Suspendisse efficitur ex metus, in tincidunt dui mollis id. In elementum mauris quam, eget volutpat massa fringilla ac. Sed eu eros a leo posuere porta vitae ac velit."}'

curl -X POST http://proxy/api/v1/products/2/ratings \
   -H 'Content-Type: application/json' \
   -d '{"rating": 4, "comment": "Suspendisse risus libero, fermentum id magna et, ornare aliquet dui. Cras eget mollis diam. Duis sagittis tortor a augue tincidunt, lacinia maximus nulla sodales. Nunc malesuada ligula urna, id elementum tortor semper quis. Aliquam ut massa egestas, venenatis ex in, condimentum arcu."}'

curl -X POST http://proxy/api/v1/products/3/ratings \
   -H 'Content-Type: application/json' \
   -d '{"rating": 5, "comment": "Phasellus ex leo, pellentesque quis dignissim sed, lobortis sit amet ipsum. Donec rutrum pretium libero, tempor commodo velit molestie sit amet."}'

curl -X POST http://proxy/api/v1/products/4/ratings \
   -H 'Content-Type: application/json' \
   -d '{"rating": 3, "comment": "Praesent quis hendrerit nisi. Quisque vulputate eu elit a accumsan. Nunc lacinia id ante non sollicitudin. Ut laoreet posuere justo sed condimentum. Donec sodales, nibh non dignissim sodales, nisi nisl sollicitudin orci, ac mollis lorem massa consectetur dolor."}'

echo -e "\nWaiting for consumers to process..."
sleep 15
echo -e "\nSeeding ratings DONE"