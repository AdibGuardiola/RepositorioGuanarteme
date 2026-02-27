'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Calendar, Image as ImageIcon, Newspaper, Info, Moon, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type TabType = 'autor' | 'proyecto' | 'cronograma' | 'galeria' | 'noticias';

export default function Home() {
    const [activeTab, setActiveTab] = useState<TabType>('autor');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero animations
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 100,
                duration: 1.2,
                ease: 'power3.out',
            });

            gsap.from(subtitleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
            });

            gsap.from(imageRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 1.5,
                delay: 0.5,
                ease: 'power3.out',
            });

            // Scroll-triggered animations for sections
            gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
                gsap.from(section, {
                    opacity: 0,
                    y: 80,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1,
                    },
                });
            });
        }, heroRef);

        return () => ctx.revert();
    }, [activeTab]);

    const tabs = [
        { id: 'autor', label: 'Guanarteme y el autor', icon: Info },
        { id: 'proyecto', label: 'Proyecto', icon: Info },
        { id: 'cronograma', label: 'Cronograma Histórico', icon: Calendar },
        { id: 'galeria', label: 'Galería de Fotos', icon: ImageIcon },
        { id: 'noticias', label: 'Noticias', icon: Newspaper },
    ] as const;

    return (
        <div ref={heroRef} className={`min-h-screen transition-colors duration-500 ${theme === 'dark'
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800'
            : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200'
            }`}>
            {/* Navigation Tabs */}
            <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${theme === 'dark'
                ? 'bg-slate-950/80 border-slate-800/50'
                : 'bg-white/80 border-slate-300/50'
                }`}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-4 relative">
                        {/* Theme Toggle - positioned absolutely on the right */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`p-3 rounded-xl transition-all duration-300 ${theme === 'dark'
                                    ? 'bg-slate-800/50 text-amber-400 hover:bg-slate-700/70 hover:text-amber-300'
                                    : 'bg-slate-200/50 text-amber-600 hover:bg-slate-300/70 hover:text-amber-700'
                                    }`}
                                title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Centered Navigation Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as TabType)}
                                        className={`
                                            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                                            ${isActive
                                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                                                : theme === 'dark'
                                                    ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/70 hover:text-white'
                                                    : 'bg-slate-200/50 text-slate-700 hover:bg-slate-300/70 hover:text-slate-900'
                                            }
                                        `}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                        <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Tab Content */}
            <div className="container mx-auto px-4 py-8">
                {activeTab === 'autor' && <AutorTab titleRef={titleRef} subtitleRef={subtitleRef} imageRef={imageRef} />}
                {activeTab === 'proyecto' && <ProyectoTab />}
                {activeTab === 'cronograma' && <CronogramaTab />}
                {activeTab === 'galeria' && <GaleriaTab />}
                {activeTab === 'noticias' && <NoticiasTab />}
            </div>

            {/* Footer */}
            <footer className="py-12 px-4 bg-slate-950/80 border-t border-slate-800">
                <div className="container mx-auto text-center">
                    <p className="text-slate-400 text-sm">
                        Portal dedicado a la memoria y recuperación del barrio histórico de Guanarteme
                    </p>
                </div>
            </footer>
        </div>
    );
}

// Tab 1: Origen del Autor y Guanarteme
function AutorTab({ titleRef, subtitleRef, imageRef }: any) {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/gallery/anos40/1320411257.jpg')] bg-cover bg-center bg-no-repeat opacity-20 filter grayscale blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/60 z-10"></div>

                <div className="container mx-auto relative z-20 gap-12 items-center flex flex-col pt-12">
                    <div className="text-center space-y-6 max-w-4xl mx-auto">
                        <h1
                            ref={titleRef}
                            className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-orange-400 to-amber-600 tracking-tighter drop-shadow-2xl"
                        >
                            GUANARTEME
                        </h1>
                        <h2 className="text-3xl md:text-5xl text-amber-300/80 font-serif italic tracking-wide">
                            por Leandro Perdomo
                        </h2>

                        <div
                            ref={subtitleRef}
                            className="inline-block mt-8 border border-amber-500/30 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-amber-900/20"
                        >
                            <p className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-3">Publicado en Falange: 5-5-1954</p>
                            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed text-center italic">
                                "Guanarteme es, sencillamente, el barrio más importante que tiene la ciudad. Más que barrio, prolongación, proyección del apretado casco porteño."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artículo Section */}
            <section className="fade-in-section relative z-30 -mt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-800/80 backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] border border-slate-700/50 shadow-2xl relative">
                        {/* Quotes decoration */}
                        <div className="absolute top-10 left-8 md:left-12 text-6xl text-amber-500/20 font-serif">"</div>

                        <div className="space-y-8 text-lg md:text-xl text-slate-300 leading-[1.8] text-justify font-serif relative z-10">

                            <p className="drop-cap first-letter:text-6xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-3 first-letter:float-left">
                                Arenas solitarias, movedizas; arenas blancas, rubias, con reminiscencias africanas y fallidos deseos de playa y monte, esas arenas que enmarcan el populoso barrio industrial. Ni playa, con sus bañistas, ni verde monte. Guanarteme es, sencillamente, el barrio más importante que tiene la ciudad. Más que barrio, prolongación, proyección del apretado casco porteño. No tiene historia. Una casa humilde, y otra luego y otra; hasta que empezaron las fábricas a empinar sus chimeneas, las factorías a aventar sus nauseabundos olores y la Cicer a ennegrecer las albas arenas que quisieron ser playa. Cuando la proyectada Avenida Marítima alcance el término marcado, remontado Italcable, Guanarteme al fin quedará incorporado a la categoría estival que ostenta las Canteras; pero sus contornos marinos habrán de ser ciertamente remozados, higiénicamente removidos. Esto todos lo saben. Y eso se verá, dentro de años.
                            </p>

                            <p>
                                Guanarteme, simplemente, es un barrio de trabajadores, de obreros, de pobres. No tiene de qué jactarse. Fue declarado zona industrial y allí se admiten toda clase de ruidos y olores. Casas, muchas casas terreras con cabra y gallinero en lo alto, calles polvorientas y muchas fábricas, una iglesia, un "cine" y un cementerio. Eso es Guanarteme, sin un árbol; un pueblo que no tiene tradición y sí bares y tiendas a porfía. Tiene, también, un barranco sucio y seco, con su fuente, y sus perros vagabundos aullando en las orillas.
                            </p>

                            <div className="py-6 flex justify-center">
                                <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                            </div>

                            <p>
                                Guanarteme, que es hoy lo que es y nada más, tuvo al futuro apuñado en su mano. La aviación tardó y la gran estación aérea de la isla, que debió nacer junto al mar y junto a la ciudad, fue desplazada hacia el sur, a muchos kilómetros. Porque el primer avión que tomó tierra insular lo hizo en Guanarteme. Allí, y como queriendo eternizar la memoria, fue pronunciada la palabra magnífica que yo no sé, no me lo explico, como no ha sido incorporada al léxico militar en su más genuina expresión de mando. Fue Gabino, cabo veterano en funciones de guardia municipal, quien lanzó a los cuatro vientos el magnífico vocablo.
                            </p>

                            <div className="bg-slate-900/50 p-8 rounded-2xl border-l-4 border-amber-500 text-amber-100 my-8 italic text-xl">
                                El artefacto (parece) se acercaba bajo, muy bajo y ya el público iba a dispersarse sintiendo el temor, cuando Gabino, adelantándose a los grupos, impuso el orden y la tranquilidad con su tajante: <strong className="text-amber-400 font-bold block mt-2 text-2xl">¡Atórrense!</strong>
                            </div>

                            <p>
                                Como obedeciendo a una orden suprema, autoridades y público quedaron al instante "cuerpo a tierra", y allí no ha pasado nada. Yo no sé, no me lo explico, como esta vieja y arcaica expresión, no ha sido sustituida por el tajante "atórrense" de Gabino, cabo veterano en funciones de guardia municipal que debió ser, sin demora, ascendido por lo menos a Sargento y que murió, ya anciano, de simple guardia.
                            </p>

                            <p>
                                La barriada de Guanarteme tiene una peculiar fisonomía. No es como otros barrios, también pobres, donde lo vulgar por lo bajo impera. Guanarteme, que no tiene historia ni pasado, tiene su orgullo. Con sus calles sin asfaltos, con su barranco yerto y sus fuentes sin agua, resiste al tiempo y espera, porque sabe de su importancia económica. Ya el solar, que hasta hace unos años se regalaba casi, cotiza cifras parejas a céntricos sectores de la urbe.
                            </p>

                            <p>
                                Guanarteme es más bien rústico que marinero. Algún pescador de caña y algún vendedor de pescado son sus aficiones a la mar. En cambio cabreros, tratantes en bestias y negociantes en cereales y otros productos agrícolas, sobresalen en la mixta etnografía del barrio. Familias enteras, emigradas de Lanzarote y Fuerteventura, en los diversos tiempos fueron cimentando la actual fisonomía. Por eso Guanarteme guarda en su inquietud ciudadana y comercial el aliento sencillo del alma campesina. Allí, el timple suena con el runruneo elemental del viento montañero, y la guitarra, nostálgica de eras y vendimias, evoca en los portales los apacibles días de sol y las noches estrelladas del campo abierto. Una folía en Guanarteme suena a campo, a montaña, a volcán, a cielo y tierra fecunda. La folía que canta el roncote es distinta completamente.
                            </p>

                            <div className="py-6 flex justify-center">
                                <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                            </div>

                            <p>
                                Residuos de un hacer campesino, el oficio de carrero. En Guanarteme hay muchos carros. Rodando por la ciudad, en medio del motorizado devaneo, el carro de Guanarteme es yunta que ara o al menos así debe parecerle al carrero, nieto de aquel rudo labrador emigrado, que labró la tierra en Lanzarote y Fuerteventura, y que seguramente, nunca tuvo burro ni vacas ni camello.
                            </p>

                            <p>
                                En Guanarteme también hay camellos. Los camellos vienen en el correíllo, de África, saltan por Santa Catalina y van a parar a Guanarteme. De aquí los camellos son llevados por tratantes expertos a las islas menores, de donde muchos, ya viejos y quizás enfermos, hacen su último viaje: el de la batata. Y aquí éstos viejos dromedarios vencidos se quedan, vendidos unos, tratados otros, siempre con ventaja. Pero a más de todas estas cosas (barranco, fábricas, carros, tratantes, burros, camello...) para comprender bien a Guanarteme hay que sacarle la baraja.
                            </p>

                            <p>
                                Guanarteme -lo ha sido siempre— es un barrio barajero. Gitanos y gitanas, que no se sabe de dónde vienen, en Guanarteme dan con los huesos, y allí echan la baraja. También, la baraja, la tallan otros que no son gitanos. El clásico envite, el subastado y la sanga —y otros juegos— hicieron del pobre Cristóbal un hombre infeliz. Pero Cristóbal, que fue rico varias veces, decía de Guanarteme que era estupendo, único sitio en Canarias donde se jugaba con ley, "a suerte y verdad", sin trampas, sin chanchullos. Mas... que el pobre Cristóbal dijo esto ya va para veinte años. Y el pobre Cristóbal murió escurrido.
                            </p>

                            <p>
                                ¿Hay algo más, acaso, que se pueda decir de Guanarteme?.. Yo lo pongo en duda. Puedo decir que me he paseado por Guanarteme a cualquier hora de la noche y he visto, sí, un pueblo que duerme a pierna suelta y cuyo músculo exhausto descansa confiado en la fuerza única del viejo sereno; y éste, también, como conoce a su gente cuando le llegan las ganas se encapota... naturalmente, descabeza un sueñito.
                            </p>

                            <p className="text-2xl font-semibold text-amber-300 mt-12 pb-8 border-b border-slate-700">
                                Ojalá fueran todos los barrios, de noche y de día, como este barrio porteño, que pudo ser espléndido aeródromo y es lo que es: el barrio más importante, más sano, más laborioso y más tranquilo de la urbe...
                            </p>

                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/50 relative">
                                        <img src="/images/Leandro.png" alt="Leandro Perdomo" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-amber-400 font-bold">Leandro Perdomo</p>
                                        <p className="text-slate-500 text-sm">Cronista de Canarias</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 italic">5 de mayo de 1954</p>
                                    <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">FALANGE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Tab 2: Proyecto - Recuperación de la memoria de Guanarteme
function ProyectoTab() {
    return (
        <div className="space-y-16 py-12">
            <section className="fade-in-section">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-amber-300 mb-8 text-center leading-tight">
                        De atrás pa' lante: Cultura e identidades en los centros escolares de Canarias
                    </h2>

                    <div className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50 mb-12">
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p className="text-justify">
                                El 19 de marzo de 2025 el arqueólogo <strong className="text-amber-300">José de León Hernández</strong> (exdirector del proyecto de Patrimonio Mundial de Risco Caído y las Montañas Sagradas de Gran Canaria) visitó nuestro centro, dentro del marco del proyecto <em>De atrás pa' lante. Cultura e identidades en los centros escolares de Canarias</em>.
                            </p>
                            <p className="text-justify">
                                Dicha actividad nos sirvió como inicio, motor y fundación para nuestro programa patrimonial de centro. Nuestro objetivo es poner en valor el patrimonio material e inmaterial que rodea a nuestro instituto y del cual procede la gran mayoría de nuestro alumnado (Guanarteme, Costa Ayala, Casa Ayala, Ladera Alta, Los Giles y las zonas aledañas a los barrancos de La Ballena y El Rincón). Teniendo como actividad estrella una réplica de la actividad realizada por José De León en el año 2025 que explicaremos a continuación.
                            </p>
                            <p className="text-justify">
                                Se busca que nuestro alumnado sea plenamente consciente de su pasado más cercano y de cómo le condiciona en la actualidad para crecer como individuos y sociedad activa y crítica que valora todo lo relativo a la cuestión patrimonial tanto natural como cultural e histórica. Por ello, hemos decidido crear está página web entre otras cuestiones que nos sirve como eje vertebrador de nuestra propuesta y en la cual creceremos en este sentido. Asimismo estamos elaborando otras herramientas que complementan al proyecto.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-950/40 to-blue-900/30 backdrop-blur-sm p-10 rounded-2xl border border-cyan-700/30">
                        <h4 className="text-3xl font-bold text-cyan-300 mb-6 font-serif italic">La Actividad Estrella</h4>
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p className="text-justify">
                                Solamente para que se entienda exponemos a continuación la actividad realizada por José de León junto a distintos profesores y alumnado de centro en el curso 2024/2025 y que pretendemos volver a replicar en cursos venideros, adaptándonos al contexto de cada grupo clase y alumnado que participe:
                            </p>
                            <p className="text-justify">
                                La actividad constó de dos partes. Una primera donde José de León realizó una <strong className="text-cyan-400">ponencia en el salón de actos</strong> del centro con todos los grupos implicados (De 8:00 a 9:00 horas). El arqueólogo explicó, partiendo de lo general para llegar a lo concreto, la historia y cultura de Canarias y su aplicación en el entorno del centro.
                            </p>
                            <p className="text-justify">
                                En la segunda parte, sobre las 9:00 de la mañana, se realizó una <strong className="text-cyan-400">salida de campo</strong> que llevó al alumnado por el Barranco de Guanarteme, en las cercanías del instituto, hasta la explanada que queda justo debajo del barrio de Los Giles. En ella se explicó en detalle cuestiones de tipo histórico, etnográfico, geológico, ecológico y cultural conectadas con la realidad de dicho barranco, el barrio de Guanarteme, la ciudad de Las Palmas de Gran Canaria o el barrio de Los Giles.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Participación */}
            <section className="fade-in-section pb-12">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-3xl font-bold text-amber-300 mb-8 text-center">Un Enfoque Interdisciplinar</h3>
                    <p className="text-slate-300 text-lg text-center mb-10">
                        Esta actividad se enmarca en un proyecto financiado por el Gobierno de Canarias que ha contado con la participación de la <strong className="text-amber-300">Coordinación de Patrimonio del IES El Rincón</strong>, además de distintas materias y grupos. La actividad fue de naturaleza interdisciplinar, trabajándose en las semanas previas y posteriores a la salida con el arqueólogo.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Grupos */}
                        <div className="bg-slate-800/40 p-8 rounded-2xl border border-amber-500/20 h-full flex flex-col">
                            <div>
                                <h4 className="flex items-center gap-3 text-2xl font-bold text-amber-400 mb-6">
                                    <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">👥</span>
                                    Grupos Implicados
                                </h4>
                                <ul className="space-y-3 text-lg text-slate-300 font-medium mb-10">
                                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> 1º Bachillerato A</li>
                                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> 3º ESO B</li>
                                    <li className="flex items-center gap-2"><span className="text-amber-500">•</span> 3º ESO C</li>
                                </ul>
                            </div>

                            {/* Image Placeholders */}
                            <div className="mt-auto flex flex-col gap-4 flex-1 pt-4">
                                <div className="flex-1 w-full bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-inner flex flex-col items-center justify-center min-h-[140px] transition-colors hover:bg-slate-800/60 group">
                                    <span className="text-amber-500/30 text-3xl mb-2 group-hover:scale-110 transition-transform">📷</span>
                                    <span className="text-slate-500 font-medium text-sm text-center">Foto 1º Bachillerato A<br /><span className="text-xs font-light opacity-70">(Próximamente)</span></span>
                                </div>
                                <div className="flex-1 w-full bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-inner flex flex-col items-center justify-center min-h-[140px] transition-colors hover:bg-slate-800/60 group">
                                    <span className="text-amber-500/30 text-3xl mb-2 group-hover:scale-110 transition-transform">📷</span>
                                    <span className="text-slate-500 font-medium text-sm text-center">Foto 3º ESO B<br /><span className="text-xs font-light opacity-70">(Próximamente)</span></span>
                                </div>
                                <div className="flex-1 w-full bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-inner flex flex-col items-center justify-center min-h-[140px] transition-colors hover:bg-slate-800/60 group">
                                    <span className="text-amber-500/30 text-3xl mb-2 group-hover:scale-110 transition-transform">📷</span>
                                    <span className="text-slate-500 font-medium text-sm text-center">Foto 3º ESO C<br /><span className="text-xs font-light opacity-70">(Próximamente)</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Materias */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                                <h4 className="text-xl font-bold text-cyan-300 mb-3">Geografía e Historia (3º ESO)</h4>
                                <p className="text-slate-400 text-base leading-relaxed">
                                    La historia de la economía en Canarias desde el mundo previo a la llegada de los Europeos hasta la actualidad, además de su vinculación con el entorno cercano al centro.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                                <h4 className="text-xl font-bold text-cyan-300 mb-3">Historia de Canarias (3º ESO)</h4>
                                <p className="text-slate-400 text-base leading-relaxed">
                                    Visión general a nivel geográfico, natural, histórico y cultural de Canarias como contexto teórico y práctico para la actividad.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                                <h4 className="text-xl font-bold text-amber-300 mb-3">Matemáticas (3º ESO)</h4>
                                <p className="text-slate-400 text-base leading-relaxed">
                                    Cálculo y predicción de la subida del precio del alquiler durante el siglo XXI y sus posibles precios en el futuro si se mantuviera esta dinámica en el barrio de Guanarteme.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                                <h4 className="text-xl font-bold text-purple-300 mb-3">Inglés (3º ESO)</h4>
                                <p className="text-slate-400 text-base leading-relaxed">
                                    Presencia de la huella británica en Canarias a través de la historia y la lengua. Análisis de palabras de origen anglosajón usadas en la actualidad.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-pink-500/30 transition-colors">
                                <h4 className="text-xl font-bold text-pink-300 mb-3">Música (3º ESO)</h4>
                                <p className="text-slate-400 text-base leading-relaxed">
                                    Creación y aplicación de instrumentos de percusión de origen humilde que usó la población canaria en el pasado. Especial mención a las castañetas (dos conchas de lapas).
                                </p>
                            </div>

                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-green-500/30 transition-colors">
                                <h4 className="text-xl font-bold text-green-300 mb-3">Biología, Geología y Ciencias Ambientales (1º Bach)</h4>
                                <ul className="text-slate-400 text-base leading-relaxed space-y-2 list-disc list-inside">
                                    <li>Identificación de formaciones geológicas, procesos erosivos y la influencia humana.</li>
                                    <li>Reflexión sobre la biodiversidad del barranco.</li>
                                    <li>Observación del impacto de la ocupación del territorio y vertidos.</li>
                                    <li>Fomento de la conciencia sobre conservación sostenible y cambio climático.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Tab 3: Cronograma Histórico
function CronogramaTab() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const siglos = [
        {
            label: 'Siglos I al XV',
            subtitle: 'Periodo antes de la conquista',
            color: 'from-stone-400 to-amber-600',
            dot: 'bg-stone-500',
            eventos: [
                {
                    year: 'Ss. I–XV',
                    text: 'En el Barranco de Guanarteme se localizan hoy numerosas cuevas y yacimientos como la de Hoya del Paso, donde se encontró una vasija con granos de trigo tostado y cenizas, atestiguando la presencia de cultivos de este cereal en los meandros del barranco.'
                },
                {
                    year: '1478',
                    text: 'Fundación de la ciudad de Las Palmas en la margen derecha del barranco Guiniguada, cerca del área de Guanarteme.'
                },
            ]
        },
        {
            label: 'Siglo XVI',
            subtitle: '',
            color: 'from-amber-400 to-yellow-500',
            dot: 'bg-amber-600',
            eventos: [
                {
                    year: 'S. XVI',
                    text: 'Un antropónimo muy antiguo, Jacomar da nombre al barranco y al caserío, de quien existe la referencia algo lejana de Marcos Jacomar, vecino de Arucas que donó bienes a su parroquia en los primeros años del siglo XVI (SÁNCHEZ RODRÍGUEZ, J.: Historia de la Parroquia de San Juan Bautista de Arucas. 1515-1817, Sta. Cruz de Tenerife, 2013).'
                },
            ]
        },
        {
            label: 'Siglo XVII',
            subtitle: '',
            color: 'from-orange-400 to-amber-500',
            dot: 'bg-orange-500',
            eventos: [
                {
                    year: '1669',
                    text: 'Construcción de las Salinas de Guanarteme en el Barranco de Guanarteme, también conocidas como Salinas Perdidas.'
                },
                {
                    year: '1675',
                    text: 'En un documento del año 1675 Salvador Hernández y su esposa Catalina Hernández de Cerpa, vecinos de San Pedro de Tenoya, compraron un lote de tierras, de unas veinte fanegadas, a D. Juan Huesterling Sarmiento y Saavedra que a su vez había comprado a los herederos de D. Bartolomé de Moxica en el año 1672. Eran tierras montuosas en El Cardonal que lindaban por la parte de arriba con la Cueva del Lagarto, continuando adelante por La Cordillera del Cardonal a dar a Los Caideros del Rincón junto a las tierras que llamaban de Burgos, que hacen mención al conquistador ya mencionado Gonzalo de Burgos y que en aquel entonces pertenecían a Francisco González Enamorado y por la parte de abajo estaba el mar y los cercados que habían sido de Guillén de Ayala y que por aquellas fechas ya pertenecían al mencionado matrimonio comprador .'
                },
                {
                    year: '1684',
                    text: 'En el año 1684 se hablaba de Las Cordilleras del Cardonal "vertientes abajo a dar al Lomito del Rincón y a la mar". Este sería otro de los nombres anteriores a Los Giles y relacionada con los accidentes geográficos del lugar.'
                },
            ]
        },
        {
            label: 'Siglo XVIII',
            subtitle: '',
            color: 'from-yellow-400 to-lime-500',
            dot: 'bg-yellow-500',
            eventos: [
                {
                    year: 'S. XVIII',
                    text: 'Lomos de los Henríquez, familias con ancestros en San Lorenzo y Tamaraceite desde el siglo XVIII; o los desconocidos Giles, familia cuyas tierras dieron nombre al nuevo barrio (SANTANA DOMÍNGUEZ, JF.: Los Giles: Notas históricas previas al Pregón de las Fiestas 2010, municipiodesanlorenzo-com, 17-jun-2010).'
                },
            ]
        },
        {
            label: 'Siglo XIX',
            subtitle: '',
            color: 'from-teal-400 to-cyan-500',
            dot: 'bg-teal-500',
            eventos: [
                {
                    year: '1860',
                    text: 'La familia Apolinario adquiere 62 hectáreas en el barrio de Guanarteme, iniciando el poblamiento de la zona.'
                },
                {
                    year: 'Finales s. XIX',
                    text: 'Intensificación del poblamiento: El barrio de Guanarteme experimenta un aumento en la población, atraída por las oportunidades laborales en el Puerto de La Luz y otras actividades emergentes.'
                },
            ]
        },
        {
            label: 'Siglo XX',
            subtitle: '',
            color: 'from-blue-400 to-indigo-500',
            dot: 'bg-blue-500',
            eventos: [
                { year: '1923-1931', text: 'Se terminan las obras de la Carretera de Chile que une Guanarteme con Tamaraceite. En 1931 empieza a ser visible el nuevo "barrio" de Chil junto a la donde se instalan algunas pequeñas fábricas, entre ellas una de mosaicos.' },
                { year: '1924', text: 'Los hermanos Cristóbal y Martín Saavedra Ramos solicitan una licencia para construir una capilla en la barriada de Guanarteme, proyecto encargado al arquitecto E. Laforet y aprobado el 20 de mayo de 1924.' },
                { year: '1928', text: 'Inauguración de la Compañía Insular Colonial de Electricidad y Riesgos S.A. (CICER) en Guanarteme, destinada a suministrar electricidad a la ciudad.' },
                { year: '1937', text: 'El barrio de Guanarteme, junto con Tamaraceite y Tenoya, es incorporado al municipio de Las Palmas de Gran Canaria, tras haber pertenecido al municipio de San Lorenzo.' },
                { year: '30s y 40s', text: 'Establecimiento de industrias conserveras como Lloret y Llinares, Ojeda, Ortuño, Turajo y Beltrán en la zona de Guanarteme.' },
                { year: '30s y 40s', text: 'Establecimiento de la zona tomatera de Los Giles regada con el agua de La Presa de los Giles y varios estanques.' },
                { year: '1940s', text: 'Establecimiento del cuartel Manuel Lois y construcción del polvorín. Estos hechos forman parte de la intervención militar en la zona, que tuvo un impacto significativo en el uso del suelo y en la transformación del paisaje.' },
                { year: '40s y 50s', text: 'Instalación de diversas industrias en Guanarteme, como la Fosforera, Jabonera Canaria, Cigarrillos Rumbo y Tirma.' },
                { year: '40s y 50s', text: 'Actividad agrícola intensiva: Durante este periodo se intensifica la actividad agrícola en la zona.' },
                { year: '1951', text: 'La ortofoto de GRAFCAN de 1951 muestran fincas de plataneras en el Barranco de Guanarteme, mientras que en el Llano de Burgos, por debajo de Los Giles, se observan muchos terrenos dedicadas al cultivo de tomates.' },
                { year: '60s y 70s', text: 'Construcción de "Los Muellitos" para suministrar agua salada destinada a la refrigeración de las turbinas de la fábrica de la CICER.' },
                { year: '1970s', text: 'Instalación de la empresa de Aguas de Firgas en un solar del Barranco de Guanarteme: La primera ortofoto que evidencia la actividad de la empresa de Aguas de Firgas en el barranco data de 1977, lo que indica que probablemente la instalación se realizó en la década de los 70.' },
                { year: '1984', text: 'Cierre de la última conservera del barrio de Guanarteme.' },
                { year: '1993', text: 'Inauguración del IES El Rincón en septiembre y del Centro Comercial Las Arenas en diciembre. La zona se desarrolla con gran número de construcciones nuevas y el derribo de viejas casas y aprovechamiento de solares.' },
                { year: '1997', text: 'Finalización de la construcción del Auditorio Alfredo Kraus con la idea de erigir un faro que protegiera la Playa de Las Canteras. Prosigue el aumento de edificaciones en la zona.' },
            ]
        },
        {
            label: 'Siglo XXI',
            subtitle: '',
            color: 'from-purple-400 to-fuchsia-500',
            dot: 'bg-purple-500',
            eventos: [
                { year: '2002', text: 'Las fincas de plataneras se mantienen activas en el Barranco de Guanarteme hasta al menos el año 2002.' },
                { year: '2006', text: 'Comenzó el proceso de desmilitarización de los 168.500 metros cuadrados del llamado cuartel Manuel Lois en El Barranco de Tamaraceite.' },
                { year: '2008-2009', text: 'Se instala un gran invernadero en el Llano de Burgos para el cultivo de tomates que no ocupa toda la zona sino lo que es la zona donde hoy despegan los parapentes.' },
                { year: '2010', text: 'Abandono de las fincas agrícolas: Tanto las fincas de tomateros (tras la instalación del invernadero) como las de plataneras en el barranco son abandonadas entre 2010 y 2011.' },
            ]
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-amber-300 mb-4">
                    Cronograma de la ocupación del Barranco de Guanarteme y zona aledaña
                </h2>
                <p className="text-slate-400 text-lg">Historia documentada desde la época prehispánica hasta la actualidad</p>
            </div>

            {/* Century accordion timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-stone-500 via-amber-500 via-teal-500 to-blue-500 opacity-50" />

                <div className="space-y-6">
                    {siglos.map((siglo, sIdx) => (
                        <div key={sIdx} className="relative pl-16 fade-in-section">
                            {/* Century dot */}
                            <div className={`absolute left-2.5 top-5 w-7 h-7 rounded-full ${siglo.dot} border-4 border-slate-900 shadow-lg z-10`} />

                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
                                {/* Century header — clickable */}
                                <button
                                    className="w-full text-left px-8 py-5 flex items-center justify-between gap-4 group"
                                    onClick={() => setExpandedIndex(expandedIndex === sIdx ? null : sIdx)}
                                >
                                    <div>
                                        <span className={`inline-block text-2xl font-bold bg-gradient-to-r ${siglo.color} bg-clip-text text-transparent`}>
                                            {siglo.label}
                                        </span>
                                        {siglo.subtitle && (
                                            <span className="ml-3 text-slate-400 text-sm italic">{siglo.subtitle}</span>
                                        )}
                                        <p className="text-slate-500 text-sm mt-1">
                                            {siglo.eventos.length} {siglo.eventos.length === 1 ? 'evento' : 'eventos'}
                                        </p>
                                    </div>
                                    <span className="text-amber-400 text-xl transition-transform duration-300 group-hover:scale-110">
                                        {expandedIndex === sIdx ? '▼' : '▶'}
                                    </span>
                                </button>

                                {/* Events list */}
                                {expandedIndex === sIdx && (
                                    <div className="px-8 pb-8 border-t border-slate-700/40 pt-6 space-y-5">
                                        {siglo.eventos.map((ev, eIdx) => (
                                            <div key={eIdx} className="flex gap-5 items-start">
                                                <span className="shrink-0 text-amber-400 font-bold text-sm w-24 pt-0.5">{ev.year}</span>
                                                <p className="text-slate-300 text-base leading-relaxed text-justify">{ev.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary Card */}
            <div className="mt-16 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-10 rounded-2xl border border-amber-500/30">
                <h3 className="text-3xl font-bold text-amber-300 mb-6 text-center">La Evolución de una Zona Emblemática</h3>
                <p className="text-slate-300 text-lg leading-relaxed text-center">
                    Desde los primeros indicios aborígenes en el Barranco hasta los drásticos cambios demográficos, industriales y urbanísticos de los pasados siglos; este cronograma sintetiza el latir constante y el progreso que forjaron la identidad presente del Barranco de Guanarteme y su entorno.
                </p>
            </div>
        </div>
    );
}
// Tab 3: Galería de Fotos
function GaleriaTab() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categorias = [
        {
            name: 'Los Giles',
            folder: 'Los Giles',
            count: 3,
            color: 'from-rose-500 to-red-500',
            photos: ['Los Giles1.png', 'Los Giles2.png', 'Los Giles3.png'],
            descriptions: [
                'Antiguo camión de transporte en Los Giles - Años 50',
                'Vista panorámica del área de Los Giles y su entorno natural',
                'Desarrollo urbano de Los Giles - Vista histórica'
            ]
        },
        {
            name: 'Casa Ayala',
            folder: 'Casa Ayala',
            count: 0,
            color: 'from-slate-500 to-slate-700',
            photos: []
        },
        {
            name: 'Costa Ayala',
            folder: 'Costa Ayala',
            count: 0,
            color: 'from-slate-500 to-slate-700',
            photos: []
        },
        {
            name: 'Ladera Alta',
            folder: 'Ladera ALTA',
            count: 0,
            color: 'from-slate-500 to-slate-700',
            photos: []
        },
    ];

    const currentCategory = categorias.find(c => c.name === selectedCategory);

    return (
        <div className="max-w-6xl mx-auto space-y-12 py-12">
            <h2 className="text-5xl font-bold text-amber-300 text-center mb-16">Galería de Fotos Históricas</h2>

            {!selectedCategory ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categorias.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() => cat.count > 0 && setSelectedCategory(cat.name)}
                            className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm border border-slate-700/50 transition-all duration-300 ${cat.count > 0 ? 'cursor-pointer hover:border-amber-500/50 scale-100 hover:scale-[1.02]' : 'opacity-60 grayscale'}`}
                        >
                            {/* Cover Image for categories with photos */}
                            {cat.count > 0 && cat.photos && cat.photos.length > 0 ? (
                                <>
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={`/images/gallery/${cat.folder}/${cat.photos[0]}`}
                                            alt={cat.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40"></div>
                                    </div>
                                    <div className="relative p-6 -mt-16">
                                        <ImageIcon className="w-10 h-10 mb-3 text-amber-400 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                                        <p className="text-slate-300 text-sm font-semibold">
                                            {cat.count} {cat.count === 1 ? 'foto' : 'fotos'}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                    <div className="relative z-10 p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                                        <ImageIcon className={`w-12 h-12 mb-4 transition-transform ${cat.count > 0 ? 'text-amber-400 group-hover:scale-110' : 'text-slate-500'}`} />
                                        <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                                        <p className="text-slate-400 text-sm">
                                            Próximamente
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700"
                    >
                        <span>← Volver a categorías</span>
                    </button>

                    <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-3 h-10 rounded-full bg-gradient-to-b ${currentCategory?.color}`}></div>
                            <h3 className="text-3xl font-bold text-white">{selectedCategory}</h3>
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm text-slate-300">{currentCategory?.count} imágenes</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {currentCategory?.photos.map((photo, index) => (
                                <div key={index} className="group/img relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-700/50 hover:border-amber-500/50 transition-all duration-500">
                                    <Image
                                        src={`/images/gallery/${currentCategory?.folder}/${photo}`}
                                        alt={`${selectedCategory} - ${index}`}
                                        fill
                                        className="object-cover group-hover/img:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-sm text-slate-100 font-medium">
                                            {currentCategory?.descriptions?.[index] || photo}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {!selectedCategory && (
                <div className="bg-slate-800/20 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/30 text-center">
                    <p className="text-slate-400">
                        Selecciona una categoría para explorar las imágenes históricas.
                        <br />
                        Estamos trabajando para completar las zonas de Casa Ayala, Costa Ayala y Ladera Alta.
                    </p>
                </div>
            )}
        </div>
    );
}

// Tab 4: Noticias
function NoticiasTab() {
    return (
        <div className="max-w-5xl mx-auto space-y-12 py-12">
            <h2 className="text-5xl font-bold text-amber-300 text-center mb-16">Noticias y Actualizaciones</h2>

            <div className="space-y-8">
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <Newspaper className="w-6 h-6 text-amber-400" />
                        <span className="text-sm text-slate-400">Febrero 2026</span>
                    </div>
                    <h3 className="text-3xl font-bold text-orange-300 mb-4">Portal en Línea</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Se lanza el portal web dedicado a la recuperación de la memoria histórica del barrio de
                        Guanarteme y la obra de Leandro Perdomo.
                    </p>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50 text-center">
                    <Newspaper className="w-20 h-20 text-amber-400/50 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">
                        Más noticias y actualizaciones próximamente.
                    </p>
                </div>
            </div>
        </div>
    );
}
