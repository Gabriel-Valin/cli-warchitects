import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';

import { getOptionToRedirect } from './redirect.js';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const warchitects = chalkAnimation.rainbow(
        'Bem vindx a CLI da Squad Warchitects \n'
    );

    await sleep();
    warchitects.stop();

    console.log(`
        ${chalk.bgBlue('Essa Command Line Interface ira te ajudar com algumas solucoes.')} 
        SELECIONE UMA OPCAO ABAIXO PARA INICIAR.
    `);
}


async function options() {
    const options = await inquirer.prompt({
        name: 'all_options',
        type: 'list',
        message: 'Funcionalidades: \n',
        choices: [
        'Buscar informacoes de uma JIRA ISSUE pela CHAVE/ID',
        'Buscar informacoes de um Ticker no Zendesk',
        'Extrair campos de insights (JIRA)'
        ],
    });

    return getOptionToRedirect(options.all_options)
}
  

await welcome()
await options()