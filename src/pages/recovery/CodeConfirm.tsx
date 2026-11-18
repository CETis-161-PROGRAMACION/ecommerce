import { AuthLayout } from '@/components/layout/AuthLayout'


export function CodeConfirm() {  
  return (
    <AuthLayout title="Recuperar datos">
             <div>
            <a  className="flex justify-center m-4 font-bold text-xl"> Código de confirmación </a>
            </div>
            <div className="m-3 grid grid-cols-4 gap-x-8 gap-y-4">
                  <input type="text" placeholder="" className="w-full  text-center  rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden"></input>
                  <input type="text" placeholder="" className="w-full  text-center  rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden"></input>
                  <input type="text" placeholder="" className="w-full  text-center  rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden"></input>
                  <input type="text" placeholder="" className="w-full  text-center  rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden"></input>
            </div>

            <div className="flex justify-center m-6">
            <a   href="" type="button" className="w-50 rounded-full bg-blue-200 p-2 text-sm font-semibold text-black focus:outline-none focus:outline-2 focus:ring-offset-1 hover:bg-blue-300 text-center"> Confirmar Código </a>  
            </div>
    </AuthLayout>
  )
}
