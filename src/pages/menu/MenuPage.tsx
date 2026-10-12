import NavBar from "@/components/navbar/NavBar"


export function MenuPage() {
    return (
        <>
            <NavBar>
                <img src="/src/assets/images/kundera_logo.png" alt="Logo de Kundera" className="mb-10 rounded-full" height="150px" width="150px" />

                <p className="text-2xl font-bold border-white border w-fit p-2 rounded-2xl">Kundera</p>
            </NavBar>
        </>
    )
}