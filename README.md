<h1 align='center'> Trabalho de Engenharia de Software </h2>

<h2 align='center'> Event Master </h2>

### Membros da equipe (Papel) [Matrícula]:

- Victor Yuji Yano (Full) [2022043337]

- Julio Assis Souza Amorim (Full) [2022043590]

- Marcos Daniel Souza Netto (Full) [2022069492]

- Gustavo Chaves Ferreira (Full) [2022043329]

### Sobre o projeto: 

<b>Objetivo geral</b>: Desenvolver um aplicativo para agendamento e gerenciamento dinâmico, público e privado, de eventos.

#### Backlog do produto:
1. Como usuário, eu quero poder criar, editar e deletar meus perfil.
2. Como usuário, eu quero personalizar meu perfil com foto e descrição para me apresentar aos demais.
3. Como usuário, eu quero poder criar, editar, deletar, listar e participar de eventos.
4. Como usuário, eu quero poder buscar eventos com filtros para encontrá-los.
5. Como usuário, eu quero visualizar eventos e buscar eventos específicos por meio de query.
6. Como usuário, eu quero poder visualizar grupos (categorias) dos eventos e filtrá-los por meio deles.
7. Como participante de evento, eu quero me inscrever no evento.
8. Como administrador, eu quero promover e demitir outros administradores, expulsar e readmitir usuários.
9. Como organizador de eventos, eu quero criar eventos públicos e permitir que usuários se inscrevam.
10. Como organizador de eventos, eu quero personalizar o evento com detalhes e fotos para enriquecer a experiência.
11. Redirecionar e compartilhar mensagens e eventos em eventos e conversas privadas.
12. Buscar mensagens em uma ou todas as conversas privadas e eventos.

<b>_Nota: Faremos as quatro primeiras no nosso primeiro sprint._</b>

#### Backlog do sprint:
1. Criar, editar, deletar e listar usuários.
   
   1.1. Criar um sistema de cadastro de usuários (BE) [Victor].
   
   1.2. Criar interface de cadastro [Marcos].
   
   1.3. Criar um sistema de login de usuários (BE) [Victor].
   
   1.4. Criar interface de login [Gustavo].
   
   1.5. Criar interface de edição de perfil (editar nome, logout e deletar perfil) [Gustavo].
   
2. Criar, editar, deletar, listar e participar de eventos.
   
   2.1. Criar mecanismo de criação de eventos (eventos públicos ou lembretes pessoais, BE) [Marcos].
   
   2.2. Criar mecanismo de participação de eventos (funções de dono do evento e participante, BE) [Julio].
   
   2.3. Criar interface de listagem de eventos. [Victor]
   
   2.4. Criar interface de visualização de eventos (individual, com nome, descrição, datas e participantes). [Marcos]
   
   2.5. Criar interface de criação de eventos. [Julio]
   
   2.6. Criar interface de edição de eventos (editar informações, deletar ou sair do evento). [Marcos]
   
3. Promover e demitir administradores, expulsar e readmitir usuários.
   
   3.1. Criar função de administrador (pode editar o evento, mas não deletá-lo, BE). [Julio]
   
   3.2. Criar opção de promover um participante a administrador ou rebaixar um administrador a um participante (FE). [Marcos]

   3.3. Criar função de usuário expulso (sem acesso às datas do evento, BE). [Julio]
   
   3.3. Criar opção de expulsar um participante do evento (FE). [Marcos]
   
   3.6. Criar opção de readmitir um usuário expulso. [Marcos]
   
4. Agrupar e buscar eventos com queries e filtros (mecanismo de busca completo).
   
   4.1. Criar sistema de grupo de eventos (tags públicas, BE). [Julio]
   
   4.2. Criar mecanismo de busca de eventos. [Gustavo]
   
   4.3. Criar filtros para a busca (grupo, datas, localização, público/pessoal, participantes). [Gustavo]
   
   4.4. Criar interface de busca. [Gustavo]
   
   4.5. Criar interface de visualização de grupos. [Victor]

### Tecnologias

- Linguagens: Typescript.

- Frameworks: 
    - <b>Backend</b>: Node.js + Express.
    - <b>Frontend</b>: React.js + Vite (Hot Reload) + MaterialUI (Componentização).

- Banco de Dados: PrismaORM + MySql (Em Docker).


## UML:

Diagrama de Pacotes:

![Diagrama de Pacotes](./UMLPackage.png)

Diagrama de Atividades:

![Diagrama de Atividades](./UMLAtividades.png)