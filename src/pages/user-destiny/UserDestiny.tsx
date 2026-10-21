import NavBar from '@/components/navbar/NavBar'

export function UserDestiny() {
  return (
    <NavBar>
      <div className="text-center justify-items-center-safe mb-8">
        <h2 className="uppercase font-bold text-gray-400">web e-commerce</h2>

        <img
          src="/src/components/ui/icons/account.svg"
          alt="Foto de la cuenta"
          className="h-40 w-40 my-4 fill-current text-black"
        />

        <p className="capitalize text-2xl font-bold">ingresar datos</p>
      </div>

      <div className="w-full px-60">
        <div className="w-full flex flex-col">
          <InputLarge title="Nombre del destinatario" />
          <InputLarge title="Telefono" />

          <button className="bg-blue-200 rounded-2xl text-black text-sm py-2 px-4 self-center w-60 mt-4">
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

function InputLarge({ title }: ComponenteInputProps) {
  return (
    <div className="my-4">
      <p className="text-lg font-bold">{title}</p>
      <input
        type="text"
        className="h-12 w-full border border-blue-400 rounded-lg"
      />
    </div>
  )
}
