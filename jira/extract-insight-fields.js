import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import axios from 'axios'
import chalk from 'chalk';
import 'dotenv/config'
import { createObjectCsvWriter } from 'csv-writer';

export default async function extractInsightsJira() {
    let urlInsight = `https://api.atlassian.com/jsm/insight/workspace/${process.env.WORKSPACE_ID_JIRA}/v1/iql/objects?includeAttributes=false&resultPerPage=500`
    //?objectSchemaId=43&iql=objectType="Product"
    
    const schemaIDNumber = await inquirer.prompt({
        name: 'schema_id',
        type: 'input',
        message: 'Digite o numero do Schema ID',
        default() {
            return '4';
        },
    });

    if (isNaN(schemaIDNumber.schema_id)) {
        chalk.bgRed("Digite um valor valido (INT)")
        process.exit(1)
    }

    urlInsight+=`&objectSchemaId=${schemaIDNumber.schema_id}`

    const objectType = await inquirer.prompt({
        name: 'object_type',
        type: 'input',
        message: 'Digite um Object Type, ex: Product',
        default() {
            return 'Product';
        },
    });

    if (!typeof objectType.object_type === 'string') {
        chalk.bgRed("Digite um valor valido (String)")
        process.exit(1)
    }

    urlInsight+=`&iql=objectType=${objectType.object_type}`

    const spinner = createSpinner('Extraindo INSIGHTS...').start();

    try {
        const { data } = await axios.get(urlInsight, {
            auth: {
                username: process.env.JIRA_USERNAME,
                password: process.env.JIRA_PASSWORD
            }
        })
        
        let insightContents = []

        const csvWriter = createObjectCsvWriter({
            path: 'product-itsm.csv',
            header: [
                {id: 'id', title: 'objectID'},
                {id: 'label', title: 'label'},
            ]
        });

        for (let item of data.objectEntries) {
            insightContents.push({ label: item.label, id: item.id })
        }

        await csvWriter.writeRecords(insightContents)

        spinner.success({ text: 'Insights extraidos com sucesso!' })
    } catch (error) {
        spinner.error({ text: `Houve um erro na extracao dos Insights!`})
    }
    

}