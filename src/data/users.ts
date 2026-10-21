import type { DemoUser } from '@/types'

/**
 * Usuarios de demostración. El acceso es local al navegador (modo demo):
 * no hay backend ni persistencia en servidor.
 */
export const demoUsers: DemoUser[] = [
  {
    id: 'usr-cliente',
    nombre: 'Michell Hernandez',
    telefono: '3332260919',
    contrasena: 'demo1234',
    rol: 'cliente',
  },
  {
    id: 'usr-repartidor',
    nombre: 'Carlos Ramírez',
    telefono: '3331122334',
    contrasena: 'demo1234',
    rol: 'repartidor',
  },
  {
    id: 'usr-admin',
    nombre: 'Ana Torres',
    telefono: '3335566778',
    contrasena: 'demo1234',
    rol: 'cliente',
  },
]

/** Credenciales que se muestran en pantalla para la demostración. */
export const DEMO_CREDENTIALS = {
  telefono: '3332260919',
  contrasena: 'demo1234',
}
