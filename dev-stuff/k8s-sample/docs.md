## build a pod

- `cd ./posts && docker build -t vnscriptkid/posts:0.0.1 .`
- `cd ./infra/k8s && kubectl apply -f posts.yml`
- `kubectl get pods`

## update deployments

- rebuild image: `cd ./posts && docker build -t vnscriptkid/posts .`
- `docker run -t vnscriptkid/posts`
- docker login
- docker push vnscriptkid/posts
- restart depl: `kubectl rollout restart deployment posts-depl`

## apply service

- `cd ./infra/k8s && kubectl apply -f posts-srv.yml`
- `kubectl get services`
- `kubectl describe service posts-srv`

## terms

- node: like virtual machine
- pod: docker container wrapper
- deployment: monitor pod, auto-heal in case of failure
- service: handle communication btw pods
  - cluster IP: inside cluster
  - nodeport: for dev only
  - LB: communicate from outside of cluster
