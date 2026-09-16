# Algoritmo C4.5 - Árboles de Decisión (Machine Learning)

> Implementación completa en **JavaScript** y visualizador interactivo en **React** del algoritmo de aprendizaje supervisado **C4.5** de Ross Quinlan para la inducción y poda de árboles de decisión mediante cálculo de entropía, ganancia de información y tasa de ganancia.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-16.14-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-v4.12-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://v4.mui.com/)
[![D3.js Tree](https://img.shields.io/badge/Visualization-React--D3--Tree-orange?style=for-the-badge&logo=d3.js&logoColor=white)](https://github.com/bkrem/react-d3-tree)
[![Machine Learning](https://img.shields.io/badge/Field-Machine%20Learning-blue?style=for-the-badge)](https://en.wikipedia.org/wiki/C4.5_algorithm)

---

## 📋 Descripción General

Este proyecto consiste en el desarrollo e implementación del algoritmo clásico de minería de datos y Machine Learning **C4.5**, propuesto originalmente por **Ross Quinlan** (1993) como una extensión sustancial del algoritmo **ID3** (*Iterative Dichotomiser 3*).

La aplicación permite:
1. Ingerir cualquier conjunto de datos clasificado en formato tabular (`.csv`) o utilizar conjuntos de entrenamiento precargados.
2. Construir inductivamente el árbol de clasificación mediante cálculo probabilístico de entropía.
3. Contrastar visualmente las dos métricas de partición: **Ganancia de Información** (*Information Gain*) vs. **Tasa de Ganancia** (*Gain Ratio*).
4. Parametrizar un **umbral de ganancia** para podar o detener el crecimiento del árbol ante impurezas insignificantes.
5. Explorar la jerarquía de decisiones y reglas de clasificación de forma dinámica e interactiva con zoom y pan sobre un grafo SVG renderizado con D3.

---

## 🔬 Fundamentación Teórica

El algoritmo **C4.5** construye un árbol de decisión de arriba hacia abajo (*top-down induction of decision trees*) a partir de un conjunto de datos de entrenamiento $S$, seleccionando recursivamente en cada nodo el atributo que mejor divide las muestras según su capacidad discriminativa.

### 1. Entropía de Shannon

La entropía cuantifica la impureza o incertidumbre del conjunto de datos con respecto a la variable objetivo (clase). Para un conjunto $S$ con $c$ clases posibles:

$$Entropy(S) = - \sum_{i=1}^{c} p_i \log_2(p_i)$$

Donde $p_i$ es la proporción de ejemplos en $S$ que pertenecen a la clase $i$.
- Si todos los elementos pertenecen a la misma clase, la muestra es pura y $Entropy(S) = 0$.
- Si los elementos se encuentran uniformemente distribuidos entre las clases, la impureza es máxima ($Entropy(S) = 1$ en problemas binarios).

### 2. Ganancia de Información (ID3)

Mide la reducción esperada en la entropía al particionar el conjunto $S$ según los valores del atributo $A$:

$$Gain(S, A) = Entropy(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} Entropy(S_v)$$

Donde $Values(A)$ representa el conjunto de valores posibles del atributo $A$, y $S_v$ es el subconjunto de $S$ donde el atributo toma el valor $v$.

> **Limitación de ID3**: La Ganancia de Información presenta un sesgo natural hacia atributos con un número elevado de valores disjuntos (por ejemplo, números de identificación, DNI o códigos postales), los cuales generan ramas artificialmente puras pero carentes de capacidad de generalización.

### 3. Información de División y Tasa de Ganancia (C4.5)

Para mitigar este sesgo, Quinlan introdujo la **Tasa de Ganancia** (*Gain Ratio*), normalizando la ganancia mediante la **Información de División** (*Split Information*):

$$SplitInfo_A(S) = - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} \log_2\left(\frac{|S_v|}{|S|}\right)$$

$$GainRatio(S, A) = \frac{Gain(S, A)}{SplitInfo_A(S)}$$

La métrica penaliza fuertemente a los atributos que generan muchas ramas pequeñas y uniformes, prefiriendo particiones equilibradas y con alto poder explicativo.

### 4. Criterios de Parada y Poda por Umbral

El proceso de partición recursiva para una rama se detiene cuando:
- **Pureza total**: Todos los ejemplos en el nodo actual pertenecen a la misma clase ($Entropy = 0$).
- **Agotamiento de atributos**: Ya no restan atributos predictivos para continuar la partición; se asigna la clase mayoritaria.
- **Criterio de Umbral ($Umbral \in [0, 1]$)**: Si la máxima ganancia (o tasa de ganancia) obtenida es menor al umbral especificado por el usuario, la ramificación se detiene prematuramente y se etiqueta el nodo hoja con el valor de clase más frecuente.

---

## 🚀 Funcionalidades de la Aplicación

- 📂 **Ingesta Dinámica de Datasets**: Soporte para archivos `.csv` arbitrarios procesados en el cliente con encabezados tipados dinámicamente (`react-csv-reader` / `PapaParse`).
- 📊 **Análisis Comparativo Simultáneo**:
  - Modo **Árbol con Ganancia**: Partición estándar basada en Ganancia de Información.
  - Modo **Árbol con Tasa de Ganancia**: Partición basada en Gain Ratio de Quinlan.
  - Modo **Vista Dual**: Comparación lado a lado para evaluar diferencias topológicas y de profundidad entre ambos criterios.
- 🎛️ **Control de Umbral Interactivo**: Ajuste fino del umbral de poda ($0.000$ a $1.000$) para estudiar la sensibilidad a la sobre-ramificación (overfitting).
- 🌲 **Visualización Gráfica Interactiva**:
  - Renderizado jerárquico SVG con centrado automático (`useCenteredTree`).
  - Capacidad de zoom in / zoom out, arrastre (pan) y colapso/expansión de ramas.
  - Diferenciación visual entre nodos de decisión (atributos) y nodos hoja (clases clasificadas).
- 📑 **Conjuntos de Prueba Incluidos**: Varios datasets clásicos precargados para validación inmediata del algoritmo.

---

## 💻 Instalación y Uso Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 14 o superior; 16/18 recomendada)
- [Yarn](https://classic.yarnpkg.com/) o [npm](https://www.npmjs.com/)

### 1. Clonar el repositorio
```bash
git clone https://github.com/maxivalenzano/IA-Algoritmo-C4.5.git
cd IA-Algoritmo-C4.5
```

### 2. Instalar dependencias
```bash
yarn install
# o con npm:
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
yarn start
# o con npm:
npm start
```

La aplicación iniciará automáticamente en [http://localhost:3000](http://localhost:3000).

### 4. Compilar para producción
```bash
yarn build
```
Genera los archivos estáticos optimizados en la carpeta `build/`.

---

## 📁 Estructura del Código

```text
IA-Algoritmo-C4.5/
├── public/                     # Plantillas HTML y assets públicos
├── src/
│   ├── App.jsx                 # Componente principal, selector de CSV y vistas comparativas
│   ├── DecisionTree.jsx        # Contenedor del árbol basado en Ganancia de Información
│   ├── DecisionTreeTG.jsx      # Contenedor del árbol basado en Tasa de Ganancia (C4.5)
│   ├── funciones.js            # Motor matemático: entropía, ganancia, tasa, split y recursión
│   ├── useCenteredTree.jsx     # Hook personalizado para centrado dinámico del grafo SVG
│   ├── boton.jsx               # Controladores de acción y validación de datasets
│   ├── styles.css              # Estilos generales y animaciones
│   ├── conjuntoEntrenamiento*.js # Datasets de muestra (1 al 6)
│   └── index.jsx               # Punto de entrada de React DOM
├── package.json                # Dependencias y scripts del proyecto
└── README.md                   # Documentación técnica y académica
```

---

## 🎓 Contexto Académico

Este proyecto fue desarrollado en el marco de la asignatura **Inteligencia Artificial** correspondiente a la carrera de **Ingeniería en Sistemas de Información** (Universidad Tecnológica Nacional - UTN).

- **Materia**: Inteligencia Artificial
- **Grupo**: 10
- **Objetivo**: Diseñar una herramienta pedagógica interactiva que permita asimilar de forma visual y experimental el funcionamiento interno, las fórmulas estadísticas y las diferencias de convergencia de los árboles de decisión inductivos ID3 y C4.5.

---

## 📚 Bibliografía y Referencias

1. **Quinlan, J. R.** (1993). *C4.5: Programs for Machine Learning*. Morgan Kaufmann Publishers.
2. **Quinlan, J. R.** (1986). *Induction of Decision Trees*. Machine Learning 1: 81–106.
3. **Mitchell, Tom M.** (1997). *Machine Learning*. McGraw-Hill Science/Engineering/Math (Capítulo 3: Decision Tree Learning).
4. **Shannon, Claude E.** (1948). *A Mathematical Theory of Communication*. Bell System Technical Journal, 27(3), 379–423.

---

## 👤 Autor

**Maximiliano Valenzano**
- GitHub: [@maxivalenzano](https://github.com/maxivalenzano)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
