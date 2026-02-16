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
        { id: 'autor', label: 'Origen del Autor', icon: Info },
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

// Tab 1: Origen del Autor (Leandro Perdomo)
function AutorTab({ titleRef, subtitleRef, imageRef }: any) {
    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent z-10"></div>

                <div className="container mx-auto relative z-20 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1
                            ref={titleRef}
                            className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 leading-tight"
                        >
                            Leandro Perdomo
                        </h1>
                        <p
                            ref={subtitleRef}
                            className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed text-justify"
                        >
                            Leandro Perdomo Spínola (Arrecife, 1921 – Teguise, 1993) fue un escritor y periodista canario.
                            Figura clave de la literatura insular del siglo XX, su obra costumbrista y crítica retrató con
                            ironía, ternura y compromiso social la vida cotidiana y las transformaciones de Lanzarote y Gran Canaria.
                        </p>
                    </div>

                    <div ref={imageRef} className="relative">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/30">
                            <Image
                                src="/images/Leandro.png"
                                alt="Leandro Perdomo Spínola"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Datos Clave */}
            <section className="fade-in-section">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl font-bold text-amber-300 mb-12 text-center">Datos clave</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                            <ul className="space-y-4 text-slate-300 text-lg">
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-400 text-2xl">•</span>
                                    <span><strong className="text-amber-300">Nacimiento:</strong> 11 de junio de 1921, Arrecife (Lanzarote)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-400 text-2xl">•</span>
                                    <span><strong className="text-amber-300">Fallecimiento:</strong> junio de 1993, Teguise</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-400 text-2xl">•</span>
                                    <span><strong className="text-amber-300">Profesión:</strong> escritor, periodista, cronista</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                            <ul className="space-y-4 text-slate-300 text-lg">
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-400 text-2xl">•</span>
                                    <span><strong className="text-amber-300">Obras destacadas:</strong> El Puerto de la Luz (1955), Nosotros los emigrantes (1970), Lanzarote y yo (1974)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-400 text-2xl">•</span>
                                    <span><strong className="text-amber-300">Temas:</strong> emigración, identidad insular, crítica social, vida popular</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trayectoria Vital */}
            <section className="fade-in-section py-20 px-4 bg-slate-900/50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-5xl font-bold text-amber-300 mb-12 text-center">Trayectoria vital</h2>
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-slate-800/30 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50">
                            <p className="text-slate-300 text-lg leading-relaxed text-justify">
                                Hijo de una familia lanzaroteña acomodada, cursó bachillerato y estudió periodismo en Madrid sin
                                concluir la carrera. Fundó en 1946 el semanario <em className="text-amber-300">Pronósticos</em>,
                                primer paso de una carrera periodística marcada por su interés por la "intrahistoria" de la calle.
                                En 1957 emigró a Bélgica, donde trabajó como minero y editó la revista{' '}
                                <em className="text-amber-300">Volcán</em> para la colonia española. Regresó a Canarias en 1968 y
                                se estableció en la casa familiar de los Spínola, en Teguise, donde continuó escribiendo hasta su
                                muerte.
                            </p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden h-80 lg:h-auto shadow-xl border-2 border-amber-400/30">
                            <Image
                                src="/images/Leandro2.png"
                                alt="Leandro Perdomo en Teguise"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Obra y Estilo */}
            <section className="fade-in-section">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl font-bold text-amber-300 mb-12 text-center">Obra y estilo</h2>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50">
                        <p className="text-slate-300 text-lg leading-relaxed text-justify mb-6">
                            Publicó seis libros de cuentos y crónicas:{' '}
                            <em className="text-amber-300">Diez Cuentos</em> (1953),{' '}
                            <em className="text-amber-300">El Puerto de la Luz</em> (1955),{' '}
                            <em className="text-amber-300">Nosotros los emigrantes</em> (1970),{' '}
                            <em className="text-amber-300">Lanzarote y yo</em> (1974),{' '}
                            <em className="text-amber-300">Desde mi cráter</em> (1976) y{' '}
                            <em className="text-amber-300">Crónicas Isleñas</em> (1978).
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed text-justify">
                            Su prosa, antirretórica y directa, se nutre del habla popular y de la compasión por los
                            desfavorecidos. Con un tono realista y humanista, denunció el deterioro del paisaje y la pérdida de
                            valores ante el auge turístico de las islas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Desayuno en Guanarteme */}
            <section className="fade-in-section py-20 px-4 bg-gradient-to-br from-cyan-950/30 via-blue-950/20 to-slate-900/50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-5xl font-bold text-cyan-300 mb-12 text-center">Desayuno en Guanarteme</h2>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <div className="bg-slate-800/40 backdrop-blur-sm p-10 rounded-2xl border border-cyan-700/30 mb-8">
                                <p className="text-slate-300 text-lg leading-relaxed text-justify mb-4">
                                    En este texto, Leandro Perdomo retrata una mañana sencilla en el barrio marinero de
                                    Guanarteme, probablemente en los años 50. No ocurre nada extraordinario —y ahí está su magia.
                                </p>
                                <p className="text-slate-300 text-lg leading-relaxed text-justify mb-4">
                                    La escena gira en torno a un desayuno humilde, casi ritual. El mar está cerca, presente aunque
                                    no siempre visible. Se percibe en el olor, en la luz, en el viento. El ambiente es tranquilo,
                                    cotidiano: casas bajas, puertas abiertas, vecinos que se conocen, una vida marcada por la
                                    cercanía del océano.
                                </p>
                                <p className="text-slate-300 text-lg leading-relaxed text-justify">
                                    El desayuno no es solo comida; es símbolo. Representa la sencillez, la dignidad de la vida
                                    modesta, el ritmo pausado de una época en la que el tiempo parecía más humano.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl border-2 border-cyan-400/30">
                                <Image
                                    src="/images/Leandro3.png"
                                    alt="Ilustración de la época"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-cyan-700/30">
                                <h3 className="text-2xl font-bold text-cyan-300 mb-4">¿Por qué es importante?</h3>
                                <ul className="space-y-3 text-slate-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-400 text-xl">→</span>
                                        <span><strong className="text-cyan-300">Rescate de la memoria colectiva:</strong> una cápsula del tiempo que conserva una forma de vida en desaparición.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-400 text-xl">→</span>
                                        <span><strong className="text-cyan-300">Literatura del paisaje:</strong> el mar como identidad, no como decorado.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-400 text-xl">→</span>
                                        <span><strong className="text-cyan-300">Valor costumbrista:</strong> captura la esencia de lo cotidiano.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-400 text-xl">→</span>
                                        <span><strong className="text-cyan-300">Identidad canaria:</strong> literatura que afirma pertenencia.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Legado */}
            <section className="fade-in-section">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-amber-300 mb-12 text-center">Legado y reconocimientos</h2>
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-slate-800/30 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50">
                            <p className="text-slate-300 text-lg leading-relaxed text-justify">
                                Considerado "el cronista de la realidad lanzaroteña", su influencia ha sido revalorizada en el
                                siglo XXI con reediciones y exposiciones conmemorativas, como{' '}
                                <em className="text-amber-300">Leandro Perdomo: Escribir la vida</em> organizada por la Fundación
                                César Manrique. Su obra sigue siendo un referente del testimonio literario sobre la identidad
                                canaria moderna.
                            </p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden h-80 lg:h-auto shadow-xl border-2 border-amber-400/30">
                            <Image
                                src="/images/Leandro4.png"
                                alt="Legado de Leandro Perdomo"
                                fill
                                className="object-cover"
                            />
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
        <div className="space-y-20 py-12">
            {/* Explicación del Proyecto */}
            <section className="fade-in-section">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl font-bold text-amber-300 mb-12 text-center">Recuperación de la Memoria Histórica a Través de las Excursiones del IES El Rincón</h2>
                    <div className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50">
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p className="text-justify">
                                Este proyecto nace como una iniciativa de <strong className="text-amber-300">rescate, conservación y reinterpretación de la memoria colectiva</strong>, vinculada a las excursiones y salidas pedagógicas del <strong className="text-amber-300">IES El Rincón</strong> por el barrio de Guanarteme y su entorno.
                            </p>
                            <p className="text-justify">
                                Guanarteme, antiguo barrio marinero de Las Palmas de Gran Canaria, tiene un pasado profundamente ligado a la pesca, a las casas terreras, a los talleres artesanales y a la vida comunitaria junto al mar. Sus orígenes se remontan a asentamientos vinculados a la costa y a la expansión urbana del siglo XIX y principios del XX, cuando la ciudad comenzó a crecer hacia el istmo y la zona de La Cícer.
                            </p>
                            <p className="text-justify">
                                La llegada de la electricidad, el desarrollo turístico, la transformación del litoral y la construcción de infraestructuras marcaron un antes y un después en la identidad del barrio. Hoy, Guanarteme vive un proceso intenso de <strong className="text-amber-300">gentrificación</strong>, donde antiguas viviendas familiares han sido sustituidas por apartamentos turísticos y nuevas promociones inmobiliarias, modificando el tejido social y económico tradicional.
                            </p>
                            <p className="text-justify">
                                A través de itinerarios históricos, testimonios vecinales, análisis del paisaje urbano, fotografías antiguas y trabajo de campo, el alumnado del <strong className="text-amber-300">IES El Rincón</strong> reconstruye la evolución del barrio, reflexiona sobre los cambios urbanos y comprende cómo el pasado dialoga con el presente.
                            </p>
                            <p className="text-justify">
                                El proyecto convierte las excursiones en una <strong className="text-amber-300">experiencia viva de aprendizaje</strong>: caminar por Guanarteme no es solo recorrer calles, sino interpretar capas de historia, detectar transformaciones y cuestionar cómo queremos que sea el barrio en el futuro.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/20 backdrop-blur-sm p-10 rounded-2xl border border-cyan-700/30 mt-12">
                        <h4 className="text-3xl font-bold text-cyan-300 mb-8">Objetivos</h4>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-2xl">•</span>
                                    <span>Investigar los orígenes históricos y sociales de Guanarteme.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-2xl">•</span>
                                    <span>Recuperar la memoria oral de antiguos vecinos y familias del barrio.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-2xl">•</span>
                                    <span>Analizar el impacto de la transformación urbana y la gentrificación.</span>
                                </li>
                            </ul>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-2xl">•</span>
                                    <span>Comprender la relación entre turismo, vivienda y cambio social.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-2xl">•</span>
                                    <span>Fomentar el pensamiento crítico del alumnado sobre su entorno.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-400 text-2xl">•</span>
                                    <span>Convertir las excursiones en experiencias de aprendizaje significativo y participativo.</span>
                                </li>
                            </ul>
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

    const hitos = [
        {
            year: 'Años 40',
            title: 'Barrio marinero tradicional',
            image: '/images/cronograma/anos40.jpg',
            folder: 'anos40',
            photos: ['1320411257.jpg', '6519972241_bc59e07ddd_b.jpg', 'accebb3c-6654-4248-a7b0-979ec106aefe_21-9-aspect-ratio_640w_0_x585y0.jpg', 'f3a81865-5e10-4e05-b3c6-4451e8c34956_16-9-aspect-ratio_default_0.jpg'],
            description: `En la década de 1940, Guanarteme era un barrio humilde y periférico de Las Palmas de Gran Canaria. Predominaban las casas terreras, las calles sin asfaltar y una economía basada principalmente en la pesca y pequeños oficios.

La vida giraba en torno al mar y a la Playa de Las Canteras. Era una comunidad muy unida, marcada por la sencillez y por las dificultades de la posguerra española. Esta es la atmósfera que retrata Leandro Perdomo en sus textos costumbristas.`
        },
        {
            year: 'Años 50-60',
            title: 'Primer crecimiento urbano',
            image: '/images/cronograma/anos50.jpg',
            folder: 'anos60',
            photos: ['9be12fc3-39ae-43ea-ae24-03342b00bde1_16-9-discover-aspect-ratio_default_0.jpg', 'b8caa4ca-1240-4aa7-beed-06c02e1b9493_alta-libre-aspect-ratio_default_0.jpg', 'db1031aac98bff29e010c3acbcc2ee1c.jpg', 'fcd0178a-2837-4718-ae51-a9d2d6c53e42_alta-libre-aspect-ratio_default_0.jpg'],
            description: `Durante estas décadas comienza la transformación. Se mejoran infraestructuras, se asfaltan calles y aparecen nuevas edificaciones.

El desarrollo turístico de la zona de Las Canteras empieza a influir directamente en Guanarteme, atrayendo nuevos habitantes y pequeños negocios. El barrio deja de ser exclusivamente marinero y empieza a integrarse en la expansión de la ciudad.`
        },
        {
            year: 'Años 70',
            title: 'Expansión y modernización',
            image: '/images/cronograma/anos70.jpg',
            folder: 'anos60',
            photos: ['9be12fc3-39ae-43ea-ae24-03342b00bde1_16-9-discover-aspect-ratio_default_0.jpg', 'b8caa4ca-1240-4aa7-beed-06c02e1b9493_alta-libre-aspect-ratio_default_0.jpg', 'db1031aac98bff29e010c3acbcc2ee1c.jpg', 'fcd0178a-2837-4718-ae51-a9d2d6c53e42_alta-libre-aspect-ratio_default_0.jpg'],
            description: `En los años 70 se construyen edificios más altos y se produce un crecimiento urbanístico más intenso.

La cercanía a la Playa de Las Canteras convierte la zona en un punto atractivo. Se pierde parte del paisaje tradicional de casas bajas y el barrio adquiere una imagen más urbana.`
        },
        {
            year: 'Años 80-90',
            title: 'Consolidación como zona residencial',
            image: '/images/cronograma/anos80.jpg',
            folder: 'anos80',
            photos: ['07767fde3d4479eb4c7c7f58bcd06f36.jpg', 'b2cd10f8f9b085f1f1e5eee77d1ccc1a.webp', 'c0356791d4adeb898ded21b556127d4d.jpg', 'csm_Las_Canteras_02_7cac71214f.jpg', 'espana_islas_canarias_las_palmas_las_palmas_de_gran_canaria_0066.jpg'],
            description: `Guanarteme queda plenamente integrado en la ciudad. Se amplían servicios, comercios, centros educativos y transporte.

La zona se revaloriza por su proximidad al mar y por la mejora del paseo marítimo. Se consolida como un barrio residencial con fuerte actividad comercial.`
        },
        {
            year: '2000-Actualidad',
            title: 'Renovación y gentrificación',
            image: '/images/cronograma/actualidad.jpg',
            folder: 'actualidad',
            photos: ['1366185720.jpg', '9be12fc3-39ae-43ea-ae24-03342b00bde1_twitter-watermarked-aspect-ratio_default_0.jpg', 'Guanarteme-1.jpg', 'csm_Las_Canteras_02_7cac71214f.jpg'],
            description: `En el siglo XXI se producen reformas importantes en el paseo de Las Canteras y en calles del barrio.

Aumenta el turismo, aparecen apartamentos vacacionales y llegan nuevos residentes, incluidos extranjeros. Esto provoca una subida del precio de la vivienda y cambios en la identidad social del barrio.

Hoy Guanarteme combina su pasado marinero con una nueva identidad urbana y turística.`
        },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 py-12">
            <h2 className="text-5xl font-bold text-amber-300 text-center mb-16">Cronograma Histórico de Guanarteme</h2>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 -translate-x-1/2"></div>

                <div className="space-y-16">
                    {hitos.map((hito, index) => (
                        <div key={index} className={`relative fade-in-section ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                            {/* Timeline dot */}
                            <div className="absolute left-4 md:left-1/2 top-8 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-slate-900 shadow-lg shadow-amber-500/50 -translate-x-1/2 z-10"></div>

                            <div className={`pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 group overflow-hidden">
                                    {/* Image Section - Clickable */}
                                    <div
                                        className="relative h-64 w-full overflow-hidden cursor-pointer"
                                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    >
                                        <Image
                                            src={hito.image}
                                            alt={`${hito.year} - ${hito.title}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <span className="text-3xl font-bold text-amber-400 mb-2 block">{hito.year}</span>
                                            <h3 className="text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                                                {hito.title}
                                            </h3>
                                        </div>
                                        {/* Click indicator */}
                                        <div className="absolute top-4 right-4 bg-amber-500/80 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                                            {expandedIndex === index ? '▼ Ocultar fotos' : '▶ Ver fotos'}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="p-8">
                                        <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                                            {hito.description}
                                        </div>
                                    </div>

                                    {/* Expandable Photo Gallery */}
                                    {expandedIndex === index && (
                                        <div className="px-8 pb-8">
                                            <div className="border-t border-slate-700/50 pt-6">
                                                <h4 className="text-2xl font-bold text-amber-300 mb-6">Galería de Fotos - {hito.year}</h4>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {hito.photos.map((photo, photoIndex) => (
                                                        <div key={photoIndex} className="relative aspect-square rounded-xl overflow-hidden group/photo">
                                                            <Image
                                                                src={`/images/cronograma/${hito.folder}/${photo}`}
                                                                alt={`${hito.year} - Foto ${photoIndex + 1}`}
                                                                fill
                                                                className="object-cover group-hover/photo:scale-110 transition-transform duration-300"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-300"></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary Card */}
            <div className="mt-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-10 rounded-2xl border border-amber-500/30">
                <h3 className="text-3xl font-bold text-amber-300 mb-6 text-center">La Transformación de Guanarteme</h3>
                <p className="text-slate-300 text-lg leading-relaxed text-center">
                    Desde un humilde barrio marinero de los años 40 hasta una moderna zona residencial y turística del siglo XXI,
                    Guanarteme ha experimentado una profunda transformación que refleja la evolución de Las Palmas de Gran Canaria
                    y el impacto del desarrollo turístico en la identidad de sus barrios costeros.
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
