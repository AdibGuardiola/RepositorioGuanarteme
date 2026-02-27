import re

with open("app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace ProyectoTab
proyecto_match = re.search(r"// Tab 2: Proyecto - Recuperación de la memoria de Guanarteme\nfunction ProyectoTab.*?^\}", content, re.MULTILINE | re.DOTALL)
if not proyecto_match:
    proyecto_match = re.search(r"// Tab 2: Proyecto.*?\nfunction ProyectoTab.*?\n\}", content, re.MULTILINE | re.DOTALL)

if proyecto_match:
    new_proyecto = """// Tab 2: Proyecto - Recuperación de la memoria de Guanarteme
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
                        <div className="bg-slate-800/40 p-8 rounded-2xl border border-amber-500/20">
                            <h4 className="flex items-center gap-3 text-2xl font-bold text-amber-400 mb-6">
                                <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">👥</span>
                                Grupos Implicados
                            </h4>
                            <ul className="space-y-3 text-lg text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> 1º Bachillerato A</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> 3º ESO B</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> 3º ESO C</li>
                            </ul>
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
}"""
    content = content[:proyecto_match.start()] + new_proyecto + content[proyecto_match.end():]
else:
    print("Could not find ProyectoTab section")

# Replace AutorTab
autor_match = re.search(r"// Tab 1: Origen del Autor\s*\(Leandro Perdomo\)\nfunction AutorTab.*?^\}", content, re.MULTILINE | re.DOTALL)

if autor_match:
    new_autor = """// Tab 1: Origen del Autor y Guanarteme
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
}"""
    content = content[:autor_match.start()] + new_autor + content[autor_match.end():]
else:
    print("Could not find AutorTab section")

with open("app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Actualizado exitosamente")
