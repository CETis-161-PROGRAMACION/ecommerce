import type { ReactNode } from "react";

interface NavBarProps {
    children: ReactNode
}

export default function NavBar ({children}: NavBarProps) {
    return (
        <div className="flex min-h-screen flex-col items-center px-6 py-10 motion-safe:animate-page-enter">
            <header className="mb-10 flex justify-evenly w-full px-24 max-w gap-4">
                <img src="/src/components/ui/icons/menu.svg" width={40} height={40} className="mr-20"/>

                <img src="/src/components/ui/icons/search.svg" alt="" height={38} width={38} />

                <input type="search" name="search" id="" placeholder="Buscar..." className="border border-line rounded p-2 text-sm leading-relaxed text-ink w-full" />

                <img src="/src/components/ui/icons/person.svg" alt="" height={38} width={38} className="ml-12" />

            </header>
            <main className="w-full max-w-4xl">{children}</main>
        </div>
    )
}