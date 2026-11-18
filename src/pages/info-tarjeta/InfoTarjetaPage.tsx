import NavBar from "@/components/navbar/NavBar"
import { ROUTES } from "@/router/routes"



export function InfoTarjetaPage() {
  return (
    <NavBar>
    <div className="flex flex-col items-center justify-center gap-4">
    <p className="text-xl font-bold text-gray-400 mt-4">WEB E-COMMERCE</p>
    
    <svg className="w-35 h-35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48px" width="48px" fill="#6a7282"><path d="M18.6,21.85q-2.1-2.1-2.1-5.4t2.1-5.4T24,8.95t5.4,2.1t2.1,5.4t-2.1,5.4T24,23.95t-5.4-2.1ZM8,40V35.3q0-1.9 0.95-3.25T11.4,30q3.35-1.5 6.42-2.25T24,27t6.15,0.77T36.55,30q1.55,0.7 2.5,2.05T40,35.3V40H8Zm3-3H37V35.3q0-0.8-0.48-1.52T35.35,32.7q-3.2-1.55-5.85-2.13T24,30t-5.55,0.57T12.6,32.7q-0.7,0.35-1.15,1.07T11,35.3V37ZM27.23,19.67q1.27-1.27 1.27-3.22t-1.27-3.22T24,11.95t-3.22,1.28T19.5,16.45t1.28,3.22T24,20.95t3.23-1.28ZM24,16.45ZM24,37Z"/></svg>
    <p className="text-3xl font-bold">Información de la tarjeta</p>
    </div>
    
    <div className="flex flex-row">
    <div className="w-3/5 m-4">
    
    <p className="mb-3">Número de tarjeta</p>
    <input type="tel" placeholder="" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />
    
    <div className="flex flex-row">
    <div className="flex flex-col w-full gap-4 mr-2">
      <p className="w-full text-start">Fecha de vencimiento</p>
      <input type="date" placeholder="MM/AA" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />
    
    </div>
    
    <div className="flex flex-col gap-4 ml-2">
    <p className="w-full text-start">NIP</p>
    
    <div className="flex gap-3">
    <input type="number" placeholder=""  className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />
    <input type="number" placeholder="" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />
    <input type="number" placeholder="" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />
    </div>
    </div>
    </div>
    </div>
    
    <div className="w-2/5 m-4 justify-center items-center flex ">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-50 h-50 text-gray-500 bi bi-credit-card-2-front" viewBox="0 0 16 16">
    <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
    <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
    </svg>
    </div>
    
    </div>
    
    <a type="button" href={ROUTES.home} className="flex w-3/4 rounded-full border-line text-center text-gray-950 px-10 p-2 mx-auto bg-blue-200 justify-center"> Realizar Pago </a>
    </NavBar>
  )
}
