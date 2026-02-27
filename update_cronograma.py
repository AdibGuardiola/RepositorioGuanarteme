import re

with open("app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace CronogramaTab
cronograma_match = re.search(r"// Tab 3: Cronograma Histórico.+?function GaleriaTab", content, re.MULTILINE | re.DOTALL)

if cronograma_match:
    new_cronograma = """// Tab 3: Cronograma Histórico
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
// Tab 3: GaleriaTab (mock) - so regex matches properly
function GaleriaTab"""
    
    # We strip the GaleriaTab mock out to avoid duplicating existing code
    new_cronograma = new_cronograma.replace("// Tab 3: GaleriaTab (mock) - so regex matches properly\nfunction GaleriaTab", "function GaleriaTab")

    content = content[:cronograma_match.start()] + new_cronograma + content[cronograma_match.end() - len("function GaleriaTab"):]
else:
    print("Could not find CronogramaTab section")

with open("app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Cronograma actualizado exitosamente")
