# rasan-project

Proyecto de gestión de órdenes utilizando AWS SQS (Simple Queue Services)

## Instrucciones

- Instalar `git` desde la página oficial haciendo click en `Click here to download`. Ejecutar el instalador con las configuraciones por defecto
- Abrir `Git Bash` o la terminal de windows/cmd desde los programas (git bash es una nueva terminal que tenemos integrada al instalar Git)
- Ejecutar los siguientes comandos de manera secuencial:
- `ssh-keygen -t ed25519 -C "francoangulo2001@gmail.com"`
- Presionar intro cuando pregunte por el archivo en el cuál guardar las claves (esto lo guardará en el archivo por default)
- Cuando pida los passphrase o contraseña, también dejarlas vacías y presionar enter
- Ejecutar el comando: `eval "$(ssh-agent -s)"`, y tiene que mostrar el mensaje `Agent pid 59566`
- Luego `ssh-add ~/.ssh/id_ed25519`
- Mantenemos la terminal abierta

Si surge algún inconveniente durante estos pasos seguir la documentación de https://docs.github.com/es/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent



- Dirigirse a https://github.com/francoa7
- Entrar a settings 

![image](https://user-images.githubusercontent.com/58487596/209724177-bb6bf1e5-0e74-4fb2-b69c-29c3c955ed00.png)

- En el panel izquierdo dirigirse a SSH AND GPG KEYS

![image](https://user-images.githubusercontent.com/58487596/209724341-c536e137-b5f1-4d28-9384-817387360a59.png)

- Click en el botón verde `New SSH key`
- En el título poner Lenovo Fabian
- Key type dejarlo como está
- Y en key pegaremos lo siguiente:
- Ejecutamos `clip < ~/.ssh/id_ed25519.pub` en la terminal que mantuvimos abierta (esto copiará la credencial)
- Lo copiamos en la página
- Add SSH key

- De vuelta en la terminal ejecutamos:
- `ssh -T git@github.com`
- Veremos el siguiente mensaje:

![image](https://user-images.githubusercontent.com/58487596/209724690-ef203d0e-dc3f-48ec-abb4-8f6f7c6b77a5.png)

- El fingerprint que figura debe coincidir con algunos de los que figuran en el siguiente link:

https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints

- De ser asi, en la terminal escribir `yes` y luego enter
- Deberia aparecer un mensaje como el siguiente y ya está todo listo

![image](https://user-images.githubusercontent.com/58487596/209725231-a391ca71-b4e1-48e5-baaf-c67be2289969.png)


- Una vez instalado, abrir terminal de comandos en la carpeta donde se quiera guardar el proyecto y ejecutar el comando: `git clone https://github.com/francoa7/rasan-project`
- Esto clona el proyecto en la compu
- En la misma terminal ejecutar `npm i` (esto instala las librerías necesarias)
- Una vez hecho esto, podríamos ejecutar el .bat con el nombre **winDevGetOrder.bat**
