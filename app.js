const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const definitionBox = document.getElementById('definition-box');
const definitionElement = document.getElementById('definition');

let currentQuestionIndex = 0;
let score = 0;



const questions = [
    {
        question: "¿Cómo afectan los Security Groups y los Network ACLs en la configuración de una VPC?",
        answers: [
            { text: "Los Security Groups permiten conexiones entrantes y salientes, mientras que los ACLs controlan el tráfico a nivel de subred y se evalúan en orden.", correct: true },
            { text: "Los ACLs son más estrictos que los Security Groups, y los Security Groups se aplican después de los ACLs.", correct: false },
            { text: "Ambos pueden configurarse para permitir o denegar el tráfico, pero solo los Security Groups pueden ser aplicados a múltiples instancias.", correct: false },
            { text: "Los Security Groups se aplican antes que los ACLs, lo que significa que un ACL puede sobreescribir las reglas de un Security Group.", correct: false }
        ],
        definition: "Los Security Groups actúan a nivel de instancia y son evaluados en un modo de 'permitir', mientras que los Network ACLs son evaluados en un modo de 'denegar' y funcionan a nivel de subred. Los ACLs se evalúan en orden, lo que puede afectar cómo se aplica el tráfico a las instancias en la VPC."
    },
   {
        question: "Explique cómo AWS Lambda gestiona la infraestructura subyacente y cómo se traduce esto en costos.",
        answers: [
            { text: "AWS Lambda utiliza un modelo de pago por uso, donde solo pagas por el tiempo de ejecución y los recursos consumidos por tus funciones.", correct: true },
            { text: "AWS Lambda cobra un precio fijo mensual, independientemente de si las funciones se ejecutan o no.", correct: false },
            { text: "Los costos de AWS Lambda se basan únicamente en la cantidad de funciones desplegadas.", correct: false },
            { text: "AWS Lambda requiere que aprovisiones los recursos, por lo que el costo depende de la cantidad de servidores que manejes.", correct: false }
        ],
        definition: "AWS Lambda gestiona automáticamente la infraestructura, lo que significa que no necesitas preocuparte por los servidores. Solo pagas por el tiempo de ejecución y la cantidad de memoria utilizada por tus funciones, lo que puede hacer que sea una opción rentable para cargas de trabajo intermitentes."
    },
    {
        question: "¿Qué servicio de AWS se utiliza para ejecutar código sin necesidad de aprovisionar servidores?",
        answers: [
            { text: "AWS Lambda", correct: true },
            { text: "Amazon EC2", correct: false },
            { text: "Amazon RDS", correct: false },
            { text: "AWS CloudFormation", correct: false }
        ],
        definition: "AWS Lambda permite ejecutar código en respuesta a eventos y automáticamente gestiona la infraestructura subyacente, eliminando la necesidad de aprovisionar servidores."
    },
    {
        question: "¿Qué es una VPC en AWS?",
        answers: [
            { text: "Una red virtual privada para aislar recursos", correct: true },
            { text: "Un servicio de almacenamiento de datos", correct: false },
            { text: "Un tipo de base de datos", correct: false },
            { text: "Un tipo de instancias EC2", correct: false }
        ],
        definition: "Una VPC (Virtual Private Cloud) permite crear una red privada aislada dentro de AWS, donde puedes implementar recursos como EC2, RDS y más."
    },
    {
        question: "¿Cuál es el propósito de los IAM Users en AWS?",
        answers: [
            { text: "Gestionar el acceso a los recursos de AWS", correct: true },
            { text: "Almacenar datos en la nube", correct: false },
            { text: "Ejecutar instancias EC2", correct: false },
            { text: "Crear redes virtuales", correct: false }
        ],
        definition: "Los IAM Users permiten gestionar y controlar el acceso a los recursos de AWS, asignando permisos específicos a cada usuario."
    },
    {
        question: "¿Qué tipo de base de datos es Amazon RDS?",
        answers: [
            { text: "Servicio de base de datos relacional", correct: true },
            { text: "Servicio de base de datos NoSQL", correct: false },
            { text: "Servicio de almacenamiento en bloques", correct: false },
            { text: "Servicio de almacenamiento de archivos", correct: false }
        ],
        definition: "Amazon RDS (Relational Database Service) es un servicio que facilita la configuración, operación y escalabilidad de bases de datos relacionales en la nube."
    },
    {
        question: "¿Cuál es la función principal de una VPN en AWS?",
        answers: [
            { text: "Conectar redes privadas a través de Internet de forma segura", correct: true },
            { text: "Almacenar datos en la nube", correct: false },
            { text: "Gestionar el tráfico de red interno", correct: false },
            { text: "Escalar instancias EC2", correct: false }
        ],
        definition: "Una VPN (Virtual Private Network) permite conectar redes privadas de forma segura a través de Internet, proporcionando una comunicación encriptada."
    },
    {
        question: "¿Qué es AWS CodePipeline?",
        answers: [
            { text: "Un servicio de integración y entrega continua", correct: true },
            { text: "Un servicio de computación sin servidor", correct: false },
            { text: "Un tipo de almacenamiento en la nube", correct: false },
            { text: "Una base de datos NoSQL", correct: false }
        ],
        definition: "AWS CodePipeline es un servicio que permite automatizar los flujos de trabajo de integración y entrega continua para aplicaciones en AWS."
    },

    {
        question: "¿Cuál es la función principal de Terraform en la gestión de infraestructuras?",
        answers: [
            { text: "Provisionar y gestionar infraestructura como código", correct: true },
            { text: "Ejecutar instancias en la nube", correct: false },
            { text: "Crear bases de datos", correct: false },
            { text: "Monitorear el rendimiento de la infraestructura", correct: false }
        ],
        definition: "Terraform es una herramienta de infraestructura como código que permite a los usuarios definir y provisionar infraestructura en múltiples proveedores de servicios en la nube a través de un lenguaje declarativo."
    },
    {
        question: "¿Cómo se diferencian los módulos en Terraform de los recursos?",
        answers: [
            { text: "Los módulos son agrupaciones de recursos reutilizables", correct: true },
            { text: "Los módulos son recursos individuales", correct: false },
            { text: "Los módulos son scripts de configuración", correct: false },
            { text: "Los módulos solo pueden ser usados en una región", correct: false }
        ],
        definition: "Los módulos en Terraform permiten agrupar varios recursos relacionados para su reutilización, simplificando la gestión de la infraestructura y promoviendo la consistencia."
    },
    {
        question: "¿Qué comando se usa en Terraform para aplicar cambios en la infraestructura?",
        answers: [
            { text: "terraform apply", correct: true },
            { text: "terraform create", correct: false },
            { text: "terraform update", correct: false },
            { text: "terraform launch", correct: false }
        ],
        definition: "El comando `terraform apply` se utiliza para aplicar los cambios definidos en la configuración de Terraform a la infraestructura real."
    },
    {
        question: "¿Qué es un State File en Terraform?",
        answers: [
            { text: "Un archivo que mantiene el estado de la infraestructura gestionada", correct: true },
            { text: "Un archivo que contiene la configuración de la red", correct: false },
            { text: "Un archivo que almacena datos de usuario", correct: false },
            { text: "Un archivo de log de actividades", correct: false }
        ],
        definition: "El State File de Terraform es un archivo que guarda el estado actual de la infraestructura, permitiendo a Terraform determinar qué cambios son necesarios para alcanzar el estado deseado."
    },
    {
        question: "¿Cómo se manejan las credenciales en Terraform?",
        answers: [
            { text: "A través de variables de entorno, archivos de configuración o proveedores de secretos", correct: true },
            { text: "Incorporando las credenciales directamente en los archivos de configuración", correct: false },
            { text: "No se requieren credenciales en Terraform", correct: false },
            { text: "Utilizando solo archivos de texto plano", correct: false }
        ],
        definition: "Las credenciales en Terraform se pueden manejar a través de variables de entorno, archivos de configuración o integraciones con proveedores de secretos, promoviendo mejores prácticas de seguridad."
    },
    {
        question: "¿Qué es un backend en Terraform?",
        answers: [
            { text: "Un sistema que almacena el estado de Terraform", correct: true },
            { text: "Un tipo de recurso en la nube", correct: false },
            { text: "Una función de configuración de red", correct: false },
            { text: "Un módulo de Terraform", correct: false }
        ],
        definition: "Un backend en Terraform define cómo y dónde se almacenará el estado de la infraestructura, permitiendo la colaboración entre equipos y la gestión remota del estado."
    },
    {
        question: "¿Cuál es la diferencia entre un VPC Endpoint y un Internet Gateway en AWS?",
        answers: [
            { text: "Un VPC Endpoint permite la comunicación privada con servicios de AWS sin usar Internet", correct: true },
            { text: "Un Internet Gateway permite la comunicación privada, mientras que un VPC Endpoint no", correct: false },
            { text: "Ambos son idénticos en función", correct: false },
            { text: "Un Internet Gateway solo se usa para servicios de terceros", correct: false }
        ],
        definition: "Un VPC Endpoint permite a las instancias dentro de una VPC conectarse a servicios de AWS sin necesidad de acceder a Internet, mientras que un Internet Gateway permite la comunicación hacia y desde Internet."
    },
    {
        question: "¿Qué es un Terraform Provider?",
        answers: [
            { text: "Un plugin que permite a Terraform interactuar con diferentes servicios", correct: true },
            { text: "Un recurso específico de Terraform", correct: false },
            { text: "Un módulo predefinido en Terraform", correct: false },
            { text: "Un tipo de archivo de configuración", correct: false }
        ],
        definition: "Un Terraform Provider es un plugin que permite a Terraform interactuar con diferentes APIs y servicios, facilitando la gestión de recursos en distintas plataformas."
    },

    {
        question: "¿Qué es un bucket en Amazon S3?",
        answers: [
            { text: "Un contenedor para almacenar objetos en S3", correct: true },
            { text: "Un tipo de instancia EC2", correct: false },
            { text: "Un servicio de balanceo de carga", correct: false },
            { text: "Un archivo de log", correct: false }
        ],
        definition: "Un bucket es un contenedor en Amazon S3 donde se almacenan los objetos. Cada bucket puede contener una cantidad ilimitada de objetos."
    },

    
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    feedbackElement.innerText = '';
    definitionBox.classList.add('hide');
    nextButton.classList.add('hide');
    nextButton.innerText = 'Siguiente';  
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    shuffleArray(currentQuestion.answers);

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, currentQuestion.definition));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    feedbackElement.innerText = '';
    definitionBox.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer, definition) {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer.correct) {
        feedbackElement.innerText = "¡Respuesta correcta!";
        score++;
    } else {
        const correctAnswer = currentQuestion.answers.find(ans => ans.correct);
        feedbackElement.innerText = `Respuesta incorrecta. La respuesta correcta es: "${correctAnswer.text}".`;
    }

    definitionElement.innerText = definition;
    definitionBox.classList.remove('hide');

    scoreElement.innerText = `Puntuación: ${score}`;
    nextButton.classList.remove('hide');  
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerText = `¡Juego terminado! Tu puntuación final es: ${score}`;
        nextButton.innerText = 'Reiniciar';  
        nextButton.classList.remove('hide');
        nextButton.removeEventListener('click', handleNextQuestion);  
        nextButton.addEventListener('click', startGame);  
    }
}

nextButton.addEventListener('click', handleNextQuestion);

// Iniciar el juego
startGame();
