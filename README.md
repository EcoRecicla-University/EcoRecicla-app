# EcoRecicla-app

💻 EcoRecicla-app
Projeto front-end destinado a estudantes da organização EcoRecicla - University.

Conteúdo
Sobre
Requisitos
Instalação
Tecnologias
 
📌 Sobre
Este repositório refere-se à camada de front-end do projeto EcoRecicla - University.
Leia mais sobre este projeto no repositório de apresentação.

 
📌 Requisitos
Estes requisitos são direcionados ao desenvolvedores do projeto

 NodeJs instalado (LTS version) - necessário para o gerenciamento de pacotes da aplicação, com npm (Node Package Manager)
 Angular CLI - como instalar? - necessário para utilização do Angular e execução do projeto via terminal
 Navegador com suporte às versões recentes do JavaScript - recomenda-se o Google Chrome
 IDE / Editor de texto - recomenda-se o Visual Studio Code
No caso da utilização do VSCode, recomenda-se a utilização das seguintes extensões:

Angular Language Service
Angular Snippets
GitLens
Material Icon Theme
Requisitos específicos para Windows
Caso seu sistema operacional seja Windows, talvez alguns recursos adicionais sejam necessários:

Git for Windows - recomenda-se, para a execução de comandos referentes ao Angular, utilizar o git bash
Chocolatey ou qualquer outro gerenciador de pacotes para Windows - não é necessário, utilize apenas o npm

Necessario: 
git Bash
 
📌 Instalação
Observe atentamente os requisitos necessários para poder executar, em modo de desenvolvedor, a aplicação no seu computador

Clone este projeto
https://github.com/EcoRecicla-University/EcoRecicla-app.git
Defina as variáveis de ambiente do projeto de acordo com o exemplo
Exemplo em src/environments/environment.example.ts
Dentro do repositório clonado do projeto, abra um terminal/cmd e siga as seguintes instruções:
1️⃣ Instale as dependências do projeto

npm install
2️⃣ Instale o Angular para linha de comando (Angular CLI)

npm install -g @angular/cli
3️⃣ Execute o projeto em uma porta disponível no seu computador (default: 4200)

ng serve --port 4200
*️⃣ Se o ng serve não funcionar, veja como configurar o Angular CLI em variáveis de ambiente (Windows).

 
📌 Tecnologias
Esta camada de front-end é desenvolvida sobre as seguintes tecnologias:

 Framework Angular
 TypeScript - linguagem utilizada pelo framework
 HTML5 - linguagem de marcação utilizada nos templates
 SCSS - Estilos aplicados ao template
 Material Design para Angular - biblioteca de componentes estilizados
