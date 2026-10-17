import NavBar from "@/components/navbar/NavBar"


export function MenuPage() {
    return (
        <NavBar>
            <div className="flex flex-row md:flex-row items-start justify-between w-full py-6">
                <div className="flex items-start sticky top-10 self-start gap-6">
                    <img src="/src/assets/images/kundera_logo.png" alt="Logo de Kundera" className="w-36 h-36 rounded-full" />

                    <div className="flex flex-col items-center gap-2">
                        <span className="border border-line rounded-full px-6 py-1.5 text-base font-bold text-ink">
                            KUNDERA
                        </span>
                        <span className="text-sm font-semibold text-success">
                            Abierto
                        </span>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="flex flex-col items-center w-full max-w-md gap-4 border border-white">
                    <p>Este es el área del menú</p>

                </div>
            </div>
        </NavBar>
    )
}