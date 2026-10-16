import NavBar from "@/components/navbar/NavBar";


export function AddressPage() {
    return (
        <NavBar>
            <div className="text-center justify-items-center-safe mb-8">
                <h2 className="uppercase font-bold text-gray-400">
                    web e-commerce
                </h2>

                <img src="/src/components/ui/icons/account.svg" alt="Foto de la cuenta" className="h-40 w-40 my-4 fill-current text-black" />

                <p className="capitalize text-2xl font-bold">ingresar dirección</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-7 p-2">
                {/* Primera parte */}
                <div className="w-full flex flex-col">
                    <InputLarge title="Código Postal" />
                    <InputLarge title="Calle" />

                    <button className="bg-blue-200 rounded-2xl text-black text-sm py-2 px-4 self-end w-60 mt-4">
                        Ir al Mapa
                    </button>
                </div>

                {/*? Segunda parte */}
                <div className="w-full flex flex-col">
                    <div className="grid grid-cols-2 gap-4">
                        <InpulShort title="Numero Exterior" />
                        <InpulShort title="Numero Interior" />
                    </div>

                    <InputLarge title="Referencias" />

                    <button className="bg-blue-200 rounded-2xl text-black text-sm py-2 px-4 self-start w-60 mt-4">
                        Continuar
                    </button>
                </div>
            </div>
        </NavBar>
    )
}


interface ComponenteInputProps {
    title: string
}

function InputLarge({title}: ComponenteInputProps) {
    return (
        <div className="my-4 mr-24">
            <p className="text-lg">{title}</p>
            <input type="text" className="h-12 w-full border border-blue-400" />
        </div>
    )
}

function InpulShort({title}: ComponenteInputProps) {
    return (
        <div className="my-4 mr-10">
            <p className="text-lg">{title}</p>
            <input type="text" className="h-12 w-full border border-blue-400" />
        </div>
    )
}