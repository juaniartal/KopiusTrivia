const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const definitionBox = document.getElementById('definition-box');
const definitionElement = document.getElementById('definition');

let currentQuestionIndex = 0;
let score = 0;
let lastScrollTop = 0;
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        // Desplazándose hacia abajo
        footer.classList.remove('show');
    } else {
        // Desplazándose hacia arriba
        footer.classList.add('show');
    }
    
    lastScrollTop = scrollTop;
});


const questions = [
    const questions = [
    {
        question: "Un cliente te solicita alojar una página web estática en AWS. ¿Cuál es el primer servicio que deberías considerar y por qué?",
        answers: [
            { text: "Amazon S3, porque permite alojar contenido estático de forma rentable y con alta disponibilidad.", correct: true },
            { text: "Amazon EC2, ya que proporciona servidores para cualquier tipo de aplicación.", correct: false },
            { text: "AWS Lambda, pues permite ejecutar funciones sin servidores de fondo.", correct: false },
            { text: "Amazon RDS, ideal para almacenar datos de manera segura.", correct: false }
        ],
        definition: "Amazon S3 es ideal para alojar contenido estático, como HTML, CSS, JavaScript e imágenes, debido a su alta disponibilidad y costo accesible."
    },

    {
        question: "Un cliente te pide implementar una web dinámica con una base de datos en AWS. ¿Qué servicio recomendarías para la base de datos y por qué?",
        answers: [
            { text: "Amazon RDS, ya que permite escalar y gestionar bases de datos relacionales.", correct: true },
            { text: "AWS Lambda, porque permite gestionar datos en formato JSON.", correct: false },
            { text: "Amazon DynamoDB, ya que es ideal para bases de datos NoSQL rápidas.", correct: false },
            { text: "Amazon S3, dado que permite almacenar objetos de cualquier tamaño.", correct: false }
        ],
        definition: "Amazon RDS es adecuado para aplicaciones web que requieren una base de datos relacional con capacidad de gestión y escalabilidad."
    },

    {
        question: "Para que una instancia EC2 sea accesible desde Internet, ¿qué configuraciones necesitas aplicar?",
        answers: [
            { text: "Asignarle una IP pública o elástica y configurar un Security Group que permita tráfico en los puertos 80 y 443.", correct: true },
            { text: "Vincular un VPC Endpoint con la instancia y asignar un Security Group que permita solo HTTP.", correct: false },
            { text: "Configurar un NAT Gateway y un ACL de red que permita tráfico a la IP pública.", correct: false },
            { text: "Asignarle una IP privada y habilitar el tráfico de salida en el Security Group.", correct: false }
        ],
        definition: "Para que una instancia EC2 sea accesible desde Internet, necesita una IP pública, un Security Group configurado para tráfico HTTP/HTTPS y estar en una subnet pública."
    },

    {
        question: "Un cliente necesita almacenar grandes cantidades de imágenes y vídeos para su sitio web. ¿Qué servicio de AWS recomendarías y por qué?",
        answers: [
            { text: "Amazon S3, por su capacidad de almacenar archivos de gran tamaño con fácil acceso.", correct: true },
            { text: "AWS Lambda, ya que permite el almacenamiento temporal de grandes archivos.", correct: false },
            { text: "Amazon EC2, debido a su flexibilidad para almacenar y procesar archivos de datos multimedia.", correct: false },
            { text: "Amazon RDS, para almacenamiento optimizado y rápido acceso.", correct: false }
        ],
        definition: "Amazon S3 es el mejor servicio para almacenar grandes cantidades de datos como imágenes y videos, ofreciendo alta escalabilidad y accesibilidad directa."
    },

    {
        question: "Un cliente quiere habilitar HTTPS para su sitio web en AWS. ¿Qué servicio de AWS puede proporcionarte un certificado SSL/TLS gratuito?",
        answers: [
            { text: "AWS Certificate Manager, que permite emitir y gestionar certificados SSL/TLS sin costo.", correct: true },
            { text: "Route 53, al administrar dominios personalizados y certificación básica.", correct: false },
            { text: "Amazon CloudFront, mediante sus configuraciones de caché y seguridad de conexión.", correct: false },
            { text: "Amazon EC2, ya que permite configurar certificados directamente en cada instancia.", correct: false }
        ],
        definition: "AWS Certificate Manager permite gestionar certificados SSL/TLS gratuitos para HTTPS, integrándose fácilmente con servicios como CloudFront y Load Balancers."
    },

    {
        question: "Tu cliente quiere mejorar la velocidad de su sitio web en distintas regiones del mundo. ¿Qué servicio de AWS recomendarías y por qué?",
        answers: [
            { text: "CloudFront, una red de distribución de contenido (CDN) que almacena contenido en ubicaciones cercanas a los usuarios.", correct: true },
            { text: "Auto Scaling, que permite crear réplicas de instancias EC2 en distintas regiones.", correct: false },
            { text: "Route 53, gestionando tráfico y resolviendo DNS globalmente.", correct: false },
            { text: "Direct Connect, dado que mejora el rendimiento de red entre regiones.", correct: false }
        ],
        definition: "CloudFront es ideal para acelerar sitios web globalmente mediante la caché de contenido en ubicaciones cercanas a los usuarios, reduciendo la latencia."
    },

    {
        question: "Un cliente espera un alto volumen de tráfico en su sitio web. ¿Qué servicio de AWS recomendarías para balancear el tráfico entre varias instancias de EC2?",
        answers: [
            { text: "Application Load Balancer, que distribuye tráfico entre varias instancias.", correct: true },
            { text: "Network Load Balancer, ya que administra tráfico UDP para grandes volúmenes de datos.", correct: false },
            { text: "Auto Scaling, ya que permite escalar las instancias EC2 según la demanda.", correct: false },
            { text: "Amazon RDS, que balancea cargas entre bases de datos distribuidas.", correct: false }
        ],
        definition: "El Application Load Balancer distribuye el tráfico entre múltiples instancias EC2, ideal para aplicaciones web con alto volumen de usuarios."
    },

    {
        question: "Tu cliente desea un dominio personalizado para su sitio en AWS. ¿Qué servicio de AWS facilita la compra y configuración de dominios?",
        answers: [
            { text: "Route 53, ya que permite registrar y gestionar nombres de dominio personalizados.", correct: true },
            { text: "Amazon S3, donde es posible almacenar configuraciones de dominio y redireccionamiento.", correct: false },
            { text: "CloudFront, que permite asociar un dominio personalizado a un distribuidor de contenido.", correct: false },
            { text: "AWS Lambda, para gestionar y redirigir tráfico de dominios personalizados.", correct: false }
        ],
        definition: "Route 53 permite registrar, gestionar y configurar dominios personalizados, facilitando el enrutamiento del tráfico hacia los recursos de AWS."
    },

    {
        question: "El cliente desea que la configuración de su infraestructura sea replicable y automatizable. ¿Qué servicio de AWS recomiendas para implementar 'infraestructura como código'?",
        answers: [
            { text: "CloudFormation, ya que permite definir y gestionar infraestructura mediante plantillas.", correct: true },
            { text: "CodePipeline, que permite crear flujos de trabajo para automatizar despliegues.", correct: false },
            { text: "Auto Scaling, ya que escala la infraestructura de forma automática.", correct: false },
            { text: "CloudTrail, dado que monitorea cambios en la infraestructura.", correct: false }
        ],
        definition: "CloudFormation permite implementar y replicar infraestructura en AWS mediante archivos de plantilla, garantizando configuraciones consistentes y automatizadas."
    }

        {
        question: "¿Qué configuraciones de seguridad y protocolos se deben considerar al utilizar un Application Load Balancer para tráfico HTTPS?",
        answers: [
            { text: "Debe configurarse un certificado SSL en el ALB, y se recomienda usar políticas de seguridad avanzadas como TLS 1.2 para proteger el tráfico de capa 7.", correct: true },
            { text: "Es suficiente con configurar HTTPS en las instancias EC2 del Target Group sin necesidad de modificar el Load Balancer.", correct: false },
            { text: "El ALB soporta únicamente HTTP, por lo que la seguridad de HTTPS debe implementarse directamente en cada instancia.", correct: false },
            { text: "Para habilitar HTTPS en un ALB, basta con usar una conexión VPN sin necesidad de certificados adicionales.", correct: false }
        ],
        definition: "Para asegurar el tráfico HTTPS en un Application Load Balancer, se debe configurar un certificado SSL en el ALB y aplicar políticas de seguridad TLS avanzadas. Esto permite encriptar las solicitudes y proteger los datos de los usuarios."
    },
        {
        question: "¿Cómo funcionan las reglas de enrutamiento en un Application Load Balancer y cuál es un caso de uso típico?",
        answers: [
            { text: "Las reglas de enrutamiento permiten definir condiciones para redirigir el tráfico a diferentes Target Groups según la URL solicitada, lo que es útil en aplicaciones con múltiples microservicios.", correct: true },
            { text: "Las reglas de enrutamiento redirigen automáticamente todo el tráfico entrante al primer Target Group sin necesidad de configuraciones adicionales.", correct: false },
            { text: "Las reglas solo se aplican cuando hay fallas en el Target Group principal y permiten reintentar solicitudes a otras instancias.", correct: false },
            { text: "El enrutamiento siempre dirige el tráfico al Target Group configurado por defecto, lo cual no puede modificarse.", correct: false }
        ],
        definition: "Las reglas de enrutamiento en un Application Load Balancer permiten definir condiciones específicas para redirigir tráfico según la URL, encabezados o patrones de ruta, lo cual es especialmente útil en arquitecturas con microservicios."
    },
        {
        question: "¿Qué es un health check en un Load Balancer y cómo funciona para asegurar la disponibilidad de las instancias?",
        answers: [
            { text: "Un health check monitorea la salud de las instancias verificando su respuesta en un endpoint específico, y redirige el tráfico a instancias sanas si una falla.", correct: true },
            { text: "Un health check balancea el tráfico entre las instancias dependiendo de su capacidad de procesamiento.", correct: false },
            { text: "El health check se usa para asegurar que el Load Balancer distribuya tráfico solo a instancias que no tengan alta latencia.", correct: false },
            { text: "El health check monitorea la infraestructura de red para asegurar que solo se use ancho de banda optimizado en las instancias.", correct: false }
        ],
        definition: "Un health check en un Load Balancer permite verificar la disponibilidad de las instancias, asegurando que solo se envíe tráfico a las instancias que respondan de manera correcta y se encuentren en buen estado."
    },
        {
        question: "¿Cómo distribuye el tráfico un Application Load Balancer entre las instancias dentro de un Target Group?",
        answers: [
            { text: "El ALB utiliza algoritmos de balanceo como round-robin y routing basado en reglas de capa 7 para distribuir el tráfico entre las instancias en un Target Group.", correct: true },
            { text: "El ALB distribuye el tráfico aleatoriamente entre las instancias, sin utilizar reglas de capa 7.", correct: false },
            { text: "El ALB solo soporta balanceo en una sola AZ, usando un único algoritmo de round-robin.", correct: false },
            { text: "El ALB siempre envía el tráfico al destino menos ocupado en términos de latencia.", correct: false }
        ],
        definition: "El Application Load Balancer distribuye el tráfico entre las instancias de un Target Group utilizando algoritmos de balanceo, como round-robin y routing avanzado de capa 7, permitiendo una distribución equilibrada del tráfico."
    },
        {
        question: "¿Cuál es la diferencia entre un Application Load Balancer (ALB) y un Network Load Balancer (NLB) en AWS?",
        answers: [
            { text: "El ALB opera en la capa 7 del modelo OSI, ideal para aplicaciones web HTTP/HTTPS, mientras que el NLB opera en la capa 4 y se usa para aplicaciones de baja latencia y alto rendimiento.", correct: true },
            { text: "El ALB opera en la capa 4 del modelo OSI, mientras que el NLB opera en la capa 7 y es ideal para tráfico HTTP/HTTPS.", correct: false },
            { text: "Ambos operan en la capa 4 y tienen el mismo propósito, pero el ALB solo se usa en VPC privadas.", correct: false },
            { text: "El NLB es una versión mejorada del ALB que funciona exclusivamente en tráfico HTTP/HTTPS.", correct: false }
        ],
        definition: "El Application Load Balancer (ALB) opera en la capa 7 del modelo OSI, es ideal para aplicaciones web HTTP/HTTPS y permite el enrutamiento avanzado, mientras que el Network Load Balancer (NLB) opera en la capa 4, siendo adecuado para aplicaciones de baja latencia y alto rendimiento."
    },

        {
        question: "En una arquitectura de alta disponibilidad con múltiples zonas de disponibilidad (AZ), ¿cuántas subnets deberías crear y cómo definirías su uso?",
        answers: [
            { text: "Debes crear al menos una subnet pública y una privada en cada AZ, para distribuir el tráfico y evitar puntos únicos de fallo, manteniendo las aplicaciones privadas sin acceso directo a Internet.", correct: true },
            { text: "Solo necesitas una subnet pública por VPC y el resto deben ser privadas en cualquier AZ.", correct: false },
            { text: "Debes crear una única subnet pública en una AZ principal y todas las subnets privadas en las demás AZs para maximizar la seguridad.", correct: false },
            { text: "La cantidad de subnets no influye en la disponibilidad, pero deben estar todas configuradas como privadas para maximizar la seguridad.", correct: false }
        ],
        definition: "En una arquitectura de alta disponibilidad, se recomienda crear al menos una subnet pública y una privada en cada zona de disponibilidad (AZ) disponible en la región. Esto permite distribuir el tráfico, minimizando el riesgo de puntos únicos de fallo y facilitando una comunicación segura entre las subnets."
    }
];
        {
        question: "En una configuración estándar de VPC, ¿cómo configuras subnets públicas y privadas y aseguras que las subnets privadas no tengan acceso directo a Internet?",
        answers: [
            { text: "Asignando un Internet Gateway a la VPC y asociándolo solo a las subnets públicas, mientras que las subnets privadas pueden usar un NAT Gateway o NAT Instance para tener acceso limitado a Internet.", correct: true },
            { text: "Asignando un Internet Gateway solo a las subnets privadas y usando Network ACLs para bloquear el tráfico entrante.", correct: false },
            { text: "Usando una VPN conectada a las subnets públicas para proporcionar acceso seguro a Internet y manteniendo las privadas aisladas.", correct: false },
            { text: "Configurando un VPC Endpoint en la subnet privada para otorgar acceso a Internet solo a servicios de AWS.", correct: false }
        ],
        definition: "En una configuración estándar de VPC, las subnets públicas están asociadas con un Internet Gateway, permitiendo el acceso directo a Internet. Las subnets privadas, sin un Internet Gateway, pueden acceder a Internet a través de un NAT Gateway o NAT Instance, lo cual permite la salida pero bloquea el tráfico entrante de Internet."
    },
        {
        question: "¿Cuál es la función de los Target Groups en un Application Load Balancer (ALB) y cómo ayuda en la escalabilidad de aplicaciones?",
        answers: [
            { text: "Los Target Groups definen los destinos de tráfico, como instancias EC2 o funciones Lambda, y facilitan la escalabilidad al distribuir el tráfico automáticamente.", correct: true },
            { text: "Los Target Groups almacenan configuraciones de enrutamiento avanzadas que pueden mejorar el tiempo de respuesta de la aplicación.", correct: false },
            { text: "Un Target Group solo puede estar asociado con un único Load Balancer para asegurar la seguridad de la red.", correct: false },
            { text: "Los Target Groups permiten asignar direcciones IP directas, evitando la necesidad de un Load Balancer.", correct: false }
        ],
        definition: "Los Target Groups en un Application Load Balancer permiten agrupar y definir los destinos de tráfico, como instancias EC2 o funciones Lambda, facilitando la distribución dinámica y escalabilidad automática de las aplicaciones."
    },
    
    {
        question: "¿Cómo se puede configurar una política de enrutamiento geográfico en Amazon Route 53 y en qué situaciones es útil?",
        answers: [
            { text: "La política de enrutamiento geográfico dirige el tráfico basado en la ubicación geográfica del usuario, útil para mejorar la latencia y cumplir con requisitos regulatorios.", correct: true },
            { text: "La política de enrutamiento geográfico se basa en la proximidad de la región de AWS y permite reducir costos.", correct: false },
            { text: "Route 53 asigna automáticamente una ubicación geográfica óptima sin necesidad de configuración manual.", correct: false },
            { text: "Las políticas de enrutamiento geográfico requieren la configuración de varias VPCs en distintas regiones para funcionar.", correct: false }
        ],
        definition: "El enrutamiento geográfico en Amazon Route 53 permite dirigir el tráfico en función de la ubicación geográfica del usuario, lo que es útil para cumplir con requisitos locales de residencia de datos o reducir la latencia al servir contenido desde la región más cercana."
    },
    
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
        question: "En un entorno de múltiples cuentas de AWS, ¿cómo puedes implementar una arquitectura de red segura utilizando VPCs?",
        answers: [
            { text: "Implementando VPC Peering y VPNs entre cuentas, y utilizando controles de acceso adecuados para gestionar la comunicación.", correct: true },
            { text: "Utilizando solo VPCs públicas para garantizar la disponibilidad en todas las cuentas.", correct: false },
            { text: "Centralizando todos los recursos en una única cuenta para evitar la complejidad de múltiples VPCs.", correct: false },
            { text: "Aislando cada cuenta en su propia región de AWS para mejorar la seguridad.", correct: false }
        ],
        definition: "Para implementar una arquitectura de red segura en múltiples cuentas de AWS, se puede utilizar VPC Peering para habilitar la comunicación entre VPCs y VPNs para conectar redes locales a las VPCs. Es importante gestionar los controles de acceso y las políticas de seguridad para asegurar la comunicación entre recursos."
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
        question: "¿Qué consideraciones de seguridad debes tener en cuenta al crear IAM Users y políticas en AWS?",
        answers: [
            { text: "Aplicar el principio de privilegio mínimo, usar MFA y revisar regularmente las políticas de acceso.", correct: true },
            { text: "Crear IAM Users con acceso de administrador por defecto para facilitar la gestión.", correct: false },
            { text: "No es necesario auditar las políticas de acceso una vez creadas.", correct: false },
            { text: "Limitar el uso de grupos, ya que complican la gestión de usuarios.", correct: false }
        ],
        definition: "Al crear IAM Users y políticas en AWS, es crucial aplicar el principio de privilegio mínimo, asegurando que los usuarios solo tengan los permisos necesarios. También es importante implementar la autenticación multifactor (MFA) y revisar las políticas de acceso de manera regular para garantizar la seguridad."
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
        question: "¿Cuáles son las implicaciones de usar un RDS Multi-AZ en comparación con una configuración de RDS en una sola AZ?",
        answers: [
            { text: "Un RDS Multi-AZ proporciona alta disponibilidad y recuperación ante desastres, mientras que una sola AZ puede ser vulnerable a fallos.", correct: true },
            { text: "Un RDS Multi-AZ es más barato y eficiente que uno en una sola AZ.", correct: false },
            { text: "La configuración Multi-AZ permite realizar actualizaciones sin tiempo de inactividad, mientras que en una sola AZ el tiempo de inactividad es inevitable.", correct: false },
            { text: "Ambas configuraciones ofrecen el mismo nivel de disponibilidad y rendimiento.", correct: false }
        ],
        definition: "Un RDS Multi-AZ proporciona alta disponibilidad y protección ante fallos, replicando automáticamente el almacenamiento de la base de datos en otra zona de disponibilidad. En comparación, una configuración en una sola AZ es más susceptible a interrupciones y no ofrece las mismas garantías de recuperación."
    },
    {
        question: "Analiza la función de una VPN en un entorno de nube híbrido y sus beneficios frente a una conexión directa.",
        answers: [
            { text: "Las VPNs ofrecen una conexión encriptada a través de Internet, permitiendo una integración más flexible con recursos locales.", correct: true },
            { text: "Las conexiones directas son siempre más seguras y no requieren configuración adicional.", correct: false },
            { text: "Las VPNs son más rápidas y tienen menos latencia que las conexiones directas.", correct: false },
            { text: "Las VPNs solo deben usarse en entornos de producción, no en desarrollo.", correct: false }
        ],
        definition: "Las VPNs permiten conectar de manera segura las redes locales con la nube, ofreciendo encriptación y flexibilidad en la integración. En comparación con las conexiones directas, las VPNs pueden ser más fáciles de configurar y administrar, aunque pueden tener una latencia más alta."
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
        question: "Analiza la función de una VPN en un entorno de nube híbrido y sus beneficios frente a una conexión directa.",
        answers: [
            { text: "Las VPNs ofrecen una conexión encriptada a través de Internet, permitiendo una integración más flexible con recursos locales.", correct: true },
            { text: "Las conexiones directas son siempre más seguras y no requieren configuración adicional.", correct: false },
            { text: "Las VPNs son más rápidas y tienen menos latencia que las conexiones directas.", correct: false },
            { text: "Las VPNs solo deben usarse en entornos de producción, no en desarrollo.", correct: false }
        ],
        definition: "Las VPNs permiten conectar de manera segura las redes locales con la nube, ofreciendo encriptación y flexibilidad en la integración. En comparación con las conexiones directas, las VPNs pueden ser más fáciles de configurar y administrar, aunque pueden tener una latencia más alta."
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
        question: "¿Qué estrategias puedes utilizar para asegurar que el State File de Terraform esté protegido y disponible?",
        answers: [
            { text: "Usar un backend remoto como S3 con cifrado y acceso controlado para almacenar el State File de forma segura.", correct: true },
            { text: "Mantener el State File en el mismo directorio que los archivos de configuración de Terraform.", correct: false },
            { text: "El State File no necesita medidas de seguridad, ya que solo se utiliza localmente.", correct: false },
            { text: "Usar archivos de texto plano para compartir el State File entre los miembros del equipo.", correct: false }
        ],
        definition: "Usar un backend remoto, como S3, con cifrado y control de acceso, es una estrategia efectiva para proteger el State File de Terraform. Esto asegura que el estado de la infraestructura esté seguro y disponible para los miembros del equipo."
    },
    {
        question: "¿Qué desafíos presenta la gestión de credenciales en un entorno de múltiples equipos utilizando Terraform?",
        answers: [
            { text: "La gestión de credenciales puede ser compleja, requiriendo prácticas de seguridad robustas para prevenir el acceso no autorizado.", correct: true },
            { text: "No hay desafíos, ya que Terraform gestiona automáticamente las credenciales sin intervención del usuario.", correct: false },
            { text: "Las credenciales solo deben ser almacenadas en el State File de Terraform.", correct: false },
            { text: "Los entornos de múltiples equipos pueden simplificar la gestión de credenciales, ya que todos comparten las mismas credenciales.", correct: false }
        ],
        definition: "La gestión de credenciales en un entorno de múltiples equipos puede ser compleja, requiriendo prácticas robustas de seguridad y control de acceso. Es crucial evitar el almacenamiento de credenciales sensibles en el State File y en su lugar utilizar herramientas de gestión de secretos."
    }
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
