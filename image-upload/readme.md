## api

- oauth2: https://console.cloud.google.com/apis/credentials?project=blog-post-nodejs

## s3

- bucket
- IAM

## gcloud

- create project: https://console.cloud.google.com/welcome?project=image-upload-352017&hl=vi
- enable `cloud build`
- start a `compute engine`
- have `gloud` cli
- have `app.yaml`
- `gcloud app deploy`

## compute engine 1 (database)

```bash
gcloud compute --project \
    "image-upload-352017" ssh \
    --zone asia-southeast1-b upload-image-api
```

```bash
sudo apt-get update
sudo apt-get install -y mongodb
```

```bash
sudo service mongodb stop
sudo mkdir $HOME/db
sudo mongod --dbpath $HOME/db \
    --port 80 --fork --logpath \
    /var/tmp/mongodb --bind_ip_all

exit
```

## compute engine 2 (api)

```bash
###
gcloud compute --project \
 "image-upload-352017" ssh \
 --zone asia-southeast1-b client

###
curl -sL \
    https://deb.nodesource.com/setup_14.x \
    | sudo -E bash -
sudo apt-get install git nodejs -y

###
git clone \
    https://github.com/GoogleCloudPlatform/todomvc-mongodb.git
cd todomvc-mongodb
sudo npm install -g \
    npm-check-updates
sudo ncu -u
sudo npm install
sed -i -e 's/8080/80/g' server.js

###
sudo nohup nodejs server.js \
    --be_ip <server-internal-ip> \
    --fe_ip <client-internal-ip> &
```

## redis instance

https://cloud.google.com/memorystore/docs/redis/create-instance-gcloud

```bash
###
gcloud redis instances create myinstance --size=2 --region=us-central1 \
    --redis-version=redis_5_0

gcloud redis instances describe myinstance --region=us-central1
### host: 10.112.206.123
### port: 6379
```

mongodb://10.148.0.2:80/blogdb

## setup envs

```bash
gcloud compute instances create vm-1 \
    --metadata-from-file startup-script=$HOME/startup.sh \
    --zone=us-west1-a

gcloud compute instances add-metadata upload-image-api --metadata-from-file startup-script=$HOME/startup.sh
```

sed -i -e 's/5000/80/g' index.js

## connect to redis from app engine

- projects/image-upload-352017/global/networks/default
- https://cloud.google.com/vpc/docs/configure-serverless-vpc-access#creating_a_connector

## k8s

- https://medium.com/google-cloud/running-a-mean-stack-on-google-cloud-platform-with-kubernetes-149ca81c2b5d

- `docker build -t image-upload/api .`
  - `docker buildx build -t image-upload/api --platform linux/amd64 .`
- `docker tag image-upload/api gcr.io/image-upload-352017/myapp`
- `gcloud auth configure-docker`
- `docker push gcr.io/image-upload-352017/myapp`

```bash
gcloud container \
  --project "image-upload-352017" \
  clusters create "image-upload-cluster" \
  --zone "us-central1-f" \
  --machine-type "n1-standard-1" \
  --num-nodes "2" \
  --network "default"
```

- https://console.cloud.google.com/kubernetes/list/overview?project=image-upload-352017

```bash
gcloud compute disks create \
  --project "image-upload-352017" \
  --zone "us-central1-f" \
  --size 200GB \
  mongo-disk
```

- `gcloud container clusters get-credentials --zone "us-central1-f" image-upload-cluster`
- `kubectl create -f db-controller.yml`
- `kubectl create -f db-service.yml`
- `kubectl get pods`
- `kubectl create -f web-controller.yml`
- `kubectl create -f web-service.yml`
- `gcloud compute forwarding-rules list`

- create redis instance: https://faun.pub/google-cloud-memorystore-with-node-js-on-google-kubernetes-engine-c9aa13721268

- `gcloud redis instances describe redis-instance --region=us-central1`
- `kubectl create ns redis`
- `export REDIS_URL=redis://10.233.177.243:6379`
- `kubectl -n redis create configmap ms-cm --from-literal=REDIS_URL=${REDIS_URL}`
- `kubectl -n default create configmap ms-cm --from-env-file=image-upload.properties`
- `kubectl -n default get configmaps -o yaml`

- https://humanitec.com/blog/handling-environment-variables-with-kubernetes

https://gitlab.com/codeching/kubernetes-multicontainer-application-react-nodejs-postgres-nginx/-/tree/master/k8s

https://www.youtube.com/watch?v=OVVGwc90guo

- `kubectl apply -f client-depl.yml`

## notes

- Replication Controller VS Deployment in Kubernetes: https://stackoverflow.com/questions/37423117/replication-controller-vs-deployment-in-kubernetes

## domain name

https://medium.com/retina-ai-health-inc/cloud-security-dns-configuration-and-tls-encryption-in-google-kubernetes-engine-658303080bc7
