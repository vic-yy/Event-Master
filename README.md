Nome provisório do projeto:
Event Master

Membros da equipe (Papel):

-Victor Yuji Yano (Full) [2022043337]

-Julio Assis Souza Amorim (Full) [2022043590]

-Marcos Daniel Souza Netto (Full) [2022069492]

-Gustavo Chaves Ferreira (Full) [2022043329]

Objetivo geral: criar um aplicativo de agendamento e gerenciamento dinâmico, público e privado, de eventos e rotinas.

Backlog do produto:
1. Criar, editar, deletar e listar usuários.
2. Criar, editar, deletar, listar e participar de eventos.
3. Promover e demitir administradores, expulsar e readmitir usuários.
4. Agrupar e buscar eventos com queries e filtros (mecanismo de busca completo).
5. Privar eventos, solicitar e permitir entrada em eventos privados.
6. Personalizar evento com envio de fotos e vídeos.
7. Personalizar perfil com foto e descrição.
8. Enviar, editar, deletar e listar mensagens entre usuários num evento.
9. Enviar, editar, deletar e listar mensagens entre usuários fora de um evento.
10. Redirecionar e compartilhar mensagens e eventos em eventos e conversas privadas.
11. Buscar mensagens em uma ou todas as conversas privadas e eventos.

Faremos as quatro primeiras no nosso primeiro sprint.

Backlog do sprint:
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

Tecnologias

-Linguagens: Typescript.

-Frameworks: Node.js (Back-end), React (Front-end).

-Banco de Dados: Prisma, MySQL.
