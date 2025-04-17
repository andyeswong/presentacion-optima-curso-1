const slidesData = {
  slides: [
    {
      slide_number: 1,
      title: "Generando Soluciones con IA Generativa: Conceptos Avanzados de IA (LLMs)",
      subtitle: "Explorando el potencial de los Modelos de Lenguaje Largos",
      content: [
        {
          type: "text",
          value:
            "¡Bienvenidos! En esta presentación, profundizaremos en conceptos avanzados de Inteligencia Artificial Generativa, con un enfoque especial en los Modelos de Lenguaje Extensos (LLMs).",
        },
        {
          type: "text",
          value:
            "A lo largo de la sesión, utilizaremos una aplicación real en producción como ejemplo práctico para ilustrar estos conceptos.",
        },
      ],
      design: "introductory-slide",
      color_scheme: "vibrant-gradient",
    },
    {
      slide_number: 2,
      title: "Presentando Kanny - Gestión Inteligente de Tareas con IA",
      subtitle: "Un ejemplo práctico de IA generativa en acción",
      content: [
        {
          type: "image",
          url: "https://kanny.andres-wong.com/logo.png",
          alt_text: "Kanny - AI Intelligent Task Management Logo",
        },
        {
          type: "text",
          value: "**Kanny** es una plataforma de IA diseñada para la gestión inteligente de tareas en tableros Kanban.",
        },
        {
          type: "text",
          value:
            "En su backend, Kanny utiliza un **chatflow (Sistema Multi Agente - SMA)** impulsado por **Dify**, implementando **Function Calling** para una interacción inteligente.",
        },
        {
          type: "text",
          value:
            "El robusto *system prompt* de Kanny nos servirá para ejemplificar los conceptos avanzados de IA que exploraremos.",
        },
        {
          type: "link",
          url: "https://kanny.andres-wong.com/",
          text: "Visita Kanny para más información",
        },
      ],
      design: "app-introduction",
      color_scheme: "app-theme",
    },
    {
      slide_number: 3,
      title: "Fundamentos del Lenguaje Natural y el Prompting",
      subtitle: "Entendiendo la base de la interacción con la IA",
      content: [
        {
          type: "heading",
          value: "Lenguaje Natural (NLP)",
        },
        {
          type: "text",
          value: "🗣️ La capacidad de las máquinas para entender, interpretar y generar lenguaje humano.",
        },
        {
          type: "heading",
          value: "Prompt",
        },
        {
          type: "text",
          value: "✍️ La instrucción o pregunta que le damos a la IA para obtener una respuesta o acción.",
        },
        {
          type: "heading",
          value: "System Prompt",
        },
        {
          type: "text",
          value:
            "⚙️ Instrucciones de alto nivel que definen el comportamiento, el tono y las capacidades de la IA para toda la conversación. **Kanny utiliza un system prompt detallado para gestionar las interacciones de sus agentes.**",
        },
      ],
      design: "basic-concepts",
      color_scheme: "neutral-blue",
    },
    {
      slide_number: 4,
      title: "El System Prompt: Definiendo las Reglas del Juego",
      subtitle: "El arte y la ciencia detrás de instruir modelos de IA",
      content: [
        {
          type: "heading",
          value: "Las Reglas del Juego",
        },
        {
          type: "text",
          value: "🎮 El system prompt es como definir las reglas de un juego para la IA: determina qué puede hacer, cómo debe comportarse y cuáles son los límites de sus acciones. **Sin reglas claras, el juego se vuelve caótico e impredecible.**",
        },
        {
          type: "heading",
          value: "Un Reto Complejo",
        },
        {
          type: "text",
          value: "🧩 Crear un system prompt efectivo es un reto complejo que requiere precisión, creatividad y comprensión profunda del contexto. **Por eso existe la ingeniería de prompts como disciplina especializada.**",
        },
        {
          type: "heading",
          value: "Ejemplos para Concesionaria Optima",
        },
        {
          type: "text",
          value: "A continuación, tres ejemplos de system prompts para diferentes roles en una concesionaria de automóviles:",
        },
        {
          type: "heading",
          value: "1. Asistente de Ventas",
        },
        {
          type: "text",
          value: "\"Eres un asistente virtual especializado de Optima Automotriz. Tu función es proporcionar información precisa sobre modelos de vehículos, opciones de financiamiento y promociones actuales. Nunca inventes especificaciones técnicas y siempre prioriza la satisfacción del cliente, dirigiéndolo al vendedor humano para cerrar ventas.\"",
        },
        {
          type: "text",
          value: "**Explicación:** Este prompt define claramente los límites del asistente (no inventar specs, no cerrar ventas) mientras establece su expertise (información de vehículos, financiamiento). Las restricciones evitan que el modelo genere información falsa sobre vehículos, lo que podría tener consecuencias legales y afectar la reputación de la concesionaria.",
        },
        {
          type: "heading",
          value: "2. Soporte Técnico",
        },
        {
          type: "text",
          value: "\"Actúas como especialista de soporte técnico para Optima Automotriz. Tu tarea es diagnosticar problemas de vehículos basándote en síntomas descritos, recomendar mantenimiento preventivo y programar citas con el taller. Siempre debes aclarar que tus diagnósticos son preliminares y requieren verificación profesional.\"",
        },
        {
          type: "text",
          value: "**Explicación:** Este prompt equilibra utilidad con responsabilidad. El assistant puede brindar ayuda técnica preliminar (ahorrando tiempo a mecánicos reales) pero incluye un límite crucial: aclarar que sus diagnósticos son preliminares. Esto mitiga riesgos de seguridad y responsabilidad mientras sigue siendo útil para problemas comunes.",
        },
        {
          type: "heading",
          value: "3. Asistente de Postventa",
        },
        {
          type: "text",
          value: "\"Eres el asistente de seguimiento postventa de Optima Automotriz. Tu objetivo es recopilar feedback de clientes sobre su experiencia de compra y satisfacción con el vehículo adquirido. Debes mostrar empatía con problemas reportados, escalar quejas al departamento adecuado y sugerir mejoras al servicio basadas en los comentarios recopilados.\"",
        },
        {
          type: "text",
          value: "**Explicación:** Este prompt incorpora inteligencia emocional (mostrar empatía), procesos organizacionales (escalamiento de quejas) y análisis estratégico (sugerir mejoras). Está diseñado para mantener relaciones positivas con clientes después de la compra, un momento crítico para fidelización y referencias futuras.",
        },
        {
          type: "text",
          value: "**Nota clave:** Todos estos system prompts comparten características esenciales: definen el rol con claridad, establecen límites precisos, especifican el tono de comunicación y se alinean con los objetivos comerciales de Optima sin prometer capacidades irreales.",
        }
      ],
      design: "structured-explanation",
      color_scheme: "purple-secondary",
    },
    {
      slide_number: 5,
      title: "La Regla de 3 para System Prompts Efectivos",
      subtitle: "Estructura clara para guiar el comportamiento de la IA",
      content: [
        {
          type: "heading",
          value: "1. ¿Qué Recibe la IA?",
        },
        {
          type: "text",
          value:
            "💡 Define claramente el contexto y la información que la IA tendrá disponible. **En el caso de Kanny, esto incluye el estado del tablero Kanban, las tareas existentes y las interacciones del usuario.**",
        },
        {
          type: "heading",
          value: "2. ¿Qué Tiene que Hacer la IA?",
        },
        {
          type: "text",
          value:
            "🎯 Especifica la tarea, el objetivo o la acción que la IA debe realizar con la información proporcionada. **Para Kanny, esto puede ser crear una nueva tarea, mover una tarjeta o responder a una consulta.**",
        },
        {
          type: "heading",
          value: "3. ¿Qué Tiene que Devolver la IA?",
        },
        {
          type: "text",
          value:
            "📤 Indica el formato, el estilo y el tipo de salida que esperas de la IA. **Kanny devuelve actualizaciones del tablero, respuestas en lenguaje natural o llamadas a funciones específicas a través de Function Calling.**",
        },
      ],
      design: "structured-explanation",
      color_scheme: "light-green",
    },
    {
      slide_number: 6,
      title: "La Nueva Era de la Adaptación de LLMs: Más Allá del Fine-tuning",
      subtitle: "Potencia tus aplicaciones con IA sin el costo del ajuste fino",
      content: [
        {
          type: "text",
          value:
            "🚀 La adaptación de modelos de lenguaje grandes (LLMs) ha evolucionado significativamente. Ya no dependemos exclusivamente del costoso y laborioso proceso de fine-tuning para personalizarlos. **Kanny demuestra cómo se pueden construir soluciones robustas sin un fine-tuning extenso.**",
        },
        {
          type: "text",
          value:
            "💡 Descubre cómo las técnicas de **Retrieval-Augmented Generation (RAG)** y plataformas innovadoras como **Dify** están revolucionando la forma en que integramos la IA en nuestras aplicaciones. **El backend de Kanny se apoya en Dify para orquestar su lógica.**",
        },
      ],
      design: "modern-bold",
      color_scheme: "blue-gradient",
    },
    {
      slide_number: 7,
      title: "El Poder de RAG: Contexto Relevante al Instante",
      subtitle: "Información precisa y actualizada sin modificar el modelo base",
      content: [

        {
          type: "diagram",
          value: "rag-diagram",
        },
        {
          type: "heading",
          value: "¿Qué es RAG?",
        },
        {
          type: "text",
          value:
            "📚 **Retrieval-Augmented Generation** enriquece las respuestas de los LLMs con información relevante extraída de fuentes de conocimiento externas en tiempo real. **Aunque Kanny se centra en la gestión de tareas, podría usar RAG para acceder a documentación o información adicional relevante para las tareas.**",
        },
        {
          type: "list",
          items: [
            "Búsqueda eficiente en bases de datos de conocimiento.",
            "Integración de contexto específico a la consulta del usuario.",
            "Respuestas más informadas, precisas y contextualizadas.",
            "Evita la necesidad de re-entrenar el modelo con nuevos datos.",
          ],
        },
      ],
      design: "clean-informative",
      color_scheme: "blue-white",
    },
    {
      slide_number: 8,
      title: "Sistemas Multi-Agente (SMA): Colaboración Inteligente",
      subtitle: "Múltiples agentes de IA trabajando juntos para resolver problemas complejos",
      content: [
        {
          type: "heading",
          value: "¿Qué son los Sistemas Multi-Agente?",
        },
        {
          type: "text",
          value:
            "🤖 Los **Sistemas Multi-Agente (SMA)** son ecosistemas donde múltiples agentes de IA colaboran, cada uno con roles y capacidades específicas, para resolver problemas complejos que serían difíciles para un solo agente. **Kanny implementa un SMA donde diferentes agentes gestionan distintos aspectos de la organización de tareas.**",
        },
        {
          type: "diagram",
          value: "sma-diagram",
        },
        {
          type: "list",
          items: [
            "Especialización: Cada agente se enfoca en tareas específicas donde destaca.",
            "Escalabilidad: Fácil adición de nuevos agentes para nuevas funcionalidades.",
            "Robustez: El sistema sigue funcionando incluso si un agente falla.",
            "Eficiencia: Procesamiento paralelo de diferentes aspectos de un problema.",
          ],
        },
      ],
      design: "multi-agent-system",
      color_scheme: "purple-blue",
    },
    {
      slide_number: 9,
      title: "Dify: Tu Plataforma Integral para Soluciones de IA",
      subtitle: "Construye, comparte y despliega aplicaciones de IA fácilmente",
      content: [
        {
          type: "heading",
          value: "¿Cómo Dify simplifica el desarrollo de IA?",
        },
        {
          type: "text",
          value:
            "🛠️ **Dify** ofrece un entorno intuitivo para construir diversas aplicaciones de IA, desde asistentes personales hasta soluciones para compartir con otros. **Kanny utiliza la potencia de Dify para definir su chatflow y la lógica de sus agentes.**",
        },
        {
          type: "list",
          items: [
            "Interfaz visual para la creación de flujos de trabajo de IA.",
            "Integración sencilla con modelos de lenguaje y bases de datos.",
            "Capacidad para crear soluciones personalizadas sin necesidad de codificación extensa.",
            "Opciones para compartir y desplegar tus aplicaciones. **Kanny es un ejemplo de una aplicación desplegada utilizando las capacidades de Dify.**",
          ],
        },
      ],
      design: "innovative-interface",
      color_scheme: "purple-accent",
    },
    {
      slide_number: 10,
      title: "Casos de Uso: Soluciones de IA a tu Alcance",
      subtitle: "Asistencia personalizada y herramientas compartidas",
      content: [
        {
          type: "heading",
          value: "Asistencia Personalizada con IA",
        },
        {
          type: "text",
          value:
            "🤖 Crea asistentes virtuales inteligentes que te ayuden con tareas diarias, respondan preguntas específicas o automaticen flujos de trabajo. **Kanny actúa como un asistente personalizado para la gestión de tareas en tableros Kanban.**",
        },
        {
          type: "heading",
          value: "Soluciones Compartidas para tu Equipo o Comunidad",
        },
        {
          type: "text",
          value:
            "🤝 Desarrolla herramientas de IA que puedan ser utilizadas por otros, facilitando el acceso a información y la resolución de problemas de manera colaborativa. **Kanny es una plataforma que puede ser utilizada por equipos para mejorar su productividad.**",
        },
      ],
      design: "collaborative-solutions",
      color_scheme: "green-secondary",
    },
    {
      slide_number: 11,
      title: "Agentes de IA y Function Calling: Interacción Inteligente con tus Aplicaciones",
      subtitle: "Lleva la automatización a un nuevo nivel",
      content: [
        {
          type: "heading",
          value: "Function Calling: La Clave para la Acción",
        },
        {
          type: "text",
          value:
            "⚙️ Utiliza la capacidad de **Function Calling** para permitir que los modelos de IA interactúen directamente con tus aplicaciones y servicios externos. **El backend de Kanny utiliza intensivamente Function Calling a través de Dify para interactuar con su lógica de gestión de tareas.**",
        },
        {
          type: "heading",
          value: "Creación de Agentes de IA Autónomos",
        },
        {
          type: "text",
          value:
            "🧠 Construye agentes inteligentes que pueden tomar decisiones, ejecutar tareas y aprender de sus interacciones, todo ello sin un fine-tuning extensivo. **Los diferentes componentes del chatflow de Kanny actúan como agentes que colaboran para gestionar las tareas.**",
        },
      ],
      design: "technical-integration",
      color_scheme: "gray-contrast",
    },
    {
      slide_number: 12,
      title: "Ejemplo 1: Asistente de Ventas Inteligente",
      subtitle: "Combinando System Prompt, RAG, SMA y Function Calling",
      content: [
        {
          type: "heading",
          value: "Arquitectura del Sistema",
        },
        {
          type: "text",
          value:
            "🔍 Un asistente de ventas que ayuda a los representantes a acceder a información de productos, historial de clientes y recomendaciones personalizadas en tiempo real durante las llamadas con clientes.",
        },
        {
          type: "diagram",
          value: "example1-diagram",
        },
        {
          type: "list",
          items: [
            "**System Prompt**: Define el rol del asistente como experto en ventas y establece el tono profesional.",
            "**RAG**: Recupera información actualizada de productos y precios desde la base de datos de la empresa.",
            "**SMA**: Utiliza agentes especializados para análisis de sentimiento, recomendaciones y búsqueda de información.",
            "**Function Calling**: Permite al asistente actualizar el CRM, programar seguimientos y enviar cotizaciones.",
          ],
        },
      ],
      design: "example-case",
      color_scheme: "blue-accent",
    },
    {
      slide_number: 13,
      title: "Ejemplo 2: Análisis Automático de Documentos Legales",
      subtitle: "Integrando tecnologías avanzadas de IA",
      content: [
        {
          type: "heading",
          value: "Flujo de Trabajo",
        },
        {
          type: "text",
          value:
            "📄 Sistema que analiza contratos y documentos legales, identifica cláusulas importantes, riesgos potenciales y sugiere modificaciones basadas en precedentes legales.",
        },
        {
          type: "diagram",
          value: "example2-diagram",
        },
        {
          type: "list",
          items: [
            "**System Prompt**: Instruye al modelo para actuar como un asistente legal experto con enfoque en análisis de riesgos.",
            "**RAG**: Consulta bases de datos de precedentes legales y regulaciones actualizadas.",
            "**SMA**: Diferentes agentes analizan distintas secciones del documento (obligaciones, plazos, penalizaciones).",
            "**Function Calling**: Genera reportes estructurados, marca secciones críticas y sugiere cambios específicos.",
          ],
        },
      ],
      design: "example-case",
      color_scheme: "indigo-accent",
    },
    {
      slide_number: 14,
      title: "Ejemplo 3: Asistente de Investigación Científica",
      subtitle: "Potenciando la investigación con IA avanzada",
      content: [
        {
          type: "heading",
          value: "Componentes del Sistema",
        },
        {
          type: "text",
          value:
            "🔬 Plataforma que ayuda a investigadores a mantenerse actualizados con los últimos avances, analizar datos experimentales y generar hipótesis basadas en la literatura científica.",
        },
        {
          type: "diagram",
          value: "example3-diagram",
        },
        {
          type: "list",
          items: [
            "**System Prompt**: Configura el asistente para mantener rigor científico y citar fuentes adecuadamente.",
            "**RAG**: Recupera información de papers científicos recientes, bases de datos especializadas y repositorios.",
            "**SMA**: Agentes especializados en análisis estadístico, revisión de literatura y visualización de datos.",
            "**Function Calling**: Genera gráficos, ejecuta análisis estadísticos y formatea referencias bibliográficas.",
          ],
        },
      ],
      design: "example-case",
      color_scheme: "green-accent",
    },
    {
      slide_number: 15,
      title: "Conclusión: Un Futuro de IA Flexible y Adaptable",
      subtitle: "Desbloquea el potencial de los LLMs sin las limitaciones del pasado",
      content: [
        {
          type: "text",
          value:
            "✨ RAG y plataformas como Dify están democratizando el acceso a la potencia de los LLMs, permitiendo una adaptación rápida y eficiente a nuestras necesidades. **Kanny es un testimonio de esta flexibilidad y adaptabilidad.**",
        },
        {
          type: "text",
          value:
            "🚀 Explora las posibilidades de construir soluciones de IA innovadoras, desde asistentes personales hasta agentes autónomos, sin la complejidad del fine-tuning tradicional. **Inspírate en Kanny y comienza a crear tus propias soluciones.**",
        },
      ],
      design: "futuristic-vision",
      color_scheme: "purple-blue-gradient",
    },
  ],
}

export default slidesData
