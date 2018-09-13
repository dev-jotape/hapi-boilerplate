# Hapi Boilerplate

Este é um boilerplate baseado no projeto [hapi-api-boilerplate](https://github.com/FernandoCagale/hapi-api-boilerplate) que utiliza Hapi.js e Sequelize (K7), porém foi alterado para aplicar o frameworks Hapi.js v17+ e Sequelize (Postgres).

#### Estrutura do Projeto

* **src** é o diretório principal do código-fonte.
  * **core** é o diretório onde fica os arquivos importantes para dar o bootstrap do sistema
    * **plugins** é o diretório aonde fica os plugins a serem carregados pelo bootstrap.
    * **utils** é o diretório aonde fica algumas ferramentas de auxilio para o bootstrap (Variáveis de ambiente fica nesse diretório no arquivo `load.js`)
  * **modules** é o local onde encontram-se os arquivos das entidades que serão utilizadas na API.
  * **test** é o local responsável por carregar todo o ambiente de teste.

#### Entidades e Escopos
* **src**
    * **modules**

O diretório modules, é o local onde será criada as entidades da API, como por exemplo `usuario`.

* **usuario**
   * **admin** `escopo`
      * **test**
        * **usuario.admin.spec.js**
      * **usuario.admin.controller.js**
      * **usuario.admin.routes.js**
      * **usuario.admin.validation.js**
   * **public** `escopo`
      * **usuario**
        * **usuario.public.spec.js**
      * **usuario.public.controller.js**
      * **usuario.public.routes.js**
      * **usuario.public.validation.js**
   * **usuario.schema.js**

Na maioria dos casos, precisamos de vários escopos de acesso em uma API. Na estrutura atual existem dois tipos de escopos, admin no qual somente o administrador terá acesso, e public, no qual não é necessário estar logado para enviar uma requisição. Dessa forma, estamos separando as responsabilidades entre os escopos, o que torna mais fácil a manutenção do mesmo.

É obrigatório seguir a estrutura descrita acima, {entidade}.{escopo}.{controller}.js

Você terá os arquivos: `{entidade}.{escopo}.routes.js`, `{entidade}.{escopo}.validation.js` e `{entidade}.{escopo}.controller.js`.
* `usuario.public.validation.js` neste arquivo é especificado as regras para cada endpoint com base no arquivo `usuario.schema.js`. . Podendo haver outras regras se necessário.
* `usuario.public.controller.js` é o arquivo responsável pelas regras de negócios.
* `usuario.public.routes.js`  é o arquivo que contém as configurações de roteamento do Hapijs.

Geralmente o arquivo `{entidade}.schema.js`  é comum entre os escopos, podendo ficar na raiz do `modules` de cada entidade.
* `usuario.schema.js` regras de validações como `header`, `params`, `query` entre outras.

#### Algumas features implementadas na API

* `Swagger` Para documentação da API.
* `Sequelize` Para conexão com o banco de dados Postgres

#### Qualquer sugestão de melhorias ou PR será bem-vinda.

## License
Licensed under [MIT](https://github.com/joaopedro1206/hapi-boilerplate/blob/master/LICENSE)
