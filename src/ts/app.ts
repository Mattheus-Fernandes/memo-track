import { supabase } from './config/supabase-config'
import { ITicket } from './interface/ticket.interface'
import { createCard } from './utils/card'


const elementsDOM = {

    selectMonthFilter: document.getElementById('selectMonthFilter') as HTMLSelectElement,
    sidebar: document.getElementById('sidebar') as HTMLDivElement,
    contentHub: document.getElementById('contentHub') as HTMLDivElement,
    contentHubBody: document.getElementById('contentHubBody') as HTMLDivElement,
    modal: document.getElementById('modal') as HTMLDivElement,
    overlay: document.querySelector('.overlay') as HTMLDivElement,
    deleteMonth: document.getElementById('deleteMonth') as HTMLSpanElement,

    //Buttons
    btnFormToggler: document.getElementById('btnFormToggler') as HTMLButtonElement,
    btnCloseFormToggler: document.getElementById('btnCloseFormToggler') as HTMLButtonElement,
    btnGenPdf: document.getElementById('btnGenPdf') as HTMLButtonElement,
    btnClearAll: document.getElementById('btnClearAll') as HTMLButtonElement,
    btnDeleteYes: document.getElementById('btnDeleteYes') as HTMLButtonElement,
    btnDeleteNo: document.getElementById('btnDeleteNo') as HTMLButtonElement,
}

const elementsForm = {
    myForm: document.querySelector("form") as HTMLFormElement,
    date: document.getElementById('date') as HTMLInputElement,
    customer: document.getElementById('customer') as HTMLInputElement,
    workOrder: document.getElementById('workOrder') as HTMLSelectElement,
    vtUsed: document.getElementById('vtUsed') as HTMLInputElement,
    btnInsert: document.getElementById('btnInsert') as HTMLButtonElement,
    btnEdit: document.getElementById('btnEdit') as HTMLButtonElement,
    vtRangeValue: document.getElementById('vtRangeValue') as HTMLSpanElement,
    formInvalid: document.getElementById('formInvalid') as HTMLSpanElement
}

class App {

    private date: string = ''

    constructor() {
        this.startWithMonth()
        this.filterByMonth()
        this.generatePdf()

        elementsForm.vtUsed.addEventListener('input', () => {
            elementsForm.vtRangeValue.textContent = elementsForm.vtUsed.value
        })

        elementsDOM.contentHubBody.addEventListener('click', (event) => this.deleteCard(event))
        elementsDOM.contentHubBody.addEventListener('click', (event) => this.editCard(event))

        elementsForm.btnInsert.addEventListener('click', () => this.onClickSave())
        elementsDOM.btnClearAll.addEventListener('click', () => this.clearAll(this.date))
        elementsDOM.btnDeleteYes.addEventListener('click', () => this.cleanAllConfirm(this.date))
        elementsDOM.btnDeleteNo.addEventListener('click', () => this.cleanAllNo())
        elementsDOM.btnFormToggler.addEventListener('click', () => this.showFormToggler())
        elementsDOM.btnCloseFormToggler.addEventListener('click', () => this.closeFormToggler())
    }

    private async onClickSave() {
        try {
            const dateFormatBR = elementsForm.date.value.split('-').reverse().join('/')

            const formValue = {
                date: dateFormatBR,
                customer: elementsForm.customer.value,
                workOrder: elementsForm.workOrder.value,
                vtUsed: elementsForm.vtUsed.value,
            }

            const FORM_INVALID = Object.values(formValue).some((value) => value == '' || 0)

            if (FORM_INVALID) {
                elementsForm.formInvalid.style.visibility = 'visible'
                return
            }

            const { error } = await supabase
                .from('usedTickets')
                .insert(formValue)

            if (error) throw new Error(error.message)

            this.closeFormToggler()

            setTimeout(() => {
                window.location.reload()
            }, 1000)

        } catch (error) {
            console.log(error)
        }
    }

    private startWithMonth() {
        const currentMonth = new Date().getMonth() + 1
        const currentYear = new Date().getFullYear()
        const date = `${currentMonth}/${currentYear}`

        elementsDOM.selectMonthFilter.value = String(currentMonth)

        this.date = date
        this.getTicketsByMonthAndYear(date)
    }

    private filterByMonth() {
        elementsDOM.selectMonthFilter.addEventListener('input', () => {
            const selectedMonth = elementsDOM.selectMonthFilter.value
            const year = new Date().getFullYear()

            const date = `${selectedMonth}/${year}`

            this.date = date
            this.getTicketsByMonthAndYear(this.date)
        })
    }

    private async getTicketsByMonthAndYear(monthAndYear: string) {
        try {

            const { data: tickets = [] } = await supabase
                .from('usedTickets')
                .select('*')
                .like('date', `%/${monthAndYear}`)

            const orderedTickets = tickets?.sort((a: ITicket, b: ITicket): number => {
                const getDayA = Number(a.date.split('/')[0])
                const getDayB = Number(b.date.split('/')[0])

                return getDayA - getDayB
            })

            elementsDOM.contentHubBody.innerHTML = ''

            orderedTickets?.forEach((ticket: ITicket) => {
                const cardHTML = createCard(ticket)
                elementsDOM.contentHubBody.insertAdjacentHTML('beforeend', cardHTML)
            })

        } catch (error) {
            console.log(error)
        }
    }

    private async generatePdf() {
        elementsDOM.btnGenPdf.addEventListener('click', () => {

        })
    }

    private clearAll(date: string) {
        elementsDOM.modal.style.display = 'block'
        elementsDOM.overlay.style.background = '#000000bd'
        elementsDOM.overlay.style.zIndex = '1'
        elementsDOM.contentHub.style.filter = 'blur(5px)'
        elementsDOM.sidebar.style.filter = 'blur(5px)'

        elementsDOM.deleteMonth.textContent = date

        console.log('ok')
    }

    private async cleanAllConfirm(date: string) {
        try {
            const { error } = await supabase
                .from('usedTickets')
                .delete()
                .like('date', `%/${date}`)

            if (error) {
                throw new Error(error.message)
            }

        } catch (error) {
            console.log(error)
        } finally {
            this.resetElemets()
            window.location.reload()
        }

    }

    private cleanAllNo() {
        this.resetElemets()
    }

    private resetElemets() {
        elementsDOM.modal.style.display = 'none'
        elementsDOM.overlay.style.zIndex = '-1'
        elementsDOM.overlay.style.background = 'transparent'
        elementsDOM.contentHub.style.filter = 'blur(0px)'
        elementsDOM.sidebar.style.filter = 'blur(0px)'
    }

    private showFormToggler() {
        elementsDOM.sidebar.classList.add('showSidebar')

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        //Only Smartphones
        if (window.matchMedia("(max-width: 500px)").matches) {
            setTimeout(() => {
                elementsDOM.btnCloseFormToggler.style.setProperty('display', 'block', 'important')
            }, 1000)
        }


    }

    private closeFormToggler() {
        elementsDOM.sidebar.classList.remove('showSidebar')
        setTimeout(() => {
            elementsDOM.btnCloseFormToggler.style.setProperty('display', 'none', 'important')
            elementsForm.vtRangeValue.textContent = ''
            elementsForm.myForm.reset()
        }, 500)
    }

    private async deleteCard(event: Event) {
        const target = event.target as HTMLSpanElement
        const card = target.closest('.card')

        const btnDelete = target.classList.contains('btnCardDelete')
        const id = Number(target.closest('.card-body')?.children[4].textContent)

        if (btnDelete) {
            card?.remove()

            const { error } = await supabase
                .from('usedTickets')
                .delete()
                .eq('id', id)

            if (error) {
                throw new Error(error.message)
            }
        }

    }

    private async editCard(event: Event) {
        try {

            const target = event.target as HTMLSpanElement
            const btnEdit = target.classList.contains('btnCardEdit')

            if (!btnEdit) {
                return
            } else {
                this.showFormToggler()
            }

            const id = Number(target.closest('.card-body')?.children[4].textContent)

            const { data: tickets = [], error } = await supabase
                .from('usedTickets')
                .select()
                .eq('id', id)

            if (error) {
                throw new Error(error.message)
            }

            tickets?.forEach((e: ITicket) => {
                const dateFormatUSA = e.date.split('/').reverse().join('-')

                elementsForm.date.value = dateFormatUSA
                elementsForm.customer.value = e.customer
                elementsForm.workOrder.value = String(e.workOrder)
                elementsForm.vtUsed.value = String(e.vtUsed)

                elementsForm.vtRangeValue.textContent = String(e.vtUsed)
            })

            elementsForm.btnEdit.addEventListener('click', () => this.editSave(id))

        } catch (error) {
            console.log(error)
        }
    }

    private async editSave(id: number) {
        try {
            const dateFormatBR = elementsForm.date.value.split('-').reverse().join('/')

            const editFormValue = {
                date: dateFormatBR,
                customer: elementsForm.customer.value,
                workOrder: elementsForm.workOrder.value,
                vtUsed: elementsForm.vtUsed.value,
            }

            const FORM_INVALID = Object.values(editFormValue).some((value) => value == '' || 0)

            if (FORM_INVALID) {
                elementsForm.formInvalid.style.visibility = 'visible'
                return
            }

            const { error } = await supabase
                .from('usedTickets')
                .update(editFormValue)
                .eq('id', id)

            if (error) throw new Error(error.message)

            this.closeFormToggler()

            setTimeout(() => {
                window.location.reload()
            }, 1000)

        } catch (error) {
            console.log(error)
        } 
    }

}


new App()