# Tienda virtual - Frontend

Para crear este proyecto utilicé React.Js junto a TypeScript

> [!WARNING]
> El backend está deployado en render, por lo que es posible que la página en su primera carga tenga un tiempo de carga bastante grande, ya que render en su plan gratuito, apaga el servidor tras no ser solicitado en x tiempo.

## Rutas

La página cuenta con cuatro rutas (Creadas con **"React-Router-Dom"**)

• **"/"**: Es la página principal, en esta se muestran todos los productos.

• **"/login"**: Inicio de sesión para administradores, cuenta con autenticación con JWT.

• **"/edit"**: Si el usuario está autenticado puede editar y/o cargar o borrar productos.

• **"/products/:id/:brand/:model"**: Esta página muestra un producto en específico.

Cualquier otra ruta que no exista renderizará un elemento donde se podrá volver a la ruta por defecto **("/")**

## Ruta ("/")

En esta ruta tenemos una vista de todos los productos, conteniendo el nombre del producto, su precio, imagen y su respectiva marca.

Tenemos un aside donde podremos filtrar elementos por marca y/o producto. Las marcas y productos que se muestran disponibles para filtrar están hardcodeadas con un array, pero en un proyecto más grande se podrían traer del backend, seleccionando las marcas/productos que al usuario más le interesen y/o las marcas/productos más vendidos.

Esta ruta también tiene un header en el cual podremos filtrar por descripción. Los filtros del aside y del header se terminan juntando en un gran string con el cual hacemos la consulta de los productos con los filtros al servidor.

Al hacer click en un producto nos redireccionará a otra página donde contendrá la información del mismo.

## Ruta ("/products/:id/:brand/:model)

En esta página mostramos de forma más detallada el producto, mostrandonos además de lo que se mostraba en la ruta anterior, el modelo del producto y su descripción.

Esta ruta tabién posee una sección de **"Tambien te podría interesar"**, en este caso al no tener estadísticas del usuario, decidí mostrar otros productos de la misma marca, es decir, si el producto al que accediste es por ejemplo, unas zapatillas nike, esta sección te mostrara otros productos de Nike.

También existe un botón de comprar, el cuál todavía no está implementado, pero con más tiempo se podría implementar un carrito, usando herramientas de React como useContext para poder llevar este carrito por todos los elementos de la página.

## Ruta ("/login")

Esta ruta es un formulario, utilizo **"React-Hook-Form"** para el mismo. Actualmente la única validación que ofrece es no aceptar campos vacios, ya que por el momento, solo se puede hacer login, sin registro, ya que definí el usuario de administrador directamente en la base de datos.

Esta ruta hace una solicitud al backend, y en el caso de ser correcta, nos devuelve una cookie con un token para luego redirigirnos a la página principal **("/")**

## Ruta ("/edit")

Esta es la vista administrador, la ruta es privada y solo podemos acceder si estamos logueados, esto se hace a traves del useContext.

Si estamos autorizados veremos dos formularios, uno para crear un nuevo producto y otro para crear una marca, no podremos crear un producto de una marca que no existe.

Además, hay una vista de todos los productos, donde nuevamente podremos usar los filtros, pero a diferencia de la vista de la ruta **("/")**, en esta ruta nos aparecerá un lapiz con el cuál podremos editar los productos existentes, y también nos aparecerá una cruz para borrar productos.

## Como levantar el proyecto

- Instalar dependencias: `npm install`

- Archivo de configuración de entorno **.env**: Deberá contener una clave **VITE_API_URL** con el valor de la ruta base del backend, ej: "http://localhost:3000" (En el repositorio se encuentra este archivo ya configurado, pero si quisieran cambiar el puerto del backend podrían hacerlo modificando **VITE_API_URL**)

- Correr el proyecto: `npm run dev`: Levantará el proyecto en modo dev, tomando los archivos .env.development que ya se encuentran en el repositorio.
