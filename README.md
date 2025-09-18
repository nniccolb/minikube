# k8s-demo: Orchestrator + Workers (Node.js on Kubernetes)

A minimal local Kubernetes demo showing a **central orchestrator service** calling **worker services** running in different pods.

- `orchestrator` exposes `GET /run` and calls `worker-a` + `worker-b`
- `worker-a` exposes `GET /process`
- `worker-b` exposes `GET /process`

## Architecture

Laptop → (NodePort) → `orchestrator` Service → orchestrator Pod  
orchestrator Pod → `worker-a` Service → worker-a Pod  
orchestrator Pod → `worker-b` Service → worker-b Pod

Workers are reached by **service DNS names** inside the cluster:
- `http://worker-a:8080/process`
- `http://worker-b:8080/process`

Run locally:
1) Start the cluster
```bash
minikube start
kubectl get nodes
```
2) Build images inside minikube:
`eval $(minikube docker-env)`

```bash
docker build -t orchestrator:latest ./orchestrator
docker build -t worker-a:latest ./worker-a
docker build -t worker-b:latest ./worker-b
```
3)  Deploy to kubernetes
`kubectl apply -f k8s/`

4) Call the orchestrator
`minikube service orchestrator`

5) Visit `http://<minikube-ip>:30001/run`



<img width="800" height="207" alt="Screenshot 2026-01-04 at 17 35 42" src="https://github.com/user-attachments/assets/7466942e-4259-4ad4-8176-0f340600570f" />




<img width="175" height="151" alt="Screenshot 2026-01-04 at 17 40 46" src="https://github.com/user-attachments/assets/bfca8536-61ff-4deb-86ff-d22342139011" />
