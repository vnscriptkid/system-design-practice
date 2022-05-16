## guide

- `cd ./posts && docker build -t vnscriptkid/posts:0.0.1 .`
- `cd ./infra/k8s && kubectl apply -f posts.yml`
- `kubectl get pods`

## update deployments

- rebuild image: `cd ./posts && docker build -t vnscriptkid/posts .`
- docker login
- docker push vnscriptkid/posts
- restart depl: kubectl rollout restart deployment posts-depl
