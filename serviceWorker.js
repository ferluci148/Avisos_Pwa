const staticServicios = "servicios-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/imagenes/Logop.png",
  "/imagenes/LogoPlantilla.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticServicios).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })