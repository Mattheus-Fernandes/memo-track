import { TicketsListResponse } from "../types/tickets-list-response";
import { workOrderDescription } from "./work-order-description";
import {jsPDF} from "jspdf"

export const createPdf = (tickets: TicketsListResponse) => {
    const doc = new jsPDF()
    
    addHeader(doc)
    addColumnTitle(doc)
    addTickets(doc, tickets)

    doc.save('Mattheus-Fernandes.pdf')
}

const columnWidth = {
    date: 5,
    customer: 50,
    workOrder: 100,
    vtUsed: 165
}

const lineText = (doc: jsPDF, text: string, width: number, height: number, fontSize: number, color: string = 'black') => {
    doc.setFontSize(fontSize)
    doc.setTextColor(color)
    doc.text(text, width, height)
}

const addHeader = (doc: jsPDF) => {
    lineText(doc, 'Histórico de Passagens', 5, 20, 18)
    lineText(doc, 'Colaborador:', 5, 30, 11)
    lineText(doc, 'Mattheus Fernandes', 30, 30, 11)
    doc.line(5, 35, 200, 35)
}

const addColumnTitle = (doc: jsPDF) => {
    lineText(doc, 'Data', columnWidth.date, 50, 11)
    lineText(doc, 'Cliente', columnWidth.customer, 50, 11)
    lineText(doc, 'Ordem de trabalho', columnWidth.workOrder, 50, 11)
    lineText(doc, 'VT Utilizados', columnWidth.vtUsed, 50, 11)
}

const addTickets = (doc: jsPDF, tickets: TicketsListResponse) => {
    tickets.forEach(
        (ticket, index) => {
            const baseY = 9
            const currentY = baseY * (index + 1) + 55

            lineText(doc, ticket.date, columnWidth.date, currentY, 11, 'gray')
            lineText(doc, ticket.customer, columnWidth.customer, currentY, 11, 'gray')
            lineText(doc, workOrderDescription(ticket.workOrder), columnWidth.workOrder, currentY, 11, 'gray')
            lineText(doc, String(ticket.vtUsed), columnWidth.vtUsed, currentY, 11, 'gray')
        }
    )
}