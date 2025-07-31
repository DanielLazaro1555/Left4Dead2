# 🧟 Left 4 Dead 2 - Guía Completa de Comandos

Una guía interactiva y moderna para todos los comandos, trucos y cheats de Left 4 Dead 2. Esta aplicación web te permite encontrar y copiar fácilmente cualquier comando del juego.

## 🎮 Características

- **Interfaz moderna**: Diseño limpio y responsivo con Tailwind CSS
- **Comandos organizados** por categorías:
  - 🧟 **Zombies**: Spawneo de infectados especiales y hordas
  - 🎒 **Items**: Botiquines, medicinas y explosivos
  - 🔫 **Armas**: Pistolas, rifles, escopetas y armas cuerpo a cuerpo
  - ⚡ **Upgrades**: Mejoras para armas (láser, munición especial)
  - 🎮 **Cheats**: Modo dios, munición infinita, noclip y más
  - 🗺️ **Mapas**: Todos los mapas de campañas oficiales
- **Copia con un clic**: Haz clic en cualquier comando para copiarlo al portapapeles
- **Navegación suave**: Desplazamiento fluido entre secciones
- **Comandos listos para usar**: Los mapas incluyen automáticamente el prefijo `map`

## 🚀 Uso

1. Abre `index.html` en tu navegador
2. Navega por las diferentes secciones usando el menú superior
3. Haz clic en cualquier comando para copiarlo automáticamente
4. Abre la consola del desarrollador en Left 4 Dead 2 (tecla `~`)
5. Pega el comando y presiona Enter

## 📁 Estructura del Proyecto

```
Left4Dead2/
├── index.html          # Página principal
├── app.js             # Lógica JavaScript optimizada
├── Data.json          # Base de datos de comandos
└── README.md          # Este archivo
```

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Estilos modernos y responsivos
- **JavaScript ES6+**: Funcionalidad interactiva optimizada
- **JSON**: Base de datos de comandos fácil de mantener

## 📝 Cómo Añadir Nuevos Comandos

1. Edita el archivo `Data.json`
2. Añade el nuevo comando en la sección correspondiente
3. La página se actualizará automáticamente

Ejemplo:

```json
{
  "Items": {
    "Nuevo Item": "give nuevo_item"
  }
}
```

## 🎯 Comandos Destacados

### Zombies Especiales

- Tank: `z_spawn tank`
- Witch: `z_spawn witch`
- Hunter: `z_spawn hunter`

### Cheats Útiles

- Modo Dios: `god 1`
- Munición Infinita: `sv_infinite_ammo 1`
- Eliminar Zombies: `kill all`

### Mapas Populares

- Dead Center Hotel: `map c1m1_hotel`
- Dark Carnival: `map c2m1_highway`
- No Mercy: `map c8m1_apartment`

## ⚠️ Nota Importante

Estos comandos funcionan principalmente en:

- Modo de un jugador
- Servidores locales
- Servidores donde tengas permisos de administrador

## 📚 Referencias

- [Reddit: Map Names Guide](https://www.reddit.com/r/l4d2/comments/16towbu/what_are_the_map_names_so_i_can_change_a_map_by/)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Creado por [Daniel Huamán](https://github.com/DanielLazaro1555).**

**¿Encontraste útil esta guía?** ⭐ ¡Dale una estrella al repositorio!
