# Ticketing
- https://console.cloud.google.com/kubernetes/list/overview?project=ticketing-dev-355415

## skaffold
- skaffold dev

## gcloud
- https://cloud.google.com/sdk/docs/install
- `gcloud init`
- switch to cloud context: `gcloud container clusters get-credentials --zone=us-central1-c ticketing-dev-cluster`
- `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.1/deploy/static/provider/cloud/deploy.yaml`

## gcloud build `Cloud Build API`

## network services

- LB: https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers?project=ticketing-dev-355415
    - ip: 35.188.54.95

## chrome warning
- bypass: `thisisunsafe`

## services
- auth service
    - `GET /api/users/currentuser`
    - `POST /api/users/signin`
    - `POST /api/users/signup`
    - `POST /api/users/signout`

## mongodb
- `docker pull mongo`

## shared env vars btw services
- `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`
- `kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=asdf`
- `kubectl get secrets`

## services communication
- fact: nginx knows everything
- baseURL of nginx: 
    - `servicename.namespace.svc.cluster.local`
    - `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local` || external name service


## namespaces
- examples
    - default
    - ingress-nginx
- check: `kubectl get namespaces`
- `kubectl get services -n ingress-nginx`

## port forwarding
- `kubectl port-forward nats-depl-76f8b46b59-rpvn6 8222:8222`