import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Política de Privacidad</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">Última actualización: 1 de mayo de 2024</p>
        </div>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">1. Introducción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              En Brinda X, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta Política
              de Privacidad describe cómo recopilamos, utilizamos y compartimos tu información cuando utilizas nuestros
              servicios.
            </p>
            <p className="text-white/80">
              Al utilizar nuestros servicios, aceptas las prácticas descritas en esta Política de Privacidad. Si no
              estás de acuerdo con esta política, por favor no utilices nuestros servicios.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">2. Información que Recopilamos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">Podemos recopilar los siguientes tipos de información:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>
                <span className="font-medium text-white">Información de registro:</span> Cuando te registras en nuestros
                servicios, podemos recopilar tu nombre, dirección de correo electrónico, número de teléfono y otra
                información de contacto.
              </li>
              <li>
                <span className="font-medium text-white">Contenido generado por el usuario:</span> Cualquier contenido
                que crees, compartas o publiques a través de nuestros servicios, incluyendo texto, imágenes, videos y
                audio.
              </li>
              <li>
                <span className="font-medium text-white">Información de uso:</span> Datos sobre cómo interactúas con
                nuestros servicios, incluyendo las funciones que utilizas, el tiempo que pasas en nuestros servicios y
                tu historial de navegación.
              </li>
              <li>
                <span className="font-medium text-white">Información del dispositivo:</span> Datos sobre el dispositivo
                que utilizas para acceder a nuestros servicios, incluyendo el modelo de hardware, sistema operativo,
                identificadores únicos de dispositivo y datos de red móvil.
              </li>
              <li>
                <span className="font-medium text-white">Información de ubicación:</span> Con tu consentimiento, podemos
                recopilar y procesar información sobre tu ubicación exacta.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">3. Cómo Utilizamos tu Información</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">Utilizamos la información que recopilamos para:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
              <li>Personalizar tu experiencia y ofrecerte contenido y funciones relevantes.</li>
              <li>Procesar transacciones y enviar notificaciones relacionadas.</li>
              <li>Comunicarnos contigo, incluyendo para fines de servicio al cliente, actualizaciones y marketing.</li>
              <li>Entender cómo utilizas nuestros servicios para mejorarlos.</li>
              <li>Detectar, investigar y prevenir actividades fraudulentas y no autorizadas.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">4. Compartir tu Información</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">Podemos compartir tu información en las siguientes circunstancias:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>
                <span className="font-medium text-white">Con otros usuarios:</span> Cuando publicas contenido o
                interactúas con otros usuarios, cierta información puede ser visible para ellos.
              </li>
              <li>
                <span className="font-medium text-white">Con proveedores de servicios:</span> Compartimos información
                con proveedores de servicios que realizan servicios en nuestro nombre.
              </li>
              <li>
                <span className="font-medium text-white">Con socios comerciales:</span> Podemos compartir información
                con nuestros socios comerciales para ofrecerte ciertos productos, servicios o promociones.
              </li>
              <li>
                <span className="font-medium text-white">Por razones legales:</span> Podemos divulgar información si
                creemos de buena fe que es necesario para cumplir con una obligación legal, proteger nuestros derechos o
                los derechos de otros, o investigar posibles violaciones de nuestros términos.
              </li>
              <li>
                <span className="font-medium text-white">Con tu consentimiento:</span> Podemos compartir información con
                terceros cuando nos das tu consentimiento para hacerlo.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">5. Tus Derechos y Opciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Dependiendo de tu ubicación, puedes tener ciertos derechos con respecto a tus datos personales,
              incluyendo:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Acceder a tus datos personales.</li>
              <li>Corregir datos inexactos o incompletos.</li>
              <li>Eliminar tus datos personales.</li>
              <li>Restringir u oponerte al procesamiento de tus datos.</li>
              <li>Solicitar la portabilidad de tus datos.</li>
              <li>Retirar tu consentimiento en cualquier momento.</li>
            </ul>
            <p className="text-white/80 mt-4">
              Para ejercer estos derechos, por favor contáctanos a través de privacy@brindax.com.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">6. Seguridad de Datos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales
              contra el acceso no autorizado, la divulgación, la alteración y la destrucción. Sin embargo, ningún
              sistema de seguridad es impenetrable y no podemos garantizar la seguridad absoluta de tu información.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">7. Retención de Datos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Conservamos tus datos personales durante el tiempo necesario para cumplir con los fines descritos en esta
              Política de Privacidad, a menos que se requiera o permita un período de retención más largo por ley.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">8. Cambios a esta Política</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio
              material publicando la nueva Política de Privacidad en esta página y, si los cambios son significativos,
              te proporcionaremos una notificación más prominente.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">9. Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos a privacy@brindax.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
