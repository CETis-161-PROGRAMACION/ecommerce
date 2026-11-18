import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES } from '@/router/routes'
import { SERVICE_FEE } from '@/services/order/orderDetails'
import { formatPrice } from '@/utils/currency'

interface Question {
  question: string
  answer: string
}

const QUESTIONS: readonly Question[] = [
  {
    question: '¿Cómo hago un pedido?',
    answer:
      'Elige un producto en el inicio, agrégalo y revisa tu pedido. Indica si lo quieres a domicilio o para recoger en la sucursal, elige tu forma de pago y confirma. Necesitas tener una cuenta con sesión iniciada.',
  },
  {
    question: '¿Qué formas de pago hay?',
    answer:
      'Efectivo o tarjeta contra entrega: pagas cuando recibes o recoges tu pedido. La aplicación no te pide ni guarda datos de tu tarjeta.',
  },
  {
    question: '¿Hay algún cargo adicional?',
    answer: `Se agrega un cargo de servicio de ${formatPrice(SERVICE_FEE)} por cada negocio del pedido. Lo ves desglosado antes de confirmar.`,
  },
  {
    question: '¿Puedo cancelar mi pedido?',
    answer:
      'Sí, mientras siga en "Esperando repartidor". Entra a Pedidos Recientes, abre el pedido y cancélalo desde ahí. Cuando un repartidor lo acepta ya no se puede cancelar.',
  },
  {
    question: '¿Cómo sigo mi pedido?',
    answer:
      'En la pantalla de seguimiento ves el estado y se actualiza sola cada pocos segundos. Cuando un repartidor lo acepta puedes ver su nombre y teléfono y escribirle por el chat del pedido.',
  },
  {
    question: '¿Por qué un producto ya no está disponible?',
    answer:
      'Los productos tienen existencias limitadas y una fecha de caducidad. Si alguien más compra la última pieza o el producto caduca antes de que confirmes, te avisamos y tienes que quitarlo del pedido.',
  },
  {
    question: 'Olvidé mi contraseña',
    answer:
      'En la pantalla de inicio de sesión toca "¿Olvidaste tu contraseña?", escribe tu correo y te enviamos un código para crear una nueva.',
  },
  {
    question: '¿Cómo me vuelvo repartidor?',
    answer:
      'En el menú elige "Iniciar como repartidor" y regístrate. Te pedimos tu vehículo y una foto de tu licencia. Tu solicitud se revisa, y hasta que te aprueben no puedes ver ni aceptar pedidos.',
  },
]

export function HelpPage() {
  return (
    <NavBar mainClassName="max-w-2xl" backTo={ROUTES.home}>
      <h1 className="mb-2 text-2xl font-bold text-ink">Ayuda</h1>
      <p className="mb-6 text-sm text-ink-muted">
        Respuestas a las dudas más comunes.
      </p>

      <div className="flex flex-col gap-3">
        {QUESTIONS.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-line bg-surface px-4 py-3"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-ink-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
                >
                  ▾
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-muted">
        ¿Tu duda no está aquí? Esta aplicación es un proyecto escolar del
        CETis 161; consulta con el equipo responsable del proyecto. También
        puedes revisar el{' '}
        <Link
          to={ROUTES.privacy}
          className="font-semibold text-brand-400 underline underline-offset-2"
        >
          aviso de privacidad
        </Link>
        .
      </p>
    </NavBar>
  )
}
