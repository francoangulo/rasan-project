# rasan-project

Proyecto de gestión de órdenes utilizando AWS SQS (Simple Queue Services)

## Instrucciones

- Instalar AWS CLI (Command Line Interface)
- Ejecutar en el cmd _aws configure_
- Poner las KEYS requeridas y la región

### Alternativa para credenciales - Archivo compartido

- Para Linux, Unix, y macOS: ~/.aws/credentials
- Para Windows: C:\Users\USER_NAME\.aws\credentials

Abrir el archivo credentials
La estructura es la sigiuente

[default] --> default es el "workspace", que será apuntado por la variable de entorno AWS_PROFILE=\* \* \* \* \*
aws_access_key_id = ******\*\*******
aws_secret_access_key = ******\*\*******
region = ******\*\*******
