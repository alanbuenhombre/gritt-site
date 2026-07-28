# Deploy — Gritt (gritt.design)

Sitio estático. Se puede publicar en **GitHub Pages** (gratis, recomendado para
empezar) o **Vercel** (mejor DX, pero el plan Hobby es no-comercial → Pro $20/mes
para un sitio de agencia).

---

## Antes de lanzar (checklist)

- [ ] Revisar textos "placeholder" en `index.html` (precios, reseñas).
- [ ] Confirmar que las imágenes de marca son las definitivas.
- [ ] Comprar el dominio **gritt.design**.

---

## Opción A — GitHub Pages (recomendada, gratis)

1. Crear repo en GitHub (ej. `gritt-site`) y hacer push:
   ```bash
   git remote add origin https://github.com/<usuario>/gritt-site.git
   git push -u origin main
   ```
2. En el repo: **Settings → Pages** → Source: `Deploy from a branch` → Branch:
   `main` / `/ (root)` → Save.
3. El archivo `CNAME` ya trae `gritt.design`, así que Pages tomará el dominio solo.
4. En tu registrador de dominio, configurar DNS:
   - **A records** de `gritt.design` → apuntar a las IPs de GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** de `www.gritt.design` → `<usuario>.github.io`
5. En Settings → Pages, activar **Enforce HTTPS** (tarda unos minutos en habilitarse).

## Opción B — Vercel

1. Push a GitHub (igual que arriba).
2. En Vercel: **Add New → Project → Import** el repo. Framework preset: **Other**
   (sin build, output = raíz). Deploy.
3. **Settings → Domains → Add** `gritt.design`.
4. Configurar DNS según indique Vercel (normalmente A `76.76.21.21` para el apex y
   CNAME `cname.vercel-dns.com` para `www`).
5. HTTPS automático.
   > Nota: el plan Hobby es para uso personal/no-comercial. Para un sitio comercial,
   > usar **Pro**. (El archivo `CNAME` es específico de GitHub Pages; Vercel lo ignora.)

---

## Actualizar el sitio (cualquier host)

Editar archivos → commit → push. El deploy es automático.

```bash
git add -A && git commit -m "update" && git push
```
