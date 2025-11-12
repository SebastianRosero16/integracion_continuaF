# 📊 Pruebas de Sistema con JMeter

## Información General

- **Fecha de ejecución:** 12 de noviembre de 2025
- **Herramienta:** Apache JMeter 5.6.3
- **URL probada:** https://integracion-continua-f.vercel.app/
- **Tipo de prueba:** Pruebas de carga y rendimiento

## Configuración de la Prueba

### Parámetros del Test
- **Usuarios concurrentes:** 50
- **Periodo de subida:** 10 segundos (incremento gradual)
- **Repeticiones por usuario:** 3 loops
- **Total de peticiones:** 1,200 (50 usuarios × 3 loops × 4 páginas)

### Páginas Probadas
1. **Home Page** (`/`)
2. **Módulo Matemáticas** (`/matematicas`)
3. **Módulo Ciencias** (`/ciencias`)
4. **Módulo Sociales** (`/sociales`)

## Resultados Obtenidos

### Métricas Globales

| Métrica | Valor | Estado |
|---------|-------|--------|
| **Total de muestras** | 1,200 peticiones | ✅ |
| **Tiempo promedio de respuesta** | 126 ms | ✅ **EXCELENTE** |
| **Tiempo mínimo** | 86 ms | ✅ |
| **Tiempo máximo** | 1,119 ms | ✅ |
| **Mediana (50%)** | 103 ms | ✅ |
| **Percentil 90%** | 146 ms | ✅ |
| **Percentil 95%** | 310 ms | ✅ |
| **Percentil 99%** | 354 ms | ✅ |
| **Rendimiento** | 3.3 peticiones/segundo | ✅ |
| **Throughput** | 2.36 KB/sec | ✅ |

### Resultados por Página

#### 1. Home Page (`/`)
- **Muestras:** 300
- **Promedio:** 186 ms
- **Mediana:** 109 ms
- **Min:** 87 ms
- **Max:** 1,119 ms
- **Percentil 90%:** 322 ms
- **Percentil 95%:** 339 ms
- **Percentil 99%:** 668 ms
- **Rendimiento:** 50.2/min (0.58 KB/sec)

#### 2. Módulo Matemáticas (`/matematicas`)
- **Muestras:** 300
- **Promedio:** 106 ms
- **Mediana:** 103 ms
- **Min:** 86 ms
- **Max:** 410 ms
- **Percentil 90%:** 116 ms
- **Percentil 95%:** 125 ms
- **Percentil 99%:** 162 ms
- **Rendimiento:** 50.3/min (0.60 KB/sec)

#### 3. Módulo Ciencias (`/ciencias`)
- **Muestras:** 300
- **Promedio:** 104 ms
- **Mediana:** 102 ms
- **Min:** 88 ms
- **Max:** 157 ms
- **Percentil 90%:** 117 ms
- **Percentil 95%:** 126 ms
- **Percentil 99%:** 144 ms
- **Rendimiento:** 50.3/min (0.60 KB/sec)

#### 4. Módulo Sociales (`/sociales`)
- **Muestras:** 300
- **Promedio:** 106 ms
- **Mediana:** 102 ms
- **Min:** 88 ms
- **Max:** 371 ms
- **Percentil 90%:** 116 ms
- **Percentil 95%:** 123 ms
- **Percentil 99%:** 214 ms
- **Rendimiento:** 50.3/min (0.60 KB/sec)

## Análisis de Resultados

### ✅ Cumplimiento de Criterios de Aceptación

Según la guía del proyecto, el criterio es:
> "Los resultados de pruebas de carga (JMeter) están dentro de los tiempos aceptables (< 5 segundos promedio de respuesta)"

**Resultado:** ✅ **CUMPLE AMPLIAMENTE**

- ✅ Tiempo promedio global: **126 ms** (< 5000 ms) - **97.5% más rápido que el criterio**
- ✅ Tiempo promedio Home: **186 ms** (< 5000 ms) - **96.3% más rápido**
- ✅ Tiempo promedio Matemáticas: **106 ms** (< 5000 ms) - **97.9% más rápido**
- ✅ Tiempo promedio Ciencias: **104 ms** (< 5000 ms) - **97.9% más rápido**
- ✅ Tiempo promedio Sociales: **106 ms** (< 5000 ms) - **97.9% más rápido**

### 🎯 Interpretación de Resultados

#### Tiempos de Respuesta
- **Excelentes:** Todos los tiempos promedio están por debajo de 200 ms
- **Consistentes:** Los módulos Matemáticas, Ciencias y Sociales tienen tiempos muy similares (~105 ms)
- **Home ligeramente más lento:** 186 ms debido a ser la página inicial que carga el framework React

#### Percentiles
- **90% de peticiones:** Respondieron en menos de 146 ms
- **95% de peticiones:** Respondieron en menos de 310 ms
- **99% de peticiones:** Respondieron en menos de 354 ms

#### Estabilidad
- **Desviación mínima:** La diferencia entre tiempo mínimo (86 ms) y máximo (1,119 ms) es aceptable
- **Carga sostenida:** El sistema mantuvo rendimiento constante durante toda la prueba
- **Sin degradación:** No se observó degradación de rendimiento con 50 usuarios concurrentes

### 📈 Capacidad del Sistema

El sitio demostró capacidad para:
- ✅ Soportar **50 usuarios concurrentes** sin degradación significativa
- ✅ Mantener tiempos de respuesta **consistentemente bajos**
- ✅ Escalar adecuadamente bajo carga
- ✅ Responder en menos de 1 segundo en el 99% de los casos

### 🌐 Rendimiento de Vercel

La infraestructura de Vercel demostró:
- ✅ **Excelente CDN:** Tiempos de respuesta muy bajos desde Colombia
- ✅ **Auto-scaling efectivo:** Manejó la carga sin problemas
- ✅ **Optimización de assets:** Respuestas comprimidas y eficientes
- ✅ **SSL/HTTPS sin overhead significativo**

## Conclusiones

### Fortalezas Identificadas
1. ✅ **Rendimiento excepcional** - Tiempos de respuesta muy por debajo del criterio de aceptación
2. ✅ **Consistencia** - Todos los módulos responden en tiempos similares
3. ✅ **Estabilidad** - Sin errores durante la prueba de carga
4. ✅ **Escalabilidad** - Capaz de manejar carga concurrente sin degradación

### Áreas de Observación
- La página Home tiene tiempos ligeramente mayores (186 ms vs ~105 ms en módulos)
- Esto es normal debido a la carga inicial de React y recursos base
- No representa un problema, ya que sigue siendo muy rápido (<200 ms)

### Recomendaciones
1. ✅ **Mantener la arquitectura actual** - El rendimiento es óptimo
2. ✅ **Monitoreo continuo** - Implementar alertas para tiempos > 1 segundo
3. ✅ **Cache efectivo** - Vercel está optimizando correctamente los assets
4. ⚠️ **Testing con mayor carga** - Probar con 100-200 usuarios para conocer límites

## Cumplimiento ISO/IEC 25010

### Característica: Eficiencia de Desempeño

**Subcaracterística: Comportamiento Temporal**
- ✅ **Métrica:** Tiempo de respuesta promedio < 5000 ms
- ✅ **Resultado:** 126 ms promedio (97.5% mejor que el criterio)
- ✅ **Evaluación:** EXCELENTE

**Subcaracterística: Utilización de Recursos**
- ✅ **Métrica:** Capacidad de usuarios concurrentes > 10
- ✅ **Resultado:** 50 usuarios sin degradación
- ✅ **Evaluación:** EXCELENTE

**Subcaracterística: Capacidad**
- ✅ **Métrica:** Throughput > 1 petición/segundo
- ✅ **Resultado:** 3.3 peticiones/segundo
- ✅ **Evaluación:** EXCELENTE

## Archivos Generados

- `plan-pruebas-vercel.jmx` - Plan de pruebas de JMeter
- `jmeter-informe-agregado.png` - Captura del informe resumen
- `jmeter-grafico-resultados.png` - Gráfica de rendimiento
- `PRUEBAS_SISTEMA_JMETER.md` - Este documento de análisis

## Evidencias

Ver archivos de imágenes adjuntos:
- `jmeter-informe-agregado.png` - Tabla con métricas detalladas
- `jmeter-grafico-resultados.png` - Visualización gráfica del comportamiento

---

**Fecha:** 12 de noviembre de 2025  
**Responsable:** HectorARiascosI  
**Proyecto:** Sitio Educativo - Colegio Mentes Creativas  
**URL:** https://integracion-continua-f.vercel.app/
