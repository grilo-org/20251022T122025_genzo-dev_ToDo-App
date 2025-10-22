# Request <-> Response

http://localhost:3000/task -> 80 HTTP ou 443 HTTPS

O http é o esquema (HTTP, HTTPS, FTP, etc), localhost é o host (google.com,
otaviomiranda.com.br, etc), 3000 é a porta TCP usada para a conexão, e /task é o
path, o caminho do recurso.

```
Ler   Criar  Atualizar     Apagar
GET / task / PATCH / PUT / DELETE / HEAD / OPTIONS / CONNECT / TRACE

/auth/login          POST        autenticar usuário      Aberta ✅

/user/               POST        Criar usuário           Aberta ✅
/user/me             PATCH       Atualizar usuário       JWT ✅
/user/me             DELETE      Apagar usuário          JWT ✅
/user/me             GET         Ver dados do usuário    JWT ✅
/user/me/password    PATCH       Atualizar senha         JWT ✅

/task/               GET         Ver todas as tasks      JWT ✅
/task/[slug]         GET         Ver uma task            JWT ✅
/task/me             POST        Criar task              JWT ✅
/task/me/[id]        PATCH       Atualizar uma task      JWT ✅
/task/me/[id]        DELETE      Apagar uma task         JWT ✅
/task/me/[id]/done   PATCH       Alterar valor 'done'    JWT ✅
/task/me/done        GET         Ver tasks 'done'        JWT ✅
/task/me/pending     GET         Ver tasks 'pending'     JWT ✅

```
