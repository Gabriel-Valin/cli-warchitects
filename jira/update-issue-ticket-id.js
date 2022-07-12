import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import axios from 'axios'
import chalk from 'chalk';
import 'dotenv/config'

export default async function updateIssueWithTicketId() {
    
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

        spinner.success({ text: `Issue Encontrada, deseja atualizar o campo Zendesk Ticket ID Number? \n\n ${chalk.bgGreen('ISSUE ID: ')} ${data.id} 
            \n ${chalk.bgGreen('ISSUE KEY: ')} ${data.key} 
            \n ${chalk.bgGreen('ISSUE STATUS: ')} ${data.fields.status.name} 
            \n ${chalk.bgGreen('ZENDESK TICKET ID NUMBER: ')} ${data.fields.customfield_10067}
            `
        });

        const choice = await inquirer.prompt({
            name: "yes_or_not",
            type: 'confirm',
            message: "Confirme sua decisao",

        })

        if (choice.yes_or_not === true) {
            await axios.put(`https://docktech-sandbox-375.atlassian.net/rest/api/2/issue/${answers.issue_key}`, {
                "update": {
                    "customfield_10067": 905
                }
            }, {
                auth: {
                    username: process.env.JIRA_USERNAME,
                    password: process.env.JIRA_PASSWORD
                }
            })
        }
    } catch (error) {
        spinner.error({ text: `Issue nao encontrada ou chave inserida incorreta.`})
    }
}