import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import axios from 'axios'
import chalk from 'chalk';
import 'dotenv/config'

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export default async function getIssueById() {
    const answers = await inquirer.prompt({
        name: 'issue_key',
        type: 'input',
        message: 'Qual a chave da ISSUE, ex: INCIDENT-0001',
        default() {
            return 'XXXX-0000';
        },
    });

    const spinner = createSpinner('Verificando informacoes...').start();

    try {
        const {data, status} = await axios.get(`https://docktech-sandbox-375.atlassian.net/rest/api/2/issue/${answers.issue_key}`, {
        auth: {
            username: process.env.JIRA_USERNAME,
            password: process.env.JIRA_PASSWORD
        },
        headers: {
            "X-ExperimentalApi":"opt-in"
        }})

        spinner.success({ text: `\n ${chalk.bgGreen('ISSUE ID: ')} ${data.id} 
            \n ${chalk.bgGreen('ISSUE KEY: ')} ${data.key} 
            \n ${chalk.bgGreen('ISSUE STATUS: ')} ${data.fields.status.name} 
            \n ${chalk.bgGreen('ISSUE SUMMARY: ')} ${data.fields.summary}
            \n ${chalk.bgGreen('ZENDESK TICKET ID NUMBER: ')} ${data.fields.customfield_10067}
            \n ${chalk.bgGreen('LAST UPDATE: ')} ${new Intl.DateTimeFormat('pt-BR').format(new Date(data.fields.updated))}
            `
        });
    } catch (error) {
        spinner.error({ text: `Issue nao encontrada ou chave inserida incorreta.`})
    }
}