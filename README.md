# Introdução

Esse é um repositório com os artefatos utilizados para a entrega do trabalho da discplina de Integração Contínua, DevOps e Computação em Nuvem do curso MIT - Arquitetura de Software da Faculdade Infnet.

## O que está sendo entregue
Para a entrega desse trabalho foi utilizada uma aplicaçao disponibilizada pelo professor para deploy no Kubernetes. 

Este trabalho usará para fins de teste/ilustração os seguintes artefatos:
* Docker para utilização de containers
* Kubernetes/minikube para orquestração de containers (instalado localmente)
* Prometheus e Grafana para observabilidade
* K6 como ferramenta de testes
* Github Acitions como ferramenta de pipeline (CI/CD)
* Arquivos de deployment para Docker e Kubernetes


### Docker

Para executar o container localmente execute o comando abaixo:
```
# Rode esse comando se pretende rodar a aplicação
docker-compose up
```
A imagem gerada dessa aplicação está disponível no Docker hub em: rodrigovantunes/infnet-app e será utilizada para criação dos containers no Kubernetes.



### Kubernetes
**Executar o ambiente no Minikube:**
```
# Iniciar o minikube
minikube start

#Abrir o tunel para poder acessar a aplicação e acomapnhar a observabilidade
minikube tunnel
```
**Deploy da aplicação**
```
Executar o comando abaixo
kubectl apply -f app-deployment.yaml
```
* Serão criadas 4 pods da aplicação
* Serviço Load Balancer para acesso fora do cluster
* Probe Liveness
* Não usa banco de dados
* Disponível em: http://127.0.0.1:3000


**Deploy do Prometheus**
```
Executar o comando abaixo
kubectl apply -f prometheus-deployment.yaml
```
* Serviço Load Balancer para acesso fora do cluster
* Coleta das métricas da aplicação para uso do Grafana
* Disponível em: http://127.0.0.1:9090

**Deploy do Grafana**
```
Executar o comando abaixo
kubectl apply -f grafana-deployment.yaml
```
* Serviço Load Balancer para acesso fora do cluster
* Apresenta dashboars das métricas da aplicação coletadas pelo Prometheus
* Disponível em: http://127.0.0.1:32000

  
**Deploy do K6**
```
Executar o comando abaixo
kubectl apply -f k6-deployment.yaml
```
* Instância o K6 e executa testes de stress na aplicação
* Expõe o resultado para o Prometheus

### Github Actions (CI/CD)
Foi implementada uma pipeline que trata o build da versão e publicação no docker hub quando ocorrer um commit na main.
A pipeline está neste repositório em main/.github/workflows/main.yml
