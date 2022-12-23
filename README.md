# rasan-project

Proyecto de gestión de órdenes utilizando AWS SQS (Simple Queue Services)

## Instrucciones

- Instalar AWS CLI (Command Line Interface)
- Ejecutar en el cmd _aws configure_
- Poner las KEYS requeridas y la región

### Alternativa para credenciales - Archivo compartido

- Para Linux, Unix, y macOS: ~/.aws/credentials
- Para Windows: C:\Users\USER_NAME\.aws\credentials

Abrir el archivo credentials. La estructura es la sigiuente <br/>
```js
[default]
aws_access_key_id = * * * * *
aws_secret_access_key = * * * * *
region = * * * * *
```

En donde `[default]` es el workspace, y podemos definir tantos como queramos. Pudiendo así tener las claves de *QA* y *PRODUCTION* almacenadas al mismo tiempo, y utilizar unas u otras con sólo especificar la variable de entorno **AWS_PROFILE** <br/>
El resto de los campos corresponde a `AWS ACCESS KEY`, `AWS SECRET ACCESS KEY`, y `REGION`
