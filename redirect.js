import extractInsightsJira from "./jira/extract-insight-fields.js"
import getIssueById from "./jira/get-issue-by-key.js"
import updateIssueWithTicketId from "./jira/update-issue-ticket-id.js"
import getTicketByNumber from "./zendesk/get-ticket-by-number.js"


export function getOptionToRedirect(option) {
    console.log(option)
    if (option === 'Buscar informacoes de uma JIRA ISSUE pela CHAVE/ID') {
        getIssueById()
    }

    if (option === 'Buscar informacoes de um Ticker no Zendesk') {
        getTicketByNumber()
    }

    if (option === 'Atualizar campo de ID DO TICKET ZENDESK no JIRA') {
        updateIssueWithTicketId()
    }

    if (option === 'Extrair campos de insights (JIRA)') {
        extractInsightsJira()
    }
}