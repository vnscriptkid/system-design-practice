# orchestrator pattern (parallel)

- orderId: uuid
- 1. order req
    - userId: 1
    - productId: 1
    - quantity: 1

##### pre-condition
- productPrice: 25

##### parallel
- 2. 1. 1. payment req
    - userId: 1
    - amount: 25
    - orderId: uuid

- 2. 1. 2. payment res
    - userId: 1
    - name: thanh
    - balance: 375
    - status: "SUCCESS"

- 2. 2. 1. inventory req
    - orderId: uuid
    - productId: 1
    - quantity: 1

- 2. 2. 2. inventory res
    - productId: 1
    - quantity: 1
    - remainingQuantity: 9
    - status: "SUCCESS"

- 2. 3. 1. shipping req
    - quantity: 1
    - userId: 1
    - orderId: uuid

- 2. 3. 1.
    - orderId: uuid
    - quantity: 1
    - status: "SUCCESS"
    - expectedDelivery: "2022-04-12"
    - address:
        - street: "Lieu Giai"
        - city: "Hanoi"
        - state: Hanoi"
        - zipCode: "100000"