# Gritt — Landing

**Graphical · Response · Tactical · Transformation**

Sitio de la agencia Gritt. Hacemos tangible tu identidad: del logo al sistema
completo. Diferencial: la investigación y el benchmark los hace la IA, el logo y
la identidad los diseña una persona.

## Stack

Sitio **100% estático** — HTML + CSS + JS, sin build ni dependencias.
- `index.html` — página principal
- `css/style.css` — estilos (tokens: negro `#1D1D1B`, lima `#D4FF3D`, Manrope)
- `js/main.js` — reveal on scroll, typewriter, preview del agente
- `casos/` — subpáginas de case study (Norvell, Bone Mesh, Cardinova)
- `casos/agente/` — visuales animados de los 3 pasos del proceso (iframes)
- `propias/opt/` — imágenes optimizadas que usa el sitio

## Correr localmente

Cualquier servidor estático sirve. Por ejemplo:

```bash
python3 -m http.server 4180
# abrir http://localhost:4180
```

## Deploy

Ver [DEPLOY.md](DEPLOY.md). Resumen: push a GitHub → GitHub Pages (o Vercel) →
dominio `gritt.design`.

## Notas del MVP

- Imágenes de marca (Norvell, Voxen, etc.) son **piezas de demostración** propias.
- Reseñas, precios y algunos datos son **placeholder** — revisar antes del lanzamiento
  público (buscar "placeholder" en `index.html`).
