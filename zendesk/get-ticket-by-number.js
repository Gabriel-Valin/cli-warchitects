import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import axios from 'axios'
import chalk from 'chalk';
import 'dotenv/config'

export default async function getTicketByNumber() {
    const answers = await inquirer.prompt({
        name: 'ticket_number',
        type: 'input',
        message: 'Qual a numero do ticket? ex: 48013',
        default() {
            return '00000';
        },
    });

    const spinner = createSpinner('Verificando informacoes...').start();

    try {
        const {data, status} = await axios.get(`https://baascdt1580393297.zendesk.com/api/v2/tickets/${answers.ticket_number}.json`, {
        auth: {
            username: process.env.ZENDESK_USERNAME,
            password: process.env.ZENDESK_PASSWORD
        }})

        spinner.success({ text: `\n ${chalk.bgBlueBright('TICKET ID: ')} ${data.ticket.id} 
            \n ${chalk.bgBlueBright('SUBJECT: ')} ${data.ticket.subject}
            `
        });
    } catch (error) {
        spinner.error({ text: `Ticket nao encontrado ou ID inserido incorretamente.`})
    }
}