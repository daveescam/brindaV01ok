import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Terminos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Términos y Condiciones</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">Última actualización: 1 de mayo de 2024</p>
        </div>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">1. Introducción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Bienvenido a Brinda X. Estos Términos y Condiciones rigen tu uso de nuestra plataforma, aplicación móvil y
              servicios relacionados (colectivamente, los "Servicios").
            </p>
            <p className="text-white/80">
              Al acceder o utilizar nuestros Servicios, aceptas estar sujeto a estos Términos. Si no estás de acuerdo
              con estos Términos, no debes acceder ni utilizar nuestros Servicios.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">2. Uso de los Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Nuestros Servicios están diseñados para proporcionar experiencias interactivas en bares, restaurantes,
              eventos y otros espacios. Al utilizar nuestros Servicios, aceptas:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Proporcionar información precisa y completa cuando se te solicite.</li>
              <li>Mantener la confidencialidad de cualquier credencial de acceso.</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.</li>
              <li>Ser responsable de todas las actividades que ocurran bajo tu cuenta.</li>
              <li>Cumplir con todas las leyes y regulaciones aplicables.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">3. Contenido del Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Nuestros Servicios permiten a los usuarios generar, compartir y publicar contenido, incluyendo texto,
              imágenes, videos y audio (el "Contenido del Usuario").
            </p>
            <p className="text-white/80 mb-4">
              Al enviar Contenido del Usuario a través de nuestros Servicios, nos otorgas una licencia mundial, no
              exclusiva, libre de regalías, sublicenciable y transferible para usar, reproducir, distribuir, preparar
              trabajos derivados, mostrar y ejecutar dicho Contenido del Usuario en relación con los Servicios y el
              negocio de Brinda X.
            </p>
            <p className="text-white/80">
              Eres el único responsable de tu Contenido del Usuario y las consecuencias de publicarlo. No respaldamos
              ningún Contenido del Usuario ni opiniones, recomendaciones o consejos expresados en el mismo.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">4. Conducta Prohibida</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">Al utilizar nuestros Servicios, aceptas no:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>
                Publicar contenido que sea ilegal, ofensivo, difamatorio, obsceno o que viole los derechos de terceros.
              </li>
              <li>Utilizar nuestros Servicios para cualquier propósito ilegal o no autorizado.</li>
              <li>Interferir o interrumpir los Servicios o servidores o redes conectadas a los Servicios.</li>
              <li>
                Intentar acceder a áreas o características de los Servicios a las que no tienes acceso autorizado.
              </li>
              <li>
                Utilizar los Servicios de manera que pueda dañar, deshabilitar, sobrecargar o deteriorar los Servicios.
              </li>
              <li>Utilizar cualquier robot, spider, crawler u otro medio automatizado para acceder a los Servicios.</li>
              <li>Recopilar o almacenar información personal de otros usuarios sin su consentimiento.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">5. Propiedad Intelectual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Todos los derechos, títulos e intereses en y para los Servicios, incluyendo todo el contenido, diseño,
              gráficos, interfaces y código, así como la selección y disposición de los mismos, son propiedad exclusiva
              de Brinda X o sus licenciantes.
            </p>
            <p className="text-white/80">
              Nuestros logotipos, nombres de productos y servicios, y diseños son marcas comerciales de Brinda X. No
              puedes utilizar estas marcas sin nuestro previo consentimiento por escrito.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">6. Privacidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad para obtener
              información sobre cómo recopilamos, utilizamos y divulgamos información sobre ti.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">7. Limitación de Responsabilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              En la medida máxima permitida por la ley aplicable, Brinda X no será responsable por daños indirectos,
              incidentales, especiales, consecuentes o punitivos, o cualquier pérdida de beneficios o ingresos, ya sea
              incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas
              intangibles.
            </p>
            <p className="text-white/80">
              En ningún caso la responsabilidad agregada de Brinda X por todas las reclamaciones relacionadas con los
              Servicios excederá la cantidad mayor entre cien dólares ($100) o la cantidad que hayas pagado a Brinda X
              en los últimos seis meses por los Servicios.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">8. Indemnización</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Aceptas indemnizar, defender y mantener indemne a Brinda X y sus afiliados, funcionarios, agentes,
              empleados y socios de y contra cualquier reclamación, responsabilidad, daño, pérdida y gasto, incluyendo,
              sin limitación, costos legales y contables razonables, que surjan de o estén relacionados de alguna manera
              con tu acceso o uso de los Servicios, tu Contenido del Usuario o tu violación de estos Términos.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">9. Modificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en
              cualquier momento. Si una revisión es material, proporcionaremos al menos 30 días de aviso antes de que
              los nuevos términos entren en vigor. Lo que constituye un cambio material será determinado a nuestra sola
              discreción.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">10. Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Si tienes alguna pregunta sobre estos Términos, por favor contáctanos a legal@brindax.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
