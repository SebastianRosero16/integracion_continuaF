# ACTIVIDAD FINAL INTEGRADA - MOMENTO 3
## Calidad de Software

---

<div style="text-align: center; margin-top: 100px;">

# **COLEGIO MENTES CREATIVAS**
## Aplicación Educativa Multimedia con Integración Continua

### Implementación de Normas de Calidad ISO/IEC 25010
### Pruebas de Software y Despliegue Continuo

---

**Universidad Cooperativa de Colombia**  
**Facultad de Ingeniería**  
**Programa de Ingeniería de Sistemas**

---

### Asignatura:
**Calidad de Software**

### Profesor:
**Mg. Gustavo Sánchez Rodríguez**

---

### Equipo de Desarrollo:

**Integrante 1:**  
Sebastián Rosero  
Código: [Tu código]  
Email: [tu.email@campusucc.edu.co]

**Integrante 2:**  
Héctor Armando Riascos Insuasti  
Código: [Código de Héctor]  
Email: hector.riascos@campusucc.edu.co

**Integrante 3:**  
Steven Insuasti  
Código: [Código de Steven]  
Email: steven.eraso@campusucc.edu.co

---

**Lugar y Fecha:**  
Pasto, Nariño - Colombia  
Noviembre 12 de 2025

</div>

---
---

<div style="page-break-after: always;"></div>

# TABLA DE CONTENIDO

1. [INTRODUCCIÓN](#1-introducción) .................................................... 3
2. [ESCENARIO ASIGNADO](#2-escenario-asignado) .................................................... 4
3. [OBJETIVO DEL PROYECTO](#3-objetivo-del-proyecto) .................................................... 5
4. [NORMAS Y MODELOS DE CALIDAD APLICADOS (ISO/IEC 25010)](#4-normas-y-modelos-de-calidad-aplicados-isoiec-25010) .................................................... 6
5. [REQUERIMIENTOS FUNCIONALES](#5-requerimientos-funcionales) .................................................... 15
6. [ARQUITECTURA DEL SISTEMA](#6-arquitectura-del-sistema) .................................................... 28
7. [PROCESO DE DESPLIEGUE CONTINUO](#7-proceso-de-despliegue-continuo) .................................................... 31
8. [PRUEBAS DE SOFTWARE](#8-pruebas-de-software) .................................................... 36
   - 8.1 Pruebas Unitarias .................................................... 36
   - 8.2 Pruebas de Integración .................................................... 43
   - 8.3 Pruebas de Sistema (JMeter) .................................................... 45
   - 8.4 Pruebas de Implantación .................................................... 50
   - 8.5 Pruebas de Aceptación .................................................... 53
9. [INTEGRACIÓN CONTINUA Y CI/CD](#9-integración-continua-y-cicd) .................................................... 56
10. [ANÁLISIS DE RESULTADOS](#10-análisis-de-resultados) .................................................... 62
11. [CONCLUSIONES Y RECOMENDACIONES](#11-conclusiones-y-recomendaciones) .................................................... 66
12. [REFERENCIAS BIBLIOGRÁFICAS](#12-referencias-bibliográficas) .................................................... 68
13. [ANEXOS](#13-anexos) .................................................... 69

---
---

<div style="page-break-after: always;"></div>

# 1. INTRODUCCIÓN

## 1.1 Contexto del Proyecto

El presente documento describe el desarrollo e implementación de una **aplicación educativa multimedia** para el **Colegio Mentes Creativas**, institución educativa ubicada en Pasto, Nariño, Colombia. Este proyecto se enmarca en la asignatura de **Calidad de Software** del programa de Ingeniería de Sistemas de la Universidad Cooperativa de Colombia.

La institución educativa presentó la necesidad de contar con una herramienta digital innovadora que apoye los procesos de enseñanza-aprendizaje de estudiantes de **4° y 5° grado de primaria** en tres áreas clave del currículo académico:

- **Matemáticas**: Geometría, operaciones básicas y razonamiento lógico
- **Ciencias Naturales**: Química, tabla periódica y propiedades de la materia
- **Ciencias Sociales**: Geografía colombiana, departamentos y regiones

## 1.2 Problemática Identificada

El Colegio Mentes Creativas identificó las siguientes necesidades:

1. **Falta de recursos digitales interactivos** para el aprendizaje en edades tempranas (9-11 años)
2. **Necesidad de gamificación** para aumentar el compromiso estudiantil
3. **Carencia de herramientas multimedia** que integren audio, video y gráficos 3D
4. **Ausencia de plataformas accesibles** que funcionen en diversos dispositivos (tablets, computadores)

## 1.3 Propósito del Documento

Este documento técnico tiene como propósito:

✅ **Documentar** el proceso completo de desarrollo de la aplicación educativa  
✅ **Evidenciar** la aplicación de normas de calidad ISO/IEC 25010  
✅ **Describir** la implementación de pruebas de software (unitarias, integración, sistema, aceptación)  
✅ **Demostrar** la configuración de integración continua con GitHub Actions  
✅ **Justificar** las decisiones técnicas y arquitectónicas tomadas  
✅ **Presentar** los resultados obtenidos y métricas de calidad alcanzadas

## 1.4 Alcance del Proyecto

### Funcionalidades Implementadas:

| Módulo | Funcionalidad Principal | Componentes |
|--------|------------------------|-------------|
| **Matemáticas** | Calculadora de Geometría 2D/3D | Cálculo de área y perímetro para 5 figuras geométricas, visualización 3D con Three.js |
| **Ciencias Naturales** | Tabla Periódica Interactiva | 118 elementos químicos, búsqueda avanzada, filtros por categoría y estado físico |
| **Ciencias Sociales** | Explorador de Colombia | 32 departamentos, filtros por 5 regiones, datos demográficos, quiz interactivo |

### Herramientas Educativas Complementarias:

- Tablas de Multiplicar interactivas (1-12)
- Conversor de Unidades multi-categoría (longitud, temperatura, volumen, masa, velocidad)
- Validador de Contraseñas con reglas personalizables
- Lista de Tareas con gestión CRUD y filtros
- Contador de Clics con persistencia en localStorage

### Tecnologías Utilizadas:

- **Frontend**: React 19.1.1 + TypeScript 5.8.3 + Vite 7.x
- **Estilos**: TailwindCSS 4.x + PostCSS
- **3D Graphics**: Three.js para visualizaciones tridimensionales
- **Routing**: React Router 7.1.6
- **Testing**: Jest 30.1.2 + React Testing Library 16.3.0
- **CI/CD**: GitHub Actions (workflows automatizados)
- **Hosting**: Vercel (despliegue continuo)
- **Control de Versiones**: Git + GitHub

### Métricas Clave del Proyecto:

📊 **Cobertura de Pruebas**: 163 tests unitarios (100% passing)  
⚡ **Performance**: 126ms tiempo de respuesta promedio (JMeter, 50 usuarios)  
🚀 **Despliegue**: Automático en cada push a main (Vercel + GitHub Actions)  
♿ **Accesibilidad**: WCAG 2.1 AA compliance (atributos ARIA implementados)  
📱 **Responsive**: Compatible con desktop, tablet y móvil  

## 1.5 Estructura del Documento

El documento está organizado en 13 secciones que cubren:

1. **Contexto y propósito** (esta sección)
2. **Escenario educativo** del Colegio Mentes Creativas
3. **Objetivos** del proyecto
4. **Normas ISO/IEC 25010** aplicadas (USABILIDAD)
5. **Requerimientos funcionales** de los 3 módulos
6. **Arquitectura** del sistema
7. **Proceso de despliegue** en Vercel
8. **Pruebas de software** (5 tipos)
9. **CI/CD** con GitHub Actions
10. **Análisis de resultados** y métricas
11. **Conclusiones** y recomendaciones
12. **Referencias** bibliográficas
13. **Anexos** (pantallazos y evidencias)

---

> **📸 INSTRUCCIÓN PARA PANTALLAZO #1:**  
> **Ubicación:** Después de esta sección (página 4)  
> **Descripción:** Captura de pantalla de la **página principal de la aplicación** (HomePage) mostrando:
> - Logo del Colegio Mentes Creativas
> - Título principal "Aplicación Educativa Multimedia"
> - Los 3 botones/cards de los módulos (Matemáticas, Ciencias, Sociales)
> - Navbar con el menú de navegación
> - Tema claro/oscuro visible
>
> **Cómo tomar la captura:**
> 1. Abre https://integracion-continua-f.vercel.app/
> 2. Asegúrate de que la página esté completamente cargada
> 3. Captura pantalla completa (Alt + PrtScn en Windows)
> 4. Pega aquí debajo del texto "Figura 1.1: Página principal de la aplicación"
>
> **Texto a agregar debajo de la imagen:**
> ```
> Figura 1.1: Página principal de la aplicación educativa desplegada en Vercel.
> La interfaz presenta los tres módulos educativos con diseño responsive y accesible.
> ```

---

<div style="page-break-after: always;"></div>

# 2. ESCENARIO ASIGNADO

## 2.1 Información de la Institución Educativa

**Nombre:** Colegio Mentes Creativas  
**Ubicación:** Pasto, Nariño - Colombia  
**Tipo:** Institución Educativa de Básica Primaria  
**Niveles Atendidos:** Preescolar, 1° a 5° grado  
**Número de Estudiantes:** Aproximadamente 450 estudiantes  
**Enfoque Pedagógico:** Aprendizaje basado en proyectos y uso de TIC

## 2.2 Necesidad Identificada por la Institución

El Colegio Mentes Creativas, comprometido con la innovación educativa y el desarrollo de competencias del siglo XXI, identificó la necesidad de incorporar **recursos digitales multimedia** en sus procesos de enseñanza-aprendizaje.

### Situación Actual (Antes del Proyecto):

❌ **Recursos limitados**: Uso de textos físicos tradicionales sin elementos interactivos  
❌ **Baja motivación**: Estudiantes con dificultades de atención en clases teóricas extensas  
❌ **Falta de retroalimentación inmediata**: Los estudiantes no reciben feedback instantáneo al resolver ejercicios  
❌ **Acceso desigual**: No todos los estudiantes tienen recursos educativos en casa  
❌ **Aprendizaje pasivo**: Metodologías centradas en el docente, con poca participación activa del estudiante

### Situación Deseada (Objetivo del Proyecto):

✅ **Aprendizaje interactivo**: Estudiantes que exploran conceptos a través de simulaciones y cálculos en tiempo real  
✅ **Gamificación**: Incorporación de elementos lúdicos (quiz, puntajes, feedback visual)  
✅ **Multimedia**: Integración de gráficos 3D, síntesis de voz y animaciones  
✅ **Acceso universal**: Aplicación web accesible desde cualquier dispositivo con internet  
✅ **Retroalimentación inmediata**: Validación instantánea de respuestas con mensajes educativos  
✅ **Aprendizaje autónomo**: Estudiantes pueden practicar fuera del aula a su propio ritmo

## 2.3 Población Objetivo

### Características de los Estudiantes:

- **Edad**: 9 a 11 años (4° y 5° grado de primaria)
- **Nivel de alfabetización digital**: Básico a intermedio
- **Dispositivos disponibles**: Tablets (iPad, Android), computadores de escritorio, laptops
- **Conectividad**: Acceso a internet en el colegio (WiFi) y en casa (mayoría)
- **Competencias previas**: 
  - Saben usar navegadores web
  - Familiarizados con aplicaciones táctiles
  - Tienen nociones básicas de búsqueda en internet

### Necesidades Educativas por Área:

#### **Matemáticas (4° y 5° grado):**
- Comprender conceptos de área y perímetro
- Identificar propiedades de figuras geométricas
- Resolver problemas aplicando fórmulas matemáticas
- Practicar tablas de multiplicar del 1 al 12

#### **Ciencias Naturales (4° y 5° grado):**
- Conocer los elementos químicos básicos
- Identificar categorías de elementos (metales, no metales, gases nobles)
- Comprender estados de la materia
- Explorar la estructura atómica de forma visual

#### **Ciencias Sociales (4° y 5° grado):**
- Conocer la división política de Colombia (32 departamentos)
- Identificar capitales y regiones geográficas
- Comprender datos demográficos (población, superficie)
- Desarrollar sentido de identidad nacional

## 2.4 Requerimientos Institucionales

El Colegio Mentes Creativas estableció los siguientes requerimientos para la aplicación:

### Requerimientos Funcionales (Institucionales):

1. **RF-INST-01**: La aplicación debe cubrir 3 áreas del currículo: Matemáticas, Ciencias y Sociales
2. **RF-INST-02**: Debe ser accesible desde dispositivos móviles (tablets) y computadores
3. **RF-INST-03**: Debe incluir elementos multimedia (gráficos 3D, audio, animaciones)
4. **RF-INST-04**: Debe proporcionar retroalimentación inmediata a las acciones del estudiante
5. **RF-INST-05**: La interfaz debe ser intuitiva, con lenguaje adaptado a niños de 9-11 años
6. **RF-INST-06**: Debe funcionar sin necesidad de instalación (aplicación web)

### Requerimientos No Funcionales (Institucionales):

1. **RNF-INST-01**: **Usabilidad**: Un estudiante nuevo debe poder navegar sin ayuda en menos de 3 minutos
2. **RNF-INST-02**: **Accesibilidad**: Cumplir con WCAG 2.1 nivel AA para estudiantes con discapacidades
3. **RNF-INST-03**: **Performance**: Los cálculos y búsquedas deben responder en menos de 1 segundo
4. **RNF-INST-04**: **Disponibilidad**: La aplicación debe estar disponible 24/7 (salvo mantenimientos programados)
5. **RNF-INST-05**: **Compatibilidad**: Funcionar en Chrome, Firefox, Safari y Edge (últimas 2 versiones)
6. **RNF-INST-06**: **Seguridad**: No debe requerir datos personales del estudiante (privacidad infantil)

## 2.5 Contexto Académico del Proyecto

Este proyecto se desarrolla en el marco de la asignatura **Calidad de Software** con los siguientes objetivos académicos:

### Objetivos de Aprendizaje:

1. **Aplicar normas de calidad**: ISO/IEC 25010 (características y subcaracterísticas)
2. **Implementar pruebas de software**: Unitarias, integración, sistema, aceptación
3. **Configurar CI/CD**: Integración continua con GitHub Actions
4. **Desplegar en producción**: Hosting en Vercel con despliegue automático
5. **Documentar el proceso**: Generación de documentación técnica completa
6. **Trabajar en equipo**: Uso de Git para control de versiones colaborativo

### Entregables Académicos:

✅ **Código fuente**: Repositorio en GitHub con commits distribuidos  
✅ **Pruebas**: 163 tests unitarios con Jest + RTL  
✅ **CI/CD**: Workflows de GitHub Actions configurados  
✅ **Despliegue**: Aplicación en producción en Vercel  
✅ **Documentación**: Este documento PDF completo  
✅ **Sustentación**: Presentación de 10 minutos (diciembre 12, 2025)

## 2.6 Cronograma de Entregas

| Fecha | Entregable | Estado |
|-------|-----------|--------|
| **Noviembre 11, 2025** | Documento PDF Final (este documento) | ✅ En proceso |
| **Noviembre 29, 2025** | Pruebas de Integración con Postman | ⏳ Programado |
| **Diciembre 12, 2025** | Sustentación final (10 minutos) | ⏳ Programado |

---

> **📸 INSTRUCCIÓN PARA PANTALLAZO #2:**  
> **Ubicación:** Después de esta sección (página 7)  
> **Descripción:** Captura de pantalla del **módulo de Matemáticas** (GeometryExplorer) mostrando:
> - Selector de figura geométrica (Círculo, Cuadrado, Rectángulo, etc.)
> - Campos de entrada para dimensiones
> - Botón "Calcular"
> - Resultados mostrando área y perímetro
> - Fórmulas matemáticas visibles
> - Visualización 3D de la figura (si es posible)
>
> **Cómo tomar la captura:**
> 1. Abre https://integracion-continua-f.vercel.app/
> 2. Navega a "Matemáticas" → "Explorador de Geometría"
> 3. Selecciona "Círculo" e ingresa radio = 5
> 4. Haz clic en "Calcular"
> 5. Captura la pantalla completa mostrando resultados
> 6. Pega aquí debajo del texto "Figura 2.1"
>
> **Texto a agregar debajo de la imagen:**
> ```
> Figura 2.1: Módulo de Matemáticas - Calculadora de Geometría.
> El estudiante selecciona una figura, ingresa dimensiones y obtiene resultados instantáneos
> con las fórmulas utilizadas y visualización 3D de la figura.
> ```

---

---

> **📸 INSTRUCCIÓN PARA PANTALLAZO #3:**  
> **Ubicación:** Después del pantallazo #2 (página 8)  
> **Descripción:** Captura de pantalla del **módulo de Ciencias Naturales** (Tabla Periódica) mostrando:
> - Tabla periódica completa con los 118 elementos
> - Elementos coloreados por categoría
> - Campo de búsqueda activo
> - Al menos un elemento seleccionado mostrando su información detallada
> - Filtros visibles (por categoría o estado físico)
>
> **Cómo tomar la captura:**
> 1. Abre https://integracion-continua-f.vercel.app/
> 2. Navega a "Ciencias" → "Tabla Periódica"
> 3. Haz clic en un elemento (por ejemplo: Oxígeno - O)
> 4. Asegúrate de que se muestre el modal/card con información detallada
> 5. Captura pantalla completa
> 6. Pega aquí debajo del texto "Figura 2.2"
>
> **Texto a agregar debajo de la imagen:**
> ```
> Figura 2.2: Módulo de Ciencias Naturales - Tabla Periódica Interactiva.
> Visualización de los 118 elementos químicos con búsqueda avanzada, filtros por categoría
> y visualización 3D del átomo seleccionado.
> ```

---

---

> **📸 INSTRUCCIÓN PARA PANTALLAZO #4:**  
> **Ubicación:** Después del pantallazo #3 (página 9)  
> **Descripción:** Captura de pantalla del **módulo de Ciencias Sociales** (Geografía de Colombia) mostrando:
> - Tarjetas de departamentos colombianos
> - Campo de búsqueda visible
> - Filtro por región (Andina, Caribe, Pacífica, Orinoquía, Amazonía)
> - Al menos 3-4 departamentos visibles con:
>   * Nombre del departamento
>   * Código (3 letras)
>   * Capital
>   * Región con color distintivo
>   * Población formateada
> - Botón "Quiz de 10 Preguntas" visible
>
> **Cómo tomar la captura:**
> 1. Abre https://integracion-continua-f.vercel.app/
> 2. Navega a "Sociales" → "Geografía de Colombia"
> 3. Asegúrate de que los departamentos estén visibles en formato de tarjetas
> 4. Captura pantalla completa mostrando varias tarjetas
> 5. Pega aquí debajo del texto "Figura 2.3"
>
> **Texto a agregar debajo de la imagen:**
> ```
> Figura 2.3: Módulo de Ciencias Sociales - Explorador de Geografía Colombiana.
> Visualización de los 32 departamentos de Colombia organizados por regiones geográficas,
> con búsqueda, filtros y quiz interactivo de 10 preguntas.
> ```

---

<div style="page-break-after: always;"></div>

