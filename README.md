# Projeto de Automacao de Testes - ServeRest

Este repositorio contem uma suite de testes automatizados E2E (End-to-End) e de API para a aplicacao ServeRest. O projeto foi desenvolvido de ponta a ponta com o framework Cypress, utilizando linguagem JavaScript.

O principal objetivo e garantir a qualidade da aplicacao web e de seus servicos internos simulando as acoes reais dos usuarios, alem da integracao com as APIs, validando assim tanto a Interface Grafica quanto os fluxos de Backend.

## 1. Arquitetura e Padroes Adotados

O projeto foi estruturado seguindo os padroes avancados de testes de software, focando em escalabilidade, clareza e facilidade de manutencao:

- **Page Object Model (POM)**: Isolamento das interacoes de UI e seletores em classes dedicadas (ex: `LoginPage`, `RegisterPage` e `ProductsPage`). Utilizacao de sintaxe Fluent Interface para encadeamento de chamadas.
- **Isolamento de Estado (API First Pattern)**: O preparo de dados (setups) em testes de frontend e realizado via chamadas de API (ex. `before()` utilizando `cy.createProductByApi()`). Isso reduz a fragilidade das assercoes e dependencias de UI preexistentes.
- **Custom Commands Modulares**: Comandos personalizados segregados por dominio semantico (Auth, Products, Users) em vez de um `commands.js` monolitico.
- **Dados Dinamicos**: Geracao de identificadores unicos (`Date.now()`) e limpeza das pre-condicoes atravez dos ciclos de vida (`before` e `after`).
- **Seletores Estaveis**: Utilizacao de atributos de testabilidade exclusivos (`data-testid`) para minimizar quebras em mudancas de layout e estilizacoes do DOM.
- **Centralizacao de Ambientes**: Variaveis de ambiente utilizadas extensivamente no arquivo de configuracao base para alternar contextos isolados entre a API e as UIs.

## 2. Pre-Requisitos

E necessario possuir instalados em sua maquina:

- Node.js (Recomenda-se versao 18.x ou LTS)
- NPM ou Yarn
- Git

## 3. Instalacao

1. Clone o repositorio localmente:
```bash
git clone https://github.com/techlucas-lucas/projeto-teste-automatizado.git
```

2. Acesse a pasta raiz do projeto:
```bash
cd projeto-teste-automatizado
```

3. Instale as dependencias utilizadas no projeto:
```bash
npm install
```

## 4. Estrutura do Projeto

Abaixo segue o descritivo de diretorios que formam a organizacao padrao da base de testes:

```
├── cypress/
│   ├── commands/             // Custom Commands modulares divididos por contexto (auth, products, users)
│   ├── e2e/
│   │   ├── api/              // Scripts de caso de teste focados unicamente nas validacoes de endpoint API
│   │   └── ui/               // Scripts de caso de teste focados nas validacoes Frontend via injecao E2E
│   ├── fixtures/             // Arquivos contendo massa de dados de teste (JSONs)
│   └── support/
│       ├── pages/            // Implementacao do padrao Page Objects definindo locators, fluxos curtos e assercoes de UI
│       ├── commands.js       // Subscricoes ou importador central de arquivos personalizados do Support
│       └── e2e.js            // Configurações globais previas a execucao
├── cypress.config.js         // Configuracoes base do executor e definicoes de env variables de endpoint (urls)
├── package.json              // Gerenciamento dos scripts NPM e dependencias de modulo (Cypress)
└── README.md                 // Documentacao de Setup (Este Arquivo)
```

## 5. Como Executar os Testes

O `package.json` foi devidamente configurado com atalhos de execucao de teste para sua escolha:

Para abrir a interface visual interativa (Cypress App):
```bash
npm run cy:open
```

Para executar toda a suite de testes no terminal (Modo Headless):
```bash
npm run cy:run
```

Para executar unicamente os testes da suite de UI:
```bash
npm run cy:run:ui
```

Para executar unicamente os testes da suite de API:
```bash
npm run cy:run:api
```

## 6. Integracao Continua (CI Pipeline Ready)

As configuracoes presentes no `cypress.config.js` ja contemplam robustez com o uso de **Retries** em modo terminal configurados como RunMode=2 e Video Disable para garantir e aumentar as performances no CI. Falhas sao geradas em Screenshots visando maior investigacao no RunFailureMode.

## Autoria
Projeto elaborado baseado no tech challenge de QA.
Lucas Gabriel Lopes Figueiró